export async function updatePhotoArchive({
	fresh,
	previous,
	altDescriptions,
	canReuse,
	downloadOriginal,
	createVariants
}) {
	const previousById = new Map(previous.map((photo) => [photo.id, photo]));
	const refreshedIds = new Set(fresh.map((photo) => photo.id));
	const merged = [
		...fresh,
		...previous
			.filter((photo) => !refreshedIds.has(photo.id))
			.map((photo) => ({ ...photo, remoteUrl: null }))
	];
	const photos = [];
	const failures = [];

	for (const item of merged) {
		const old = previousById.get(item.id);
		let url = old && (await canReuse(old)) ? old.url : undefined;
		if (!url && item.remoteUrl) {
			try {
				url = (await downloadOriginal(item.remoteUrl, item.id)).url;
			} catch (error) {
				if (old && (await canReuse(old))) url = old.url;
				else {
					failures.push(`${item.id}: ${error?.message || error}`);
					continue;
				}
			}
		}
		if (!url) continue;

		const metadata = {
			id: item.id,
			caption: item.caption ?? old?.caption ?? '',
			url,
			permalink: item.permalink ?? old?.permalink ?? '',
			takenAt: item.takenAt ?? old?.takenAt ?? '',
			alt: altDescriptions[item.id] || old?.alt || ''
		};
		try {
			photos.push(await createVariants(metadata));
		} catch (error) {
			if (old && (await canReuse(old))) photos.push(old);
			else failures.push(`${item.id}: ${error?.message || error}`);
		}
	}
	photos.sort((a, b) => Date.parse(b.takenAt) - Date.parse(a.takenAt));
	return { photos, failures };
}

export async function archiveAfterRefreshFailure(error, previous, isUsableArchive) {
	if (previous.length && (await isUsableArchive(previous))) {
		return {
			photos: previous,
			warning: `${error?.message || error} Using the complete validated local archive (${previous.length} photos).`
		};
	}
	throw new Error(
		`${error?.message || error} No complete validated local photo archive is available.`
	);
}

export function assertCompleteArchive(previousCount, updatedCount, failures) {
	if (!updatedCount) throw new Error('Instagram refresh produced no usable local photos.');
	if (!previousCount && failures.length) {
		throw new Error(
			`A complete initial photo cache could not be built; ${failures.length} image(s) failed to download or process.`
		);
	}
	if (previousCount && updatedCount < previousCount) {
		throw new Error(
			`Refresh would reduce the validated archive from ${previousCount} to ${updatedCount} photos.`
		);
	}
}

export async function fetchInstagramMedia({ userId, token, fields, fetchImpl = fetch }) {
	if (!userId || !token) {
		throw new Error('Missing IG_USER_ID or IG_LONG_LIVED_TOKEN; photo cache was not changed.');
	}
	let url =
		`https://graph.instagram.com/${userId}/media` +
		`?fields=${encodeURIComponent(fields)}&access_token=${token}&limit=25`;
	const items = [];
	while (url) {
		const res = await fetchImpl(url, { method: 'GET' });
		const data = await res.json();
		if (!res.ok) {
			const message = data?.error?.message || data?.error?.error_user_msg || res.statusText;
			const code = data?.error?.code ? ` code ${data.error.code}` : '';
			const type = data?.error?.type ? ` ${data.error.type}` : '';
			const tokenHint =
				res.status === 400 || res.status === 401
					? ' The Instagram token may be missing, expired, or invalid.'
					: '';
			throw new Error(`IG HTTP ${res.status}${type}${code}: ${message}.${tokenHint}`);
		}
		if (Array.isArray(data?.data)) items.push(...data.data);
		url = data?.paging?.next ?? null;
	}
	return items;
}

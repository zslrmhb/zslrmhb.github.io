import { access, mkdir, readdir, unlink, writeFile } from 'node:fs/promises';
import { constants as FS } from 'node:fs';
import path from 'node:path';
import 'dotenv/config';

const JSON_OUT = 'src/data/photos.json';
const JSON_OUT_STATIC = 'static/photos.json';
const IMG_DIR = 'static/ig';
const COUNT = 60;

const { IG_USER_ID, IG_LONG_LIVED_TOKEN } = process.env;

if (!IG_USER_ID || !IG_LONG_LIVED_TOKEN) {
	console.error('Missing IG_USER_ID or IG_LONG_LIVED_TOKEN in env. Photo cache was not changed.');
	process.exit(1);
}

const FIELDS = [
	'id',
	'caption',
	'media_type',
	'media_url',
	'permalink',
	'thumbnail_url',
	'timestamp',
	'children{media_type,media_url,thumbnail_url}'
].join(',');

async function fetchAll(limit = COUNT) {
	let url =
		`https://graph.instagram.com/${IG_USER_ID}/media` +
		`?fields=${encodeURIComponent(FIELDS)}&access_token=${IG_LONG_LIVED_TOKEN}&limit=25`;

	const items = [];
	while (url && items.length < limit) {
		const res = await fetch(url, { method: 'GET' });
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
	return items.slice(0, limit);
}

function normalize(items) {
	return items
		.filter((item) => item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM')
		.map((item) => {
			let best = item;
			if (item.media_type === 'CAROUSEL_ALBUM') {
				const child =
					item.children?.data?.find((childItem) => childItem.media_type === 'IMAGE') ||
					item.children?.data?.[0];
				best = child ?? item;
			}
			const url = best?.media_url || item.media_url;
			const thumb = best?.thumbnail_url || url;
			return {
				id: item.id,
				caption: item.caption ?? '',
				url,
				thumb,
				permalink: item.permalink,
				takenAt: item.timestamp
			};
		})
		.sort((a, b) => +new Date(b.takenAt) - +new Date(a.takenAt));
}

async function fileExists(filePath) {
	try {
		await access(filePath, FS.F_OK);
		return true;
	} catch {
		return false;
	}
}

async function downloadImage(url, destBase) {
	const res = await fetch(url, {
		headers: {
			Accept: 'image/*',
			Referer: 'https://www.instagram.com/'
		}
	});
	if (!res.ok) throw new Error(`download ${res.status}`);
	const ab = await res.arrayBuffer();
	const ct = (res.headers.get('content-type') || '').toLowerCase();
	const ext = ct.includes('webp') ? 'webp' : ct.includes('png') ? 'png' : 'jpg';
	const destPath = `${destBase}.${ext}`;
	await writeFile(destPath, Buffer.from(ab));
	return destPath;
}

async function cleanupImages(keepIds) {
	await mkdir(IMG_DIR, { recursive: true });
	const keep = new Set(keepIds);
	const files = await readdir(IMG_DIR).catch(() => []);
	await Promise.all(
		files
			.filter((file) => !keep.has(file.split('.')[0]))
			.map((file) => unlink(path.join(IMG_DIR, file)).catch(() => {}))
	);
}

async function main() {
	try {
		const raw = await fetchAll(COUNT);
		const photos = normalize(raw);

		await mkdir(path.dirname(JSON_OUT), { recursive: true });
		await mkdir(path.dirname(JSON_OUT_STATIC), { recursive: true });
		await mkdir(IMG_DIR, { recursive: true });

		const updated = [];
		for (const photo of photos) {
			const base = path.join(IMG_DIR, photo.id);
			try {
				const saved = await downloadImage(photo.thumb || photo.url, base);
				const rel = '/' + path.posix.join('ig', path.basename(saved));
				updated.push({ ...photo, url: rel, thumb: rel });
			} catch (error) {
				console.warn(`failed to cache ${photo.id}:`, error?.message || error);
				updated.push(photo);
			}
		}

		await cleanupImages(updated.map((photo) => photo.id));

		const json = JSON.stringify(updated, null, 2);
		await writeFile(JSON_OUT, json);
		await writeFile(JSON_OUT_STATIC, json);

		console.log(`Cached ${updated.length} photos -> ${IMG_DIR}`);
		console.log(`Wrote metadata -> ${JSON_OUT} & ${JSON_OUT_STATIC}`);
	} catch (error) {
		console.error('IG fetch failed:', error?.message || error);
		if (!(await fileExists(JSON_OUT))) process.exit(1);
		console.log('Using existing photos.json; photo cache was not changed.');
		process.exit(1);
	}
}

main();

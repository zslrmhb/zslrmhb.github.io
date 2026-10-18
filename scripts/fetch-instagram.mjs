import { access, mkdir, readdir, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import { constants as FS } from 'node:fs';
import path from 'node:path';
import 'dotenv/config';
import { createPhotoVariants, imageDimensions, referencedImageFiles } from './photo-assets.mjs';
import { writePhotoMetadata } from './photo-metadata.mjs';
import {
	archiveAfterRefreshFailure,
	assertCompleteArchive,
	fetchInstagramMedia,
	updatePhotoArchive
} from './photo-cache.mjs';

const JSON_OUT = 'src/data/photos.json';
const JSON_OUT_STATIC = 'static/photos.json';
const ALT_OUT = 'src/data/photo-alt.json';
const IMG_DIR = 'static/ig';

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

function localAsset(url) {
	return typeof url === 'string' && url.startsWith('/ig/') && !url.includes('..');
}

async function fileExists(filePath) {
	try {
		await access(filePath, FS.F_OK);
		return true;
	} catch {
		return false;
	}
}

async function photoAssetsExist(photo) {
	const urls = [photo.url, photo.thumb, photo.medium];
	if (!urls.every(localAsset)) return false;
	return (
		await Promise.all(urls.map((url) => fileExists(path.join('static', url.slice(1)))))
	).every(Boolean);
}

async function readUsableCache() {
	try {
		const photos = JSON.parse(await readFile(JSON_OUT_STATIC, 'utf8'));
		if (!Array.isArray(photos) || photos.length === 0) return [];
		const usable = [];
		for (const photo of photos) if (await photoAssetsExist(photo)) usable.push(photo);
		return usable.length === photos.length ? usable : [];
	} catch {
		return [];
	}
}

async function fetchAll() {
	return fetchInstagramMedia({
		userId: process.env.IG_USER_ID,
		token: process.env.IG_LONG_LIVED_TOKEN,
		fields: FIELDS
	});
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
			return {
				id: item.id,
				caption: item.caption ?? '',
				remoteUrl: best?.media_url || item.media_url,
				permalink: item.permalink,
				takenAt: item.timestamp
			};
		})
		.sort((a, b) => +new Date(b.takenAt) - +new Date(a.takenAt));
}

async function downloadOriginal(url, id) {
	const res = await fetch(url, {
		headers: { Accept: 'image/*', Referer: 'https://www.instagram.com/' }
	});
	if (!res.ok) throw new Error(`download returned HTTP ${res.status}`);
	const bytes = Buffer.from(await res.arrayBuffer());
	const { width, height } = imageDimensions(bytes);
	if (width < 1 || height < 1) throw new Error('downloaded image has invalid dimensions');
	const type = (res.headers.get('content-type') || '').toLowerCase();
	const extension = type.includes('webp') ? 'webp' : type.includes('png') ? 'png' : 'jpg';
	const name = `${id}.${extension}`;
	const destination = path.join(IMG_DIR, name);
	const temporary = `${destination}.download`;
	await writeFile(temporary, bytes);
	await rename(temporary, destination);
	return { url: `/ig/${name}`, width, height };
}

async function writeMetadata(photos) {
	const json = `${JSON.stringify(photos, null, 2)}\n`;
	await writePhotoMetadata([JSON_OUT, JSON_OUT_STATIC], json);
}

async function cleanupImages(photos) {
	const keep = referencedImageFiles(photos);
	for (const file of await readdir(IMG_DIR).catch(() => [])) {
		if (!keep.has(file)) await unlink(path.join(IMG_DIR, file)).catch(() => {});
	}
}

async function reportWarning(message) {
	console.warn(`::warning::${message}`);
	if (process.env.GITHUB_STEP_SUMMARY) {
		await writeFile(
			process.env.GITHUB_STEP_SUMMARY,
			`\n> **Instagram refresh warning:** ${message}\n`,
			{ flag: 'a' }
		);
	}
}

async function main() {
	await mkdir(IMG_DIR, { recursive: true });
	const previous = await readUsableCache();
	let altDescriptions = {};
	try {
		altDescriptions = JSON.parse(await readFile(ALT_OUT, 'utf8'));
	} catch {
		// Descriptions are optional and are maintained separately from Instagram captions.
	}

	let refreshed;
	try {
		refreshed = normalize(await fetchAll());
	} catch (error) {
		const fallback = await archiveAfterRefreshFailure(error, previous, async (photos) => {
			for (const photo of photos) if (!(await photoAssetsExist(photo))) return false;
			return true;
		});
		await reportWarning(fallback.warning);
		return;
	}

	const { photos: updated, failures } = await updatePhotoArchive({
		fresh: refreshed,
		previous,
		altDescriptions,
		canReuse: photoAssetsExist,
		downloadOriginal,
		createVariants: (photo) => createPhotoVariants(photo, IMG_DIR)
	});

	assertCompleteArchive(previous.length, updated.length, failures);
	await writeMetadata(updated);
	await cleanupImages(updated);
	console.log(`Validated ${updated.length} photos and updated local responsive assets.`);
	if (failures.length) {
		await reportWarning(
			`Some new or refreshed images could not be cached; valid previous records were retained. ${failures.length} item(s) skipped.`
		);
	}
}

main().catch(async (error) => {
	console.error('Instagram refresh failed:', error?.message || error);
	process.exitCode = 1;
});

import { access, mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createPhotoVariants, referencedImageFiles } from './photo-assets.mjs';

const imageDirectory = 'static/ig';
const metadataFiles = ['src/data/photos.json', 'static/photos.json'];

async function writeAtomic(file, contents) {
	const temporary = `${file}.tmp`;
	await writeFile(temporary, contents);
	await rename(temporary, file);
}

const photos = JSON.parse(await readFile(metadataFiles[1], 'utf8'));
const altDescriptions = JSON.parse(await readFile('src/data/photo-alt.json', 'utf8'));
if (!Array.isArray(photos) || photos.length !== 83) {
	throw new Error(`Expected all 83 cached photos; found ${photos?.length ?? 'invalid data'}.`);
}

await mkdir(imageDirectory, { recursive: true });
const updated = [];
for (const photo of photos) {
	const name = path.basename(photo.url);
	await access(path.join(imageDirectory, name));
	updated.push(
		await createPhotoVariants(
			{ ...photo, alt: altDescriptions[photo.id] || photo.alt || '' },
			imageDirectory
		)
	);
}

const serialized = `${JSON.stringify(updated, null, 2)}\n`;
await writeAtomic(metadataFiles[0], serialized);
await writeAtomic(metadataFiles[1], serialized);
const keep = referencedImageFiles(updated);
console.log(
	`Generated responsive variants for ${updated.length} photos; ${keep.size} files referenced.`
);

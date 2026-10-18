import assert from 'node:assert/strict';
import { copyFile, mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { createPhotoVariants, imageDimensions } from '../scripts/photo-assets.mjs';

const sample = 'static/ig/17843275428671756.jpg';

test('responsive variants reserve the encoded dimensions and retain editorial alt text', async () => {
	const directory = await mkdtemp(path.join(os.tmpdir(), 'photo-variants-'));
	try {
		await copyFile(sample, path.join(directory, 'sample.jpg'));
		const photo = await createPhotoVariants(
			{
				id: 'sample',
				url: '/ig/sample.jpg',
				alt: 'A coastal path curves through low green hills.'
			},
			directory
		);
		assert.deepEqual([photo.width, photo.height], [1636, 2048]);
		assert.deepEqual([photo.thumbWidth, photo.thumbHeight], [480, 601]);
		assert.deepEqual([photo.mediumWidth, photo.mediumHeight], [960, 1202]);
		assert.equal(photo.alt, 'A coastal path curves through low green hills.');
		assert.deepEqual(imageDimensions(await readFile(path.join(directory, 'sample-480.webp'))), {
			width: 480,
			height: 601
		});
	} finally {
		await rm(directory, { recursive: true, force: true });
	}
});

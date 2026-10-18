import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import test from 'node:test';
import os from 'node:os';
import path from 'node:path';
import * as fs from 'node:fs/promises';
import { writePhotoMetadata } from '../scripts/photo-metadata.mjs';

test('an interrupted metadata update restores both last-valid files', async () => {
	const directory = await mkdtemp(path.join(os.tmpdir(), 'photo-metadata-'));
	const source = path.join(directory, 'src', 'photos.json');
	const published = path.join(directory, 'static', 'photos.json');
	await Promise.all([mkdir(path.dirname(source)), mkdir(path.dirname(published))]);
	await Promise.all([writeFile(source, 'old source'), writeFile(published, 'old published')]);
	let failOnce = true;
	const io = {
		...fs,
		rename: async (from, to) => {
			if (to === published && failOnce) {
				failOnce = false;
				throw new Error('simulated rename failure');
			}
			return fs.rename(from, to);
		}
	};

	try {
		await assert.rejects(
			writePhotoMetadata([source, published], 'new metadata', io),
			/simulated rename failure/
		);
		assert.equal(await readFile(source, 'utf8'), 'old source');
		assert.equal(await readFile(published, 'utf8'), 'old published');
		assert.deepEqual((await readdir(path.dirname(source))).sort(), ['photos.json']);
		assert.deepEqual((await readdir(path.dirname(published))).sort(), ['photos.json']);
	} finally {
		await rm(directory, { recursive: true, force: true });
	}
});

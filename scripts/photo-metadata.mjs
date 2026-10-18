import * as fs from 'node:fs/promises';
import path from 'node:path';

async function writeAtomic(file, contents, io) {
	const temporary = `${file}.tmp`;
	try {
		await io.writeFile(temporary, contents);
		await io.rename(temporary, file);
	} catch (error) {
		await io.unlink(temporary).catch(() => {});
		throw error;
	}
}

export async function writePhotoMetadata(files, contents, io = fs) {
	for (const file of files) await io.mkdir(path.dirname(file), { recursive: true });
	const previous = new Map(
		await Promise.all(
			files.map(async (file) => [file, await io.readFile(file, 'utf8').catch(() => null)])
		)
	);

	try {
		for (const file of files) await writeAtomic(file, contents, io);
	} catch (error) {
		for (const [file, value] of previous) {
			if (value === null) await io.unlink(file).catch(() => {});
			else await writeAtomic(file, value, io).catch(() => {});
		}
		throw error;
	}
}

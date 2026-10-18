import { execFile as execFileCallback } from 'node:child_process';
import { access, mkdir, readFile, rename, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const execFile = promisify(execFileCallback);

export function imageDimensions(buffer) {
	if (buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
		const kind = buffer.toString('ascii', 12, 16);
		if (kind === 'VP8X') {
			return {
				width: 1 + buffer.readUIntLE(24, 3),
				height: 1 + buffer.readUIntLE(27, 3)
			};
		}
		if (kind === 'VP8 ' && buffer[23] === 0x9d && buffer[24] === 0x01 && buffer[25] === 0x2a) {
			return {
				width: buffer.readUInt16LE(26) & 0x3fff,
				height: buffer.readUInt16LE(28) & 0x3fff
			};
		}
		if (kind === 'VP8L' && buffer[20] === 0x2f) {
			return {
				width: 1 + (((buffer[22] & 0x3f) << 8) | buffer[21]),
				height: 1 + (((buffer[24] & 0x0f) << 10) | (buffer[23] << 2) | ((buffer[22] & 0xc0) >> 6))
			};
		}
	}

	if (buffer.toString('ascii', 1, 4) === 'PNG') {
		return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
	}

	if (buffer[0] === 0xff && buffer[1] === 0xd8) {
		let offset = 2;
		while (offset < buffer.length) {
			if (buffer[offset] !== 0xff) {
				offset += 1;
				continue;
			}
			const marker = buffer[offset + 1];
			if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
				offset += 2;
				continue;
			}
			const length = buffer.readUInt16BE(offset + 2);
			if (
				[0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(
					marker
				)
			) {
				return {
					height: buffer.readUInt16BE(offset + 5),
					width: buffer.readUInt16BE(offset + 7)
				};
			}
			offset += length + 2;
		}
	}
	throw new Error('Unsupported or invalid image file');
}

async function exists(file) {
	try {
		await access(file);
		return true;
	} catch {
		return false;
	}
}

async function encode(source, destination, maxWidth) {
	const temporary = `${destination}.tmp.webp`;
	const { width } = imageDimensions(await readFile(source));
	const targetWidth = Math.min(width, maxWidth);
	const current = await stat(source);
	if (await exists(destination)) {
		const generated = await stat(destination);
		if (generated.mtimeMs >= current.mtimeMs) {
			return imageDimensions(await readFile(destination));
		}
	}

	await mkdir(path.dirname(destination), { recursive: true });
	try {
		const { stdout, stderr } = await execFile('cwebp', [
			'-q',
			'82',
			'-resize',
			String(targetWidth),
			'0',
			source,
			'-o',
			temporary
		]);
		const output = `${stdout}\n${stderr}`;
		const dimensions = output.match(/Dimension:\s*(\d+)\s+x\s+(\d+)/);
		if (!dimensions) throw new Error(`Could not read resized dimensions from cwebp: ${output}`);
		await rename(temporary, destination);
		return { width: Number(dimensions[1]), height: Number(dimensions[2]) };
	} catch (error) {
		await unlink(temporary).catch(() => {});
		throw error;
	}
}

export async function createPhotoVariants(photo, imageDirectory) {
	const originalName = path.basename(photo.url);
	const source = path.join(imageDirectory, originalName);
	const originalBuffer = await readFile(source);
	const { width, height } = imageDimensions(originalBuffer);
	const base = path.parse(originalName).name;
	const thumb = `/ig/${base}-480.webp`;
	const medium = `/ig/${base}-960.webp`;
	const thumbSize = await encode(source, path.join(imageDirectory, `${base}-480.webp`), 480);
	const mediumSize = await encode(source, path.join(imageDirectory, `${base}-960.webp`), 960);
	return {
		...photo,
		width,
		height,
		thumb,
		thumbWidth: thumbSize.width,
		thumbHeight: thumbSize.height,
		medium,
		mediumWidth: mediumSize.width,
		mediumHeight: mediumSize.height
	};
}

export function referencedImageFiles(photos) {
	return new Set(
		photos
			.flatMap((photo) => [photo.url, photo.thumb, photo.medium])
			.map((url) => path.basename(url || ''))
			.filter(Boolean)
	);
}

import type { Photo } from '$lib/types';
import { describeStructure, type Structure } from './photo-structure';

const size = 64;
// Cache only descriptors for this visit. The image bytes stay in the browser cache.
const cache = new Map<string, Promise<Structure | null>>();

async function extract(url: string) {
	const image = new Image();
	image.src = url;
	await image.decode();
	const scale = size / Math.max(image.naturalWidth, image.naturalHeight);
	const canvas = document.createElement('canvas');
	canvas.width = Math.max(3, Math.round(image.naturalWidth * scale));
	canvas.height = Math.max(3, Math.round(image.naturalHeight * scale));
	const ctx = canvas.getContext('2d', { willReadFrequently: true });
	if (!ctx) throw new Error('Image analysis is not available');
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
	return describeStructure(
		ctx.getImageData(0, 0, canvas.width, canvas.height).data,
		canvas.width,
		canvas.height
	);
}

function signature(url: string) {
	const cached = cache.get(url);
	if (cached) return cached;
	const work = extract(url).catch((error) => {
		cache.delete(url);
		throw error;
	});
	cache.set(url, work);
	return work;
}

async function yieldToBrowser() {
	const scheduler = (globalThis as { scheduler?: { yield?: () => Promise<void> } }).scheduler;
	if (scheduler?.yield) await scheduler.yield();
	else await new Promise((resolve) => setTimeout(resolve, 0));
}

export async function indexStructures(
	photos: readonly Photo[],
	signal: AbortSignal,
	progress: (count: number) => void
) {
	const signatures = new Map<string, Structure>();
	let missing = 0;
	for (let i = 0; i < photos.length && !signal.aborted; i += 4) {
		await Promise.all(
			photos.slice(i, i + 4).map(async (photo) => {
				try {
					const descriptor = await signature(photo.thumb || photo.medium || photo.url);
					if (descriptor) signatures.set(photo.id, descriptor);
				} catch {
					missing++;
				}
			})
		);
		if (signal.aborted) break;
		progress(Math.min(i + 4, photos.length));
		await yieldToBrowser();
	}
	return { signatures, missing };
}

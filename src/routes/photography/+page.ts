import type { Photo } from '$lib/types';

export const prerender = true;

export async function load({ fetch }) {
	const res = await fetch('/photos.json');
	const photos: Photo[] = await res.json();
	return { photos };
}

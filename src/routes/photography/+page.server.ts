import type { PageServerLoad } from './$types';
import type { Photo } from '$lib/types';

export const prerender = true;

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch('/photos.json');
	const photos: Photo[] = await response.json();
	return { photos };
};

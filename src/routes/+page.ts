import type { PageLoad } from './$types';
import type { Photo, Post } from '$lib/types';

export const load: PageLoad = async ({ fetch }) => {
	const [response, postsResponse] = await Promise.all([
		fetch('/photos.json'),
		fetch('/api/content')
	]);
	const posts: Post[] = postsResponse.ok ? await postsResponse.json() : [];
	const latestPost = posts
		.filter((post) => post.published && Number.isFinite(Date.parse(post.date)))
		.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))[0];
	if (!response.ok) return { latestPhoto: undefined, latestPost };
	const photos: Photo[] = await response.json();
	const latestPhoto = photos
		.filter((photo) => Number.isFinite(Date.parse(photo.takenAt)))
		.sort((a, b) => Date.parse(b.takenAt) - Date.parse(a.takenAt))[0];
	return { latestPhoto, latestPost };
};

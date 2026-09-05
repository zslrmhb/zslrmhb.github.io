import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';

export async function load({ params, url }) {
	try {
		const post = await import(`../../../content/${params.slug}.md`);
		if (post.metadata.published !== true && !(dev && url.searchParams.has('preview')))
			error(404, 'Note not published');
		return {
			slug: params.slug,
			content: post.default,
			meta: post.metadata
		};
	} catch {
		error(404, `Could not find ${params.slug}`);
	}
}

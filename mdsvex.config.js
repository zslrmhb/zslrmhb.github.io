import path from 'node:path';
import visit from 'unist-util-visit';
import remarkInteractive from './scripts/remark-interactive.js';

const layoutPath = path.resolve(process.cwd(), 'src/lib/components/markdown/BlogLayout.svelte');

/** @type {import('mdsvex').MdsvexOptions} */
export default {
	extensions: ['.md', '.svx'],
	layout: { _: layoutPath }, // absolute FS path like /Users/you/.../src/lib/layouts/BlogLayout.svelte
	remarkPlugins: [remarkInteractive],
	rehypePlugins: [rehypeCustomComponents]
};

function rehypeCustomComponents() {
	return async (tree) => {
		const hTags = [
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6',
			'Components.h1',
			'Components.h2',
			'Components.h3',
			'Components.h4',
			'Components.h5',
			'Components.h6'
		];
		const seen = new Map();

		visit(tree, (node) => {
			// Check h tags, and pass some extra parameters to the custom components.
			if (node?.type === 'element' && hTags.includes(node?.tagName)) {
				const text = getTextContent(node);
				const base = slugify(text) || 'section';
				const count = seen.get(base) ?? 0;
				seen.set(base, count + 1);

				node.properties ??= {};
				node.properties.id ??= count === 0 ? base : `${base}-${count + 1}`;
				node.properties.headerTag = node.tagName.split('.')[1];
			}
		});
	};
}

function getTextContent(node) {
	if (!node) return '';
	if (node.type === 'text' || node.type === 'inlineCode') return node.value ?? '';
	if (!Array.isArray(node.children)) return '';

	return node.children.map(getTextContent).join(' ');
}

function slugify(value) {
	return String(value)
		.toLowerCase()
		.trim()
		.replace(/['"]/g, '')
		.replace(/[^\p{Letter}\p{Number}\s-]/gu, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');
}

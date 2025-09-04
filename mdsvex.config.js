// mdsvex.config.js
import { mdsvex } from 'mdsvex';
import path from 'node:path';
import  visit  from 'unist-util-visit';

const layoutPath = path.resolve(process.cwd(), 'src/lib/components/markdown/BlogLayout.svelte');

/** @type {import('mdsvex').MdsvexOptions} */
export default {
  extensions: ['.md', '.svx'],
  layout: { _: layoutPath },   // absolute FS path like /Users/you/.../src/lib/layouts/BlogLayout.svelte
  remarkPlugins: [],
  rehypePlugins: [rehypeCustomComponents]
};

function rehypeCustomComponents() {
	return async (tree) => {
		const hTags = [
			'Components.h1',
			'Components.h2',
			'Components.h3',
			'Components.h4',
			'Components.h5',
			'Components.h6',
			'Components.blockquote'
		];

		visit(tree, (node) => {
			// Check h tags, and pass some extra parameters to the custom components.
			if (node?.type === 'element' && hTags.includes(node?.tagName)) {
				node.properties['id'] = node.children[0].value.split(' ').join('-').toLowerCase();
				node.properties['headerTag'] = node.tagName.split('.')[1];
			}
		});
	};
}

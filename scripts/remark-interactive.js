import visit from 'unist-util-visit';
import katex from 'katex';
import { parseInteractive } from '../src/lib/interactive/config.js';

export default function remarkInteractive() {
	return (tree, file) => {
		let interactive = false;
		visit(tree, 'code', (node) => {
			if (!['interactive', 'math'].includes(node.lang)) return;
			try {
				if (node.lang === 'interactive') {
					const config = parseInteractive(node.value);
					node.value = `<ThreeBody config={${JSON.stringify(config)}} />`;
					interactive = true;
				} else {
					const html = katex.renderToString(node.value, {
						displayMode: true,
						throwOnError: true,
						trust: false,
						output: 'htmlAndMathml'
					});
					node.value = `<div class="formula">${html.replaceAll('{', '&#123;').replaceAll('}', '&#125;')}</div>`;
				}
				node.type = 'html';
			} catch (error) {
				file.fail(error.message, node.position);
			}
		});
		if (interactive)
			tree.children.unshift({
				type: 'html',
				value: '<script>import ThreeBody from "$lib/interactive/ThreeBody.svelte";</script>'
			});
	};
}

import visit from 'unist-util-visit';
import katex from 'katex';
import { INTERACTIVE_COMPONENTS, parseInteractive } from '../src/lib/interactive/config.js';

export default function remarkInteractive() {
	return (tree, file) => {
		let interactive = false;
		const imports = new Map();
		visit(tree, 'code', (node) => {
			if (!['interactive', 'math'].includes(node.lang)) return;
			try {
				if (node.lang === 'interactive') {
					const config = parseInteractive(node.value);
					const component = INTERACTIVE_COMPONENTS[config.component];
					node.value = `<${component.exportName} config={${JSON.stringify(config)}} />`;
					imports.set(component.exportName, component.module);
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
		if (interactive) {
			const declarations = [...imports]
				.map(([name, module]) => `import ${name} from "${module}";`)
				.join('');
			tree.children.unshift({
				type: 'html',
				value: `<script>${declarations}</script>`
			});
		}
	};
}

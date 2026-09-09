import visit from 'unist-util-visit';

/**
 * Adds two intentionally small Markdown conveniences to a note:
 *
 * - [@A source](https://example.com) creates a numbered citation and an
 *   automatically collected entry in the References section.
 *
 * Ordinary Markdown links keep their normal behaviour.
 */
export default function remarkReferences() {
	return (tree, file) => {
		const seen = new Map();

		visit(tree, 'heading', (node) => {
			if (node.depth !== 2 && node.depth !== 3) return;
			const label = textContent(node).trim();
			const base = slugify(label) || 'section';
			const count = seen.get(base) ?? 0;
			seen.set(base, count + 1);
			const id = count === 0 ? base : `${base}-${count + 1}`;
			node.data ??= {};
			node.data.hProperties = { ...(node.data.hProperties ?? {}), id };

		});

		const sources = new Map();
		visit(tree, 'link', (node, index, parent) => {
			if (!parent || typeof index !== 'number') return;
			const label = textContent(node).trim();
			if (!label.startsWith('@')) return;
			const sourceLabel = label.slice(1).trim();
			if (!sourceLabel || !node.url) {
				file.fail('A source reference needs both a label and a URL.', node.position);
			}

			const key = `${node.url}::${sourceLabel}`;
			let source = sources.get(key);
			if (!source) {
			source = { number: sources.size + 1, label: sourceLabel, url: node.url };
				sources.set(key, source);
			}
			parent.children.splice(index, 1, {
				type: 'link',
				url: `#reference-${source.number}`,
				data: {
					hProperties: {
						className: ['citation'],
						'aria-label': `Reference ${source.number}: ${sourceLabel}`
					}
				},
				children: [{ type: 'text', value: `[${source.number}]` }]
			});
		});

		if (sources.size) appendReferences(tree, [...sources.values()]);
	};
}

function appendReferences(tree, sources) {
	tree.children.push(
		{
			type: 'heading',
			depth: 2,
			data: { hProperties: { id: 'references' } },
			children: [{ type: 'text', value: 'References' }]
		},
		{
			type: 'list',
			ordered: true,
			start: 1,
			data: { hProperties: { className: ['references'] } },
			children: sources.map((source) => ({
				type: 'listItem',
				data: { hProperties: { id: `reference-${source.number}` } },
				children: [
					{
						type: 'paragraph',
						children: [
							{
								type: 'link',
								url: source.url,
								data: {
									hProperties: {
										target: '_blank',
										rel: ['noreferrer'],
										className: ['reference-source']
									}
								},
								children: [{ type: 'text', value: source.label }]
							},
						]
					}
				]
			}))
		}
	);
}

function textContent(node) {
	if (!node) return '';
	if (node.type === 'text' || node.type === 'inlineCode') return node.value ?? '';
	return Array.isArray(node.children) ? node.children.map(textContent).join('') : '';
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

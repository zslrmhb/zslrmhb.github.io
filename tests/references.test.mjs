import assert from 'node:assert/strict';
import test from 'node:test';
import remarkReferences from '../scripts/remark-references.js';

const text = (value) => ({ type: 'text', value });

test('uses an authored References heading and inserts the collected sources once', () => {
	const existingReferences = {
		type: 'heading',
		depth: 2,
		children: [text('References')]
	};
	const tree = {
		type: 'root',
		children: [
			{
				type: 'paragraph',
				children: [{ type: 'link', url: 'https://example.com', children: [text('@Example')] }]
			},
			existingReferences
		]
	};
	remarkReferences()(tree, {
		fail(message) {
			throw new Error(message);
		}
	});

	assert.equal(tree.children.filter((node) => node.type === 'heading').length, 1);
	assert.equal(tree.children[1], existingReferences);
	assert.equal(tree.children[2].type, 'list');
	assert.equal(tree.children[2].children[0].data.hProperties.id, 'reference-1');
});

test('creates one unnumbered-by-content References section when none is authored', () => {
	const tree = {
		type: 'root',
		children: [
			{
				type: 'paragraph',
				children: [{ type: 'link', url: 'https://example.com', children: [text('@Example')] }]
			}
		]
	};
	remarkReferences()(tree, {
		fail(message) {
			throw new Error(message);
		}
	});

	const headings = tree.children.filter((node) => node.type === 'heading');
	assert.equal(headings.length, 1);
	assert.equal(headings[0].data.hProperties.id, 'references');
});

import assert from 'node:assert/strict';
import test from 'node:test';
import { isTerminalHeading, numberHeadings } from '../src/lib/blog/toc.ts';

test('numbers headings in source order and leaves terminal sections unnumbered', () => {
	const result = numberHeadings([
		{ id: 'intro', text: 'Introduction', level: 2 },
		{ id: 'method', text: 'Method', level: 2 },
		{ id: 'chapter', text: 'Findings', level: 2 },
		{ id: 'first', text: 'Accuracy', level: 3 },
		{ id: 'second', text: 'Causality', level: 3 },
		{ id: 'refs', text: 'References', level: 2 },
		{ id: 'appendix', text: 'Appendix', level: 2 },
		{ id: 'after', text: 'Next chapter', level: 2 }
	]);
	assert.deepEqual(
		result.map((heading) => heading.number),
		['01', '02', '03', '04', '05', undefined, undefined, '06']
	);
	assert.equal(isTerminalHeading(' references '), true);
});

import assert from 'node:assert/strict';
import test from 'node:test';
import {
	INITIAL,
	integrate,
	isTopView,
	normalizeSnapshot
} from '../src/lib/interactive/physics.ts';

test('normalizes a valid snapshot without sharing its mutable state array', () => {
	const state = INITIAL.slice();
	const snapshot = normalizeSnapshot({ state, speed: 1.5 });
	state[0] = 100;

	assert.equal(snapshot.speed, 1.5);
	assert.deepEqual(snapshot.state, INITIAL);
	assert.notEqual(snapshot.state, state);
	assert.ok(integrate(snapshot.state).every(Number.isFinite));
});

test('falls back to a renderable initial snapshot for incomplete or unsafe state', () => {
	const invalidSnapshots = [
		null,
		{},
		{ state: [0, 1], speed: 1 },
		{ state: INITIAL.map((value, index) => (index === 4 ? Number.NaN : value)), speed: 1 },
		{ state: INITIAL, speed: 10 },
		{ state: [0, 0, 0, 0, 0, 0, 0, 0, ...INITIAL.slice(8)], speed: 1 }
	];

	for (const input of invalidSnapshots) {
		const result = normalizeSnapshot(input);
		assert.deepEqual(result, { state: INITIAL, speed: 1 });
		assert.ok(integrate(result.state).every(Number.isFinite));
	}
});

test('recognizes a restored top camera without labeling perspective as top view', () => {
	assert.equal(isTopView([0, 3.7, 0.001]), true);
	assert.equal(isTopView([-0.01, 3.6, 0.01]), true);
	assert.equal(isTopView([0, 2.5, 3.1]), false);
	assert.equal(isTopView(undefined), false);
});

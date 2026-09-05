import { parseDocument } from 'yaml';

/** @typedef {{ component: 'three-body', preset: 'figure-eight', controls: ('play'|'reset'|'speed')[], explore: boolean }} InteractiveConfig */

/** Parse the author-facing configuration; no executable content is accepted.
 * @param {string} source
 * @returns {InteractiveConfig}
 */
export function parseInteractive(source) {
	const document = parseDocument(source, { uniqueKeys: true });
	if (document.errors.length) throw new Error(document.errors[0].message);
	const value = document.toJS({ maxAliasCount: 0 });
	if (!value || typeof value !== 'object' || Array.isArray(value))
		throw new Error('Expected an interactive configuration mapping.');
	const keys = ['component', 'preset', 'controls', 'explore'];
	for (const key of Object.keys(value))
		if (!keys.includes(key)) throw new Error(`Unknown interactive option: ${key}`);
	if (value.component !== 'three-body') throw new Error('Supported component: three-body');
	if (value.preset !== 'figure-eight') throw new Error('Supported preset: figure-eight');
	const controls = value.controls ?? ['play', 'reset', 'speed'];
	if (
		!Array.isArray(controls) ||
		controls.some((control) => !['play', 'reset', 'speed'].includes(control)) ||
		new Set(controls).size !== controls.length
	)
		throw new Error('Controls must be a unique list of play, reset, speed.');
	if (value.explore !== undefined && typeof value.explore !== 'boolean')
		throw new Error('explore must be a boolean.');
	return {
		component: 'three-body',
		preset: 'figure-eight',
		controls,
		explore: value.explore ?? false
	};
}

import { parseDocument } from 'yaml';

export const INTERACTIVE_COMPONENTS = Object.freeze({
	'three-body': {
		exportName: 'ThreeBody',
		module: '$lib/interactive/ThreeBody.svelte',
		presets: ['figure-eight']
	}
});

/** @typedef {{ component: keyof typeof INTERACTIVE_COMPONENTS, preset: string, controls: ('play'|'reset'|'speed')[], explore: boolean }} InteractiveConfig */

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
	/** @type {keyof typeof INTERACTIVE_COMPONENTS} */
	const componentName = value.component;
	const component = INTERACTIVE_COMPONENTS[componentName];
	if (!component)
		throw new Error(`Supported component: ${Object.keys(INTERACTIVE_COMPONENTS).join(', ')}`);
	if (!component.presets.includes(value.preset))
		throw new Error(`Supported ${componentName} preset: ${component.presets.join(', ')}`);
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
		component: componentName,
		preset: value.preset,
		controls,
		explore: value.explore ?? false
	};
}

export const gridSize = 5;
export const windowSize = 0.24;
export const windowStep = (1 - windowSize) / (gridSize - 1);

export interface ColourAtlas {
	photos: Record<string, string>;
	samples: Record<string, string[]>;
	whole: Record<string, string>;
}

export function position(index: number) {
	return [(index % gridSize) * windowStep, Math.floor(index / gridSize) * windowStep] as const;
}

function pixels(hex: string) {
	return (hex.match(/.{6}/g) ?? []).map((rgb) => {
		const value = parseInt(rgb, 16);
		const [r, g, b] = [value >> 16, (value >> 8) & 255, value & 255].map((channel) => {
			const s = channel / 255;
			return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
		});
		const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
		const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
		const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
		return [
			0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
			1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
			0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
		];
	});
}

// Sorted OKLab projections retain both dominant colors and smaller accents.
const axes = [
	[1, 0, 0],
	[0, 1, 0],
	[0, 0, 1],
	[0.58, 0.58, 0.58],
	[0.58, -0.58, 0.58]
];

function project(hex: string) {
	const colors = pixels(hex);
	return axes.map(([l, a, b]) =>
		colors.map((color) => l * color[0] + a * color[1] + b * color[2]).sort((x, y) => x - y)
	);
}

function distributionDistance(a: number[][], b: number[][]) {
	const count = a[0].length;
	if (!count || b[0].length !== count) return Infinity;
	let sum = 0;
	for (let axis = 0; axis < a.length; axis++) {
		for (let i = 0; i < count; i++) sum += Math.abs(a[axis][i] - b[axis][i]);
	}
	return sum / (a.length * count);
}

export function archiveMatcher(atlas: ColourAtlas) {
	const projections = new Map<string, number[][]>();
	function describe(hex: string) {
		let value = projections.get(hex);
		if (!value) {
			value = project(hex);
			projections.set(hex, value);
		}
		return value;
	}
	function swatches(id: string, region?: number) {
		const key = atlas.photos[id];
		const hex = region === undefined ? atlas.whole[key] : atlas.samples[key]?.[region];
		return (hex?.match(/[0-9a-f]{6}/gi) ?? [])
			.map((color) => ({ color, lightness: pixels(color)[0][0] }))
			.sort((a, b) => a.lightness - b.lightness)
			.map(({ color }) => color);
	}
	function match(
		id: string,
		region: number | undefined,
		available: readonly string[],
		visited: readonly string[]
	) {
		const key = atlas.photos[id];
		const hex = region === undefined ? atlas.whole[key] : atlas.samples[key]?.[region];
		if (!hex) return [];
		const source = describe(hex);
		return available
			.filter((other) => other !== id && !visited.includes(other))
			.flatMap((other) => {
				if (region === undefined) {
					const target = atlas.whole[atlas.photos[other]];
					return target
						? [
								{
									id: other,
									score: distributionDistance(source, describe(target)),
									region: undefined as number | undefined
								}
							]
						: [];
				}
				let score = Infinity,
					best = 0;
				atlas.samples[atlas.photos[other]]?.forEach((target, index) => {
					if (!target.length) return;
					const distance = distributionDistance(source, describe(target));
					if (distance < score) {
						score = distance;
						best = index;
					}
				});
				return [{ id: other, score, region: best }];
			})
			.filter(({ score }) => score < (region === undefined ? 0.055 : 0.06))
			.sort((a, b) => a.score - b.score || a.id.localeCompare(b.id))
			.slice(0, 3);
	}
	return { match, swatches };
}

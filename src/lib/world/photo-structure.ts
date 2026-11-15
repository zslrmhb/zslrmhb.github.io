// Compact, contrast-based composition descriptor. Angles are unsigned:
// a line remains the same when its light and dark sides are reversed.
const cells = 4;
const traceTile = 4;
export const directions = [
	'Horizontal',
	'Falling diagonal',
	'Vertical',
	'Rising diagonal'
] as const;

export type Structure = {
	width: number;
	height: number;
	path: string;
	orientations: number[];
	cells: number[];
};

export function describeStructure(
	rgba: Uint8ClampedArray,
	width: number,
	height: number
): Structure | null {
	const grey = new Float32Array(width * height);
	for (let i = 0; i < grey.length; i++) {
		grey[i] = (0.2126 * rgba[4 * i] + 0.7152 * rgba[4 * i + 1] + 0.0722 * rgba[4 * i + 2]) / 255;
	}
	const spatial = Array(cells * cells * directions.length).fill(0) as number[];
	const orientations = Array(directions.length).fill(0) as number[];
	const weights = new Float32Array(grey.length);
	const angles = new Float32Array(grey.length);
	let total = 0;
	for (let y = 1; y < height - 1; y++) {
		for (let x = 1; x < width - 1; x++) {
			const i = y * width + x;
			const gx =
				grey[i + 1 - width] +
				2 * grey[i + 1] +
				grey[i + 1 + width] -
				grey[i - 1 - width] -
				2 * grey[i - 1] -
				grey[i - 1 + width];
			const gy =
				grey[i - 1 + width] +
				2 * grey[i + width] +
				grey[i + 1 + width] -
				grey[i - 1 - width] -
				2 * grey[i - width] -
				grey[i + 1 - width];
			const weight = Math.hypot(gx, gy);
			if (weight < 0.15) continue;
			const angle = (Math.atan2(gy, gx) + 1.5 * Math.PI) % Math.PI;
			weights[i] = weight;
			angles[i] = angle;
			const bin = (angle / Math.PI) * directions.length;
			const lower = Math.floor(bin);
			const offset =
				(Math.floor((y * cells) / height) * cells + Math.floor((x * cells) / width)) *
				directions.length;
			const left = weight * (1 - bin + lower);
			const right = weight - left;
			const upper = (lower + 1) % directions.length;
			orientations[lower] += left;
			orientations[upper] += right;
			spatial[offset + lower] += left;
			spatial[offset + upper] += right;
			total += weight;
		}
	}
	if (!total) return null;
	// Draw at most one dominant tangent per tile; never overlay the photograph.
	const segments: string[] = [];
	for (let y = 1; y < height - 1; y += traceTile) {
		for (let x = 1; x < width - 1; x += traceTile) {
			let best = y * width + x;
			for (let row = y; row < Math.min(y + traceTile, height - 1); row++) {
				for (let col = x; col < Math.min(x + traceTile, width - 1); col++) {
					const i = row * width + col;
					if (weights[i] > weights[best]) best = i;
				}
			}
			if (weights[best] < 0.38) continue;
			const cx = best % width,
				cy = Math.floor(best / width);
			const dx = Math.cos(angles[best]),
				dy = Math.sin(angles[best]);
			segments.push(
				`M${(cx - dx).toFixed(1)},${(cy - dy).toFixed(1)}l${(2 * dx).toFixed(1)},${(2 * dy).toFixed(1)}`
			);
		}
	}
	return {
		width,
		height,
		path: segments.join(''),
		orientations: orientations.map((x) => x / total),
		cells: spatial.map((x) => x / total)
	};
}

function distance(a: number[], b: number[]) {
	return a.reduce((sum, value, i) => sum + Math.abs(value - b[i]), 0) / 2;
}

export function rankStructures(
	source: Structure,
	candidates: ReadonlyMap<string, Structure>,
	excluded: readonly string[]
) {
	return [...candidates]
		.flatMap(([id, candidate]) => {
			if (excluded.includes(id)) return [];
			const score =
				0.65 * distance(source.cells, candidate.cells) +
				0.35 * distance(source.orientations, candidate.orientations);
			return score < 0.42 ? [{ id, score }] : [];
		})
		.sort((a, b) => a.score - b.score || a.id.localeCompare(b.id))
		.slice(0, 3);
}

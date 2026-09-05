export const STEP = 0.003;
export const INITIAL = [
	-0.97000436, 0.24308753, 0.466203685, 0.43236573, 0.97000436, -0.24308753, 0.466203685,
	0.43236573, 0, 0, -0.93240737, -0.86473146
];
export type Snapshot = { state: number[]; speed: number };
export type CameraPosition = [number, number, number];

function derivative(state: number[]): number[] {
	const result = new Array<number>(12).fill(0);
	for (let i = 0; i < 3; i++) {
		const offset = i * 4;
		result[offset] = state[offset + 2];
		result[offset + 1] = state[offset + 3];
		for (let j = 0; j < 3; j++) {
			if (i === j) continue;
			const dx = state[j * 4] - state[offset],
				dy = state[j * 4 + 1] - state[offset + 1];
			const distanceSquared = dx * dx + dy * dy;
			if (distanceSquared < 1e-10)
				throw new Error('The bodies are too close for this approximation. Reset to continue.');
			const factor = 1 / (distanceSquared * Math.sqrt(distanceSquared));
			result[offset + 2] += dx * factor;
			result[offset + 3] += dy * factor;
		}
	}
	return result;
}

/** Fourth-order Runge–Kutta, normalized equal masses and G = 1. */
export function integrate(state: number[], step = STEP): number[] {
	const a = derivative(state);
	const b = derivative(state.map((value, i) => value + (step * a[i]) / 2));
	const c = derivative(state.map((value, i) => value + (step * b[i]) / 2));
	const d = derivative(state.map((value, i) => value + step * c[i]));
	return state.map((value, i) => value + (step * (a[i] + 2 * b[i] + 2 * c[i] + d[i])) / 6);
}

export function orbitPoints(): [number, number][] {
	let state = INITIAL.slice();
	const points: [number, number][] = [];
	for (let i = 0; i < 2109; i++) {
		if (i % 3 === 0) points.push([state[0], state[1]]);
		state = integrate(state);
	}
	return points;
}

import { scaleLinear } from 'd3-scale';

/**
 * Keep coordinate transforms in one place so a future SVG view can reuse the
 * same scale definition as the Canvas renderer.
 */
export function createOrbitScales(width: number, height: number) {
	return {
		x: scaleLinear()
			.domain([-1.45, 1.45])
			.range([16, width - 16]),
		y: scaleLinear()
			.domain([-1.45, 1.45])
			.range([height - 16, 16])
	};
}

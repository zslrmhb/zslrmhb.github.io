/** Versioned build-time contract for static photo measurements. */
export type BoundarySample = readonly [
	u: number,
	v: number,
	red: number,
	green: number,
	blue: number,
	localContrast: number
];

export interface PhotoFeaturesV1 {
	schema: 'living-world/features@1';
	sourceSha256: string;
	extractor: string;
	configSha256: string;
	seed: number;
	aspect: number;
	dimensions: readonly [width: number, height: number];
	mean: number;
	quantiles: readonly [q05: number, q50: number, q95: number, q99: number];
	histogram: readonly number[];
	coherence: number;
	tangent: number;
	complexity: number;
	confidence: number;
	centroid: readonly [x: number, y: number];
	concentration: number;
	boundary: readonly BoundarySample[];
	boundarySupport: readonly number[];
	supportPolicy: 'inward-gradient-persistence-v1';
}

export interface WorldManifestEntryV1 {
	photoId: string;
	sourceSha256: string;
	featureSha256: string;
	featureUrl: string;
	cacheKey: string;
	width: number;
	height: number;
	bytes: number;
	schema: PhotoFeaturesV1['schema'];
	status: 'ready';
}

export interface WorldManifestV1 {
	schema: 'living-world/manifest@1';
	generatedBy: string;
	extractor: string;
	analysisConfigSchema: 'living-world/analysis-config@1';
	configSha256: string;
	toolchain: { python: string; pillow: string };
	imagePolicy: {
		orientation: string;
		color: string;
		alpha: string;
	};
	featureCount: number;
	entries: readonly WorldManifestEntryV1[];
}

<script lang="ts">
	import { directions, type Structure } from '$lib/world/photo-structure';
	let { source, candidate }: { source: Structure; candidate: Structure } = $props();

	function dominant(study: Structure) {
		return directions[study.orientations.indexOf(Math.max(...study.orientations))];
	}
</script>

<div class="mt-3 grid grid-cols-2 gap-3">
	{#each [{ label: 'This photograph', study: source }, { label: 'Suggested photograph', study: candidate }] as { label, study } (label)}
		<figure class="m-0 min-w-0">
			<svg
				class="h-24 w-full border border-(--line) text-(--ink)"
				viewBox={`0 0 ${study.width} ${study.height}`}
				aria-hidden="true"
			>
				<path d={study.path} fill="none" stroke="currentColor" stroke-width="0.7" />
			</svg>
			<figcaption class="mt-2 text-xs">
				{label}<br />{dominant(study)} lines dominate
			</figcaption>
		</figure>
	{/each}
</div>
<p class="mt-3">The traces show strong edges. Matches compare their direction and position.</p>

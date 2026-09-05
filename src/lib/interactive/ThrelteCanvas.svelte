<script lang="ts">
	import type { Snippet } from 'svelte';
	import ThrelteContext from './ThrelteContext.svelte';

	let { children }: { children?: Snippet } = $props();
	let canvas = $state.raw<HTMLCanvasElement>();
	let dom = $state.raw<HTMLDivElement>();
</script>

<div bind:this={dom} class="relative h-full w-full overflow-hidden">
	<canvas bind:this={canvas} class="relative block h-full w-full">
		{#if canvas && dom}
			<ThrelteContext {dom} {canvas}>
				{@render children?.()}
			</ThrelteContext>
		{/if}
	</canvas>
</div>

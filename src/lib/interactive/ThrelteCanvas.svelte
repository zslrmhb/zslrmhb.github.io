<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import ThrelteContext from './ThrelteContext.svelte';

	let { children, onerror }: { children?: Snippet; onerror?: (message: string) => void } = $props();
	let canvas = $state.raw<HTMLCanvasElement>();
	let dom = $state.raw<HTMLDivElement>();

	onMount(() => {
		const contextLost = (event: Event) => {
			event.preventDefault();
			onerror?.('The graphics context was lost. Close the 3D view and try again.');
		};
		canvas?.addEventListener('webglcontextlost', contextLost);
		return () => canvas?.removeEventListener('webglcontextlost', contextLost);
	});
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

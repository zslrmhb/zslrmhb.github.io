<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createThrelteContext } from '@threlte/core';

	let {
		dom,
		canvas,
		children
	}: {
		dom: HTMLDivElement;
		canvas: HTMLCanvasElement;
		children: Snippet;
	} = $props();

	createThrelteContext(() => ({ dom, canvas }));
</script>

{@render children()}

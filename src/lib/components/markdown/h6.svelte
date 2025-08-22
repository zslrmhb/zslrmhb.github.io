<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		class: className = undefined,
		children,
		...restprops
	}: HTMLAttributes<HTMLHeadingElement> & {
		class: string | undefined | null;
		children: Snippet;
	} = $props();
</script>

<h6 class={cn(
	'mt-8 scroll-m-20 text-base font-semibold tracking-tight', 
	`group relative mb-2 mt-6 w-fit cursor-pointer before:absolute before:-left-4 hover:before:content-['#']`,
	'scroll-mt-16 font-semibold slashed-zero tracking-tighter lg:scroll-mt-8',
className)} 
{...restprops}>
	{@render children()}
</h6>
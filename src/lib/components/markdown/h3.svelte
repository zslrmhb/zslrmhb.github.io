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

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<h3
	class={cn(
		'mt-12 scroll-m-20 pb-2 text-xl font-semibold tracking-tight first:mt-0',
		`group relative mb-2 mt-6 w-fit cursor-pointer before:absolute before:-left-4 hover:before:content-['#']`,
		'scroll-mt-16 font-semibold slashed-zero tracking-tighter lg:scroll-mt-8',
		className
	)}
	{...restprops}
	onclick={() => {
		if (window.location.hash !== `#${restprops}.id}`) {
			window.location.hash = `#${restprops}.id}`;
		}
	}}
>
	{@render children()}
</h3>
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
		'mt-10 scroll-m-20 pb-2 text-xl font-semibold tracking-normal first:mt-0',
		`group relative mt-6 mb-2 w-fit cursor-pointer before:absolute before:-left-4 hover:before:content-['#']`,
		'scroll-mt-20 font-semibold tracking-normal slashed-zero',
		className
	)}
	{...restprops}
	onclick={() => {
		if (window.location.hash !== `#${restprops.id}`) {
			window.location.hash = `#${restprops.id}`;
		}
	}}
>
	{@render children()}
</h3>

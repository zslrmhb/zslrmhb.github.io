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

<h2
	class={cn(
		'mt-12 scroll-m-20 pb-2 text-2xl font-semibold tracking-normal first:mt-0',
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
</h2>

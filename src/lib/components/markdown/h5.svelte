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

<h5
	class={cn(
		'mt-8 scroll-m-20 text-lg font-semibold tracking-normal',
		`group relative mt-6 mb-2 w-fit cursor-pointer before:absolute before:-left-4 hover:before:content-['#']`,
		'scroll-mt-20 font-semibold tracking-normal slashed-zero',
		className
	)}
	{...restprops}
>
	{@render children()}
</h5>

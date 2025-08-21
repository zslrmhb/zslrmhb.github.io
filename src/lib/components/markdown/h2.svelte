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

<h2 class={cn('text-3xl font-semibold mt-5', className)} {...restprops}>
	{@render children()}
</h2>
<script lang="ts">
	import { cn } from '$lib/utils';
	import { Info } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		class: className = undefined,
		children,
		...restprops
	}: HTMLAttributes<HTMLQuoteElement> & {
		class: string | undefined | null;
		children: Snippet;
	} = $props();
</script>

<blockquote
	class={cn('my-5 rounded-lg border-l-3 border-primary bg-muted italic', className)}
	{...restprops}
>
	<div class="p-2">
		{@render children()}
	</div>
</blockquote>

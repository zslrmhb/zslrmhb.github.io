<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		id = 'interactive-widget',
		title,
		subtitle,
		children,
		footer,
		class: className = ''
	}: {
		id?: string;
		title: string;
		subtitle?: string;
		children: Snippet;
		footer?: Snippet;
		class?: string;
	} = $props();
</script>

<figure
	{id}
	class={`widget-frame my-9 border-y border-[var(--line)] bg-[var(--panel)] px-6 py-5 max-sm:mx-[-8px] max-sm:my-7 max-sm:px-4 ${className}`}
	aria-labelledby={`${id}-title`}
>
	<header
		class="flex justify-between gap-3 text-sm max-sm:flex-wrap max-sm:gap-x-3 max-sm:gap-y-0.5"
	>
		<span id={`${id}-title`}>{title}</span>
		{#if subtitle}<span class="text-xs text-[var(--muted)] max-sm:text-[11px]">{subtitle}</span
			>{/if}
	</header>
	{@render children()}
	{#if footer}
		<figcaption
			class="mt-[18px] flex justify-between gap-3 text-[11px] text-[var(--muted)] max-sm:flex-col max-sm:gap-0"
		>
			{@render footer()}
		</figcaption>
	{/if}
</figure>

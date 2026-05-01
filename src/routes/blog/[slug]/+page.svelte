<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { formatDate } from '$lib/utils';
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
	{#if data.meta.summary}
		<meta name="description" content={data.meta.summary} />
		<meta property="og:description" content={data.meta.summary} />
	{/if}
</svelte:head>

<article class="relative mx-auto max-w-3xl px-1 pt-14 pb-24 sm:pt-20">
	<hgroup class="mb-8">
		<h1 class="mb-4 text-3xl leading-tight font-semibold md:text-4xl">
			{data.meta.title}
		</h1>

		<div class="mb-5 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
			<span>{formatDate(data.meta.date, 'long')}</span>
			<span aria-hidden="true">/</span>
			<span>{data.meta.author ?? 'Hongbin Miao'}</span>
		</div>

		{#if data.meta.summary}
			<p class="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
				{data.meta.summary}
			</p>
		{/if}
	</hgroup>

	{#if data.meta?.categories && data.meta.categories.length > 0}
		<div class="tags mb-8 flex flex-wrap gap-2">
			{#each data.meta.categories as category (category)}
				<Badge variant="outline" class="rounded-md px-2 py-0.5 text-xs font-normal">
					{category}
				</Badge>
			{/each}
		</div>
	{/if}

	<Separator class="mb-10" />

	<div
		class="markdown prose prose-neutral dark:prose-invert prose-headings:tracking-normal prose-p:leading-7 prose-li:leading-7 prose-a:underline-offset-4 max-w-none"
	>
		<data.content />
	</div>
</article>

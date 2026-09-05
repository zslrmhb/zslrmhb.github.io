<script lang="ts">
	import TableOfContents from '$lib/components/blog/TableOfContents.svelte';
	import { formatDate } from '$lib/utils';
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title} · Hongbin Miao</title>
	<meta property="og:type" content="article" />
	<meta name="description" content={data.meta.summary ?? data.meta.description ?? ''} />
	{#if data.meta.published !== true}<meta name="robots" content="noindex,nofollow" />{/if}
</svelte:head>

{#key data.slug}
	<div class="article-back">
		<span>{data.meta.published ? 'NOTES' : 'LOCAL PREVIEW · NOT PUBLISHED'}</span><a href="/blog"
			>← All notes</a
		>
	</div>
	<main id="main">
		<div class="title-block">
			<p class="eyebrow">
				NOTES / {data.meta.layout === 'explorable'
					? 'EXPLORABLE EXPLANATION'
					: (data.meta.categories?.[0] ?? 'RESOURCES').toUpperCase()}
			</p>
			<h1>{data.meta.title}</h1>
			<p class="article-summary">{data.meta.summary ?? data.meta.description}</p>
			<div class="article-byline">
				<span>{data.meta.author ?? 'Hongbin Miao'}</span><span
					>{data.meta.published
						? formatDate(data.meta.date, 'long')
						: 'Design sample · Not published'}</span
				>
			</div>
		</div>
		<div class="reading-layout">
			<TableOfContents />
			<article class="markdown"><data.content /></article>
		</div>
	</main>
{/key}

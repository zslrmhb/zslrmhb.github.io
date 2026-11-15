<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import TableOfContents from '$lib/components/blog/TableOfContents.svelte';
	import { formatDate } from '$lib/utils';
	let { data } = $props();
	let fromNotes = $state(false);
	afterNavigate(({ from, to, type }) => {
		if (type !== 'popstate' && to?.route.id === '/blog/[slug]') {
			fromNotes = from?.route.id === '/blog';
		}
	});
</script>

<svelte:head>
	<title>{data.meta.title} · Hongbin Miao</title>
	<meta property="og:type" content="article" />
	<meta name="description" content={data.meta.summary ?? data.meta.description ?? ''} />
	{#if data.meta.published !== true}<meta name="robots" content="noindex,nofollow" />{/if}
</svelte:head>

{#key data.slug}
	<main id="main">
		<div class="title-block">
			<div class="article-byline">
				<a
					href="/blog"
					onclick={(event) => {
						if (fromNotes && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
							event.preventDefault();
							history.back();
						}
					}}>All notes</a
				>
				<span>{data.meta.author ?? 'Hongbin Miao'}</span><span
					>{data.meta.published
						? formatDate(data.meta.date, 'long')
						: 'Design sample · Not published'}</span
				>
			</div>
			<h1>{data.meta.title}</h1>
			<p class="article-summary">{data.meta.summary ?? data.meta.description}</p>
		</div>
		<div class="reading-layout">
			<TableOfContents title={data.meta.title} />
			<article class="markdown"><data.content /></article>
		</div>
	</main>
{/key}

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
</svelte:head>


<article class="relative pt-20 px-6 max-w-4xl mx-auto">
	<!-- Title + meta info -->
	<hgroup class="mb-6">
	  <h1 class="mb-4 text-4xl font-bold tracking-tight">
		{data.meta.title}
	  </h1>
	  
	  <!-- Meta line similar to Lilian Weng's blog -->
	  <div class="mb-4 text-sm text-muted-foreground">
		<span>Date: {formatDate(data.meta.date, 'long')}</span>
		{#if data.meta.author}
		  <span class="mx-2">|</span>
		  <span>Author: {data.meta.author}</span>
		{:else}
		  <span class="mx-2">|</span>
		  <span>Author: Your Name</span>
		{/if}
	  </div>
	  
	  <!-- Summary if available -->
	  {#if data.meta.summary}
		<p class="mb-4 text-lg text-muted-foreground leading-relaxed">
		  {data.meta.summary}
		</p>
	  {/if}
	</hgroup>

	<!-- Tags -->
	{#if data.meta?.categories && data.meta.categories.length > 0}
	<div class="tags mb-6 flex flex-wrap gap-2">
	 {#each data.meta.categories as category}
		<Badge variant="outline" class="rounded-full">{category}</Badge>
	 {/each}
	</div>
	{/if}
	
	

	<Separator class="mb-8" />

	<!-- Content area -->
	<div
	  class="markdown prose prose-lg dark:prose-invert max-w-none"
	>
	  <data.content />
	</div>

</article>




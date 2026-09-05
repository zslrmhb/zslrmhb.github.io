<script lang="ts">
	import { formatDate } from '$lib/utils';
	export let data;
</script>

<svelte:head>
	<title>Blog</title>
	<meta
		name="description"
		content="Notes and resources from Hongbin Miao on AI, engineering, and learning."
	/>
</svelte:head>

<main id="main" class="notes-page">
	<header>
		<h1>Notes.</h1>
	</header>

	{#if data.posts.length > 0}
		<div class="archive-label"><span>WRITING &amp; RESOURCES</span><span>NEWEST FIRST</span></div>
		<ul>
			{#each data.posts as post (post.slug)}
				<li>
					<a href="/blog/{post.slug}">
						{#if post.date}<time datetime={post.date}>{formatDate(post.date, 'long')}</time>{/if}
						<div>
							<h2>{post.title}</h2>
							{#if post.summary || post.description}<p>{post.summary ?? post.description}</p>{/if}
						</div>
						<span class="note-tag">{post.categories?.[0] ?? 'Note'}</span>
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="empty-notes">No published posts yet.</p>
	{/if}
</main>

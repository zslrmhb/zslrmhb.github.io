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

<section class="mx-auto w-full max-w-2xl pt-16 pb-24 sm:pt-10">
	<header class="mb-10">
		<h1 class="text-3xl leading-tight font-semibold">Blog</h1>
		<p class="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
			Writing notes, technical references, and things worth revisiting.
		</p>
	</header>

	{#if data.posts.length > 0}
		<ul class="divide-y divide-border/70">
			{#each data.posts as post (post.slug)}
				<li>
					<a class="group block py-5" href="/blog/{post.slug}">
						<div class="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
							<h2 class="text-base leading-6 font-medium group-hover:underline">
								{post.title}
							</h2>
							{#if post.date}
								<time class="shrink-0 text-xs text-muted-foreground" datetime={post.date}>
									{formatDate(post.date)}
								</time>
							{/if}
						</div>

						{#if post.summary || post.description}
							<p class="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
								{post.summary ?? post.description}
							</p>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="text-sm text-muted-foreground">No published posts yet.</p>
	{/if}
</section>

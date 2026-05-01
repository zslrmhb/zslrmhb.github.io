<script lang="ts">
	import type { Photo } from '$lib/types';
	import Marquee from '@/components/custom/Marquee.svelte';
	import PhotoChip from '@/components/custom/PhotoChip.svelte';

	export let data: { photos: Photo[] };

	$: photos = [...data.photos].sort((a, b) => {
		const ta = a.takenAt ? new Date(a.takenAt).getTime() : 0;
		const tb = b.takenAt ? new Date(b.takenAt).getTime() : 0;
		return tb - ta;
	});

	$: latestDate = photos[0]?.takenAt ? formatDate(photos[0].takenAt) : '';
	$: firstRow = photos.filter((_, i) => i % 2 === 0);
	$: secondRow = photos.filter((_, i) => i % 2 === 1);

	function formatDate(iso?: string) {
		if (!iso) return '';
		const d = new Date(iso);
		return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
	}
</script>

<svelte:head>
	<title>Photography</title>
	<meta
		name="description"
		content="A small photography archive, refreshed from Hongbin Miao's Instagram cache."
	/>
</svelte:head>

<section class="mx-auto w-full max-w-5xl pt-16 pb-24 sm:pt-10">
	<header class="mb-8 max-w-2xl">
		<h1 class="text-3xl leading-tight font-semibold">Photography</h1>
		<p class="mt-3 text-sm leading-6 text-muted-foreground">
			A quiet archive of recent photographs.
			{#if latestDate}
				<span>Latest photo: {latestDate}.</span>
			{/if}
		</p>
	</header>

	{#if photos.length > 0}
		<div
			class="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background py-10 sm:py-14"
		>
			<Marquee pauseOnHover class="[--duration:60s]">
				{#each firstRow as photo (photo.id)}
					<PhotoChip {photo} size="lg" />
				{/each}
			</Marquee>
			<Marquee reverse pauseOnHover class="[--duration:60s]">
				{#each secondRow as photo (photo.id)}
					<PhotoChip {photo} size="lg" />
				{/each}
			</Marquee>
			<div
				class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"
			></div>
			<div
				class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"
			></div>
		</div>
	{:else}
		<div class="rounded-md border border-border/70 px-5 py-10 text-sm text-muted-foreground">
			No cached photos are available yet.
		</div>
	{/if}
</section>

<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import type { Photo } from '$lib/types';

	let { data }: { data: { photos: Photo[] } } = $props();
	let gallery = $state<HTMLElement>();
	let viewer: HTMLDialogElement;
	let origin: HTMLButtonElement | null = null;
	let activeIndex = $state(0);
	let page = $state(1);
	let mobile = $state(browser && window.matchMedia('(max-width: 760px)').matches);
	let touchStart = $state<{ x: number; y: number } | null>(null);

	const photos = [...data.photos].sort((a, b) => Date.parse(b.takenAt) - Date.parse(a.takenAt));
	const pageSize = $derived(mobile ? 6 : 12);
	const pageCount = $derived(Math.max(1, Math.ceil(photos.length / pageSize)));
	const visiblePhotos = $derived(photos.slice((page - 1) * pageSize, page * pageSize));
	const current = $derived(photos[activeIndex]);

	function date(value: string, long = false) {
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: long ? 'long' : 'short',
			day: long ? 'numeric' : undefined,
			timeZone: 'UTC'
		}).format(new Date(value));
	}
	function alt(photo: Photo) {
		return photo.caption
			? `Photograph: ${photo.caption}`
			: `Photograph taken ${date(photo.takenAt, true)}`;
	}
	function goToPage(next: number, focus = true) {
		page = Math.min(Math.max(next, 1), pageCount);
		gallery?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		if (focus)
			requestAnimationFrame(() =>
				document
					.querySelector<HTMLButtonElement>('[aria-current="page"]')
					?.focus({ preventScroll: true })
			);
	}
	function open(index: number, button: HTMLButtonElement) {
		activeIndex = index;
		origin = button;
		viewer.showModal();
		requestAnimationFrame(() => viewer.querySelector<HTMLButtonElement>('[data-close]')?.focus());
	}
	function close() {
		viewer.close();
	}
	function move(delta: number) {
		activeIndex = Math.min(Math.max(activeIndex + delta, 0), photos.length - 1);
	}
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			move(-1);
		}
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			move(1);
		}
	}
	function pointerUp(event: PointerEvent) {
		if (!touchStart) return;
		const x = event.clientX - touchStart.x;
		const y = event.clientY - touchStart.y;
		if (Math.abs(x) > 50 && Math.abs(x) > Math.abs(y)) move(x < 0 ? 1 : -1);
		touchStart = null;
	}
	onMount(() => {
		const query = matchMedia('(max-width: 760px)');
		const update = () => {
			const first = (page - 1) * pageSize;
			mobile = query.matches;
			page = Math.floor(first / (query.matches ? 6 : 12)) + 1;
		};
		update();
		query.addEventListener('change', update);
		return () => query.removeEventListener('change', update);
	});
</script>

<svelte:head
	><title>Photography — Hongbin Miao</title><meta
		name="description"
		content="A quiet archive of photographs by Hongbin Miao."
	/></svelte:head
>

<main id="main" class="photo-page" aria-labelledby="photography-title">
	<header class="photo-intro">
		<div>
			<h1 id="photography-title">Photography.</h1>
		</div>
		<p class="photo-quote" lang="zh">
			<span>我只能看到前面，看不到后面，这样不是就有一半的事情看不到了吗?</span>
			<cite>《一一》·简洋洋</cite>
		</p>
	</header>
	{#if photos.length}
		<div class="gallery-meta" bind:this={gallery}>
			<span>ALL PHOTOGRAPHS · {photos.length}</span><span>SELECT A FRAME TO LOOK CLOSER</span>
		</div>
		<div class="photo-grid" aria-label="Photographs">
			{#each visiblePhotos as photo, offset (photo.id)}
				{@const index = (page - 1) * pageSize + offset}
				<figure>
					<button
						type="button"
						class="photo-card"
						aria-label={`Open photograph ${index + 1}: ${alt(photo)}`}
						onclick={(event) => open(index, event.currentTarget)}
						><img
							src={photo.thumb}
							alt={alt(photo)}
							loading={index < 3 ? 'eager' : 'lazy'}
						/></button
					>
					<figcaption>
						<span>{String(index + 1).padStart(2, '0')}</span><time datetime={photo.takenAt}
							>{date(photo.takenAt)}</time
						>
					</figcaption>
				</figure>
			{/each}
		</div>
		<nav class="gallery-pagination" aria-label="Photo pages">
			<button type="button" disabled={page === 1} onclick={() => goToPage(page - 1)}
				>← Previous</button
			>
			<div>
				{#each Array.from({ length: pageCount }, (_, index) => index) as index (index)}<button
						type="button"
						aria-label={`Page ${index + 1}`}
						aria-current={page === index + 1 ? 'page' : undefined}
						onclick={() => goToPage(index + 1)}>{index + 1}</button
					>{/each}
			</div>
			<button type="button" disabled={page === pageCount} onclick={() => goToPage(page + 1)}
				>Next →</button
			>
		</nav>
		<p class="page-status" aria-live="polite">
			Page {page} of {pageCount} · Photos {(page - 1) * pageSize + 1}–{Math.min(
				page * pageSize,
				photos.length
			)} of {photos.length}
		</p>
	{:else}<p class="empty-gallery">No cached photographs are available yet.</p>{/if}
</main>

<dialog
	class="photo-viewer"
	bind:this={viewer}
	onclose={() => origin?.focus({ preventScroll: true })}
	onkeydown={handleKeydown}
	aria-labelledby="viewer-title"
>
	{#if current}<header>
			<h2 id="viewer-title">Photography</h2>
			<span aria-live="polite">{String(activeIndex + 1).padStart(2, '0')} / {photos.length}</span
			><button type="button" data-close onclick={close}>Close ×</button>
		</header>
		<div class="viewer-stage">
			<button
				type="button"
				aria-label="Previous photograph"
				disabled={activeIndex === 0}
				onclick={() => move(-1)}>←</button
			><img
				src={current.url}
				alt={alt(current)}
				onpointerdown={(event) => (touchStart = { x: event.clientX, y: event.clientY })}
				onpointerup={pointerUp}
				onpointercancel={() => (touchStart = null)}
			/><button
				type="button"
				aria-label="Next photograph"
				disabled={activeIndex === photos.length - 1}
				onclick={() => move(1)}>→</button
			>
		</div>
		<footer>
			<div>
				<time datetime={current.takenAt}>{date(current.takenAt, true)}</time>{#if current.caption}<p
					>
						{current.caption}
					</p>{/if}
			</div>
			<a href={current.permalink} target="_blank" rel="noreferrer">Original post</a>
		</footer>
		<p class="viewer-hint">Arrow keys or swipe to browse · Esc to close</p>{/if}
</dialog>

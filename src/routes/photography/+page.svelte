<script lang="ts">
	import { onMount, tick } from 'svelte';
	import ColourEchoes from '$lib/components/photography/ColourEchoes.svelte';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import type { Photo } from '$lib/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let viewer: HTMLDialogElement;
	let origin: HTMLElement | null = null;
	let echoPhoto = $state<Photo>();
	let exploring = false;
	let explorationOpen = $state(false);
	let activeIndex = $state(-1);
	let touchStart = $state<{ x: number; y: number } | null>(null);

	const photos = $derived(
		[...data.photos].sort((a, b) => Date.parse(b.takenAt) - Date.parse(a.takenAt))
	);
	const years = $derived([...new Set(photos.map((photo) => yearOf(photo)))]);
	const current = $derived(photos[activeIndex]);

	function yearOf(photo: Photo) {
		return new Date(photo.takenAt).getUTCFullYear();
	}

	function date(value: string, long = false) {
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: long ? 'long' : 'short',
			day: long ? 'numeric' : undefined,
			timeZone: 'UTC'
		}).format(new Date(value));
	}
	function alt(photo: Photo) {
		return photo.alt || `Photograph taken ${date(photo.takenAt, true)}`;
	}
	function open(index: number, button: HTMLElement) {
		activeIndex = index;
		origin = button;
		viewer.showModal();
		viewer.scrollTop = 0;
		requestAnimationFrame(() => viewer.querySelector<HTMLButtonElement>('[data-close]')?.focus());
	}
	function exploreCurrent() {
		echoPhoto = current;
		explorationOpen = true;
		exploring = true;
		viewer.close();
	}
	function restoreViewerFocus() {
		activeIndex = -1;
		if (exploring) {
			exploring = false;
			const section = document.querySelector<HTMLDetailsElement>('.photo-exploration');
			if (section) section.open = true;
			document.getElementById('colour-echoes')?.scrollIntoView();
			document.getElementById('echo-title')?.focus({ preventScroll: true });
		} else {
			origin?.focus({ preventScroll: true });
		}
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
		const syncExploration = () => {
			if (location.hash !== '#colour-echoes') return;
			explorationOpen = true;
			void tick().then(() => document.getElementById('colour-echoes')?.scrollIntoView());
		};
		syncExploration();
		window.addEventListener('hashchange', syncExploration);
		return () => window.removeEventListener('hashchange', syncExploration);
	});
</script>

<svelte:head
	><title>Photography — Hongbin Miao</title><meta
		name="description"
		content="A quiet archive of photographs by Hongbin Miao."
	/></svelte:head
>

{#snippet frame(photo: Photo, index: number)}
	{@const year = yearOf(photo)}
	{@const firstInYear = index === 0 || yearOf(photos[index - 1]) !== year}
	<figure class:portrait={photo.thumbHeight > photo.thumbWidth}>
		<a
			href={photo.url}
			id={firstInYear ? `photos-${year}` : undefined}
			class="photo-card"
			data-sveltekit-preload-data="off"
			aria-label={`Open photograph: ${alt(photo)}`}
			onclick={(event) => {
				if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
				event.preventDefault();
				open(index, event.currentTarget);
			}}
			><img
				src={photo.thumb}
				alt={alt(photo)}
				width={photo.thumbWidth}
				height={photo.thumbHeight}
				srcset={`${photo.thumb} ${photo.thumbWidth}w, ${photo.medium} ${photo.mediumWidth}w`}
				sizes={index < 2
					? '(max-width: 760px) 46vw, min(36vw, 450px)'
					: '(max-width: 760px) 46vw, (max-width: 1099px) 30vw, min(16vw, 305px)'}
				loading={index === 0 ? 'eager' : 'lazy'}
				fetchpriority={index === 0 ? 'high' : undefined}
			/></a
		>
		<figcaption>
			<time datetime={photo.takenAt}>{date(photo.takenAt)}</time>
		</figcaption>
	</figure>
{/snippet}

<main id="main" class="photo-page" aria-label="Photography">
	<header class="photography-intro">
		<h1>Photography</h1>
		<p class="photo-quote" lang="zh">
			<span>我（们）只能看到前面，看不到后面，这样不是就有一半的事情看不到了吗?</span>
			<cite>《一一》·简洋洋</cite>
		</p>
	</header>
	{#if photos.length}
		<section class="photo-archive" id="photographs" aria-label="Photographs, newest first">
			<div class="photo-tools">
				<p>{photos.length} photographs</p>
				<details class="photo-exploration folio-disclosure" bind:open={explorationOpen}>
					<summary>Find visual echoes</summary>
					<ColourEchoes
						{photos}
						photo={echoPhoto ??
							photos.find((photo) => photo.id === '17922110778324528') ??
							photos[0]}
					/>
				</details>
			</div>
			{#if years.length > 1}
				<nav class="photo-years" aria-label="Jump to year">
					<span>Jump to</span>
					{#each years as year (year)}
						<a href={`#photos-${year}`}>{year}</a>
					{/each}
				</nav>
			{/if}
			<div class="photo-prints">
				{#each photos as photo, index (photo.id)}
					{@render frame(photo, index)}
				{/each}
			</div>
		</section>
	{:else}
		<p class="empty-gallery">No cached photographs are available yet.</p>{/if}
</main>

<dialog
	class="photo-viewer"
	bind:this={viewer}
	onclose={restoreViewerFocus}
	onkeydown={handleKeydown}
	aria-labelledby="viewer-title"
>
	{#if current}<header>
			<h2 id="viewer-title">Photography</h2>
			<span aria-live="polite">{String(activeIndex + 1).padStart(2, '0')} / {photos.length}</span
			><button type="button" data-close onclick={close}>Close</button>
		</header>
		<div class="viewer-stage">
			<button
				type="button"
				aria-label="Previous photograph"
				disabled={activeIndex === 0}
				onclick={() => move(-1)}><ChevronLeft size={20} /></button
			><img
				src={current.url}
				alt={alt(current)}
				width={current.width}
				height={current.height}
				onpointerdown={(event) => (touchStart = { x: event.clientX, y: event.clientY })}
				onpointerup={pointerUp}
				onpointercancel={() => (touchStart = null)}
			/><button
				type="button"
				aria-label="Next photograph"
				disabled={activeIndex === photos.length - 1}
				onclick={() => move(1)}><ChevronRight size={20} /></button
			>
		</div>
		<footer>
			<details class="folio-disclosure">
				<summary>Photo details</summary>
				<div>
					<time datetime={current.takenAt}>{date(current.takenAt, true)}</time
					>{#if current.caption}<p>
							{current.caption}
						</p>{/if}
				</div>
				<button type="button" onclick={exploreCurrent}>Find visual echoes</button>
				<a href={current.permalink} target="_blank" rel="noreferrer">Original post</a>
			</details>
		</footer>
		<p class="viewer-hint">Arrow keys or swipe to browse · Esc to close</p>{/if}
</dialog>

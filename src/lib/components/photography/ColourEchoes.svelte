<script lang="ts">
	import { base } from '$app/paths';
	import { pushState, replaceState } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount, tick } from 'svelte';
	import StructureStudy from './StructureStudy.svelte';
	import { rankStructures, type Structure } from '$lib/world/photo-structure';
	import type { Photo } from '$lib/types';
	import {
		archiveMatcher,
		gridSize,
		position,
		windowSize,
		windowStep
	} from '$lib/world/colour-echoes';

	type Lens = 'area' | 'palette' | 'structure';
	type Frame = {
		id: string;
		region?: number;
		choice: number;
		lens?: Lens;
		whole?: boolean;
		y?: number;
		memory?: boolean;
	};
	type Journey = { root: string; frames: Frame[] };
	let { photo, photos }: { photo: Photo; photos: Photo[] } = $props();
	let hydrated = $state(false);
	let heading: HTMLElement;
	let memory = $state<HTMLDetailsElement>();
	let followButton = $state<HTMLButtonElement>();
	let picker = $state<HTMLButtonElement>();
	let matcher = $state<ReturnType<typeof archiveMatcher>>();
	let loading = $state(false);
	let error = $state('');
	let pending = $state(false);
	let structures = $state<ReadonlyMap<string, Structure>>();
	let structureProgress = $state<number>();
	let structureUnavailable = $state(false);
	let structureRequest: AbortController | undefined;
	const lenses = [
		{ id: 'area', label: 'Local color', hint: 'Pick a spot to follow its colors.' },
		{
			id: 'palette',
			label: 'Whole palette',
			hint: 'Follow the balance of colors across the frame.'
		},
		{
			id: 'structure',
			label: 'Contours',
			hint: 'Follow the direction and placement of lines in the frame.'
		}
	] as const;
	let version = 0;
	let lastKey = '';
	const byId = $derived(new Map(photos.map((item) => [item.id, item])));
	const saved = $derived((page.state as { colourWalk?: Journey }).colourWalk);
	const frames = $derived(saved?.root === photo.id ? saved.frames : [{ id: photo.id, choice: 0 }]);
	const frame = $derived(frames[frames.length - 1]);
	const current = $derived(byId.get(frame.id) ?? photo);
	const selected = $derived(frame.region);
	const lens = $derived<Lens>(frame.lens ?? (frame.whole ? 'palette' : 'area'));
	const hint = $derived(lenses.find((item) => item.id === lens)?.hint);
	const sourceStructure = $derived(structures?.get(current.id));
	const structureMatches = $derived(
		lens === 'structure' && sourceStructure && structures
			? rankStructures(
					sourceStructure,
					structures,
					frames.map((item) => item.id)
				)
			: []
	);
	const colourMatches = $derived(
		lens === 'palette' || (lens === 'area' && selected !== undefined)
			? (matcher?.match(
					current.id,
					lens === 'palette' ? undefined : selected,
					[...byId.keys()],
					frames.map((item) => item.id)
				) ?? [])
			: []
	);
	const matches = $derived(lens === 'structure' ? structureMatches : colourMatches);
	const result = $derived(colourMatches[frame.choice % colourMatches.length]);
	const candidate = $derived(byId.get(matches[frame.choice % matches.length]?.id));
	const candidateStructure = $derived(candidate ? structures?.get(candidate.id) : undefined);
	const coords = $derived(
		lens === 'area' && selected !== undefined ? position(selected) : undefined
	);
	const status = $derived(
		lens === 'structure'
			? structureProgress !== undefined
				? `Reading lines and contours · ${structureProgress} of ${photos.length}`
				: structureUnavailable && !candidate
					? 'Some photographs could not be read. Select Contours to retry.'
					: !sourceStructure
						? 'No clear contours in this photograph. Try its palette instead.'
						: !candidate
							? 'No close composition. Try following color.'
							: ''
			: loading
				? 'Looking for similar colors…'
				: !candidate && (lens === 'palette' || selected !== undefined)
					? lens === 'palette'
						? 'No close palette. Try a smaller area.'
						: 'No close match. Try another spot.'
					: ''
	);

	const names = ['Top', 'Upper', 'Middle', 'Lower', 'Bottom'];
	const sides = ['far left', 'left', 'center', 'right', 'far right'];
	const centerArea = Math.floor((gridSize * gridSize) / 2);
	const areaLabel = $derived(
		selected === undefined
			? 'Select an area of the photograph'
			: `Selected area: ${names[Math.floor(selected / gridSize)]}, ${sides[selected % gridSize]}`
	);

	function label(item: Photo) {
		if (item.id === '17922110778324528') return 'Ocean';
		if (item.caption && !item.caption.startsWith('#')) return item.caption;
		return new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' }).format(
			new Date(item.takenAt)
		);
	}
	function update(next: Frame[], push = false) {
		const state = { ...page.state, colourWalk: { root: photo.id, frames: next } };
		if (push) pushState('', state);
		else replaceState('', state);
	}
	function amend(changes: Partial<Frame>) {
		update([...frames.slice(0, -1), { ...frame, ...changes }]);
	}
	async function loadColours() {
		if (matcher || loading) return;
		loading = true;
		error = '';
		try {
			const response = await fetch(`${base}/world/colour-echoes.json`);
			if (!response.ok) throw new Error('Archive unavailable');
			matcher = archiveMatcher(await response.json());
		} catch {
			error = 'Color matches could not load. Choose an area to try again.';
		} finally {
			loading = false;
		}
	}
	async function loadStructures() {
		if (structureRequest || (structures && !structureUnavailable)) return;
		const request = new AbortController();
		structureRequest = request;
		structureProgress = 0;
		structureUnavailable = false;
		try {
			const { indexStructures } = await import('$lib/world/structure-index');
			const { signatures, missing } = await indexStructures(photos, request.signal, (count) => {
				structureProgress = count;
			});
			if (!request.signal.aborted) {
				structures = signatures;
				structureUnavailable = missing > 0;
			}
		} catch {
			if (!request.signal.aborted) structureUnavailable = true;
		} finally {
			if (structureRequest === request) {
				structureRequest = undefined;
				structureProgress = undefined;
			}
		}
	}
	function prepareLens(currentLens: Lens, region?: number) {
		if (currentLens === 'structure') void loadStructures();
		else if (currentLens === 'palette' || region !== undefined) void loadColours();
	}
	function selectLens(next: Lens) {
		error = '';
		if (next !== lens) amend({ lens: next, choice: 0 });
		prepareLens(next, selected);
	}
	function choose(index: number) {
		if (pending) return;
		error = '';
		amend({ region: index, lens: 'area', choice: 0 });
		void loadColours();
	}
	function point(event: MouseEvent) {
		if (!event.detail) return choose(selected ?? centerArea);
		const rect = (event.currentTarget as HTMLButtonElement).getBoundingClientRect();
		const cell = (fraction: number) =>
			Math.max(0, Math.min(gridSize - 1, Math.round((fraction - windowSize / 2) / windowStep)));
		choose(
			cell((event.clientY - rect.top) / rect.height) * gridSize +
				cell((event.clientX - rect.left) / rect.width)
		);
	}
	function moveArea(event: KeyboardEvent) {
		const directions = {
			ArrowLeft: [-1, 0],
			ArrowRight: [1, 0],
			ArrowUp: [0, -1],
			ArrowDown: [0, 1]
		};
		const direction = directions[event.key as keyof typeof directions];
		if (!direction || pending || event.altKey || event.ctrlKey || event.metaKey) return;
		const currentArea = selected ?? centerArea;
		const x = (currentArea % gridSize) + direction[0];
		const y = Math.floor(currentArea / gridSize) + direction[1];
		if (x < 0 || y < 0 || x >= gridSize || y >= gridSize) return;
		event.preventDefault();
		choose(y * gridSize + x);
	}
	async function follow() {
		if (!candidate || pending) return;
		const next = candidate,
			request = ++version;
		const y = window.scrollY;
		pending = true;
		error = '';
		const image = new Image();
		image.src = next.medium || next.url;
		try {
			await image.decode();
			if (request !== version) return;
			amend({ y, memory: memory?.open });
			update([...frames, { id: next.id, choice: 0, lens }], true);
		} catch {
			if (request === version)
				error = 'This photograph could not open. Try this one again or choose another.';
		} finally {
			if (request === version) pending = false;
		}
	}
	onMount(() => {
		lastKey = frames.map((item) => item.id).join('/');
		hydrated = true;
		prepareLens(lens, selected);
		return () => {
			version++;
			structureRequest?.abort();
		};
	});
	$effect(() => {
		const key = frames.map((item) => item.id).join('/');
		const scroll = frame.y;
		if (!hydrated || key === lastKey) return;
		lastKey = key;
		version++;
		pending = false;
		error = '';
		prepareLens(lens, selected);
		void tick().then(() => {
			if (lastKey !== key) return;
			if (scroll === undefined) heading?.scrollIntoView({ block: 'start', behavior: 'instant' });
			else window.scrollTo({ top: scroll, behavior: 'instant' });
			((scroll !== undefined && followButton) || heading)?.focus({ preventScroll: true });
		});
	});
</script>

<section id="colour-echoes" class="colour-walk border-y py-8 md:py-12" aria-labelledby="echo-title">
	<header class="mb-7 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
		<h2 id="echo-title" tabindex="-1" bind:this={heading}>
			Visual echoes <span lang="zh-Hant">觀物</span>
		</h2>
		<a class="underline underline-offset-4" href="#photographs">Browse</a>
	</header>
	{#if frames.length > 1}
		<nav
			class="walk-trail mb-6 flex items-center gap-3 border-y py-2"
			aria-label="Photographs you followed"
		>
			<button type="button" onclick={() => history.back()}
				>Back to {label(byId.get(frames[frames.length - 2].id) ?? photo)}</button
			>
			<div class="flex min-w-0 gap-2 overflow-x-auto p-1">
				{#each frames as step, i (step.id)}
					{@const item = byId.get(step.id) ?? photo}
					<button
						type="button"
						aria-current={i === frames.length - 1 ? 'step' : undefined}
						aria-label={`Photograph ${i + 1}: ${label(item)}`}
						onclick={() => i < frames.length - 1 && history.go(i - frames.length + 1)}
					>
						<img
							class="h-7 w-10 object-contain"
							src={item.thumb || item.medium || item.url}
							alt=""
						/>
					</button>
				{/each}
			</div>
		</nav>
	{/if}
	{#if hydrated}
		<div class="walk-lenses mb-6">
			<div class="flex flex-wrap gap-x-5" role="group" aria-label="Find similarities by">
				{#each lenses as item (item.id)}
					<button
						type="button"
						aria-pressed={lens === item.id}
						disabled={pending}
						onclick={() => selectLens(item.id)}>{item.label}</button
					>
				{/each}
			</div>
			<p class="mt-1 text-sm text-(--muted)">{hint}</p>
		</div>
	{/if}
	<div class="walk-spread grid items-start gap-8">
		{#key current.id}
			<div class="min-w-0">
				<figure class="m-0">
					<div class="walk-image relative mx-auto w-fit max-w-full">
						<img
							class="block h-auto max-h-[59svh] w-auto max-w-full"
							src={current.medium || current.url}
							width={current.mediumWidth || current.width}
							height={current.mediumHeight || current.height}
							loading="lazy"
							fetchpriority="low"
							alt={current.alt || label(current)}
						/>
						{#if hydrated && lens === 'area'}
							<button
								type="button"
								class="absolute inset-0 w-full cursor-crosshair border-0! bg-transparent! p-0!"
								aria-label={areaLabel}
								aria-describedby="photo-area-instructions"
								onclick={point}
								onkeydown={moveArea}
								bind:this={picker}
							></button>
							<span id="photo-area-instructions" class="sr-only"
								>Press Enter to select the center, or use the arrow keys to move the selection.</span
							>
						{/if}
						{#if coords}
							<span
								class="walk-mark pointer-events-none absolute"
								style:left={coords[0] * 100 + '%'}
								style:top={coords[1] * 100 + '%'}
								aria-hidden="true"
							></span>
						{/if}
					</div>
					<figcaption class="mt-3 flex flex-wrap justify-between gap-3 text-sm">
						<span>{label(current)}</span><a
							class="underline underline-offset-4"
							href={current.url}
							target="_blank"
							rel="noopener">Open original</a
						>
					</figcaption>
				</figure>
				<div class="walk-controls">
					{#if hydrated && lens === 'area' && selected !== undefined}
						<button
							class="walk-text-action mt-2"
							type="button"
							onclick={() => {
								amend({ region: undefined, choice: 0 });
								picker?.focus({ preventScroll: true });
							}}>Clear selection</button
						>
					{/if}
					{#if current.id === '17932757576922281'}
						<details class="mt-4" bind:this={memory} open={frame.memory}>
							<summary class="cursor-pointer text-sm underline underline-offset-4"
								>A room I remember</summary
							>
							<p>
								Old Clothes shows a dim room in my childhood home, where I used to play and explore
								old books.
							</p>
						</details>
					{/if}
				</div>
				{#if candidate}
					<button
						type="button"
						class="walk-text-action match-jump"
						onclick={() => {
							followButton?.scrollIntoView({ block: 'start', behavior: 'instant' });
							followButton?.focus({ preventScroll: true });
						}}>See the match</button
					>
				{/if}
			</div>
		{/key}
		<aside class="walk-next min-w-0 self-center">
			{#if candidate}
				{#key candidate.id}
					<div class="walk-frame">
						<button
							class="walk-follow block w-full border-0! bg-transparent! p-0! text-left"
							type="button"
							bind:this={followButton}
							disabled={pending}
							onclick={follow}
						>
							<img
								class="mx-auto block h-auto max-h-[42svh] w-auto max-w-full"
								src={candidate.medium || candidate.url}
								width={candidate.mediumWidth || candidate.width}
								height={candidate.mediumHeight || candidate.height}
								alt={candidate.alt || label(candidate)}
							/>
							<span class="mt-3 block underline underline-offset-4"
								>{pending ? 'Opening photograph…' : 'Follow this photograph'}</span
							>
						</button>
					</div>
				{/key}
				{#if matches.length > 1}<button
						type="button"
						class="walk-text-action mt-2"
						disabled={pending}
						onclick={() => amend({ choice: (frame.choice + 1) % matches.length })}
						>Try another · {frame.choice + 1}/{matches.length}</button
					>{/if}
				{#if (lens === 'structure' && sourceStructure && candidateStructure) || (result && matcher)}
					{#key current.id}
						<section class="photo-comparison mt-4 text-sm" aria-labelledby="photo-comparison-title">
							<h3 id="photo-comparison-title">
								{lens === 'structure' ? 'Compare edge traces' : 'Compare color samples'}
							</h3>
							{#if lens === 'structure' && sourceStructure && candidateStructure}
								<StructureStudy source={sourceStructure} candidate={candidateStructure} />
							{:else if result && matcher}
								<p class="mt-2">
									{lens === 'palette'
										? '64 samples across each frame.'
										: '16 samples from the selected area and its suggested match.'} Ordered from dark
									to light.
								</p>
								{#each [{ label: 'This photograph', values: matcher.swatches(current.id, lens === 'palette' ? undefined : selected) }, { label: 'Suggested photograph', values: matcher.swatches(candidate.id, result.region) }] as strip (strip.label)}
									<p class="mt-3 text-xs">{strip.label}</p>
									<div
										class="mt-1 flex h-5 overflow-hidden outline outline-(--line)"
										aria-hidden="true"
									>
										{#each strip.values as hex, i (i)}
											<span class="flex-1" style:background-color={'#' + hex}></span>
										{/each}
									</div>
								{/each}
							{/if}
						</section>
					{/key}
				{/if}
			{/if}
			<p class="walk-status text-sm">{error || status}</p>
			<p class="sr-only" role="status">
				{error ||
					(candidate
						? `Match ${frame.choice + 1} of ${matches.length} is ready.`
						: structureProgress !== undefined && lens === 'structure'
							? 'Reading lines and contours…'
							: status)}
			</p>
			{#if lens === 'structure' && structureUnavailable && candidate}
				<button class="walk-text-action" type="button" onclick={loadStructures}
					>Retry unread photographs</button
				>
			{/if}
		</aside>
	</div>
</section>

<style>
	.colour-walk {
		color: var(--ink);
		border-color: var(--line);
	}
	#echo-title {
		font-size: clamp(2rem, 4vw, 3rem);
		line-height: 1.05;
		scroll-margin-top: 6rem;
	}
	#echo-title span {
		font: 1rem var(--font-cjk-serif);
		white-space: nowrap;
		margin-inline-start: 0.6em;
		color: var(--muted);
	}
	.walk-trail {
		position: sticky;
		top: 0;
		z-index: 4;
		background: var(--paper);
		border-color: var(--line);
	}
	.walk-trail button[aria-current] {
		color: var(--ink);
		font-weight: 650;
		text-decoration: underline;
		text-underline-offset: 0.25em;
	}
	.walk-mark {
		width: 24%;
		height: 24%;
		border: 1px solid white;
		box-shadow: 0 0 0 1px #273b3470;
	}
	.walk-next {
		color: var(--muted);
	}
	.walk-lenses button,
	.walk-text-action {
		border: 0;
		min-height: 44px;
		padding-inline: 0;
		color: var(--muted);
	}
	.walk-lenses button:hover:not(:disabled),
	.walk-text-action:hover:not(:disabled) {
		background: transparent;
		color: var(--ink);
	}
	.walk-lenses button[aria-pressed='true'] {
		color: var(--ink);
		text-decoration: underline;
		text-underline-offset: 0.45em;
	}
	.walk-follow {
		scroll-margin-top: 5rem;
	}
	.match-jump {
		display: none;
	}
	.walk-status:empty {
		margin: 0;
	}
	@media (min-width: 800px) {
		.walk-spread {
			grid-template-columns: minmax(0, 2.4fr) minmax(0, 1fr);
			column-gap: 7%;
		}
	}
	@media (max-width: 799px) {
		.match-jump {
			display: inline-block;
			text-decoration: underline;
			text-underline-offset: 0.35em;
		}
		.walk-next {
			margin-inline-start: 10%;
		}
	}
	@media (prefers-reduced-motion: no-preference) {
		.walk-frame {
			animation: settle 0.32s cubic-bezier(0.22, 1, 0.36, 1);
		}
		.walk-mark {
			transition:
				left 0.16s ease-out,
				top 0.16s ease-out;
		}
		@keyframes settle {
			from {
				opacity: 0.65;
				transform: translateY(5px);
			}
		}
	}
</style>

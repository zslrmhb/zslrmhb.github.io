<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	import ModeToggle from '$lib/components/portfolio/ModeToggle.svelte';
	import { RangeControl, SegmentedControl, ToggleControl } from '$lib/components/interactive';
	import ThrelteScene, { type ThrelteSceneController } from './ThrelteScene.svelte';
	import ThrelteCanvas from './ThrelteCanvas.svelte';
	import { isTopView, type Snapshot, type CameraPosition } from './physics';

	type ExplorerSnapshot = Snapshot & { view?: CameraPosition };
	let {
		snapshot,
		view,
		onclose
	}: {
		snapshot: Snapshot;
		view?: CameraPosition;
		onclose: (result: Snapshot & { view?: CameraPosition }) => void;
	} = $props();
	let dialog: HTMLDialogElement;
	let controller = $state<ThrelteSceneController | undefined>();
	let playing = $state(false),
		speed = $state(1),
		trails = $state(true),
		cameraPreset = $state<'perspective' | 'top'>('perspective');
	let status = $state<'loading' | 'ready' | 'error'>('loading');
	let message = $state('');
	let sceneMounted = $state(false);
	let generation = 0;
	let latest = $state<ExplorerSnapshot>({ state: [], speed: 1 });
	function release() {
		if (controller) {
			latest = controller.dispose();
			controller = undefined;
		}
	}
	async function load() {
		const current = ++generation;
		status = 'loading';
		message = '';
		sceneMounted = false;
		release();
		await tick();
		if (current === generation) sceneMounted = true;
	}
	function sceneError(error: string) {
		message = error;
		status = 'error';
		playing = false;
		release();
	}
	async function retry(reset: () => void) {
		const current = ++generation;
		status = 'loading';
		message = '';
		sceneMounted = false;
		await tick();
		if (current !== generation) return;
		reset();
		sceneMounted = true;
	}
	function close() {
		generation++;
		release();
		onclose(latest);
	}
	function reset() {
		controller?.reset();
		speed = 1;
		trails = true;
		cameraPreset = 'perspective';
	}
	onMount(() => {
		speed = snapshot.speed;
		cameraPreset = isTopView(view) ? 'top' : 'perspective';
		latest = { ...snapshot, view };
		dialog.showModal();
		void load();
	});
	onDestroy(() => {
		generation++;
		release();
	});
</script>

<dialog bind:this={dialog} class="explore-dialog" onclose={close} aria-labelledby="explore-title">
	<header class="explore-top">
		<div>
			<span class="explore-kicker">THREE BODY PROBLEM</span>
			<h2 id="explore-title">A change of perspective.</h2>
		</div>
		<div class="explore-actions">
			<ModeToggle /><button onclick={() => dialog.close()}>← Back to reading</button>
		</div>
	</header>
	<div class="explore-layout">
		<div class="scene-wrap">
			<div class="scene">
				<svelte:boundary
					onerror={(error) => sceneError(error instanceof Error ? error.message : String(error))}
				>
					{#if sceneMounted}
						<ThrelteCanvas onerror={sceneError}>
							<ThrelteScene
								snapshot={latest}
								view={latest.view}
								onplaying={(value) => (playing = value)}
								onready={() => (status = 'ready')}
								onerror={sceneError}
								bind:controller
							/>
						</ThrelteCanvas>
					{/if}
					{#snippet failed(error, reset)}
						<div class="scene-message" role="status">
							<h3>3D view unavailable.</h3>
							<p>
								{message ||
									(error instanceof Error ? error.message : String(error)) ||
									'The article remains available.'}
							</p>
							<button onclick={() => retry(reset)}>Try again</button>
						</div>
					{/snippet}
				</svelte:boundary>
			</div>
			{#if status !== 'ready'}<div class="scene-message" role="status">
					<h3>{status === 'loading' ? 'Preparing the scene…' : 'A quiet pause.'}</h3>
					<p>{status === 'loading' ? 'Your reading position is saved.' : message}</p>
					{#if status === 'error'}<button onclick={load}>Try again</button>{/if}
				</div>{/if}
			<p class="gesture-hint">Drag to orbit · Scroll or pinch to zoom</p>
		</div>
		<aside class="scene-controls">
			<p class="explore-kicker">LOOK CLOSER</p>
			<h3>One path. <br />Three perspectives.</h3>
			<p>
				The motion stays in a plane. Turning the camera changes your view, not the underlying
				physics.
			</p>
			<fieldset disabled={status !== 'ready'}>
				<div class="scene-buttons">
					<button class="primary" aria-pressed={playing} onclick={() => controller?.play()}
						>{playing ? 'Pause' : 'Play'}</button
					><button onclick={reset}>Reset</button>
				</div>
				<RangeControl
					label="Playback speed"
					min={0.25}
					max={2}
					step={0.25}
					bind:value={speed}
					suffix="×"
					class="my-5 block [&_input]:mt-2 [&_input]:block [&_input]:w-full"
					oninput={() => controller?.speed(speed)}
				/>
				<ToggleControl
					label="Show orbit"
					bind:checked={trails}
					class="my-5"
					onchange={() => controller?.trails(trails)}
				/>
				<SegmentedControl
					label="Camera"
					options={[
						{ value: 'perspective', label: 'Perspective' },
						{ value: 'top', label: 'Top view' }
					]}
					bind:value={cameraPreset}
					class="my-5"
					onchange={() => controller?.view(cameraPreset === 'top')}
				/>
				<div class="zoom-controls">
					<button aria-label="Zoom in" onclick={() => controller?.zoom(0.85)}>+</button><button
						aria-label="Zoom out"
						onclick={() => controller?.zoom(1.15)}>−</button
					><button onclick={() => controller?.rotate()}>Rotate view</button>
				</div>
			</fieldset>
			<p class="scene-footnote">
				Equal masses · Numerical approximation<br />Camera and playback settings are kept when you
				return.
			</p>
		</aside>
	</div>
	<div class="explore-bottom" role="status">
		{playing ? 'Playing' : 'Paused'} · {status === 'ready'
			? 'Ready to explore'
			: status === 'loading'
				? 'Preparing scene'
				: 'View unavailable'}
	</div>
</dialog>

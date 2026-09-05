<script lang="ts">
	import { onMount, tick } from 'svelte';
	import Explorer from './Explorer.svelte';
	import { INITIAL, integrate, STEP, type Snapshot, type CameraPosition } from './physics';
	import type { InteractiveConfig } from './config';
	import './interactive.css';
	let { config }: { config: InteractiveConfig } = $props();
	let canvas: HTMLCanvasElement;
	let entry = $state<HTMLButtonElement>();
	let simulation = INITIAL.slice();
	let speed = $state(1),
		playing = $state(false),
		exploring = $state(false),
		message = $state('Ready when you are');
	let view = $state<CameraPosition>();
	let snapshot = $state<Snapshot>({ state: INITIAL.slice(), speed: 1 });
	let frameId = 0,
		last = 0,
		accumulator = 0;
	let trails: [number, number][][] = [[], [], []];
	let draw = () => {};
	let savedScroll = 0;
	function pause() {
		playing = false;
		last = 0;
		cancelAnimationFrame(frameId);
	}
	function frame(now: number) {
		if (!playing) return;
		if (last) accumulator += Math.min((now - last) / 1000, 0.05) * speed;
		last = now;
		try {
			while (accumulator >= STEP) {
				simulation = integrate(simulation);
				accumulator -= STEP;
				trails.forEach((trail, i) => {
					trail.push([simulation[i * 4], simulation[i * 4 + 1]]);
					if (trail.length > 800) trail.shift();
				});
			}
		} catch (error) {
			message = (error as Error).message;
			pause();
			return;
		}
		draw();
		frameId = requestAnimationFrame(frame);
	}
	function play() {
		if (playing) {
			pause();
			message = 'Paused';
		} else {
			playing = true;
			message = 'Following the orbit';
			frameId = requestAnimationFrame(frame);
		}
	}
	function reset() {
		pause();
		simulation = INITIAL.slice();
		speed = 1;
		accumulator = 0;
		trails = [[], [], []];
		message = 'Ready when you are';
		draw();
	}
	function explore() {
		pause();
		savedScroll = scrollY;
		snapshot = { state: simulation.slice(), speed };
		exploring = true;
	}
	async function returnToReading(result: Snapshot & { view?: CameraPosition }) {
		simulation = result.state;
		speed = result.speed;
		view = result.view;
		exploring = false;
		message = 'Paused';
		trails = [[], [], []];
		await tick();
		draw();
		window.scrollTo({ top: savedScroll, behavior: 'instant' });
		entry?.focus({ preventScroll: true });
	}
	onMount(() => {
		const context = canvas.getContext('2d');
		if (!context) {
			message = 'Canvas is unavailable. The article remains readable.';
			return;
		}
		draw = () => {
			const { width, height } = canvas.getBoundingClientRect();
			if (!width || !height) return;
			const ratio = Math.min(devicePixelRatio, 2);
			canvas.width = Math.round(width * ratio);
			canvas.height = Math.round(height * ratio);
			context.setTransform(ratio, 0, 0, ratio, 0, 0);
			const css = getComputedStyle(document.documentElement),
				scale = Math.min(width / 2.9, height / 1.7);
			context.clearRect(0, 0, width, height);
			context.strokeStyle = css.getPropertyValue('--line');
			context.lineWidth = 1;
			context.setLineDash([3, 6]);
			context.beginPath();
			context.moveTo(16, height / 2);
			context.lineTo(width - 16, height / 2);
			context.moveTo(width / 2, 16);
			context.lineTo(width / 2, height - 16);
			context.stroke();
			context.setLineDash([]);
			for (let i = 0; i < 3; i++) {
				const color = css
					.getPropertyValue(['--trail-one', '--trail-two', '--trail-three'][i])
					.trim();
				context.strokeStyle = color;
				context.lineWidth = 1.3;
				context.globalAlpha = 0.55;
				context.beginPath();
				trails[i].forEach(([x, y], index) => {
					if (index) context.lineTo(width / 2 + x * scale, height / 2 - y * scale);
					else context.moveTo(width / 2 + x * scale, height / 2 - y * scale);
				});
				context.stroke();
				context.globalAlpha = 1;
				context.fillStyle = color;
				context.beginPath();
				context.arc(
					width / 2 + simulation[i * 4] * scale,
					height / 2 - simulation[i * 4 + 1] * scale,
					6,
					0,
					2 * Math.PI
				);
				context.fill();
				context.strokeStyle = css.getPropertyValue('--panel');
				context.lineWidth = 2;
				context.stroke();
			}
		};
		const resize = new ResizeObserver(draw);
		resize.observe(canvas);
		const theme = new MutationObserver(draw);
		theme.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
		const hidden = () => {
			if (document.hidden) {
				pause();
				message = 'Paused';
			}
		};
		document.addEventListener('visibilitychange', hidden);
		draw();
		return () => {
			pause();
			resize.disconnect();
			theme.disconnect();
			document.removeEventListener('visibilitychange', hidden);
		};
	});
</script>

<figure class="experiment" aria-label="The figure-eight orbit">
	<div class="figure-top">
		<span>The figure-eight orbit</span><span class="figure-sub">Equal masses · Planar model</span>
	</div>
	<canvas bind:this={canvas} aria-label="A numerical figure-eight orbit of three equal masses"
		>Three equal masses follow a shared figure-eight path.</canvas
	>
	<div class="legend">
		<span><i class="one"></i>Body I</span><span><i class="two"></i>Body II</span><span
			><i class="three"></i>Body III</span
		>
	</div>
	{#if config.explore}<button class="enter-explore" bind:this={entry} onclick={explore}
			>Explore in 3D</button
		>{/if}
	<div class="experiment-controls">
		{#if config.controls.includes('play')}<button
				class="primary"
				aria-pressed={playing}
				onclick={play}>{playing ? 'Pause' : 'Play'}</button
			>{/if}
		{#if config.controls.includes('reset')}<button onclick={reset}>Reset</button>{/if}
		{#if config.controls.includes('speed')}<label
				>Speed <input type="range" min="0.25" max="2" step="0.25" bind:value={speed} /><output
					>{speed}×</output
				></label
			>{/if}
	</div>
	<figcaption>
		<span role="status">{message}</span><span>Numerical approximation · 2D</span>
	</figcaption>
</figure>
{#if exploring}<Explorer {snapshot} {view} onclose={returnToReading} />{/if}

<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { T, useTask } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import * as THREE from 'three';
	import type { OrbitControls as OrbitControlsInstance } from 'three/examples/jsm/controls/OrbitControls.js';
	import {
		INITIAL,
		integrate,
		orbitPoints,
		STEP,
		type CameraPosition,
		type Snapshot
	} from './physics';

	export type ThrelteSceneController = {
		play: () => void;
		speed: (value: number) => void;
		trails: (value: boolean) => void;
		view: (top: boolean) => void;
		zoom: (factor: number) => void;
		rotate: () => void;
		reset: () => void;
		dispose: () => Snapshot & { view?: CameraPosition };
	};

	let {
		snapshot,
		view,
		onplaying,
		onerror,
		controller = $bindable<ThrelteSceneController | undefined>()
	}: {
		snapshot: Snapshot;
		view?: CameraPosition;
		onplaying: (value: boolean) => void;
		onerror: (message: string) => void;
		controller?: ThrelteSceneController;
	} = $props();

	let simulation: number[] = $state([]);
	let playbackSpeed: number = $state(1);
	let playing: boolean = $state(false);
	let showTrails: boolean = $state(true);
	let camera: THREE.PerspectiveCamera | undefined = $state();
	let controls: OrbitControlsInstance | undefined = $state();
	let bodies: THREE.Mesh[] = [];
	let accumulator = 0;
	let disposed = false;
	let trailColor = $state('#656d65');
	let bodyColors = $state(['#a94734', '#71896d', '#b99b58']);
	const trailPoints = orbitPoints().map(([x, y]) => new THREE.Vector3(x, 0, y));

	function updateBodies() {
		bodies.forEach((body, index) => {
			body.position.set(simulation[index * 4], 0, simulation[index * 4 + 1]);
		});
	}

	function syncTheme() {
		const css = getComputedStyle(document.documentElement);
		trailColor = css.getPropertyValue('--muted').trim() || trailColor;
		bodyColors = ['--trail-one', '--trail-two', '--trail-three'].map(
			(key, index) => css.getPropertyValue(key).trim() || bodyColors[index]
		);
	}

	function play() {
		playing = !playing;
		onplaying(playing);
	}

	function reset() {
		playing = false;
		onplaying(false);
		simulation = INITIAL.slice();
		playbackSpeed = 1;
		accumulator = 0;
		if (camera) camera.position.set(0, 2.5, 3.1);
		controls?.update();
		updateBodies();
	}

	function dispose() {
		playing = false;
		onplaying(false);
		disposed = true;
		return {
			state: simulation.slice(),
			speed: playbackSpeed,
			view: camera?.position.toArray() as CameraPosition | undefined
		};
	}

	controller = {
		play,
		speed: (value) => (playbackSpeed = value),
		trails: (value) => (showTrails = value),
		view: (top) => {
			camera?.position.set(0, top ? 3.7 : 2.5, top ? 0.001 : 3.1);
			controls?.update();
		},
		zoom: (factor) => {
			camera?.position.multiplyScalar(factor).clampLength(1.6, 8);
			controls?.update();
		},
		rotate: () => {
			camera?.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 8);
			controls?.update();
		},
		reset,
		dispose
	};

	useTask((delta) => {
		if (!playing || disposed) return;
		accumulator += Math.min(delta, 0.05) * playbackSpeed;
		try {
			while (accumulator >= STEP) {
				simulation = integrate(simulation);
				accumulator -= STEP;
			}
			updateBodies();
		} catch (error) {
			playing = false;
			onplaying(false);
			onerror((error as Error).message);
		}
	});

	onMount(() => {
		simulation = snapshot.state.slice();
		playbackSpeed = snapshot.speed;
		syncTheme();
		const theme = new MutationObserver(syncTheme);
		theme.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
		return () => theme.disconnect();
	});

	onDestroy(() => {
		disposed = true;
		onplaying(false);
	});
</script>

<T.PerspectiveCamera
	bind:ref={camera}
	makeDefault
	position={view ?? [0, 2.5, 3.1]}
	fov={40}
	near={0.01}
	far={100}
>
	<OrbitControls
		bind:ref={controls}
		enableDamping
		enablePan={false}
		minDistance={1.6}
		maxDistance={8}
	/>
</T.PerspectiveCamera>

<T.AmbientLight intensity={2} />
<T.DirectionalLight position={[-2, 4, 3]} intensity={3} />
<T.GridHelper args={[3, 12]} position={[0, -0.075, 0]} />
<T.LineLoop args={[new THREE.BufferGeometry().setFromPoints(trailPoints)]} visible={showTrails}>
	<T.LineBasicMaterial color={trailColor} transparent opacity={0.65} />
</T.LineLoop>

{#each bodyColors as color, index (index)}
	<T.Mesh
		oncreate={(ref) => {
			bodies[index] = ref;
			updateBodies();
		}}
	>
		<T.SphereGeometry args={[0.052, 32, 24]} />
		<T.MeshStandardMaterial {color} roughness={0.65} />
	</T.Mesh>
{/each}

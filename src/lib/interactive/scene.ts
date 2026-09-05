import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
	INITIAL,
	integrate,
	orbitPoints,
	STEP,
	type Snapshot,
	type CameraPosition
} from './physics';

export function createScene(
	container: HTMLElement,
	snapshot: Snapshot,
	savedView: CameraPosition | undefined,
	onPlaying: (value: boolean) => void,
	onError: (message: string) => void
) {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(40, 1, 0.01, 100);
	const horizontalFov = THREE.MathUtils.degToRad(40);
	camera.position.fromArray(savedView ?? [0, 2.5, 3.1]);
	const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
	container.append(renderer.domElement);
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enablePan = false;
	controls.minDistance = 1.6;
	controls.maxDistance = 8;
	let state = snapshot.state.slice(),
		speed = snapshot.speed;
	let playing = false,
		frameId = 0,
		last = 0,
		accumulator = 0,
		disposed = false;
	const geometry = new THREE.SphereGeometry(0.052, 32, 24);
	const materials = [0, 1, 2].map(() => new THREE.MeshStandardMaterial({ roughness: 0.65 }));
	const bodies = materials.map((material) => {
		const body = new THREE.Mesh(geometry, material);
		scene.add(body);
		return body;
	});
	scene.add(new THREE.AmbientLight(0xffffff, 2));
	const light = new THREE.DirectionalLight(0xffffff, 3);
	light.position.set(-2, 4, 3);
	scene.add(light);
	const trailGeometry = new THREE.BufferGeometry().setFromPoints(
		orbitPoints().map(([x, y]) => new THREE.Vector3(x, 0, y))
	);
	const trailMaterial = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.65 });
	const trail = new THREE.LineLoop(trailGeometry, trailMaterial);
	scene.add(trail);
	const grid = new THREE.GridHelper(3, 12);
	grid.material.transparent = true;
	grid.material.opacity = 0.12;
	grid.position.y = -0.075;
	scene.add(grid);
	function draw() {
		if (disposed) return;
		bodies.forEach((body, i) => body.position.set(state[i * 4], 0, state[i * 4 + 1]));
		renderer.render(scene, camera);
	}
	function theme() {
		const css = getComputedStyle(document.documentElement);
		['--trail-one', '--trail-two', '--trail-three'].forEach((key, i) =>
			materials[i].color.set(css.getPropertyValue(key).trim())
		);
		trailMaterial.color.set(css.getPropertyValue('--muted').trim());
		grid.material.color.copy(trailMaterial.color);
		draw();
	}
	function resize() {
		const { width, height } = container.getBoundingClientRect();
		if (!width || !height) return;
		camera.aspect = width / height;
		camera.fov = Math.max(
			40,
			THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(horizontalFov / 2) / camera.aspect))
		);
		camera.updateProjectionMatrix();
		renderer.setSize(width, height);
		draw();
	}
	function pause() {
		playing = false;
		cancelAnimationFrame(frameId);
		last = 0;
		onPlaying(false);
	}
	function frame(now: number) {
		if (!playing || disposed) return;
		if (last) accumulator += Math.min((now - last) / 1000, 0.05) * speed;
		last = now;
		try {
			while (accumulator >= STEP) {
				state = integrate(state);
				accumulator -= STEP;
			}
		} catch (error) {
			pause();
			onError((error as Error).message);
			return;
		}
		draw();
		frameId = requestAnimationFrame(frame);
	}
	const observer = new ResizeObserver(resize);
	observer.observe(container);
	const themeObserver = new MutationObserver(theme);
	themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
	const hidden = () => {
		if (document.hidden) pause();
	};
	const lost = (event: Event) => {
		event.preventDefault();
		pause();
		onError('The 3D view is unavailable. Please try again.');
	};
	document.addEventListener('visibilitychange', hidden);
	renderer.domElement.addEventListener('webglcontextlost', lost);
	controls.addEventListener('change', draw);
	controls.update();
	theme();
	resize();
	return {
		play() {
			if (playing) pause();
			else {
				playing = true;
				last = 0;
				onPlaying(true);
				frameId = requestAnimationFrame(frame);
			}
		},
		speed(value: number) {
			speed = value;
		},
		trails(value: boolean) {
			trail.visible = value;
			draw();
		},
		view(top: boolean) {
			camera.position.set(0, top ? 3.7 : 2.5, top ? 0.001 : 3.1);
			controls.update();
			draw();
		},
		zoom(factor: number) {
			camera.position.multiplyScalar(factor).clampLength(1.6, 8);
			controls.update();
			draw();
		},
		rotate() {
			camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 8);
			controls.update();
			draw();
		},
		reset() {
			pause();
			state = INITIAL.slice();
			speed = 1;
			accumulator = 0;
			camera.position.set(0, 2.5, 3.1);
			trail.visible = true;
			controls.update();
			draw();
		},
		dispose() {
			const result = {
				state: state.slice(),
				speed,
				view: camera.position.toArray() as CameraPosition
			};
			if (disposed) return result;
			pause();
			disposed = true;
			observer.disconnect();
			themeObserver.disconnect();
			document.removeEventListener('visibilitychange', hidden);
			renderer.domElement.removeEventListener('webglcontextlost', lost);
			controls.dispose();
			geometry.dispose();
			materials.forEach((material) => material.dispose());
			trailGeometry.dispose();
			trailMaterial.dispose();
			grid.geometry.dispose();
			grid.material.dispose();
			renderer.dispose();
			renderer.domElement.remove();
			return result;
		}
	};
}
export type SceneController = ReturnType<typeof createScene>;

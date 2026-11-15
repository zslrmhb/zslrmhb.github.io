type Rect = { x: number; y: number; width: number; height: number };
type Scene = { images: HTMLCanvasElement; anchors: Rect[]; photo: Rect };

function canvasLayer(width: number, height: number) {
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('Canvas unavailable');
	return { canvas, ctx };
}

type Particle = {
	tile: Rect;
	landed: boolean;
	arrival: number;
	startX: number;
	startY: number;
	delay: number;
	bend: number;
	color: string;
};

const paper = '#fff';
const ink = '#242421';
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const ease = (n: number) => n * n * (3 - 2 * n);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

// Prepare a grayscale copy in the same coordinates as the original photograph.
function monochrome(source: HTMLCanvasElement) {
	const { canvas, ctx } = canvasLayer(source.width, source.height);
	ctx.drawImage(source, 0, 0);
	const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const { data } = image;
	for (let i = 0; i < data.length; i += 4) {
		const gray = Math.round(0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]);
		data[i] = data[i + 1] = data[i + 2] = gray;
	}
	ctx.putImageData(image, 0, 0);
	return canvas;
}

// Sample only the photo layer. Titles and other text never become particles.
function sampleParticles(scene: Scene): { particles: Particle[]; size: number } {
	const { width, height } = scene.images;
	const left = Math.max(0, Math.floor(scene.photo.x));
	const top = Math.max(0, Math.floor(scene.photo.y));
	const right = Math.min(width, Math.ceil(scene.photo.x + scene.photo.width));
	const bottom = Math.min(height, Math.ceil(scene.photo.y + scene.photo.height));
	const photoWidth = right - left;
	const photoHeight = bottom - top;
	const budget = width <= 600 ? 225 : 520;
	const size = Math.max(7, Math.ceil(Math.sqrt((photoWidth * photoHeight) / budget)));
	if (photoWidth <= 0 || photoHeight <= 0) return { particles: [], size: 5 };
	const columns = Math.ceil(photoWidth / size);
	const rows = Math.ceil(photoHeight / size);
	const { ctx } = canvasLayer(columns, rows);
	ctx.drawImage(scene.images, left, top, photoWidth, photoHeight, 0, 0, columns, rows);
	const pixels = ctx.getImageData(0, 0, columns, rows).data;
	const particles: Particle[] = [];
	let seed = 17;
	const random = () => {
		seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
		return seed / 4294967296;
	};
	for (let row = 0; row < rows; row++) {
		for (let column = 0; column < columns; column++) {
			const index = (row * columns + column) * 4;
			const x = left + Math.floor((column * photoWidth) / columns);
			const y = top + Math.floor((row * photoHeight) / rows);
			const tile = {
				x,
				y,
				width: left + Math.floor(((column + 1) * photoWidth) / columns) - x,
				height: top + Math.floor(((row + 1) * photoHeight) / rows) - y
			};
			const side = particles.length % 4;
			const along = random();
			const overshoot = 8 + random() * 42;
			particles.push({
				tile,
				landed: false,
				arrival: 0.54 + random() * 0.46,
				startX: side < 2 ? (side === 0 ? -overshoot : width + overshoot) : along * width,
				startY: side < 2 ? along * height : side === 2 ? -overshoot : height + overshoot,
				delay: random() * 0.16,
				bend: (random() - 0.5) * 64,
				color: `rgb(${pixels[index]},${pixels[index + 1]},${pixels[index + 2]})`
			});
		}
	}
	return { particles, size };
}

export function playEntrance() {
	const root = document.documentElement;
	if (root.dataset.entrance !== 'pending') return;
	const overlay = document.querySelector<HTMLElement>('.page-entrance');
	const canvas = overlay?.querySelector('canvas');
	const ctx = canvas?.getContext('2d');
	const status = overlay?.querySelector('.entrance-status');
	const motion = matchMedia('(prefers-reduced-motion: reduce)');
	if (!canvas || !ctx || !overlay || motion.matches || document.hidden || innerHeight < 300) {
		delete root.dataset.entrance;
		return;
	}

	const width = innerWidth;
	const height = innerHeight;
	const ratio = Math.min(devicePixelRatio || 1, 1.5);
	canvas.width = Math.round(width * ratio);
	canvas.height = Math.round(height * ratio);
	ctx.scale(ratio, ratio);
	const lifetime = new AbortController();
	const signal = lifetime.signal;
	const options = { signal, passive: true };
	let frame = 0;
	const heroImage = document.querySelector<HTMLImageElement>('.world-photo-link img');
	let timeout: ReturnType<typeof setTimeout> | undefined;

	function finish(event?: Event) {
		cancelAnimationFrame(frame);
		clearTimeout(timeout);
		lifetime.abort();
		delete root.dataset.entrance;
		heroImage?.removeAttribute('data-entrance-hero');
		const target = event?.target;
		if (target instanceof Element && target.closest('.entrance-skip')) {
			const main = document.querySelector('main');
			main?.setAttribute('tabindex', '-1');
			main?.focus({ preventScroll: true });
		}
	}

	async function prepare<T>(work: Promise<T>) {
		timeout = setTimeout(finish, 6200);
		try {
			return await work;
		} finally {
			clearTimeout(timeout);
		}
	}

	function animate(duration: number, draw: (elapsed: number) => void) {
		return new Promise<void>((resolve) => {
			const start = performance.now();
			function tick(now: number) {
				if (signal.aborted) return;
				const time = Math.min(duration, now - start);
				draw(time);
				if (time === duration) resolve();
				else frame = requestAnimationFrame(tick);
			}
			frame = requestAnimationFrame(tick);
		});
	}

	function drawOpening(scene: Scene, gray: HTMLCanvasElement, elapsed: number) {
		if (!ctx) return;
		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = paper;
		ctx.fillRect(0, 0, width, height);
		const x = width / 2;
		const y = height / 2;
		if (elapsed < 210) return;
		ctx.fillStyle = ink;
		if (elapsed < 1560) {
			const stretch = ease(clamp((elapsed - 850) / 570));
			const length = mix(5, width * 0.62, stretch);
			const thickness = mix(5, 1.5, stretch);
			ctx.beginPath();
			ctx.roundRect(x - length / 2, y - thickness / 2, length, thickness, thickness / 2);
			ctx.fill();
			return;
		}
		const branch = ease(clamp((elapsed - 1560) / 840));
		const plane = ease(clamp((elapsed - 2540) / 790));
		ctx.save();
		ctx.beginPath();
		for (const anchor of scene.anchors) {
			const left = mix(x - width * 0.31, anchor.x - 3, branch);
			const centerY = mix(y, anchor.y + anchor.height / 2, branch);
			const w = mix(width * 0.62, anchor.width + 6, branch);
			const h = mix(1.5, anchor.height + 10, plane);
			ctx.rect(left, centerY - h / 2, w, h);
			if (plane > 0) ctx.clearRect(left, centerY - h / 2, w, h);
			ctx.globalAlpha = (1 - plane) / Math.max(1, (1 - branch) * scene.anchors.length);
			ctx.fillRect(left, centerY - 0.75, w, 1.5);
		}
		ctx.globalAlpha = 1;
		ctx.clip();
		ctx.drawImage(gray, 0, 0);
		ctx.restore();
	}

	function clearCanvas() {
		if (!ctx) return;
		ctx.globalAlpha = 1;
		ctx.clearRect(0, 0, width, height);
	}

	function layer(bitmap: HTMLCanvasElement, alpha = 1) {
		if (!ctx || alpha <= 0) return;
		ctx.globalAlpha = alpha;
		ctx.drawImage(bitmap, 0, 0);
	}

	function drawParticle(color: string, x: number, y: number, radius: number, alpha: number) {
		if (!ctx || alpha <= 0) return;
		ctx.globalAlpha = alpha;
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI * 2);
		ctx.fill();
	}

	function gather(scene: Scene, gray: HTMLCanvasElement) {
		const { particles, size } = sampleParticles(scene);
		const mask = canvasLayer(width, height);
		const color = canvasLayer(width, height);
		const radius = width <= 600 ? 1.15 : 1.65;
		let maskChanged = false;
		const duration =
			2150 * particles.reduce((last, particle) => Math.max(last, particle.arrival), 0);
		root.dataset.entrance = 'home';
		return animate(duration, (elapsed) => {
			if (!ctx) return;
			clearCanvas();
			const phase = elapsed / 2150;
			ctx.fillStyle = paper;
			ctx.globalAlpha = 1 - ease(clamp(phase / 0.32));
			ctx.fillRect(0, 0, width, height);
			for (const particle of particles) {
				if (particle.landed || elapsed < particle.arrival * 2150) continue;
				particle.landed = true;
				const { x, y, width, height } = particle.tile;
				const centerX = x + width / 2;
				const centerY = y + height / 2;
				// The opaque center covers its cell. The fringe blends into neighboring landings.
				const core = Math.hypot(width, height) / 2 + 0.75;
				const edge = core + size * 0.45;
				const brush = mask.ctx.createRadialGradient(centerX, centerY, core, centerX, centerY, edge);
				brush.addColorStop(0, '#fff');
				brush.addColorStop(1, '#fff0');
				mask.ctx.fillStyle = brush;
				mask.ctx.fillRect(centerX - edge, centerY - edge, edge * 2, edge * 2);
				maskChanged = true;
			}
			if (maskChanged) {
				color.ctx.globalCompositeOperation = 'copy';
				color.ctx.drawImage(scene.images, 0, 0);
				color.ctx.globalCompositeOperation = 'destination-in';
				color.ctx.drawImage(mask.canvas, 0, 0);
				maskChanged = false;
			}
			layer(gray);
			layer(color.canvas);
			for (const particle of particles) {
				if (particle.landed) continue;
				const flight = clamp((phase - particle.delay) / (particle.arrival - particle.delay));
				if (!flight) continue;
				const { tile } = particle;
				const step = ease(flight);
				drawParticle(
					particle.color,
					mix(particle.startX, tile.x + tile.width / 2, step),
					mix(particle.startY, tile.y + tile.height / 2, step) +
						Math.sin(step * Math.PI) * particle.bend,
					mix(radius * 0.6, radius, step),
					0.46 + step * 0.38
				);
			}
		});
	}

	async function run() {
		if (!heroImage) return finish();
		try {
			sessionStorage.setItem('folio:entrance-seen', '1');
		} catch {
			// Storage may be disabled.
		}
		await prepare(heroImage.decode());
		if (signal.aborted) return;
		const elements = document.querySelectorAll(
			'.site-nav, .living-cover h1, .living-cover p, .living-cover a span, .living-cover .cover-work, .world-photo-link img'
		);
		const anchors = [...elements]
			.map((element) => {
				const { left, top, width, height } = element.getBoundingClientRect();
				return { x: left, y: top, width, height };
			})
			.filter((rect) => rect.width && rect.height);
		const rect = heroImage.getBoundingClientRect();
		const raster = canvasLayer(width, height);
		raster.ctx.drawImage(heroImage, rect.left, rect.top, rect.width, rect.height);
		const home = {
			images: raster.canvas,
			anchors,
			photo: { x: rect.left, y: rect.top, width: rect.width, height: rect.height }
		};
		const grayHome = monochrome(home.images);
		heroImage.dataset.entranceHero = '';
		root.dataset.entrance = 'blank';
		if (status) status.textContent = 'Home';
		await animate(3460, (time) => {
			if (time >= 210 && root.dataset.entrance === 'blank') root.dataset.entrance = 'forming';
			drawOpening(home, grayHome, time);
		});
		await gather(home, grayHome);
		finish();
	}

	overlay.querySelector('.entrance-skip')?.addEventListener('click', finish, options);
	for (const event of ['wheel', 'scroll', 'pagehide', 'resize']) {
		window.addEventListener(event, finish, options);
	}
	window.addEventListener(
		'keydown',
		(event) => {
			if (event.key === 'Escape') finish();
		},
		options
	);
	window.addEventListener(
		'focusin',
		(event) => {
			if (event.target instanceof Element && !overlay.contains(event.target)) finish();
		},
		options
	);
	document.addEventListener(
		'visibilitychange',
		() => {
			if (document.hidden) finish();
		},
		options
	);
	motion.addEventListener('change', finish, options);
	void run().catch(() => finish());
	return finish;
}

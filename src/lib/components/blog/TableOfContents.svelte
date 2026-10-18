<script lang="ts">
	import { onMount } from 'svelte';
	import { isTerminalHeading, numberHeadings, type TocHeading } from '$lib/blog/toc';

	let { title = 'This note' }: { title?: string } = $props();
	let headings = $state<TocHeading[]>([]);
	let active = $state('');
	let mobileOpen = $state(false);
	let markNodes: HTMLElement[] = [];
	let pointerY: number | null = null;
	let proximityFrame = 0;

	function headingId(element: HTMLElement) {
		if (element.id) return element.id;
		const id = (element.textContent ?? '')
			.toLowerCase()
			.trim()
			.replace(/[^\p{L}\p{N}]+/gu, '-')
			.replace(/^-|-$/g, '');
		if (id) element.id = id;
		return id;
	}

	function activate(id: string) {
		active = id;
	}

	function registerMark(node: HTMLElement, index: number) {
		markNodes[index] = node;
		return {
			destroy() {
				if (markNodes[index] === node) delete markNodes[index];
			}
		};
	}

	function scheduleProximity() {
		if (proximityFrame) return;
		proximityFrame = requestAnimationFrame(() => {
			proximityFrame = 0;
			if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
				markNodes.forEach((mark) => mark.style.removeProperty('--toc-wave'));
				return;
			}
			const centers = markNodes.map((mark) => {
				const rect = mark.getBoundingClientRect();
				return rect.top + rect.height / 2;
			});
			const strengths = centers.map((center) =>
				pointerY === null ? 0 : Math.exp(-Math.abs(pointerY - center) / 54)
			);
			markNodes.forEach((mark, index) => {
				mark.style.setProperty('--toc-wave', String(1 + strengths[index] * 0.75));
			});
		});
	}

	function handlePointerMove(event: PointerEvent) {
		if (event.pointerType !== 'mouse') return;
		pointerY = event.clientY;
		scheduleProximity();
	}

	function handlePointerLeave() {
		pointerY = null;
		scheduleProximity();
	}

	onMount(() => {
		const elements = Array.from(
			document.querySelectorAll<HTMLElement>('.markdown h2, .markdown h3')
		);
		const headingData = elements.map((element) => {
			const text = element.textContent?.trim() || '';
			return {
				id: headingId(element),
				text,
				level: element.tagName === 'H3' ? (3 as const) : (2 as const)
			};
		});
		headings = numberHeadings(headingData);

		let frame = 0;
		const update = () => {
			frame = 0;
			let next = headings[0]?.id ?? '';
			for (const element of elements) {
				if (element.getBoundingClientRect().top <= innerHeight * 0.24) next = headingId(element);
				else break;
			}
			if (scrollY + innerHeight >= document.documentElement.scrollHeight - 8)
				next = headings.at(-1)?.id ?? next;
			active = next;
		};
		const schedule = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		update();
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule, { passive: true });
		window.addEventListener('hashchange', schedule);
		window.addEventListener('resize', scheduleProximity, { passive: true });
		return () => {
			cancelAnimationFrame(frame);
			cancelAnimationFrame(proximityFrame);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			window.removeEventListener('hashchange', schedule);
			window.removeEventListener('resize', scheduleProximity);
		};
	});
</script>

<aside class="article-toc" aria-label="On this page">
	<span
		class="toc-rail"
		aria-hidden="true"
		onpointermove={handlePointerMove}
		onpointerleave={handlePointerLeave}
	>
		<span class="toc-rail-marks" aria-hidden="true">
			{#each headings as heading, index (heading.id)}
				<i use:registerMark={index} class:active-mark={active === heading.id}></i>
			{/each}
		</span>
	</span>

	<nav class="toc-panel" aria-label={`Contents for ${title}`}>
		<a class="toc-title" href="#main">{title}</a>
		<ol>
			{#each headings as heading (heading.id)}
				<li class:subsection={heading.level === 3} class:terminal={isTerminalHeading(heading.text)}>
					<a
						href={`#${heading.id}`}
						aria-current={active === heading.id ? 'location' : undefined}
						onclick={() => activate(heading.id)}
					>
						{#if heading.number}<span>{heading.number}</span>{/if}{heading.text}
					</a>
				</li>
			{/each}
		</ol>
	</nav>

	<details class="mobile-toc" bind:open={mobileOpen}>
		<summary
			>On this page <span>{headings.find((heading) => heading.id === active)?.text}</span></summary
		>
		<ol>
			{#each headings as heading (heading.id)}
				<li class:subsection={heading.level === 3} class:terminal={isTerminalHeading(heading.text)}>
					<a
						href={`#${heading.id}`}
						aria-current={active === heading.id ? 'location' : undefined}
						onclick={() => {
							activate(heading.id);
							mobileOpen = false;
						}}
					>
						{#if heading.number}<span>{heading.number}</span>{/if}{heading.text}
					</a>
				</li>
			{/each}
		</ol>
	</details>
</aside>

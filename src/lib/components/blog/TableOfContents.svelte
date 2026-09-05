<script lang="ts">
	import { onMount } from 'svelte';
	let headings = $state<{ id: string; text: string; level: 2 | 3 }[]>([]);
	let active = $state('');
	let expanded = $state(true);
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
	onMount(() => {
		expanded = !matchMedia('(max-width:760px)').matches;
		const elements = Array.from(
			document.querySelectorAll<HTMLElement>('.markdown h2, .markdown h3')
		);
		headings = elements.map((element) => ({
			id: headingId(element),
			text: element.textContent?.trim() || '',
			level: element.tagName === 'H3' ? 3 : 2
		}));
		let frame = 0;
		const update = () => {
			frame = 0;
			let next = headings[0]?.id ?? '';
			for (const element of elements) {
				if (element.getBoundingClientRect().top <= innerHeight * 0.24) next = headingId(element);
				else break;
			}
			// The browser clamps the final anchor to the page bottom, so the last
			// heading may never reach the normal activation line.
			if (scrollY + innerHeight >= document.documentElement.scrollHeight - 8)
				next = headings.at(-1)?.id ?? next;
			active = next;
		};
		const scroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		update();
		window.addEventListener('scroll', scroll, { passive: true });
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', scroll);
		};
	});
</script>

<aside class="article-toc" aria-label="On this page">
	<details bind:open={expanded}>
		<summary>ON THIS PAGE</summary>
		<ol>
			{#each headings as heading, index (heading.id)}<li class:subsection={heading.level === 3}>
					<a href={`#${heading.id}`} aria-current={active === heading.id ? 'location' : undefined}
						><span>{String(index + 1).padStart(2, '0')}</span>{heading.text}</a
					>
				</li>{/each}
		</ol>
	</details>
</aside>

<script lang="ts">
	import { onMount } from 'svelte';

	let { title = 'This note' }: { title?: string } = $props();
	let headings = $state<{ id: string; text: string; level: 2 | 3; number?: string }[]>([]);
	let active = $state('');
	let mobileOpen = $state(false);

	function isTerminalHeading(text: string) {
		return /^(references|appendix)$/i.test(text.trim());
	}

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

	onMount(() => {
		const elements = Array.from(document.querySelectorAll<HTMLElement>('.markdown h2, .markdown h3'));
		let numberedHeadings = 0;
		headings = elements.map((element) => {
			const text = element.textContent?.trim() || '';
			return {
				id: headingId(element),
				text,
				level: element.tagName === 'H3' ? 3 : 2,
				number: isTerminalHeading(text) ? undefined : String(++numberedHeadings).padStart(2, '0')
			};
		});

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
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			window.removeEventListener('hashchange', schedule);
		};
	});
</script>

<aside class="article-toc" aria-label="On this page">
	<span class="toc-rail" aria-hidden="true">
		<span class="toc-rail-marks" aria-hidden="true">
			{#each headings as heading (heading.id)}
				<i class:active-mark={active === heading.id}></i>
			{/each}
		</span>
	</span>

	<nav class="toc-panel" aria-label={`Contents for ${title}`}>
		<div class="toc-panel-heading">
			<span>CONTENTS</span>
		</div>
		<a class="toc-title" href="#main">{title}</a>
		<ol>
			{#each headings as heading (heading.id)}
				<li class:subsection={heading.level === 3} class:terminal={isTerminalHeading(heading.text)}>
					<a href={`#${heading.id}`} aria-current={active === heading.id ? 'location' : undefined} onclick={() => activate(heading.id)}>
						{#if heading.number}<span>{heading.number}</span>{/if}{heading.text}
					</a>
				</li>
			{/each}
		</ol>
	</nav>

	<details class="mobile-toc" bind:open={mobileOpen}>
		<summary>CONTENTS <span>{headings.find((heading) => heading.id === active)?.text}</span></summary>
		<ol>
			{#each headings as heading (heading.id)}
				<li class:subsection={heading.level === 3} class:terminal={isTerminalHeading(heading.text)}>
					<a
						href={`#${heading.id}`}
						aria-current={active === heading.id ? 'location' : undefined}
						onclick={() => { activate(heading.id); mobileOpen = false; }}
					>
						{#if heading.number}<span>{heading.number}</span>{/if}{heading.text}
					</a>
				</li>
			{/each}
		</ol>
	</details>
</aside>

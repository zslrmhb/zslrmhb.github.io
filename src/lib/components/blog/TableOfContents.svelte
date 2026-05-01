<script lang="ts">
	import { browser } from '$app/environment';
	import Button from '$lib/components/ui/button/button.svelte';
	import { onDestroy, onMount, tick } from 'svelte';

	type Heading = {
		id: string;
		text: string;
		level: 2 | 3;
		element: HTMLElement;
	};

	let isOpen = false;
	let headings: Heading[] = [];
	let activeHeading = '';
	let panelEl: HTMLElement;
	let contentObserver: MutationObserver | undefined;
	let scrollRaf = 0;

	const headingSelector = '.markdown h2, .markdown h3';

	function slugify(value: string) {
		return value
			.toLowerCase()
			.trim()
			.replace(/['"]/g, '')
			.replace(/[^\p{Letter}\p{Number}\s-]/gu, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.replace(/^-|-$/g, '');
	}

	function ensureHeadingId(element: HTMLElement, text: string, seen: Map<string, number>) {
		const existing = element.id?.trim();
		if (existing) return existing;

		const base = slugify(text) || 'section';
		const count = seen.get(base) ?? 0;
		seen.set(base, count + 1);

		const id = count === 0 ? base : `${base}-${count + 1}`;
		element.id = id;
		return id;
	}

	function extractHeadings() {
		if (!browser) return;

		const seen = new Map<string, number>();
		const elements = Array.from(document.querySelectorAll(headingSelector));

		headings = elements
			.filter((element) => {
				const text = element.textContent?.trim();
				return Boolean(text) && !element.closest('nav, .toc-exclude');
			})
			.map((element) => {
				const htmlElement = element as HTMLElement;
				const text = htmlElement.textContent?.trim() || '';
				const level = Number(htmlElement.tagName.slice(1)) as 2 | 3;
				const id = ensureHeadingId(htmlElement, text, seen);

				return { id, text, level, element: htmlElement };
			});
	}

	function updateActiveHeading() {
		if (!browser || headings.length === 0) return;

		const readingLine = window.innerHeight * 0.24;
		let current = headings[0];

		for (const heading of headings) {
			const top = heading.element.getBoundingClientRect().top;
			if (top <= readingLine) current = heading;
			else break;
		}

		activeHeading = current?.id ?? '';
	}

	async function refreshHeadings() {
		await tick();
		extractHeadings();
		updateActiveHeading();
	}

	function scrollToHeading(id: string) {
		const element = document.getElementById(id);
		if (!element) return;

		const top = element.getBoundingClientRect().top + window.scrollY - 88;
		window.scrollTo({ top, behavior: 'smooth' });
		activeHeading = id;
	}

	function closeToc() {
		isOpen = false;
	}

	function handleDocumentClick(event: MouseEvent) {
		if (!isOpen || !(event.target instanceof Node)) return;
		if (panelEl?.contains(event.target)) return;

		closeToc();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') closeToc();
	}

	function handleScroll() {
		if (scrollRaf) return;

		scrollRaf = window.requestAnimationFrame(() => {
			scrollRaf = 0;
			updateActiveHeading();
		});
	}

	function headingClass(heading: Heading) {
		const hierarchy = heading.level === 3 ? 'pl-5 text-xs' : 'font-medium';
		const active =
			activeHeading === heading.id
				? 'border-l-foreground text-foreground'
				: 'border-l-transparent text-muted-foreground hover:text-foreground';

		return `block w-full border-l px-3 py-1.5 text-left text-sm leading-snug transition-colors ${hierarchy} ${active}`;
	}

	onMount(() => {
		refreshHeadings();

		contentObserver = new MutationObserver(refreshHeadings);
		const markdown = document.querySelector('.markdown');
		if (markdown) {
			contentObserver.observe(markdown, { childList: true, subtree: true });
		}

		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleScroll, { passive: true });
		document.addEventListener('click', handleDocumentClick, true);
		document.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		contentObserver?.disconnect();
		if (scrollRaf) window.cancelAnimationFrame(scrollRaf);

		if (browser) {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
			document.removeEventListener('click', handleDocumentClick, true);
			document.removeEventListener('keydown', handleKeydown);
		}
	});
</script>

{#if browser}
	<div bind:this={panelEl} class="toc-exclude fixed top-4 right-3 z-50 sm:right-5">
		<div class="flex flex-row-reverse items-start gap-2">
			<div
				class="flex h-[58px] w-max items-center rounded-2xl border p-2 backdrop-blur-md supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10"
			>
				<Button
					variant="ghost"
					size="icon"
					class="size-12 cursor-pointer rounded-full"
					onclick={() => (isOpen = !isOpen)}
					aria-controls="toc-panel"
					aria-expanded={isOpen}
					aria-label={isOpen ? 'Close table of contents' : 'Open table of contents'}
					title="Table of Contents"
				>
					<svg
						class="h-4 w-4 transition-transform duration-200 {isOpen ? 'rotate-90' : ''}"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</Button>
			</div>

			{#if isOpen}
				<aside
					id="toc-panel"
					class="max-h-[calc(100dvh-2rem)] w-[min(calc(100vw-5rem),22rem)] overflow-hidden rounded-md border border-border/80 bg-background/95 shadow-sm backdrop-blur"
					aria-label="Table of contents"
				>
					<div class="border-b border-border/70 px-4 py-3">
						<p class="text-xs font-medium text-muted-foreground uppercase">Contents</p>
					</div>

					{#if headings.length > 0}
						<nav class="max-h-[calc(100dvh-6rem)] overflow-y-auto py-2">
							<ul>
								{#each headings as heading (heading.id)}
									<li>
										<button
											type="button"
											data-id={heading.id}
											class={headingClass(heading)}
											onclick={() => scrollToHeading(heading.id)}
											title={heading.text}
										>
											<span class="line-clamp-2">{heading.text}</span>
										</button>
									</li>
								{/each}
							</ul>
						</nav>
					{:else}
						<p class="px-4 py-5 text-sm text-muted-foreground">No section headings found.</p>
					{/if}
				</aside>
			{/if}
		</div>
	</div>
{/if}

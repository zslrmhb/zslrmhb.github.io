<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Dock from '$lib/components/custom/Dock.svelte';
	import DockIcon from '$lib/components/custom/DockIcon.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	interface Heading {
		id: string;
		text: string;
		level: number;
		element: HTMLElement;
	}

	let isOpen = false;
	let headings: Heading[] = [];
	let activeHeading = '';
	let observer: IntersectionObserver;

	let iconEl: HTMLElement;
	let tocListEl: HTMLElement;
	let panelPos = { top: 0, left: 0, minWidth: 320 };

	function updatePanelPos() {
		if (!iconEl) return;
		const r = iconEl.getBoundingClientRect();
		// Measure current panel width if present; fall back to minWidth
		const panelEl = document.getElementById('toc-panel') as HTMLElement | null;
		const panelWidth = Math.max(panelEl?.offsetWidth || 0, panelPos.minWidth);

		// Place panel just **below** the icon (bottom of dock) and align its **right edge** to the icon's right edge
		const top = Math.round(window.scrollY + r.bottom + 8);
		let left = Math.round(window.scrollX + r.right - panelWidth);

		// Clamp horizontally into the viewport with small gutters
		const minLeft = window.scrollX + 8;
		const maxLeft = window.scrollX + window.innerWidth - panelWidth - 8;
		if (left < minLeft) left = minLeft;
		if (left > maxLeft) left = maxLeft;

		panelPos.top = top;
		panelPos.left = left;
	}

	// Toggle TOC visibility
	function toggleToc() {
		isOpen = !isOpen;
	}

	// Smooth scroll to heading
	function scrollToHeading(id: string) {
		const element = document.getElementById(id);
		if (!element) return;
		const rect = element.getBoundingClientRect();
		const y = window.scrollY + rect.top - 80; // offset for sticky UI
		window.scrollTo({ top: y, behavior: 'smooth' });
		// Removed isOpen = false to persist tooltip open
	}

	// Generate or get heading ID
	function getHeadingId(element: HTMLElement, text: string): string {
		if (element.id) return element.id;
		
		// Generate ID from text
		let id = text
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.replace(/\s+/g, '-')
			.trim();
		
		// Ensure uniqueness
		let counter = 1;
		let originalId = id;
		while (document.getElementById(id)) {
			id = `${originalId}-${counter}`;
			counter++;
		}
		
		element.id = id;
		return id;
	}

	// Extract headings from the page
	function extractHeadings() {
		if (!browser) return;
		setTimeout(() => {
			const root = (document.querySelector('.markdown') || document.querySelector('article') || document.body) as HTMLElement;
			const headingElements = root.querySelectorAll('h1, h2, h3, h4, h5, h6');
			headings = Array.from(headingElements)
				.filter((element) => {
					const isInNavOrExcluded = element.closest('nav') || element.closest('.toc-exclude');
					const hasContent = element.textContent?.trim();
					return !isInNavOrExcluded && hasContent;
				})
				.map((element) => {
					const htmlElement = element as HTMLElement;
					const text = htmlElement.textContent?.trim() || '';
					const level = parseInt(htmlElement.tagName.charAt(1));
					const id = getHeadingId(htmlElement, text);
					return { id, text, level, element: htmlElement };
				});
		}, 100);
	}

	// Set up intersection observer for active heading tracking
	function setupIntersectionObserver() {
		if (!browser || headings.length === 0) return;
		if (observer) observer.disconnect();
		observer = new IntersectionObserver(
			(entries) => {
				let top: { id: string; ratio: number } | null = null;
				for (const e of entries) {
					const id = (e.target as HTMLElement).id;
					if (!id) continue;
					const ratio = e.intersectionRatio;
					if (!top || ratio > top.ratio) top = { id, ratio };
				}
				if (top && top.id !== activeHeading) activeHeading = top.id;
			},
			{ root: null, rootMargin: '-80px 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
		);
		headings.forEach(({ element }) => observer.observe(element));
	}

	// Get indentation class based on heading level
	function getIndentClass(level: number): string {
		switch (level) {
			case 1: return 'pl-0';
			case 2: return 'pl-3';
			case 3: return 'pl-6';
			case 4: return 'pl-9';
			case 5: return 'pl-12';
			case 6: return 'pl-15';
			default: return 'pl-0';
		}
	}

	// Get font size class based on heading level
	function getFontSizeClass(level: number): string {
		switch (level) {
			case 1: return 'text-xs font-semibold';
			case 2: return 'text-xs font-medium';
			case 3: return 'text-xs';
			case 4: return 'text-xs opacity-90';
			case 5: return 'text-xs opacity-80';
			case 6: return 'text-xs opacity-70';
			default: return 'text-xs';
		}
	}

	onMount(() => {
		// Wait longer for content to render
		setTimeout(() => {
			extractHeadings();
			// Setup intersection observer after headings are extracted
			setTimeout(() => {
				setupIntersectionObserver();
			}, 200);
		}, 500);

		// Add scroll handler for better active heading detection
		let scrollTimeout: number;
		const handleScroll = () => {
			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(() => {
				if (headings.length > 0) {
					const scrollTop = window.scrollY + 100; // Add offset for better UX
					let activeId = '';

					// Find the last heading that's above the current scroll position
					for (let i = headings.length - 1; i >= 0; i--) {
						const heading = headings[i];
						const element = heading.element;
						const rect = element.getBoundingClientRect();
						const elementTop = rect.top + window.scrollY;
						
						if (elementTop <= scrollTop) {
							activeId = heading.id;
							break;
						}
					}

					// If no heading is found above, use the first one
					if (!activeId && headings.length > 0) {
						activeId = headings[0].id;
					}

					if (activeId && activeId !== activeHeading) {
						activeHeading = activeId;
					}
				}
			}, 50);
		};

		if (browser) {
			window.addEventListener('scroll', handleScroll, { passive: true });
		}

		// Re-extract headings on content changes
		const contentObserver = new MutationObserver(() => {
			setTimeout(() => {
				extractHeadings();
				setTimeout(() => {
					setupIntersectionObserver();
				}, 200);
			}, 300);
		});

		const targetNode = document.body;
		contentObserver.observe(targetNode, {
			childList: true,
			subtree: true
		});

		const reanchor = () => { if (isOpen) updatePanelPos(); };
		window.addEventListener('resize', reanchor);
		window.addEventListener('scroll', reanchor, { passive: true });

		return () => {
			contentObserver.disconnect();
			if (browser) {
				window.removeEventListener('scroll', handleScroll);
			}
			window.removeEventListener('resize', reanchor);
			window.removeEventListener('scroll', reanchor);
		};
	});

	onDestroy(() => {
		if (observer) {
			observer.disconnect();
		}
	});

	$: if (isOpen && tocListEl && activeHeading) {
		const el = tocListEl.querySelector(`[data-id="${activeHeading}"]`) as HTMLElement | null;
		if (el) el.scrollIntoView({ block: 'nearest' });
	}

	$: if (isOpen) {
		// recalc after DOM paints so actual width is known
		setTimeout(updatePanelPos, 0);
	}
</script>

<!-- TOC Dock positioned to align with content right edge -->
<Dock
	class="fixed top-4 z-40 flex justify-center px-4 translate-x-full right-[calc(55%-32rem)]"
	let:magnification
	let:distance
	let:mouseX
>
	<DockIcon {magnification} {mouseX} {distance}>
		<Button
			bind:this={iconEl}
			variant="ghost"
			size="icon"
			class="size-12 rounded-full cursor-pointer"
			onclick={() => { isOpen = !isOpen; if (isOpen) updatePanelPos(); }}
			aria-haspopup="dialog"
			aria-expanded={isOpen}
			aria-controls="toc-panel"
			title="Table of Contents"
		>
			<svg
				class="w-4 h-4 transition-transform duration-200 {isOpen ? 'rotate-90' : ''}"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</Button>
	</DockIcon>
</Dock>

<!-- TOC Panel -->
{#if isOpen}
	<div
		id="toc-panel"
		class="fixed z-50 mt-5 right-5 bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg overflow-hidden transition-transform duration-200 origin-top-right pointer-events-auto"
		style={`min-width:${panelPos.minWidth}px;`}
		role="dialog"
		aria-label="Table of contents"
	>
		<div class="px-4 py-3 border-b">
			<h3 class="text-sm font-semibold text-foreground">Table of Contents</h3>
		</div>
		<div class="overflow-y-auto max-h-80" bind:this={tocListEl}>
			{#if headings.length > 0}
				<nav class="p-2">
					<ul class="space-y-0.5">
						{#each headings as heading}
							<li>
								<Button
									data-id={heading.id}
									onclick={() => scrollToHeading(heading.id)}
									variant={activeHeading === heading.id ? 'secondary' : 'ghost'}
									size="sm"
									class="cursor-pointer w-full justify-start h-auto py-1.5 font-normal {getIndentClass(heading.level)} {getFontSizeClass(heading.level)} {activeHeading === heading.id ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'text-muted-foreground hover:text-foreground'}"
									title={heading.text}
								>
									<span class="block truncate text-left">{heading.text}</span>
								</Button>
							</li>
						{/each}
					</ul>
				</nav>
			{:else}
				<div class="p-4 text-center text-sm text-muted-foreground">No headings found</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	/* Custom scrollbar for TOC */
	.overflow-y-auto::-webkit-scrollbar {
		width: 4px;
	}
	
	.overflow-y-auto::-webkit-scrollbar-track {
		background: transparent;
	}
	
	.overflow-y-auto::-webkit-scrollbar-thumb {
		background: hsl(var(--muted-foreground) / 0.3);
		border-radius: 2px;
	}
	
	.overflow-y-auto::-webkit-scrollbar-thumb:hover {
		background: hsl(var(--muted-foreground) / 0.5);
	}
</style>

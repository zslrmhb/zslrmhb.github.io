<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import ModeToggle from '../portfolio/ModeToggle.svelte';
</script>

<nav
	class="toc-exclude fixed top-4 left-3 z-40 flex h-[58px] w-max items-center gap-2 rounded-2xl border p-2 backdrop-blur-md supports-backdrop-blur:bg-white/10 sm:left-[calc(55%-32rem)] sm:-translate-x-full supports-backdrop-blur:dark:bg-black/10"
	aria-label="Blog"
>
	<Tooltip.Provider>
		<Tooltip.Root delayDuration={100}>
			<Tooltip.Trigger>
				<Button href="/blog" variant="ghost" size="icon" class="size-12 rounded-full">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="m12 19-7-7 7-7" />
						<path d="M19 12H5" />
					</svg>
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content>Back to blog</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
	<Separator orientation="vertical" class="h-full py-2" />
	<Tooltip.Provider>
		<Tooltip.Root delayDuration={100}>
			<Tooltip.Trigger>
				<ModeToggle />
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>Theme</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
</nav>

<script lang="ts">
	import Dock from '$lib/components/custom/Dock.svelte';
	import DockIcon from '$lib/components/custom/DockIcon.svelte';
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import ModeToggle from '../portfolio/ModeToggle.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<Dock
		class="fixed top-4 z-40 flex justify-center px-4 -translate-x-full left-[calc(55%-32rem)]"
		let:magnification
		let:distance
		let:mouseX
	>
	<DockIcon {magnification} {mouseX} {distance}>
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
				<Tooltip.Content>
					Back to blog
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	</DockIcon>	
	<Separator orientation="vertical" class="h-full py-2" />
	<DockIcon {magnification} {mouseX} {distance}>
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
	</DockIcon>
</Dock>
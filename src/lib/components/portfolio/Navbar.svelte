<script lang="ts">
	import { PERSONAL_INFO } from '$lib/data/personal_info';
	import Dock from '$lib/components/custom/Dock.svelte';
	import DockIcon from '$lib/components/custom/DockIcon.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import ModeToggle from './ModeToggle.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { mode } from 'mode-watcher';

	export let variant: 'dock' | 'top' = 'dock';

	import { onMount } from 'svelte';
	let scrolled = false;

	onMount(() => {
		const onScroll = () => {
			scrolled = window.scrollY > 30;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	$: glass = scrolled
		? 'bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 ring-1 ring-border/60 shadow-[0_1px_2px_rgba(0,0,0,.06),0_8px_24px_-8px_rgba(0,0,0,.15)] dark:shadow-[inset_0_-40px_120px_-60px_rgba(255,255,255,.08)]'
		: 'bg-transparent backdrop-blur-0 ring-0 shadow-none';
</script>

{#if variant === 'dock'}
	<div
		class="pointer-events-none fixed inset-x-0 bottom-10 z-30 mx-auto mb-4 flex h-full max-h-14 origin-bottom"
	>
		<div
			class="fixed inset-x-0 bottom-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"
		></div>
		<Dock
			class="pointer-events-auto relative z-50 mx-auto flex h-full min-h-full transform-gpu items-center gap-0.5 rounded-full bg-background px-1 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] sm:gap-1 md:gap-2 dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)] "
			let:magnification
			let:distance
			let:mouseX
		>
			{#each PERSONAL_INFO.navbar as item}
				<DockIcon {magnification} {mouseX} {distance}>
					<Tooltip.Provider>
						<Tooltip.Root delayDuration={100}>
							<Tooltip.Trigger>
								<Button href={item.href} variant="ghost" size="icon" class="size-12 rounded-full">
									<svelte:component this={item.icon} class="size-[18px]" strokeWidth={1.5} />
								</Button>
							</Tooltip.Trigger>
							<Tooltip.Content>
								<p>{item.label}</p>
							</Tooltip.Content>
						</Tooltip.Root>
					</Tooltip.Provider>
				</DockIcon>
			{/each}
			<Separator orientation="vertical" class="h-full" />
			{#each Object.entries(PERSONAL_INFO.contact.social)
				.filter(([_, social]) => social.navbar)
				.map(([_, social]) => social) as social}
				<DockIcon {magnification} {mouseX} {distance}>
					<Tooltip.Provider>
						<Tooltip.Root delayDuration={100}>
							<Tooltip.Trigger>
								<Button href={social.url} variant="ghost" size="icon" class="size-12 rounded-full">
									{#if social?.dark_icon && mode.current === 'dark'}
										<img src={social?.dark_icon} class="size-4" alt={social.name} />
									{:else}
										<img src={social.icon} class="size-[18px]" alt={social.name} />
									{/if}
								</Button>
							</Tooltip.Trigger>
							<Tooltip.Content>
								<p>{social.name}</p>
							</Tooltip.Content>
						</Tooltip.Root>
					</Tooltip.Provider>
				</DockIcon>
			{/each}
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
	</div>
{:else}
	<!-- Top, centered, glassy navbar (agent-magicui style) -->
	<header class="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4">
		<nav
			class={`pointer-events-auto inline-flex items-center gap-2 rounded-full px-2 py-3 transition-[background-color,backdrop-filter,box-shadow,transform] duration-300 ${glass}`}
			aria-label="Primary"
		>
			<Tooltip.Provider>
				<!-- Desktop links with icons + labels -->
				<div class="hidden items-center gap-1 sm:flex">
					{#each PERSONAL_INFO.navbar as item}
						<Tooltip.Root delayDuration={100}>
							<Tooltip.Trigger>
								<Button href={item.href} variant="ghost" size="sm" class="h-9 rounded-full px-3">
									<span class="inline-flex items-center gap-2">
										<svelte:component this={item.icon} class="size-4" strokeWidth={1.75} />
										<!-- <span class="text-sm">{item.label}</span> -->
									</span>
								</Button>
							</Tooltip.Trigger>
							<Tooltip.Content><p>{item.label}</p></Tooltip.Content>
						</Tooltip.Root>
					{/each}
				</div>

				<!-- Mobile compact icon row -->
				<div class="flex items-center gap-1 sm:hidden">
					{#each PERSONAL_INFO.navbar as item}
						<Tooltip.Root delayDuration={100}>
							<Tooltip.Trigger>
								<Button href={item.href} variant="ghost" size="icon" class="size-10 rounded-full">
									<svelte:component this={item.icon} class="size-[18px]" strokeWidth={1.5} />
								</Button>
							</Tooltip.Trigger>
							<Tooltip.Content><p>{item.label}</p></Tooltip.Content>
						</Tooltip.Root>
					{/each}
				</div>

				<Separator orientation="vertical" class="mx-1 h-6" />

				<!-- Social icons -->
				<div class="flex items-center gap-1">
					{#each Object.entries(PERSONAL_INFO.contact.social)
						.filter(([_, social]) => social.navbar)
						.map(([_, social]) => social) as social}
						<Tooltip.Root delayDuration={100}>
							<Tooltip.Trigger>
								<Button
									href={social.url}
									variant="ghost"
									size="icon"
									class="size-10 rounded-full"
									aria-label={social.name}
								>
									<img src={social.icon} alt={social.name} class="size-[18px]" />
								</Button>
							</Tooltip.Trigger>
							<Tooltip.Content><p>{social.name}</p></Tooltip.Content>
						</Tooltip.Root>
					{/each}
				</div>

				<Separator orientation="vertical" class="mx-1 h-6" />

				<!-- Theme toggle -->
				<Tooltip.Root delayDuration={100}>
					<Tooltip.Trigger>
						<div>
							<ModeToggle />
						</div>
					</Tooltip.Trigger>
					<Tooltip.Content><p>Theme</p></Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		</nav>
	</header>
{/if}

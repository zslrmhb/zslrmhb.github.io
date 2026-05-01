<script lang="ts">
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { setMode, mode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { ButtonSize, ButtonVariant } from '$lib/components/ui/button/button.svelte';

	function handleModeChange() {
		if (mode.current === 'light') {
			setMode('dark');
		} else {
			setMode('light');
		}
	}

	let {
		size = 'default',
		variant = 'ghost',
		class: className = ''
	}: { size?: 'default' | 'small'; variant?: ButtonVariant; class?: string } = $props();

	const buttonSize = $derived<ButtonSize>(size === 'small' ? 'sm' : 'icon');
</script>

<Button
	onclick={handleModeChange}
	{variant}
	size={buttonSize}
	class={size === 'small'
		? `h-8 w-8 cursor-pointer rounded-full p-0 hover:bg-accent ${className}`
		: `size-12 cursor-pointer rounded-full ${className}`}
>
	<Sun
		class={`${size === 'small' ? 'h-4 w-4' : 'h-[1.2rem] w-[1.2rem]'} scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90`}
	/>
	<Moon
		class={`absolute ${size === 'small' ? 'h-4 w-4' : 'h-[1.2rem] w-[1.2rem]'} scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0`}
	/>
	<span class="sr-only">Toggle theme</span>
</Button>

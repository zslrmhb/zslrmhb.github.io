<script lang="ts">
	import { theme, toggleTheme } from '$lib/theme';
	let { size = 'default', class: className = '' }: { size?: 'default' | 'small'; class?: string } =
		$props();
</script>

<button
	type="button"
	class={`theme-toggle ${size === 'small' ? 'compact' : ''} ${className}`}
	onclick={toggleTheme}
	aria-label={`Switch to ${$theme === 'dark' ? 'light' : 'dark'} mode`}
	>{$theme === 'dark' ? 'Light' : 'Dark'} ◐</button
>

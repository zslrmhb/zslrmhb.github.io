<script lang="ts">
	import { mode, setMode } from 'mode-watcher';
	let { size = 'default', class: className = '' }: { size?: 'default' | 'small'; class?: string } =
		$props();
	function toggle() {
		setMode(mode.current === 'dark' ? 'light' : 'dark');
	}
</script>

<button
	type="button"
	class={`theme-toggle ${size === 'small' ? 'compact' : ''} ${className}`}
	onclick={toggle}
	aria-label={`Switch to ${mode.current === 'dark' ? 'light' : 'dark'} mode`}
	>{mode.current === 'dark' ? 'Light' : 'Dark'} ◐</button
>

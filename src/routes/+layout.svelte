<script>
	import '../app.css';
	import Navbar from '@/components/portfolio/Navbar.svelte';
	import { ModeWatcher, setMode } from 'mode-watcher';
	import { page } from '$app/stores';
	setMode('light');

	let { children } = $props();
</script>

<ModeWatcher />
<div class={`relative mx-auto min-h-screen bg-background px-6 py-12 font-sans antialiased sm:py-24 ${$page.url.pathname.startsWith('/blog/') ? 'max-w-4xl' : 'max-w-2xl'}`}>
	{#if !$page.url.pathname.startsWith('/blog/')}
		<Navbar variant="top" />
	{/if}
	{@render children()}
	
</div>
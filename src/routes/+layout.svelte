<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import Navbar from '@/components/portfolio/Navbar.svelte';
	import { page } from '$app/stores';
	import { initializeTheme } from '$lib/theme';

	let { children } = $props();

	let reading = $derived($page.url.pathname.startsWith('/blog/'));
	onMount(initializeTheme);
</script>

<a class="skip" href="#main">Skip to content</a>
<div id="top" class:reading-shell={reading} class="site-shell">
	{#if !reading}
		<Navbar variant="top" />
	{/if}
	{@render children()}
	<footer class="site-footer">
		<span>Hongbin Miao <span lang="zh">缪鸿彬</span></span><a href="#top">Back to top ↑</a>
	</footer>
</div>

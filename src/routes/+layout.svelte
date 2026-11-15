<script lang="ts">
	import { onMount } from 'svelte';
	import { PERSONAL_INFO } from '$lib/data/personal_info';
	import '../app.css';
	import Navbar from '@/components/portfolio/Navbar.svelte';
	import { page } from '$app/stores';
	import { initializeTheme } from '$lib/theme';
	import { playEntrance } from '$lib/actions/entrance';

	let { children } = $props();

	let reading = $derived($page.url.pathname.startsWith('/blog/'));
	onMount(initializeTheme);
	onMount(playEntrance);
</script>

<a class="skip" href="#main">Skip to content</a>
<div id="top" class:reading-shell={reading} class="site-shell world-document">
	{#if !reading}
		<Navbar variant="top" />
	{/if}
	{@render children()}
	<footer class="site-footer">
		<span>Hongbin Miao <span lang="zh">缪鸿彬</span></span>
		<div class="footer-links">
			{#each Object.values(PERSONAL_INFO.contact.social) as social (social.url)}
				<a href={social.url} target="_blank" rel="noreferrer">{social.name}</a>
			{/each}
			<a href="#top">Back to top</a>
		</div>
	</footer>
</div>

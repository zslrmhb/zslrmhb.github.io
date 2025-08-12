<script>
	import '../app.css';
	import Navbar from '@/components/portfolio/Navbar.svelte';
	
	import { ModeWatcher, setMode } from 'mode-watcher';
	setMode('light');

	let { children } = $props();
</script>

<ModeWatcher />
<div class="relative mx-auto min-h-screen max-w-2xl bg-background px-6 py-12 font-sans antialiased sm:py-24">
	{@render children()}
	<Navbar />
</div>
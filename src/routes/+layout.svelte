<script>
	import '../app.pcss';
	import Navbar from '$components/contents/Navbar.svelte';
</script>

<div
	class="bg-background fonts-sans relative mx-auto min-h-screen max-w-2xl px-6 py-12 antialiased"
>
	<Navbar />
	<slot></slot>
</div>

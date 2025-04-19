<script>
	import '../app.pcss';
	import Navbar from '$components/contents/Navbar.svelte';
</script>

<div
	class="bg-background fonts-sans relative mx-auto min-h-screen max-w-3xl px-4 py-12 antialiased"
>
	<Navbar />
	<slot></slot>
</div>

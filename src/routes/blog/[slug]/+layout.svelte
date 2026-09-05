<script>
	import BlogNavbar from '$lib/components/blog/BlogNavbar.svelte';
	let { children } = $props();
</script>

<BlogNavbar />
{@render children()}

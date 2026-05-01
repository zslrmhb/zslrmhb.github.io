<script>
	import BlogNavbar from '$lib/components/blog/BlogNavbar.svelte';
	import TableOfContents from '$lib/components/blog/TableOfContents.svelte';
	let { children } = $props();
</script>

<!-- <div class="relative"> -->
<BlogNavbar />
<TableOfContents />
{@render children()}
<!-- </div> -->

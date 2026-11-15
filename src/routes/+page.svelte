<script lang="ts">
	import Index from '@/components/Index.svelte';
	import Meta from '@/components/Meta.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<Meta />
<Index latestPhoto={data.latestPhoto} latestPost={data.latestPost} />

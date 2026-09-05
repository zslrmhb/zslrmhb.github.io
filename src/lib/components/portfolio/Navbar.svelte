<script lang="ts">
	import { PERSONAL_INFO } from '$lib/data/personal_info';
	import ModeToggle from './ModeToggle.svelte';
	import { page } from '$app/stores';
	export let variant: 'dock' | 'top' = 'top';
</script>

{#if variant === 'top'}
	<header class="site-nav">
		<a class="nav-name" href="/">Hongbin Miao <span>缪鸿彬</span></a>
		<nav aria-label="Primary">
			{#each PERSONAL_INFO.navbar as item (item.href)}<a
					href={item.href}
					aria-current={$page.url.pathname === item.href ? 'page' : undefined}
					>{item.label === 'Blog' ? 'Notes' : item.label}</a
				>{/each}
			{#each Object.values(PERSONAL_INFO.contact.social) as social (social.url)}
				<a href={social.url} target="_blank" rel="noreferrer">{social.name}</a>
			{/each}
			<ModeToggle size="small" />
		</nav>
	</header>
{/if}

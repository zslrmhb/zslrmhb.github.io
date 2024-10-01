<script lang="ts">
        export let logoUrl: string = '';
	export let company: string = '';
	export let title: string = '';
	export let subtitle: string = '';
	export let href: string = '';
	export let badges: string[]=[''];
	export let description: string = '';
	export let start: string = '';
	export let end: string = '';
	let isExpanded = false;

        let handleClick = (e: MouseEvent) => {
		if (description) {
			e.preventDefault();
			isExpanded = !isExpanded;
		}
	};
</script>

<a href={href || '#'} on:click={handleClick}>
    <div class="flex rounded-lg bg-card text-card-foreground">
	<div class="flex-none">
	</div>
        <div class="group ml-4 flex-grow flex-col items-center">
	    <div class="flex flex-col">
	        <div class="flex items-center justify-between gap-x-2 text-base">
	            <h3 class="inline-flex items-center justify-center text-xs font-semibold leading-none sm:text-sm">
			{company}
		    </h3>
		    <div class="text-right text-xs tabular-nums text-muted-foreground sm:text-sm text-gray-500">
		        {start} - {end || 'Present'}
		    </div>
	        </div>
		{#if title}
		    <div class="font-sans text-xs">{title}</div>
		{/if}
	</div>
	{#if description}
	    {#if isExpanded}
	        <div class="mt-2 text-xs sm:text-sm">{description}</div>
	    {/if}
	{/if}
        </div>
    </div>
</a>
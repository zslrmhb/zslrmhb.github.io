<script lang="ts">
    import { marked } from 'marked';
    export let title: string;
    export let href: string = '';
    export let description: string;
    export let dates: string;
    export let tags: readonly string[];
    export let link: string = '';
    export let image: string = '';
    export let video: string = '';
    export let links: { icon: any; type: string; href: string }[] = [];
</script>

<!-- Card -->
<div class="flex h-full flex-col overflow-hidden border transition-all duration-300 ease-out hover:shadow-lg rounded-lg bg-card text-card-foreground">
    <a href={href || '#'} class="block cursor-pointer">
	{#if video}
		<video
		    class="pointer-events-none mx-auto h-40 w-full object-cover object-top"
		    src={video}
                    autoplay
		    loop 
                    muted
		></video>
	{:else}
		<img class="object-cover overflow-hidden" src={image}  alt={title}/>
	{/if}
	</a>
    <!-- Card Header  -->
    <div class="px-2 flex flex-col">
        <div class="space-y-1">
                <!-- Card Title -->
                <div class="mt-1 text-base">{title}</div>
                <time class="font-sans text-xs">{dates}</time>
                <div class="hidden font-sans text-xs underline print:visible">
                        {link?.replace('https://', '').replace('www.', '').replace('/', '')}
                </div>
                <div class="prose  dark:prose-invert max-w-full text-pretty font-sans text-xs text-muted-foreground text-gray-500">
                      {@html marked(description)}
                </div>
        </div>
    </div>
    <!-- Card Content  -->
    <div class="mt-auto flex flex-col px-2 text-pretty font-sans text-sm text-muted-foreground">
        {#if tags && tags.length > 0}
            <div class="mt-2 flex flex-wrap gap-1">
                {#each tags as tag}
                    <div class="rounded-[4px] px-1 py-0 text-[10px]">{tag}</div>
                {/each}
            </div>
        {/if}
    </div>
    <!-- Card Footer  -->
    <div class="px-2 pb-2 flex items-center pt-2">
        {#if links && links.length > 0}
            <div class="flex flex-row flex-wrap items-start gap-1">
                {#each links as link}
                    <a href={link?.href} target="_blank" rel="noopener noreferrer">

                    </a>
                {/each}
            </div>
        {/if}
    </div>
</div>


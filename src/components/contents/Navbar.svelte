<script lang="ts">
        import { PERSONAL_INFO } from "../../data/personal_info";

</script>

<div class="pointer-events-none inset-x-0 mx-auto mb-7 flex h-full max-h-14 font-bold text-2xl sm:text-3xl xl:text-4xl">
    <!-- <div class="fixed inset-x-0 top-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div> -->
    <div class="pointer-events-auto relative mx-auto flex h-full min-h-full items-center gap-12 rounded-full bg-background px-1 ">
    {#each PERSONAL_INFO.navbar as item}
    <a href={item.href}> {item.label}</a>
    {/each}
    {#each Object.entries(PERSONAL_INFO.contact.social)
			.filter(([_, social]) => social.navbar)
			.map(([_, social]) => social) as social}
        <a href={social.url}> {social.name}</a>
        {/each}
    </div>
</div>
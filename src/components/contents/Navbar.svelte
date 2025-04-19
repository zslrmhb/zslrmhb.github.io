<script lang="ts">
        import { PERSONAL_INFO } from "../../data/personal_info";

</script>

<nav class="pointer-events-none inset-x-0 mx-auto mb-9 flex  max-h-14 font-bold text-xl sm:text-xl xl:text-2xl border-b h-14">
    <div class="pointer-events-auto flex w-full items-center justify-evenly">
    {#each PERSONAL_INFO.navbar as item}
    <a href={item.href}> {item.label}</a>
    {/each}
    {#each Object.entries(PERSONAL_INFO.contact.social)
			.filter(([_, social]) => social.navbar)
			.map(([_, social]) => social) as social}
        <a href={social.url}> {social.name}</a>
        {/each}
    </div>
</nav>
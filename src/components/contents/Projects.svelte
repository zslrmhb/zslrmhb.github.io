<script>
        import Section from "../decorators/Section.svelte";
        import H2 from "../decorators/H2.svelte"

    import { onMount } from 'svelte';
    let projects = {};

    onMount(async () => {
        const res = await fetch('src/data/projects.json');
        projects = await res.json();
    })
</script>

<Section>
        <H2>
            Projects
        </H2>
        {#each Object.entries(projects) as [category, items]}
            <h3 class="text-2xl font-semibold">{category.replace(/([A-Z])/g, ' $1')}</h3> 
            <div class="flex space-x-4 overflow-x-scroll">
            {#each items as item}
                <div class="card">
                    <!-- <img src={item.image} alt={item.title} /> -->
                    <h4 class="font-bold">{item.title}</h4>
                    <p>{item.description}</p>
                </div>
            {/each}
            </div>  
        {/each}
</Section>
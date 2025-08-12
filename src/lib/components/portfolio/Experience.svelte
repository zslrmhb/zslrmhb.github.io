<script lang="ts">
    import { EXPERIENCE } from '@/data/experience';
    import ResumeCard from './ResumeCard.svelte';
</script>

<section id="experience">
        <div class="flex min-h-0 flex-col gap-y-3">
            <h2 class="text-xl font-bold">
                Experience
            </h2>
            {#each EXPERIENCE.experience as exp, id}
                <ResumeCard {...exp}/>
            {/each} 
        </div>
</section>
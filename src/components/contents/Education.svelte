<script lang="ts">
    import { EDUCATION } from '$data/education.ts';
    import ResumeCard from '$components/contents/ResumeCard.svelte';
</script>

<section id="education">
        <div class="flex min-h-0 flex-col gap-y-3">
        <h2 class="text-xl font-bold">Education</h2>
        {#each EDUCATION.education as edu, id}
            <ResumeCard 
                href={edu.href}
                logoUrl={edu.logoUrl}
                company={edu.school}
                title={edu.degree}
                substitle={edu.degree}
                start={edu.start}
                end = {edu.end}
            />
        {/each}
        </div>
</section>

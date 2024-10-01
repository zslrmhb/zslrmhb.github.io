<script>
    import { PROJECTS } from '$data/projects.ts';
    import ProjectCard from '$components/contents/ProjectCard.svelte';
</script>

<section id="projects">
    <div class="w-full space-y-12 py-12">
        <h2 class="text-xl font-bold">Projects</h2>
        <div class="mx-auto grid max-w-[800px] grid-cols-1 gap-3 sm:grid-cols-2">
                {#each PROJECTS.projects as project, id}
                    <ProjectCard
							href={project.href}
							title={project.title}
							description={project.description}
							dates={project.dates}
							tags={project.technologies}
							image={project.image}
							video={project.video}
							links={project.links}
						/>
                {/each}
        </div>
    </div>
</section>
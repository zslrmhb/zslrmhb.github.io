<script>
	import { PROJECTS } from '@/data/projects';
	import ProjectCard from './ProjectCard.svelte';

	import BlurFade from '../custom/BlurFade.svelte';
	let BLUR_FADE_DELAY = 0.04;
</script>

<section id="projects">
	<div class="w-full space-y-12 py-12">
		<BlurFade delay={BLUR_FADE_DELAY}>
			<h2 class="text-xl font-bold">Projects</h2>
		</BlurFade>
		<div class="mx-auto grid max-w-[800px] grid-cols-1 gap-3 sm:grid-cols-2">
			{#each PROJECTS.projects as project, id}
				<BlurFade delay={BLUR_FADE_DELAY * 1.5 + id * 0.05}>
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
				</BlurFade>
			{/each}
		</div>
	</div>
</section>

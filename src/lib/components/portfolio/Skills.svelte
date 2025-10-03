<script lang="ts">
	import { SKILLS } from '@/data/skills';

	import BlurFade from '../custom/BlurFade.svelte';
	let BLUR_FADE_DELAY = 0.04;
</script>

<!-- <div class="skills-section space-y-8">
	{#each SKILLS.categories as category}
		<div>
			<h2 class="mb-4 text-xl font-bold">{category.name}</h2>
			<div class="flex flex-wrap gap-4">
				{#each category.skills as skill}
					<div class="flex w-24 flex-col items-center justify-center">
						{#if skill.icon}
							<img src={skill.icon} alt={skill.name} class="mb-1 h-10 w-10" />
							<span class="text-center text-xs">{skill.name}</span>
						{:else}
							<span class="text-sm font-medium">{skill.name}</span>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div> -->

<section id="skills">
	<div class="flex min-h-0 flex-col gap-y-3">
		<BlurFade delay={BLUR_FADE_DELAY}>
			<h2 class="mb-4 text-xl font-bold">Skills</h2>
		</BlurFade>
		<BlurFade delay={BLUR_FADE_DELAY}>
			{#each SKILLS.categories as category}
				<div>
					<h3 class="text-md mb-4 font-bold">{category.name}</h3>
				</div>
				<div class="flex flex-wrap gap-4">
					{#each category.skills as skill}
						<div class="flex w-24 flex-col items-center justify-center">
							{#if skill.icon}
								<img src={skill.icon} alt={skill.name} class="mb-1 h-10 w-10" />
								<span class="text-center text-xs">{skill.name}</span>
							{:else}
								<span class="text-sm font-medium">{skill.name}</span>
							{/if}
						</div>
					{/each}
				</div>
			{/each}
		</BlurFade>
	</div>
</section>

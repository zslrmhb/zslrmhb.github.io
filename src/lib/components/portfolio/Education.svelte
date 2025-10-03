<script lang="ts">
	import { EDUCATION } from '@/data/education';
	import ResumeCard from './ResumeCard.svelte';

	import BlurFade from '../custom/BlurFade.svelte';
	let BLUR_FADE_DELAY = 0.04;
</script>

<section id="education">
	<div class="flex min-h-0 flex-col gap-y-3">
		<BlurFade delay={BLUR_FADE_DELAY}>
			<h2 class="text-xl font-bold">Education</h2>
		</BlurFade>
		{#each EDUCATION.education as edu, id}
			<BlurFade delay={BLUR_FADE_DELAY * 1.2 + id * 0.05}>
				<ResumeCard
					href={edu.href}
					logoUrl={edu.logoUrl}
					company={edu.school}
					title={edu.degree}
					subtitle={edu.degree}
					start={edu.start}
					end={edu.end}
				/>
			</BlurFade>
		{/each}
	</div>
</section>

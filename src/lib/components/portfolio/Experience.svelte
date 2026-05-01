<script lang="ts">
	import { EXPERIENCE } from '@/data/experience';
	import ResumeCard from './ResumeCard.svelte';

	import BlurFade from '../custom/BlurFade.svelte';
	let BLUR_FADE_DELAY = 0.04;
</script>

<section id="experience">
	<div class="flex min-h-0 flex-col gap-y-3">
		<BlurFade delay={BLUR_FADE_DELAY}>
			<h2 class="text-xl font-bold">Experience</h2>
		</BlurFade>
		{#each EXPERIENCE.experience as exp, id}
			<BlurFade delay={BLUR_FADE_DELAY * 1.2 + id * 0.05}>
				<ResumeCard {...exp} />
			</BlurFade>
		{/each}
	</div>
</section>

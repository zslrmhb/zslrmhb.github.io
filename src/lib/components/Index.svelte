<script lang="ts">
	import Hero from './portfolio/Hero.svelte';
	import { EXPERIENCE } from '$lib/data/experience';
	import { EDUCATION } from '$lib/data/education';
	import { PROJECTS } from '$lib/data/projects';
	import portrait from '$lib/imgs/personal-portrait.png';
</script>

<main id="main">
	<Hero />
	<section class="section background" id="experience">
		<div class="about-intro">
			<span class="eyebrow">01 / BACKGROUND</span><img
				src={portrait}
				alt="Hongbin Miao"
				width="144"
				height="168"
				loading="lazy"
			/>
			<h2 lang="zh-Hant">觀己</h2>
			<p>
				I enjoy hands-on, intuitive learning — and communicating what I learn through projects and
				writing.
			</p>
		</div>
		<div class="resume">
			<h3>Experience</h3>
			{#each EXPERIENCE.experience as item (item.company + item.start + item.title)}<a class="resume-row" href={item.href}
					><div><strong>{item.company}</strong><span>{item.title}</span></div>
					<time>{item.start} — {item.end}</time></a
				>{/each}
			<h3 class="education-title">Education</h3>
			{#each EDUCATION.education as item (item.school)}<a class="resume-row" href={item.href}
					><div><strong>{item.school}</strong><span>{item.degree}</span></div>
					<time>{item.start} — {item.end}</time></a
				>{/each}
		</div>
	</section>
	<section id="projects" class="section">
		<div class="section-heading">
			<span class="eyebrow">02 / PROJECTS</span>
			<h2 lang="zh-Hant">知行合一</h2>
		</div>
		<div class="uniform-projects">
			{#each PROJECTS.projects as project (project.title)}<a
					class="uniform-project"
					href={project.href}
					><h3>{project.title}</h3>
					<p>{project.description}</p>
					<span class="project-tech">{project.technologies.join(' · ')}</span></a
				>{/each}
		</div>
	</section>
	<section class="section notes-preview">
		<div class="section-heading">
			<span class="eyebrow">03 / NOTES</span>
			<h2 lang="zh-Hant">學而不厭</h2>
		</div>
		<div class="note-entry">
			<a href="/blog"
				><span class="meta">AUG 21, 2025 · DEEP LEARNING</span>
				<h3>AI Resources</h3>
				<p>A collection of AI resources I’ve found helpful.</p></a
			><a class="text-link" href="/blog">All notes <span>→</span></a>
		</div>
	</section>
	<section id="photography" class="section elsewhere">
		<div>
			<span class="eyebrow">04 / ELSEWHERE</span>
			<h2 lang="zh-Hant">觀物</h2>
			<!-- <p>Photography is another way I observe the world.</p> -->
			<a class="text-link" href="/photography">View photography <span>→</span></a>
		</div>
	</section>
</main>

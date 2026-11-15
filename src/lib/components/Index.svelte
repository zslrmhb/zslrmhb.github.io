<script lang="ts">
	import { homeIntroduction, homePhotograph, homeTitle } from '$lib/data/landing';
	import { EXPERIENCE } from '$lib/data/experience';
	import { EDUCATION } from '$lib/data/education';
	import { PROJECTS } from '$lib/data/projects';
	import { formatDate } from '$lib/utils';
	import type { Photo, Post } from '$lib/types';
	let { latestPhoto, latestPost }: { latestPhoto?: Photo; latestPost?: Post } = $props();
</script>

<main id="main" class="folio-home">
	<section class="living-cover" aria-labelledby="living-title">
		<div class="cover-scene">
			<div class="living-title">
				<h1 id="living-title" tabindex="-1">{homeTitle}</h1>
				<p>
					{homeIntroduction}
				</p>
				<a class="text-link cover-work" href="#projects">Explore my work</a>
			</div>

			<div class="world-window" aria-label="Ocean, in Hongbin’s photographic space">
				<a href="/photography#colour-echoes" class="world-photo-link"
					><img
						src={homePhotograph}
						alt="Ocean viewed from a shaded balcony"
						width="960"
						height="640"
					/><span>Explore photography</span></a
				>
			</div>
		</div>
	</section>

	<section class="section background" id="experience">
		<div class="about-intro">
			<h2>About <span lang="zh-Hant">觀己</span></h2>
			<p>
				I enjoy hands-on, intuitive learning — and communicating what I learn through projects and
				writing.
			</p>
			<figure class="home-portrait m-0 mt-6">
				<img
					src="/personal-portrait-640.webp"
					alt="Portrait of Hongbin Miao"
					width="640"
					height="709"
					loading="lazy"
				/>
			</figure>
		</div>
		<div class="resume">
			<h3>Experience</h3>
			{#each EXPERIENCE.experience as item (item.company + item.start + item.title)}
				<a class="resume-row" href={item.href}>
					<div><strong>{item.company}</strong><span>{item.title}</span></div>
					<time>{item.start} — {item.end}</time>
				</a>
			{/each}
			<h3 class="education-title">Education</h3>
			{#each EDUCATION.education as item (item.school)}
				<a class="resume-row" href={item.href}>
					<div><strong>{item.school}</strong><span>{item.degree}</span></div>
					<time>{item.start} — {item.end}</time>
				</a>
			{/each}
		</div>
	</section>
	<section id="projects" class="section work-section">
		<div class="section-heading">
			<h2>Projects <span lang="zh-Hant">知行合一</span></h2>
		</div>
		<div class="uniform-projects">
			{#each PROJECTS.projects as project (project.title)}
				<article class="project-entry">
					<h3><a href={project.href}>{project.title}</a></h3>
					<p>{project.description}</p>
					<p class="project-tech">{project.technologies.join(' · ')}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="section notes-preview" id="writing">
		<div class="section-heading">
			<h2>Notes <span lang="zh-Hant">學而不厭</span></h2>
		</div>
		<div class="note-entry">
			{#if latestPost}
				<a href={`/blog/${latestPost.slug}`}>
					<span class="meta"
						>{formatDate(latestPost.date, 'long')}{#if latestPost.categories?.length}
							· {latestPost.categories[0]}{/if}</span
					>
					<h3>{latestPost.title}</h3>
					{#if latestPost.summary || latestPost.description}<p>
							{latestPost.summary || latestPost.description}
						</p>{/if}
				</a>
			{/if}
			<a class="text-link" href="/blog">All notes</a>
		</div>
	</section>

	<section class="section elsewhere" id="photography">
		<div>
			<h2>Photography <span lang="zh-Hant">觀物</span></h2>
			<a class="text-link" href="/photography">View photography</a>
		</div>
		{#if latestPhoto}
			<a class="home-photo-frame" href="/photography#photographs">
				<img
					src={latestPhoto.medium || latestPhoto.url}
					alt={latestPhoto.alt || 'Latest photograph by Hongbin Miao'}
					width={latestPhoto.mediumWidth || latestPhoto.width}
					height={latestPhoto.mediumHeight || latestPhoto.height}
					class="block h-auto w-full"
					loading="lazy"
				/>
			</a>
		{/if}
	</section>
</main>

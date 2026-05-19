<script>
	import BlurFade from '../custom/BlurFade.svelte';
	let BLUR_FADE_DELAY = 0.04;
</script>

<section>
	<BlurFade delay={BLUR_FADE_DELAY}>
		<h2 class="text-xl font-bold">About</h2>
	</BlurFade>
	<BlurFade delay={BLUR_FADE_DELAY * 1.4}>
		<div class="prose max-w-full font-sans text-sm text-pretty text-gray-500 text-muted-foreground">
			<p>My name is Hongbin Miao (缪鸿彬)</p>
			<p>
				I love hands-on and intuitive learning from <b>first principle</b> and want to communicate my
				learning through my projects (and hopefully through my blogs) 😃!
			</p>
			<br />
			<!-- <p>Currently Learning: 
                <a href="https://www.amazon.com/AI-Engineering-Building-Applications-Foundation/dp/1098166302"><u>AI Engineering</u></a>,
                <a href="https://mml-book.github.io"><u>Mathematics for Machine Learning</u></a> 
            </p> -->
			<!-- <p>
				Research Interest:
				<a
					href="https://github.com/leofan90/Awesome-World-Models?tab=readme-ov-file#foundation-paper-of-world-model"
					><u>World Models & Self-Supervised Learning</u></a
				>,
				<a href="https://transformer-circuits.pub"><u>Mechanistic Interpretability</u></a>,
				<a href="https://youtu.be/gEbbGyNkR2U?si=UDOyahWRNr8Bu3KS"><u>Continual Learning</u></a>
			</p> -->
		</div>
	</BlurFade>
</section>

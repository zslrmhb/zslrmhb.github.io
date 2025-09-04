<script>
    import BlurFade from '../custom/BlurFade.svelte';
    let BLUR_FADE_DELAY = 0.04;
</script>

<section>
    <BlurFade delay={BLUR_FADE_DELAY}>
        <h2 class="text-xl font-bold">
            About
        </h2>
    </BlurFade>
    <BlurFade delay={BLUR_FADE_DELAY * 1.4}>
        <div class="prose max-w-full text-pretty font-sans text-sm text-muted-foreground text-gray-500">
            <p>My name is Hongbin Miao (缪鸿彬) and I am a graduate student at UC Irvine. </p>
            <p>I am interested in <b>machine learning</b>, <b>software engineering</b>, and <b>data science</b>.</p>
            <p>I love hands-on and intuitive learning from <b>first principle</b> and want to communicate my learning 
            through my projects (and hopefully through my blogs) 😃!</p>
            <br/>
            <p>Currently Learning: 
                <a href="https://www.amazon.com/AI-Engineering-Building-Applications-Foundation/dp/1098166302"><u>AI Engineering</u></a>,
                <a href="https://mml-book.github.io"><u>Mathematics for Machine Learning</u></a> 
            </p>
            <p>Currently Exploring: 
                <a href="https://github.com/Timothyxxx/WorldModelPapers?tab=readme-ov-file"><u>World Models</u></a>,
                <a href="https://transformer-circuits.pub"><u>Mechanistic Interpretability</u></a>
            </p>
        </div>
    </BlurFade>
</section>
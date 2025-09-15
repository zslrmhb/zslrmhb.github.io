<script lang="ts">
    import {onMount, onDestroy} from 'svelte';
    import * as Avatar from '../ui/avatar';
    import { PERSONAL_INFO } from '@/data/personal_info';
    import BlurFade from '../custom/BlurFade.svelte';
    let BLUR_FADE_DELAY = 0.04;

    let messages = [
        "Hongbin Miao | Hi!",
        "Hongbin Miao | 你好！",
        "Hongbin Miao | こんにちは！",
        "Hongbin Miao | Hola!"
    ];
    let currentIndex = 0;
    let currentMessage = messages[currentIndex];
    let interval;

    onMount(() => {interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % messages.length;
        currentMessage = messages[currentIndex];}, 3000);
    })

    onDestroy(() => {
        clearInterval(interval);
    });


</script>


<section id="hero">
    <div class="mx-auto w-full max-w-2xl space-y-8 mt-10">
        <div class="flex justify-between gap-2">
            <div class="flex flex-1 flex-col space-y-1.5">
                <BlurFade
						delay={BLUR_FADE_DELAY}
						class="md:text-2xl font-bold tracking-tighter sm:text-xl xl:text-4xl/none"
						yOffset={8}>{currentMessage}</BlurFade
					>
					<BlurFade class="max-w-[600px] md:text-xl" delay={BLUR_FADE_DELAY}
						>LOVE crafting intuition and learning new things! </BlurFade
					>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
                <Avatar.Root class="size-40">
                    <Avatar.Image 
                    alt="My Photo" 
                    src={PERSONAL_INFO.personal_portrait}
                    class="object-cover "/>
                </Avatar.Root>
            </BlurFade>
        </div>
    </div>
</section>
<script lang="ts">
    import {onMount, onDestroy} from 'svelte';
    import * as Avatar from '$components/ui/avatar';

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
    <div class="mx-auto w-full max-w-3xl space-y-8 px-4">
        <div class="flex justify-between gap-2">
            <div class="flex flex-1 flex-col space-y-1.5">
                <h1 class="md:text-2xl font-bold tracking-tighter sm:text-xl xl:text-4xl/none"> 
                    {currentMessage}
                </h1>
                <h2 class="max-w-[600px] md:text-xl">
                    <p>LOVE crafting intuition and learning new things!  
                </h2>
            </div>
            <div>
                <Avatar.Root class="size-40">
                    <Avatar.Image 
                    alt="My Photo" 
                    src="/imgs/personal-portrait.png"
                    class="object-contain w-full h-full"/>
                </Avatar.Root>
            </div>
        </div>
    </div>
</section>
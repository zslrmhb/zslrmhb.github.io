<script lang="ts">
    import type { Photo } from "@/data/photos";
    import PhotoChip from "@/components/custom/PhotoChip.svelte";
    import Marquee from "@/components/custom/Marquee.svelte";
    export let data: { photos: Photo[] };
  
    // Sort newest → oldest (fallback-safe if takenAt missing)
    const photos = [...data.photos].sort((a, b) => {
      const ta = a.takenAt ? new Date(a.takenAt).getTime() : 0;
      const tb = b.takenAt ? new Date(b.takenAt).getTime() : 0;
      return tb - ta;
    });

    const firstRow = photos.filter((_, i) => i % 2 === 0);
    const secondRow = photos.filter((_, i) => i % 2 === 1);
  
    function formatDate(iso?: string) {
      if (!iso) return "";
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { year: "numeric", month: "short" });
    }
</script>


<div
  class="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background py-20"
>
<Marquee pauseOnHover class="[--duration:50s]">
  {#each firstRow as p}
  <PhotoChip photo={p} size="lg" />
  {/each}
</Marquee>
<Marquee reverse pauseOnHover class="[--duration:50s]">
  {#each secondRow as p}
  <PhotoChip photo={p} size="lg" />
  {/each}
</Marquee>
<div
    class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"
  ></div>
  <div
    class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"
  ></div>
</div>

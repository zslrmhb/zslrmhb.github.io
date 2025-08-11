<script lang="ts">
  import type { Photo } from "$data/photos.ts";
  export let data: { photos: Photo[] };

  // Sort newest → oldest (fallback-safe if takenAt missing)
  const photos = [...data.photos].sort((a, b) => {
    const ta = a.takenAt ? new Date(a.takenAt).getTime() : 0;
    const tb = b.takenAt ? new Date(b.takenAt).getTime() : 0;
    return tb - ta;
  });

  function formatDate(iso?: string) {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short" });
  }
</script>
  


<!-- Container -->
<div class="mx-auto max-w-6xl px-4 py-6">
  <h1 class="text-xl font-semibold mb-6 flex items-center gap-2">
    <span>📷</span>
    Photography
  </h1>
  <!-- Grid using Tailwind -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each photos as p}
      <a
        class="group relative mb-4 block break-inside-avoid rounded-lg overflow-hidden shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        href={p.permalink}
        target="_blank"
        rel="noreferrer"
        title={p.caption}
      >
        <img
          class="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
          src={p.thumb}
          alt={p.caption || "Hongbin's Photography"}
          loading="lazy"
          decoding="async"
        />

        <!-- 500px-like overlay on hover -->
        <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        <div class="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {#if p.caption}
            <div class="text-sm leading-snug max-h-12 overflow-hidden">{p.caption}</div>
          {/if}
          {#if p.takenAt}
            <div class="mt-1 text-[11px] uppercase tracking-wide text-white/80">{formatDate(p.takenAt)}</div>
          {/if}
        </div>
      </a>
    {/each}
  </div>
</div>

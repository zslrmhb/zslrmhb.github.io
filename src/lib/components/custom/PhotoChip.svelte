<script lang="ts">
    import type { Photo } from "$lib/types/photos";
  
    export let photo: Photo;
    /** optional: sm | md | lg (controls width) */
    export let size: "sm" | "md" | "lg" = "md";
    /** pass extra classes if needed */
    export let className = "";
  
    function formatDate(iso?: string) {
      if (!iso) return "";
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { year: "numeric", month: "short" });
    }
  
    const widthMap = { sm: "w-48", md: "w-64", lg: "w-80" } as const;
  </script>
  
  <a
    href={photo.permalink}
    target="_blank"
    rel="noreferrer"
    class={`group relative block ${widthMap[size]} aspect-[3/2] overflow-hidden rounded-lg ${className}`}
    title={photo.caption}
  >
    <img
      class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      src={photo.thumb}
      alt={photo.caption || "Photo"}
      loading="lazy"
      decoding="async"
    />
  
    <!-- overlay on hover -->
    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    ></div>
  
    {#if photo.caption || photo.takenAt}
      <div
        class="pointer-events-none absolute inset-x-0 bottom-0 p-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        {#if photo.caption}
          <div class="line-clamp-2 text-xs leading-snug">{photo.caption}</div>
        {/if}
        {#if photo.takenAt}
          <div class="mt-0.5 text-[10px] uppercase tracking-wide text-white/80">
            {formatDate(photo.takenAt)}
          </div>
        {/if}
      </div>
    {/if}
  </a>
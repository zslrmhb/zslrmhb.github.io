import type { Photo } from "$data/photos.ts";

export const prerender = true;

export async function load({ fetch }) {
 const res = await fetch('/photos.json');
 const photos: Photo[] = await res.json();
 return { photos };
}
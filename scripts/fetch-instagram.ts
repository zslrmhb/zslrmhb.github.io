import { writeFile, mkdir, access } from "node:fs/promises";
import { constants as FS } from "node:fs";
import path from "node:path";
import 'dotenv/config';

const OUT = "static/photos.json";   // SvelteKit's static dir
const COUNT = 60;                   // keep latest N items


type IGMedia = {
    id: string;
    caption?: string;
    media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
    media_url?: string;
    permalink: string;
    thumbnail_url?: string;
    timestamp: string;
    children?: { data?: Array<{ media_type: string; media_url?: string; thumbnail_url?: string }> };
  };

  export type Photo = {
    id: string;
    caption: string;
    url: string;
    thumb: string;
    permalink: string;
    takenAt: string;
  };

  const { IG_USER_ID, IG_LONG_LIVED_TOKEN } = process.env as Record<string, string>;

  if (!IG_USER_ID || !IG_LONG_LIVED_TOKEN) {
    console.error("Missing IG_USER_ID or IG_LONG_LIVED_TOKEN in env.");
    process.exit(1);
  }

  const FIELDS = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "permalink",
    "thumbnail_url",
    "timestamp",
    "children{media_type,media_url,thumbnail_url}",
  ].join(",");

  async function fetchAll(limit = COUNT): Promise<IGMedia[]> {
    let url =
      `https://graph.instagram.com/${IG_USER_ID}/media` +
      `?fields=${encodeURIComponent(FIELDS)}&access_token=${IG_LONG_LIVED_TOKEN}&limit=25`;
  
    const items: IGMedia[] = [];
    while (url && items.length < limit) {
      const res = await fetch(url, { method: "GET" });
      if (!res.ok) throw new Error(`IG HTTP ${res.status}`);
      const data = (await res.json()) as any;
      if (Array.isArray(data?.data)) items.push(...data.data);
      url = data?.paging?.next ?? null;
    }
    return items.slice(0, limit);
  }

  function normalize(items: IGMedia[]): Photo[] {
    return items
      .filter((i) => i.media_type === "IMAGE" || i.media_type === "CAROUSEL_ALBUM")
      .map((i) => {
        let best: { media_url?: string; thumbnail_url?: string } | undefined = i;
        if (i.media_type === "CAROUSEL_ALBUM") {
          const child =
            i.children?.data?.find((c) => c.media_type === "IMAGE") ||
            i.children?.data?.[0];
          best = child ?? i;
        }
        const url = best?.media_url || i.media_url!;
        const thumb = best?.thumbnail_url || url;
        return {
          id: i.id,
          caption: i.caption ?? "",
          url,
          thumb,
          permalink: i.permalink,
          takenAt: i.timestamp,
        };
      })
      .sort((a, b) => +new Date(b.takenAt) - +new Date(a.takenAt));
  }

  async function fileExists(p: string) {
    try {
      await access(p, FS.F_OK);
      return true;
    } catch {
      return false;
    }
  }

  async function main() {
    try {
      const raw = await fetchAll(COUNT);
      const photos = normalize(raw);
      await mkdir(path.dirname(OUT), { recursive: true });
      await writeFile(OUT, JSON.stringify(photos, null, 2));
      console.log(`✅ Wrote ${photos.length} photos → ${OUT}`);
    } catch (err: any) {
      console.error("⚠️ IG fetch failed:", err?.message || err);
      if (!(await fileExists(OUT))) process.exit(1); // fail if we have no cache
      console.log("Using existing photos.json.");
    }
  }
  
  main();
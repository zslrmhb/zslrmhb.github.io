import { writeFile, mkdir, access, readdir, unlink } from "node:fs/promises";
import { constants as FS } from "node:fs";
import path from "node:path";
import 'dotenv/config';

// Outputs
const JSON_OUT = "src/data/photos.json"; // used by SvelteKit import (no runtime fetch)
const JSON_OUT_STATIC = "static/photos.json"; // optional: keep a public copy too
const IMG_DIR = "static/ig";               // local cached images served by GitHub Pages
const COUNT = 60;                            // keep latest N items

// --- Types ---

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
  url: string;    // will point to our local /ig/*.jpg
  thumb: string;  // will point to our local /ig/*.jpg
  permalink: string; // IG permalink to open on click
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
        const child = i.children?.data?.find((c) => c.media_type === "IMAGE") || i.children?.data?.[0];
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

// Download an image and pick a safe extension based on content-type
async function downloadImage(url: string, destBase: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      Accept: 'image/*',
      Referer: 'https://www.instagram.com/'
    }
  });
  if (!res.ok) throw new Error(`download ${res.status}`);
  const ab = await res.arrayBuffer();
  const ct = (res.headers.get('content-type') || '').toLowerCase();
  const ext = ct.includes('webp') ? 'webp' : ct.includes('png') ? 'png' : 'jpg';
  const destPath = `${destBase}.${ext}`;
  await writeFile(destPath, Buffer.from(ab));
  return destPath;
}

// Remove files in IMG_DIR that don't match current ids
async function cleanupImages(keepIds: string[]) {
  await mkdir(IMG_DIR, { recursive: true });
  const keep = new Set(keepIds);
  const files = await readdir(IMG_DIR).catch(() => [] as string[]);
  await Promise.all(
    files
      .filter((f) => !keep.has(f.split('.')[0]))
      .map((f) => unlink(path.join(IMG_DIR, f)).catch(() => {}))
  );
}

async function main() {
  try {
    const raw = await fetchAll(COUNT);
    const photos = normalize(raw);

    await mkdir(path.dirname(JSON_OUT), { recursive: true });
    await mkdir(path.dirname(JSON_OUT_STATIC), { recursive: true });
    await mkdir(IMG_DIR, { recursive: true });

    const updated: Photo[] = [];
    for (const p of photos) {
      const base = path.join(IMG_DIR, p.id);
      try {
        const saved = await downloadImage(p.thumb || p.url, base);
        const rel = '/' + path.posix.join('ig', path.basename(saved));
        updated.push({ ...p, url: rel, thumb: rel });
      } catch (e) {
        console.warn(`⚠️  failed to cache ${p.id}:`, (e as any)?.message || e);
        // keep remote URL as fallback
        updated.push(p);
      }
    }

    await cleanupImages(updated.map((p) => p.id));

    const json = JSON.stringify(updated, null, 2);
    await writeFile(JSON_OUT, json);
    await writeFile(JSON_OUT_STATIC, json);

    console.log(`✅ Cached ${updated.length} photos → ${IMG_DIR}`);
    console.log(`✅ Wrote metadata → ${JSON_OUT} & ${JSON_OUT_STATIC}`);
  } catch (err: any) {
    console.error("⚠️ IG fetch failed:", err?.message || err);
    if (!(await fileExists(JSON_OUT))) process.exit(1); // fail if we have no cache
    console.log("Using existing photos.json.");
  }
}

main();
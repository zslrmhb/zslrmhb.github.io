# Personal website — implementation handoff

Design status: approved through Round 6. Production implementation has not started. The user will choose the implementation model. This document is the current entry point; historical pending-review statements in earlier records describe those earlier rounds.

## Product and approved references

English-first personal website for Hongbin Miao. Minimal Chinese aesthetic: generous empty space, paper/ink palette, restrained seal colour, classical inscription and misty landscape. Preserve factual content and existing public URLs.

| Surface | Canonical visual reference | Required behavior |
| --- | --- | --- |
| Home `/` | `round-3/index.html`, its final CSS and `assets/dao-landscape.png` | Identity visible immediately; intro → Background (Experience and Education) → Projects → Notes → Elsewhere |
| Notes `/blog` | `round-4/notes.html` | Scannable published-note index, real metadata |
| Note `/blog/[slug]` | `round-4/index.html`, `ai-resources.html` | English reading layout, headings, contents, code, equations, references and preset interactive figures |
| Photography `/photography` | `round-5/index.html` | Whole available photo archive, 12 items/page desktop and 6 mobile, numbered/previous/next navigation |
| Article exploration | `round-6/index.html` | Explicit entry into full-screen 3D, controls, theme, loading/fallback/retry, return to reading |

Home: preserve the large English name and blended personal introduction. Inscription reads top-to-bottom, right-to-left: right column 道可道, left column 非常道, without modern punctuation. Keep the approved sparse landscape. Do not replace it with a three-body orbit. All six projects have the same name/description/technology/link structure. Experience precedes Projects.

The three-body article is a design specimen, not an existing published note. Do not publish it automatically. The current AI Resources article is real content; preserve its slug and body.

## Shared visual system

Extract final computed styling from the approved references rather than transplanting accumulated prototype overrides. Use semantic shared tokens:

| Token | Light | Dark |
| --- | --- | --- |
| paper | `#f8f7f2` | `#171d19` |
| ink | `#242b27` | `#eae9df` |
| muted | `#656d65` | `#afb9ac` |
| line | `#d5d8ce` | `#3c473c` |
| accent | `#a94734` | `#e89a7d` |
| panel | `#eeeee5` | `#222a23` |

Serif English headings and article body; restrained system-sans navigation and controls; suitable Chinese serif fallback for inscription. Article body reference: 19px desktop, 18px mobile. Use the reference files for widths, line height and spacing. Preserve readable contrast, visible focus and generous touch targets.

Theme initially follows the system. Explicit light/dark choice persists across routes/reloads and updates charts and canvas. Remove the existing forced-light initialization. Prevent a theme flash. Respect reduced motion; no mandatory autoplay or scroll hijacking.

## Content and Markdown contract

Retain `src/content/*.md` and existing frontmatter: title, date, published, author, summary, categories. Preserve legacy content; optional description can supply a fallback summary. Missing publication approval must not make a draft public. Existing slug generation must remain compatible.

Ordinary notes need only Markdown. Optional layout values: `essay` (default) and `explorable`; interactive blocks must also work inside ordinary articles. The following implementation contract resolves the prototype shorthand:

````markdown
```interactive
component: three-body
preset: figure-eight
controls: [play, reset, speed]
explore: true
```
````

Use a real parser and a typed schema, with a fixed component registry. Supported first component: `three-body`; first preset: `figure-eight`; controls are a unique subset of play/reset/speed; explore is a boolean, default false. Reject unknown components, presets, keys and invalid types at build time with source file/location. Author content must not supply imports, executable expressions or arbitrary URLs for modules. Adding a future preset requires implementation once, then authors select it in Markdown.

Support ordinary code fences and accessible equation rendering (including the specimen's `math` fence). Do not hardcode one equation. Retain heading anchors, table of contents and readable static content if the interaction cannot load. The review-only source viewer and unavailable-state test button need not ship.

## Exploration behavior

Lazy-load the 3D renderer on explicit entry. Use the existing SvelteKit/Svelte architecture; Threlte is permitted, with compatible versions verified at implementation time. The prototype uses Three.js directly and is a behavioral reference.

Pause the inline simulation on entry and carry numerical state and speed into exploration. Start paused. Offer play/pause, reset, speed 0.25–2×, orbit visibility, perspective/top view, zoom and rotation. The simulation is planar, viewed through a 3D camera: do not describe it as nonplanar dynamics.

Exit or Escape returns to the same article position and entry focus, preserving numerical state and speed; retain camera choice for re-entry. Pause playback on exit and when hidden. Reset restores the preset and its default controls. On loading failure, show a readable explanation, retry and a working return action. Unmount must cancel animation frames and dispose renderer resources, event listeners and observers. Reduced-motion users start paused and can operate controls without animated transitions.

Desktop uses scene + side controls; mobile stacks a scene above scrollable controls with no overlap. Native keyboard/focus behavior, touch rotation/pinch and browser navigation must be checked in production.

## Photography and synchronization

Use all available cached photos, not a selected subset. Page size: 12 above the mobile layout breakpoint, 6 on mobile (reference `round-5/gallery.css`). Page changes scroll to the gallery heading, preserve a sensible focus position, and never leave an empty invalid page after resizing. Recommended implementation default: preserve the first visible photo across a page-size change.

Viewer traverses the entire archive, including page boundaries, with arrows, Escape and swipe. Return focus to the originating card. Keep caption, accessible image text and original permalink. Lazy-load thumbnails, supply responsive sizes and intrinsic dimensions; load large images on demand.

The local Instagram token was verified expired. Cloud secret contents were not inspected. All 60 cached photos are visible in the prototype, but this is not proof of a complete remote archive. See `instagram-sync-findings.md` for evidence and integration requirements.

Implement full API pagination and image carousel enumeration, stable IDs, safe incremental caching and atomic publication. Retain last-good data on failure. Keep credentials server/job-side. Reconnection must occur through private account/configuration controls, never chat or committed files.

Automatic updates are required; the exact interval is not approved. Fifteen minutes is a proposal subject to host/API limits. Do not label scheduled polling as real-time. Synchronization and credential repair must not prevent unrelated site builds.

## Code organization and implementation sequence

Keep npm/package-lock and the existing SvelteKit structure. Reuse appropriate components and data; avoid broad dependency upgrades. Read `implementation-quality.md` before editing.

1. Shared theme tokens, navigation and responsive shell. Verify persistence and existing route compatibility.
2. Home using `src/lib/data/personal_info.ts`, experience, education and projects; approved assets and uniform project component.
3. Notes index and reading template, preserving `src/content` publication rules and slugs.
4. Markdown schema/transform and registry; separate simulation state, rendering, controls and article integration. Add lazy exploration.
5. Photography pagination/viewer from cached data; then independent synchronization repair and private reauthorization.
6. Final visual, accessibility and performance review; remove prototype artifacts from the production bundle.

Keep each step a bounded reviewable change. Suggested responsibilities: shared theme module; typed content loader; Markdown transform; preset registry; numerical model; scene lifecycle adapter; gallery pagination and viewer. Avoid a large page containing all responsibilities and avoid abstractions without a concrete use.

## Acceptance and delivery

- Compare each canonical reference in light/dark at 1440px and 390px, plus a narrow 320px sanity check. No horizontal overflow, cropped text or overlapping controls.
- Check navigation, current-route indication, theme persistence, keyboard focus, dialog Escape/return focus, reduced motion and mobile touch on a physical device where available.
- Verify existing published article URLs and content; a draft stays unpublished; malformed preset config fails with useful diagnostics.
- Verify simulation state/scroll restoration, retry, route teardown and resource cleanup. Test meaningful numerical behavior, not exact animated pixels.
- Verify gallery first/last page, empty archive, archive growth, viewport resize, cross-page viewer navigation and sync failure preserving last-good files.
- Run `npm run check`, `npm run build`, and appropriate lint/format checks. Distinguish existing failures from regressions. Confirm GitHub Pages static output and asset paths remain valid.
- Report changed files, checks performed, limitations and any remaining owner action. Do not deploy or change remote credentials as part of a design approval.

Prototype checks demonstrate interaction intent only; production validation remains required. Open integration decisions are limited to verified dependency versions, synchronization mechanism/interval and private Instagram reconnection. Do not redesign approved surfaces while resolving these.

## Prompt for the implementation model

Read `design-demos/IMPLEMENTATION-HANDOFF.md`, `design-demos/implementation-quality.md` and each canonical reference before editing. Implement the approved English-first personal website in the existing SvelteKit repository, one bounded step at a time, starting with the shared theme and shell. Preserve content and routes, write clean typed code, and verify each step. Treat prototype files as visual/behavior references, not production code. Keep the approved Dao homepage composition and page-specific interactions. Do not publish the sample article, invent personal information, expose credentials, silently choose an unapproved synchronization frequency or deploy. Surface only decisions that cannot be resolved from the handoff and repository.

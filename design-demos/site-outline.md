# Hongbin Miao — Site outline v1

Status: approved by the user. Detailed page designs remain subject to individual review. Homepage must be memorable, English-first, and use Chinese visual elements rather than an orbit as its focal point.

## Purpose and shared experience

A personal website for understanding Hongbin's work, reading notes, exploring ideas through interactive explanations, and viewing photography. English is the primary interface language; individual Markdown notes can be English or Chinese.

Minimal Chinese influence comes from spatial rhythm, restrained ink/paper colors, thin rules and small cinnabar accents. English typography must be evaluated on its own merits rather than inheriting Chinese font metrics.

Global navigation: **Home · Notes · Photography**, with a consistently placed **Light / Dark** control. The name links home. Keep existing `/blog` URLs while labeling the section Notes. GitHub and LinkedIn remain available in the shared footer and homepage contact area, using existing profile URLs.

First visit follows system theme. Explicit selection persists across navigation and reloads. Diagram, code and canvas palettes respect that selection. Shared navigation and focus behavior remain predictable even when page layouts differ.

## Page map

| Route / state | Main content | Interaction | Approval state |
| --- | --- | --- | --- |
| `/` — Home | Introduction, projects, notes entry, background, contact | Ordinary vertical scrolling, project preview on deliberate interaction | Proposed |
| `/blog` — Notes | Published notes, title, summary, authentic date, topic and interactive label where applicable | Click to read; topic filtering once useful | Proposed |
| `/blog/[slug]` — Note | Markdown prose, headings, figures, references, optional component presets | Table of contents, inline controls, optional exploration mode | Reading direction approved; English adaptation pending |
| `/photography` — Photography | Existing photographs, authentic captions and dates where available | Still gallery, open image viewer, previous/next, keyboard and touch controls | Proposed |
| Article exploration state | The same article's interactive scene and explanation | Expanded scene, play/pause, reset, scene-specific parameters, explicit return to reading | Proposed; not an extra top-level destination |

Projects and About remain sections of Home for the initial scope. Existing external project repositories remain the source links. Do not invent separate project-detail pages or an empty Experiments section. A project can later link to an actual published explorable note.

## Home: content order

1. **Introduction** — Hongbin Miao, optional secondary 缪鸿彬, existing portrait, concise English introduction about first-principles learning and building intuition.
2. **Selected Projects** — Three Body Problem as the featured exploration; other genuine projects follow. Each item contains a name, short description, existing preview if available, and verified destination. Preserve access to all six existing projects, for example through an inline Show all projects disclosure. No newly invented achievements or dates.
3. **Notes** — a compact entry to the writing archive, with latest published entries only when they exist. If none exist, use an honest empty state; never publish the design sample as an actual note.
4. **Background** — existing Education and Experience content in a compact, readable sequence. Retain source dates and titles for user review rather than inferring current employment or graduation status.
5. **Elsewhere** — existing GitHub and LinkedIn links. Photography remains directly reachable from the main navigation.

Homepage motion should be modest. A visitor can learn who Hongbin is without completing an animation or entering a 3D scene. Scene previews start deliberately and have static fallback states.

## Notes index

- Page title: **Notes**. A simple list with a clear title hierarchy rather than heavy cards.
- English default labels; preserve each note's actual language and metadata.
- Distinguish an interactive article with the text **Interactive**; do not create separate writing silos for ordinary and interactive notes.
- Start without a search interface if there are too few published notes to justify it. Search can be specified later when the archive warrants it.
- Unpublished Markdown remains excluded. Review empty, populated and narrow-screen states.

## Article template

- Title, summary, author and genuine publication metadata; no fake reading counts.
- Desktop: navigation, comfortable reading column, nearby contents and optional marginal notes.
- Mobile: one reading column, an accessible contents disclosure, controls directly adjacent to each diagram; marginal notes become inline notes.
- Plain Markdown remains sufficient for normal notes. An optional interactive configuration block selects a known component and preset. Exact production configuration grammar is still to be specified.
- Reading and exploration are states of the same article. Returning from exploration preserves reading position and component state, except when Reset is explicitly chosen.
- A full-screen scene must provide a visible Exit exploration control, Escape behavior, and theme control. Avoid scroll interception that traps the reader.
- English heading, paragraph, code, long URL, formula and caption specimens need visual review. The round-2 View Markdown control belongs to the review workspace; it is not automatically a public-site feature.

## Photography

- Replace the current auto-scrolling presentation with a proposed still, spacious gallery so the viewer controls pace. This visual change requires approval.
- Use existing photo data and original aspect ratios; no stock images standing in for personal work.
- Image viewer supports close, previous/next, Escape, keyboard arrows, touch targets, focus return and captions only when real data exists.
- Empty and failed-image states remain useful. No albums, map, external sync redesign or new content management workflow is implied.

## Shared states to design before handoff

Light and dark; desktop and mobile; keyboard focus; reduced motion; empty archive; missing image; unavailable 3D; unknown article / 404. Long content must remain readable at enlarged text sizes. Heavy scenes load only where needed.

## Review sequence and implementation handoff

1. Approve or revise this page map and homepage section order.
2. Review the English homepage and Notes index together.
3. Review English adaptation of the approved article, including mobile, light/dark, code and formula specimens.
4. Review Photography and expanded 3D exploration states.
5. Freeze shared design tokens, component contracts, authoring format, data mapping and acceptance criteria; hand off bounded implementation tasks to the user's chosen smaller model.

No production changes are part of this outline pass.

## Approved ordering correction

User requests Experience before Projects and consistent project formatting. Current homepage order: Introduction → Background (Experience and Education) → Projects → Notes → Elsewhere. All six projects use the same name/description/technology/link structure; no featured-project exception or hidden extra-project list. This supersedes the original homepage order above.

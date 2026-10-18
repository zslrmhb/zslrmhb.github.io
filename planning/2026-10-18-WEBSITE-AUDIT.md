# Website audit — 2026-10-18

Baseline: `svelte5`, commit `1aae0ab`. Current local source and `http://127.0.0.1:5173` were audited. Production deployment was not compared against this commit. This was an audit and planning pass; application source was not edited.

Method: independent source assessments by `/root/audit_design` and `/root/audit_technical`, followed by parent browser verification and synthesis. Impeccable context and audit guidance were used. The incumbent implementation is visual authority: no PRODUCT.md or DESIGN.md exists. This documentation gap does not justify a redesign.

## Verdict

**The visual identity passes; implementation needs a focused repair pass.** Paper, ink, restrained vermilion, the calligraphic landscape, literary section headings, and bilingual name form an authored system. Preserve it. The biggest defects are functional and delivery-related, rather than a need for more decoration.

| Dimension                | Score / 4   | Evidence                                                                                                                          |
| ------------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Accessibility            | 2           | Visible focus, skip link and native dialogs; photograph alternatives do not describe content. Touch comfort needs improvement.    |
| Performance              | 2           | 3D loads dynamically, but originals are reused as gallery thumbnails and the hero is a 2.52 MB PNG.                               |
| Theming                  | 3           | Coherent tokens and adequate sampled text contrast; persisted dark theme flashes light before hydration.                          |
| Responsive design        | 2           | Tested layouts fit narrow screens; mobile 3D canvas collapses to zero height and gallery images lack intrinsic space reservation. |
| Implementation integrity | 3           | Coherent components and Markdown pipeline; lab publication contradicts intent, TOC wave is missing, quality gates fail.           |
| **Total**                | **12 / 20** | **Acceptable: significant focused repairs required.**                                                                             |

**16 findings: P0 0 · P1 4 · P2 11 · P3 1.** Scores are bounded audit judgments, not accessibility certification or Lighthouse measurements.

## Verification and limits

- Rendered routes: home, Notes catalog, AI Resources (including `#engineering`), photography, Interaction Lab and its 3D dialog.
- Browser: Codex in-app Chromium; viewport emulation at 1440×1000, 768×1024, 390×844 and 320×800 across representative routes. Viewport override reset afterward. Not every route/theme/width permutation was captured.
- At 320px, home/catalog/gallery showed no horizontal document overflow. Gallery hydrated to six photographs per page, 14 pages, 83 total. At 768px the article was 656px wide with no document overflow. The desktop article retains its centered ~800px prose area and left TOC.
- Desktop final-section tracking correctly marked Engineering active. TOC focus revealed its panel. References appeared at the article bottom without icons; in-page links targeted matching heading IDs. Pointer-following wave was assessed from source; this browser API did not exercise hover movement.
- 3D dialog opened and returned focus to Explore in 3D when closed. Mobile canvas measured 280×0 inside a 280×290 scene; desktop canvas was nonzero. On desktop, spheres were absent before Reset and appeared after Reset.
- Both themes were observed, including a light first render followed by persisted dark after hydration. Token contrast: light muted 4.98:1, dark muted 8.45:1, light accent 5.38:1, dark accent 7.62:1, each against its paper background. This samples the principal text tokens, not every graphical mark or state.
- `npm run check`: passes, zero errors/warnings. `npm run build`: passes; generated Svelte warnings, upstream unused imports and a deferred 780.57 kB / 205.99 kB gzip chunk warning remain.
- `npx eslint src scripts`: fails with five errors (two unused variables in BlurFade, three prefer-const errors in data modules). Prettier scoped to source/scripts/config flags six files. The full lint script also sweeps generated output and local tooling because its ignore scope is incomplete.
- Detector: `impeccable detect --json src` returned `[]` (zero findings, no false positives). A clean detector does not override the runtime failures below.
- No detector overlay was injected: evaluation is read-only. No auxiliary live server was started. Existing Vite server was reused. Temporary logs are in `/tmp/site-audit-*.log`.
- Physical iOS/Android, synthesized pinch/swipe, assistive technology, 200% text scaling, network throttling, WebGL loss and actual Instagram credentials were not exercised. These are verification gaps, not claimed passes.

## Findings

### F01 · P1 · Mobile 3D renders an empty scene

- Location: `src/lib/interactive/ThrelteCanvas.svelte:10`; `src/lib/interactive/interactive.css` mobile `.scene` rules; `Explorer.svelte:35`.
- Category: Responsive / implementation integrity.
- Evidence: at 320px, scene container height 290px; child wrapper and canvas height zero. Dialog announces Ready and enables controls.
- Impact: phone visitors cannot see the experiment despite successful-looking controls.
- Recommendation: establish a definite, responsive canvas host height; signal readiness only after a nonzero renderer and scene are ready. Retain the Threlte architecture and lazy import. Add a meaningful failure/retry path around renderer creation.
- Suggested command: `$impeccable harden`, then `$impeccable adapt`.

### F02 · P1 · 3D bodies are invisible on first open

- Location: `src/lib/interactive/ThrelteScene.svelte:41,54,131` and mesh `oncreate` handler.
- Category: Implementation integrity.
- Evidence: grid and orbit draw on desktop, bodies do not; Reset makes all three bodies visible. Simulation initially contains an empty array; mesh creation positions bodies before mount populates it, and mount does not resynchronize them.
- Impact: the first view presents an incomplete experiment and undermines the control contract.
- Recommendation: initialize from a valid snapshot before positioning any mesh, validate snapshot length/finite values, and synchronize after refs and state are ready. Do not auto-play to conceal the defect.
- Suggested command: `$impeccable harden`.

### F03 · P1 · Gallery thumbnails download original photographs

- Location: `scripts/fetch-instagram.mjs:127–129`; `src/routes/photography/+page.svelte:118`.
- Category: Performance.
- Evidence: all 83 records use the same file for `thumb` and `url`. First six originals total 12,272,445 bytes; first twelve total 13,653,029 bytes. These are file totals, not a claim that lazy loading transfers them simultaneously.
- Impact: large phone downloads, slow image appearance and unnecessary data use.
- Recommendation: generate responsive, uncropped thumbnail derivatives and `srcset`/`sizes`; load originals only in the viewer. Keep full archive pagination and original quality.
- Suggested command: `$impeccable optimize`.

### F04 · P1 · Photographic alt text does not describe photographs

- Location: `src/routes/photography/+page.svelte:31`; photo metadata and refresh normalizer.
- Category: Accessibility; WCAG 1.1.1.
- Evidence: the first five descriptions are “Photograph: #photography #fujifilm”; 38 of 83 captions are empty and fall back to dates.
- Impact: screen-reader visitors receive hashtags/dates without the visual subject of the work.
- Recommendation: add a durable per-photo alt-description field, separate from the Instagram caption. Preserve authored overrides across refreshes. Describe actual image contents; do not infer them from hashtags. Completing all descriptions requires image review/editorial input.
- Suggested command: `$impeccable harden`.

### F05 · P2 · Test lab is published as a public note

- Location: `src/content/interaction-lab.md:6`; `src/routes/api/content/+server.ts:15`.
- Category: Implementation integrity / information architecture.
- Evidence: `published: true`; catalog lists “Draft Interaction lab”; body says keep unpublished. User designated it an interaction regression surface.
- Impact: a test fixture is presented as official writing and receives inconsistent publication metadata.
- Recommendation: make it unpublished and use the existing dev `?preview` path for regression checks. Do not delete the fixture or register it as a dated official post. Confirm production output excludes it.
- Suggested command: `$impeccable clarify`.

### F06 · P2 · TOC only partially implements the requested interaction

- Location: `TableOfContents.svelte:28–39,69–92`; `reading.css:104–175`.
- Category: Implementation integrity / responsive.
- Evidence: hidden rail and focus/hover panel exist; no pointer-distance or proximity-wave logic exists. H3 entries receive the next flat number (Books 03, Theory 04, Engineering 05); title CSS forces ellipsis; fixed centered panel has no viewport height cap.
- Impact: interaction differs from the requested wave, hierarchy becomes misleading, and future long notes can produce unreachable TOC content. Long-title/list cases are source-proven risks; not reproduced by today's short lab title/list.
- Recommendation: preserve default-hidden rail and hide-on-pointer-exit behavior; restore a restrained proximity wave to rail marks. Keep panel unboxed, use full wrapping titles and hierarchical numbering (3, 3.1, 3.2). References/Appendix stay unnumbered. Cap tall panels to viewport and allow internal scrolling while short panels grow around their vertical center. Keep keyboard and touch alternatives. Remove decorative desktop CONTENTS label, consistent with the earlier minimalism preference; retain a clear mobile disclosure label.
- Suggested command: `$impeccable animate`, `$impeccable layout`.

### F07 · P2 · Saved dark theme is applied after first paint

- Location: `src/app.html:3`; `src/routes/+layout.svelte:11`; `src/lib/theme.ts`.
- Category: Theming.
- Evidence: navigation captures show light SSR view before dark hydration; initialization occurs only in onMount.
- Impact: bright page flashes during dark-mode navigation/reload.
- Recommendation: minimal pre-paint theme bootstrap aligned with the store; guard storage access and avoid theme/store disagreement. Validate hard reload and client navigation.
- Suggested command: `$impeccable harden`.

### F08 · P2 · Large hero and portrait assets lack responsive derivatives

- Location: `Hero.svelte:12`; `Index.svelte:14`; static landscape and portrait assets.
- Category: Performance.
- Evidence: landscape PNG 2,524,007 bytes; portrait ~1.2 MB for a small display size.
- Impact: the most important first impression carries unnecessary transfer/decode cost.
- Recommendation: create high-quality WebP/AVIF variants, responsive sources and intrinsic dimensions. Preserve the approved embedded calligraphy, complete frame, tonal range and ink strokes. Do not regenerate the artwork or crop it.
- Suggested command: `$impeccable optimize`.

### F09 · P2 · Mobile gallery images do not reserve their aspect ratio

- Location: `photography/+page.svelte:118`; `photography.css:241`.
- Category: Responsive / performance.
- Evidence: `height:auto`, no width/height attributes and no per-image aspect ratio. Layout-shift magnitude was not measured.
- Impact: loading images can move subsequent photographs and navigation.
- Recommendation: store natural dimensions during processing and reserve each photograph's actual ratio. Preserve uncropped rendering.
- Suggested command: `$impeccable adapt`.

### F10 · P2 · Instagram failure blocks unrelated site builds

- Location: `.github/workflows/instagram.yml:31–43`; `fetch-instagram.mjs:144–148`.
- Category: Implementation integrity / reliability.
- Evidence: refresh exits 1 even with a valid existing cache; next build step uses default success condition.
- Impact: an expired token/API outage prevents a portfolio code change from being built.
- Recommendation: explicitly distinguish refresh failure with valid cache from absence of usable data. Build from the validated last cache, visibly report refresh failure, and fail when no valid cache exists. Never silently label a failed refresh successful.
- Suggested command: `$impeccable harden`.

### F11 · P2 · Per-image refresh failure discards working local metadata

- Location: `fetch-instagram.mjs:124–132`.
- Category: Implementation integrity / reliability.
- Evidence: catch appends the remote record rather than previous valid cached record, even when local files exist.
- Impact: a transient download error can replace a durable local URL with an expiring external URL.
- Recommendation: retain the previous valid local record for that ID, merge new metadata safely, and write metadata atomically after validation. Keep cleanup constrained to valid retained references.
- Suggested command: `$impeccable harden`.

### F12 · P2 · Featured article opens catalog instead of article

- Location: `src/lib/components/Index.svelte:60`.
- Category: Implementation integrity / navigation.
- Impact: clicking AI Resources adds an unexpected catalog step; adjacent All notes already performs that action.
- Recommendation: featured entry links directly to `/blog/deep-learning-resources`; All notes stays `/blog`.
- Suggested command: `$impeccable clarify`.

### F13 · P2 · Quality checks do not provide a clean maintenance gate

- Location: `package.json` lint/format scripts; `.prettierignore`; source files listed in verification.
- Category: Implementation integrity.
- Impact: generated output/tooling noise and actual source lint errors make future regressions harder to distinguish.
- Recommendation: define authored-source scopes, exclude generated build/docs/tooling from formatting, repair the six source formatting findings and five ESLint errors. Do not disable rules or rewrite generated assets to obtain green checks.
- Suggested command: `$impeccable harden`.

### F14 · P2 · Mobile navigation has small touch areas

- Location: `src/app.css:245–264`; navbar links.
- Category: Responsive / accessibility.
- Evidence: at 320px links measure ~20.4px high; theme toggle 42px. Text fits without overflow.
- Impact: less comfortable one-handed navigation. This alone is not a proven WCAG 2.5.8 failure because spacing exceptions may apply.
- Recommendation: enlarge hit areas toward 44px without visually enlarging the text or crowding five links. Test short/wide names and 200% text; allow a deliberate alternate row arrangement if required.
- Suggested command: `$impeccable adapt`.

### F15 · P2 · Reduced-motion policy is broad and misses explicit JS scrolling

- Location: `src/app.css:283`; `photography/+page.svelte:38`.
- Category: Accessibility.
- Evidence: global 0.01ms animation/transition override; pagination explicitly requests smooth scroll in JS.
- Impact: the CSS policy does not directly express the intended pagination behavior, and blanket overrides make future feedback fragile. OS emulation was not exercised.
- Recommendation: use an explicit reduced-motion branch for JS scrolling; replace global timing collapse with targeted alternatives that preserve focus, selection and state feedback. Wave should become static emphasis under reduced motion.
- Suggested command: `$impeccable animate`.

### F16 · P3 · CJK typography relies on incidental font fallback

- Location: `src/app.css:23–27`; home Chinese headings; `photography.css:17–20`.
- Category: Implementation integrity / typography.
- Evidence: a CJK serif token exists, but Chinese headings inherit the Latin display stack and the Chinese quote uses italic Georgia/serif.
- Impact: character shape, rhythm and apparent weight vary more than intended across operating systems.
- Recommendation: explicitly apply the existing CJK serif stack and upright styling to Chinese UI/quote text; retain the embedded calligraphy for brushwork. Keep English section labels legible but preserve the user-approved literary Chinese headings. Audit Windows/Android fallback before introducing a downloaded CJK font.
- Suggested command: `$impeccable typeset`.

## Patterns, positives and design decisions

- Preserve: English-first content, bilingual name, Chinese literary headings, complete calligraphy artwork, experience before projects, uniform project format, plain icon-free references, centered prose, left default-hidden TOC, archive of all photographs and deliberate pagination.
- Main systemic gap: readiness/publication/fetch states can claim more than the underlying data or renderer supports. Repair those contracts before visual refinement.
- Main delivery gap: asset reuse substitutes full originals for appropriately sized images. Fix the pipeline once rather than CSS-hiding the cost.
- Typography: Latin display/prose hierarchy and spacing are already strong. Keep 19px/1.85 desktop prose and the current article width unless device verification identifies a concrete defect. No evidence supports wholesale font replacement or widening all prose again.
- Gallery slot/caption spacing and repeated hero invitations are optional design choices, not release defects. Do not change them during the functional repair batches.
- Deferred 3D bundle is large but correctly lazy-loaded; do not move it into the initial article bundle to remove a warning.
- Future authoring edge case: explicit `## References` plus generated citations can duplicate the references ID. Include a regression fixture when touching reference code; current lab has no duplicate references heading.

## Recommended order

1. `$impeccable harden`: F01/F02/F05/F10/F11/F12/F13.
2. `$impeccable optimize`: F03/F08, alongside dimensions for F09.
3. `$impeccable harden`: F04 metadata support and authored descriptions.
4. `$impeccable animate` and `$impeccable layout`: F06/F15, retaining minimalism and focus support.
5. `$impeccable adapt` and `$impeccable typeset`: F09/F14/F16; `$impeccable harden` for F07.
6. `$impeccable audit`: one bounded acceptance pass across routes and device classes.
7. `$impeccable polish`: final screenshot review after functional acceptance.

The companion `LUNA-REVISION-HANDOFF.md` converts these into small, verifiable batches. You can ask for these one at a time, all at once, or in a preferred order. Re-run `$impeccable audit` after fixes. Questions skipped: this request is for an audit and implementation handoff, with aesthetic direction already established.

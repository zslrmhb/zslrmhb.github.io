# Website audit follow-up — 2026-10-18

This follow-up audits the current working tree after the A–F implementation batches in `LUNA-REVISION-HANDOFF.md`. It supersedes their old “remaining” status where source evidence shows a fix is now present. This is a local audit; the deployed GitHub Pages site was not compared with the current worktree.

## Health score after the follow-up fixes

| Dimension                |   Score / 4 | Current evidence                                                                                                                                                                                                                              |
| ------------------------ | ----------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accessibility            |           3 | Semantic landmarks, keyboard-accessible controls, per-photo descriptions for all 83 items, and visible focus patterns. Reduced-motion behavior has not been exercised with OS emulation or assistive technology.                              |
| Performance              |           3 | 480/960 responsive gallery derivatives, small hero candidates, lazy-loaded originals in the viewer, and dynamically loaded 3D. The deferred 3D chunk still triggers Vite’s size warning.                                                      |
| Theming                  |           4 | Shared light/dark tokens, a pre-paint theme script, storage-failure guards, and high sampled text contrast from the baseline audit.                                                                                                           |
| Responsive design        |           3 | Browser layouts reviewed at 320, 390, 768 and 1440 CSS pixels; no document overflow in sampled views. Navigation and gallery pagination controls now measure at least 44px high. Real touch gestures and 200% browser zoom remain unverified. |
| Implementation integrity |           4 | Impeccable detector returns no findings; `svelte-check`, 14 unit tests, lint and production build pass. Test coverage does not replace live service or physical-device checks.                                                                |
| **Total**                | **17 / 20** | **Good. Remaining work is targeted accessibility polish and final device verification, not a redesign.**                                                                                                                                      |

No P0 or P1 defects were verified. The P2 motion-policy refinement and the 44px gallery target change are now implemented. One P3 optimization opportunity remains deferred; no wholesale typography, layout or color revision is supported by the evidence.

## Verified strengths to preserve

- The first viewport joins the English personal introduction with the approved ink landscape/calligraphy. The artwork, experience-first order, restrained paper/ink/vermilion palette, and bilingual navigation remain distinctive and coherent in both themes.
- Notes catalog and the AI Resources article render cleanly on mobile. The article remains Markdown-authored; its TOC is left aligned, hidden at rest on desktop, hierarchical, and tracks the `Engineering` hash. The lab is clearly labeled as an unpublished design sample and is absent from the published catalog.
- TOC rail marks now register through a small Svelte action instead of a non-reactive `bind:this` array assignment. A fresh lab-preview load and opening its 3D dialog produce no browser warnings or errors.
- The photography page keeps all 83 entries, shows six per phone page, preserves uncropped composition, provides responsive derivatives, and has a separate descriptive alt override for every photo. At 320px, the full quote wraps without horizontal overflow; pagination controls maintain 44px targets. The exact _Yi Yi_ quotation and attribution are present.
- At 320, 390, 768 and 1440 CSS pixels the 3D modal has a nonzero canvas, shows the orbit and all three bodies on first open, and introduces no document overflow in the sampled layouts. The scene is optional and lazy-loaded; camera state, speed, failure handling and close-to-reading behavior are implemented. Unit coverage includes initial snapshot validation and restoring the camera preset.
- `npm run check` passes with zero diagnostics; `npm test` passes 14/14; `npm run lint` passes; `npm run build` passes; `git diff --check` passes. The detector result is `[]`.

## Findings

### Resolved — Reduced-motion CSS applied a site-wide timing override

- **Location:** `src/app.css:296–303`.
- **Category:** Accessibility / motion.
- **Change:** the global `*` animation/transition kill was removed. Reduced motion now sets root scrolling to instant and disables transitions only on the decorative TOC rail and panel; active heading and focus state remain separate.
- **Verification:** Svelte check, unit suite, lint, build and regular-motion browser render pass. The browser harness cannot emulate `prefers-reduced-motion`, so the actual OS-preference branch remains unverified.

### Resolved — Gallery pagination was below the 44px comfort target

- **Location:** `src/lib/styles/photography.css:104–106`.
- **Category:** Responsive / touch ergonomics.
- **Change:** `.gallery-pagination button` now enforces `min-width` and `min-height` of 44px.
- **Verification:** at emulated 390px and 320px widths, page controls measure 44×44px, navigation remains 44px tall, and document width equals viewport width. This is a comfort refinement, not a remediation for a WCAG failure.

### [P3, defer] The 3D chunk remains large, but is not in the initial route payload

- **Location:** Vite production build output; the dynamically imported Threlte scene.
- **Category:** Performance.
- **Evidence:** production build warns about a 780.57kB chunk (205.99kB gzip); the feature is loaded only when the visitor opens 3D.
- **Impact:** it can delay the optional experiment on slower connections, but does not burden the initial article or homepage.
- **Recommendation:** defer splitting or reducing it until interaction-load measurements show a real delay. Do not make 3D eager or alter the scene architecture just to silence a build warning.
- **Suggested command:** `$impeccable optimize` only if measurement warrants it.

## Not verified in this environment

Physical iOS/Android behavior, synthesized pinch/swipe, screen-reader output, 200% browser zoom/text scaling, forced reduced-motion runtime behavior, blocked localStorage, live Instagram refresh with a real token, and production deployment parity. These are acceptance gaps, not confirmed defects. Mocked Instagram tests cover pagination, token failure without secret leakage, cache fallback and interrupted atomic metadata writes. The page’s actual photo descriptions still merit the owner’s editorial review.

## Remaining handoff and verification plan

No new code batch is currently justified. Finish with a bounded acceptance pass; if it reveals a reproducible issue, give Luna only that issue and its evidence.

1. **Acceptance:** review home, catalog, article, photography and unpublished lab preview in both themes; include desktop and phone, 200% zoom, keyboard navigation, reduced motion and touch testing where the harness supports it. Record unsupported checks rather than marking them passed.
2. **If a real defect is found:** use `$impeccable adapt` or `$impeccable animate` only for the affected surface, then rerun the related check. Finish with `$impeccable polish` after functional acceptance.

Leave the deferred 3D chunk unchanged unless measured load performance justifies a targeted optimization. Do not regenerate the approved calligraphy artwork, change the exact photography quote, remove Markdown widgets, publish the lab, run a live Instagram refresh, or push/deploy as part of this handoff.

## Copyable Luna prompt

> Read `planning/2026-10-18-WEBSITE-AUDIT-FOLLOW-UP.md` and `planning/LUNA-REVISION-HANDOFF.md`. Batches A–F and the two small follow-up CSS refinements are already present; do not repeat them. Run the remaining acceptance pass for both themes, 200% zoom, reduced-motion preference, keyboard focus and touch behavior wherever supported. Fix only reproducible defects. Preserve the approved minimal Chinese identity, English-first content, exact photography quote, all 83 photos, Markdown authoring, default-hidden left TOC and lazy Threlte experience. Keep code clean. Report physical-device/AT/token/deployment checks honestly. Do not publish, push, or run a live Instagram refresh.

Recommended order: acceptance review → targeted `$impeccable adapt`/`$impeccable animate` only if a defect is reproduced → `$impeccable polish`.

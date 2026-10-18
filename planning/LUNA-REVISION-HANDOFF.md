# Luna revision handoff

**Current status:** batches A–F below and the two CSS refinements in the follow-up audit are implemented in the local working tree. Do not replay them. The remaining request is final acceptance verification; read [`2026-10-18-WEBSITE-AUDIT-FOLLOW-UP.md`](2026-10-18-WEBSITE-AUDIT-FOLLOW-UP.md) for verified scope and unsupported checks. The original audit and acceptance plan below remain as implementation history and regression coverage.

Prepared 2026-10-18 against `svelte5` commit `1aae0ab`. Read `2026-10-18-WEBSITE-AUDIT.md` first; finding IDs below refer to that report. Batches A–F have now been implemented locally in this checkout. Treat this document as the acceptance checklist for review or a future Luna pass; the changes remain unpublished, and follow-up verification is listed in the final report.

## Outcome and constraints

Repair verified defects while preserving the approved minimal Chinese visual identity. The homepage should remain memorable through the actual landscape/calligraphy and personal name, with quiet supporting UI. English remains the primary content language; literary Chinese headings remain intentional accents.

- Keep the complete existing artwork and its embedded 道可道／非常道 calligraphy. Optimize encoding, never regenerate it, crop it, add a separate competing calligraphy overlay or lower its opacity.
- Keep Hongbin Miao and 缪鸿彬 in the shared navigation, social links there, theme toggle aligned, one navbar per page, experience before projects, and consistent project rows.
- Preserve this exact photography text: `我（们）只能看到前面，看不到后面，这样不是就有一半的事情看不到了吗?` and `《一一》·简洋洋`.
- Keep all 83 baseline photographs; 6/page on phones, 12/page on desktop. No top-60 limit, forced cropping or infinite scroll.
- Keep articles authored in Markdown with preset widgets. Keep D3 for coordinate/data scales, Threlte for optional 3D, and Three.js behind dynamic import.
- TOC stays on the left, centered vertically when short, hidden by default, revealed by pointer/focus and hidden when pointer leaves unless focus remains inside. Content stays centered. No box, decorative header, pin control, arrow icons, title abbreviation or numbered References/Appendix.
- Prefer Tailwind for simple layout, spacing and responsive utilities; use scoped CSS for typography, prose, proximity motion and compositions that benefit from it. Do not rewrite the whole stylesheet merely to change syntax.
- Use small components/functions and explicit state. No ignored TypeScript/ESLint errors, rule disabling, broad dependency updates, guessed personal facts, rewritten project descriptions or visual redesign.
- Do not publish, push or send messages to another task as part of these batches. Return a reviewable diff and validation evidence.

## Batch A — Repair the interaction contract (F01/F02/F05)

Files: `src/lib/interactive/{ThrelteCanvas,ThrelteScene,Explorer}.svelte`, `interactive.css`, `src/content/interaction-lab.md`.

1. Reproduce mobile zero-height canvas before editing. Make the renderer host have definite dimensions at mobile and desktop sizes; ResizeObserver should handle a later resize/orientation change without recreating simulation state.
2. Initialize simulation from a validated snapshot before mesh refs use it. Synchronize positions after refs are ready. Avoid undefined/NaN coordinates and do not require Play/Reset to draw initial bodies.
3. Make ready/error reflect renderer/scene readiness. Catch renderer creation failure at a boundary that actually covers initialization; offer a readable fallback and retry. Keep the article usable and preserve reading position.
4. Make the lab unpublished. The existing development preview route `/blog/interaction-lab?preview#experiment` should remain usable; production catalog/output must exclude the lab. Do not delete it.

Acceptance:

- Fresh open at 320, 390 and 1440px: nonzero canvas, visible orbit and three bodies before Play or Reset. Repeat open/close three times; no lost state or accumulating renderer/tasks/listeners.
- Play/Pause, reset, speed, orbit visibility, camera preset and zoom work. Opening and closing preserves intended playback/camera state and returns focus to the trigger.
- Resize across the 760px breakpoint; scene stays visible. WebGL-unavailable/context-loss path shows an honest fallback and usable return control; no permanent Ready state on an empty scene.
- Browser console has no new application errors. Investigate the observed Svelte `derived_inert` warning if reproduced during open/close; do not suppress it.
- Catalog has only official notes. Production lab route is absent/404; local preview still works.

Tests: add a meaningful regression for snapshot validation/initialization if extracted into pure logic. Runtime rendering and dialog lifecycle require real browser verification, not a test that merely asserts CSS class strings.

## Batch B — Make image delivery economical (F03/F08/F09/F04)

Files: `scripts/fetch-instagram.mjs`, photo metadata/types, photography page, Hero/Index image markup. Add a focused asset processor if needed; avoid coupling all build steps to live Instagram.

1. Generate uncropped responsive derivatives at a small bounded set of widths (for example 480/960px; choose final widths from actual rendered sizes). Keep original photo URLs for the full viewer. Use deterministic names and skip unchanged processing.
2. Record original/derivative dimensions and render width/height or equivalent intrinsic aspect-ratio reservation. Supply correct `sizes` and sources. Keep appropriate eager/lazy loading.
3. Encode responsive hero and small portrait sources. Visually compare ink edges and pale landscape texture at 1×/2× before accepting compression.
4. Add a persistent per-ID alt-description override, separate from caption/date. Metadata merge must preserve descriptions. Review actual photographs to author descriptions; if not all 83 can be accurately reviewed, report the remaining IDs rather than fabricate descriptions or claim accessibility completion.

Acceptance:

- All 83 photo IDs and ordering retained, full viewer quality retained, no invalid sources or absent files.
- Suggested engineering budget: six gallery thumbnail files total ≤1.5 MB; hero candidate used at ordinary desktop size ≤500 KB; small portrait ≤100 KB. These are proposed budgets for this repair, not measured current performance. If detail cannot be preserved, report the tradeoff instead of silently weakening the budget.
- Network inspection confirms the gallery requests derivatives, not originals. Viewer requests originals on demand. Validate 320, 390, 768 and 1440px; no cropping or layout jump from lazy image sizing.
- Screen-reader names describe subjects succinctly, without repeating “Open photograph” twice or using hashtag-only descriptions. Caption remains separately available.

Tests: verify processor metadata dimensions and retained alt overrides on representative portrait/landscape fixtures. Never test against live credentials.

## Batch C — Restore reliable refresh and deployment (F10/F11)

Files: fetch script and `.github/workflows/instagram.yml`.

1. Load/validate the previous cache before refresh. On an individual image failure, keep the valid prior local record for the same ID. Do not replace a working local entry with an expiring remote URL.
2. Validate completed metadata and write atomically. Cleanup must retain all referenced valid assets, including derivatives and fallback records.
3. Distinguish refresh outcome from build eligibility. A failed API refresh with a valid cached archive should build existing content, while exposing a clear failed-refresh warning/job summary. No usable cache should fail explicitly. Avoid unconditional `continue-on-error` that hides data loss.

Acceptance matrix:

| Scenario                                           | Required result                                                  |
| -------------------------------------------------- | ---------------------------------------------------------------- |
| API success                                        | Valid complete cache updated; build succeeds                     |
| Token/API failure + valid cache                    | Cache unchanged; refresh failure visible; site build can proceed |
| Per-photo download failure + previous local record | That local record and image retained; other updates remain valid |
| No usable cache                                    | Clear failure; no empty archive published                        |
| Metadata write interrupted                         | Last valid metadata remains readable                             |

Use mocked responses/files for these tests; do not expose tokens in logs or test output. Do not broaden the workflow's permissions.

## Batch D — Finish TOC behavior and article navigation (F06/F15)

Files: `TableOfContents.svelte`, `reading.css`, possibly small pure heading/proximity helpers. Preserve the incumbent component as the base; do not replace it with a UI package.

1. Keep short rail marks at rest. Derive a subtle wave from pointer distance to each mark, bound to a local hit area; update transforms/scale through one animation frame, not repeated layout reads and writes in a loop. Read geometry once per movement frame or resize, use an appropriate geometry cache, and clean listeners/frames on unmount.
2. Expand the plain text panel on pointer/focus. Pointer exit restores rail unless keyboard focus is still inside. A hidden panel should not intercept unrelated content; focused links must become visible before users act.
3. Desktop title wraps fully, without ellipsis. Short panels grow above/below their midpoint; long panels fit within viewport margins with scroll access to the final entry. Respect coarse-pointer devices with the disclosure fallback.
4. Generate hierarchical numbers: H2 1/2/3; H3 3.1/3.2. References/Appendix have no number and do not advance it. Keep IDs shared with Markdown references. Avoid duplicate IDs for explicit References plus citations if touching that pipeline.
5. Preserve click/hash active state, scrolling updates, bottom-of-document final-section detection and mobile close-on-selection. Use targeted reduced-motion behavior; proximity effects become static emphasis and JS scrolling becomes instant when requested.

Acceptance fixtures:

- Current AI Resources: Books → Theory/Engineering hierarchy, final Engineering highlights on click and at page bottom.
- Current lab preview: heading links and generated bottom references work; References unnumbered, clean list without icons.
- Regression fixture: long article title, ≥30 headings/subheadings, short final section, References and Appendix. No truncation, clipped final links or duplicate IDs.
- Desktop: pointer enter/move/exit and keyboard focus tested. Mobile/tablet: tap disclosure and select heading. At 200% zoom/text scaling all content remains reachable.
- Reduced motion: no proximity animation/smooth jump; active state and focus remain clear.

Tests: heading-number/terminal-heading/ID logic should have data-driven cases. Runtime pointer/focus/scroll integration needs browser verification. Preserve source when a test fails; do not remove the behavior to simplify the test.

## Batch E — Small consistency fixes (F07/F12/F14/F16)

1. Featured AI Resources entry links directly to its article; All notes links to catalog. A one-line correction needs no new unit test.
2. Apply saved/system theme before paint with guarded storage access; hydrate the theme store to that value. Verify hard reload, navigation, denied storage and both themes.
3. Use explicit CJK serif tokens with upright type for Chinese UI/quote. Retain exact wording. Keep existing Latin display/prose hierarchy; do not introduce a new webfont or reduce body size to fit.
4. Improve mobile hit areas toward 44px while preserving understated nav and shared alignment. Check the two-row layout at 320px and 200% text; avoid 11px text as an overflow workaround.

Acceptance: both theme screenshots, phone navigation keyboard/touch review, no duplicated header, no horizontal overflow, full hero artwork, unchanged quote/citation. Optional changes to English/Chinese heading prominence, hero footer or gallery composition require a separate visual proposal; leave them outside this batch.

## Batch F — Restore maintenance checks and final review (F13)

1. Define formatting/lint scope for authored source/config. Exclude generated `docs`, build output, caches and installed local skills; do not hide authored source.
2. Fix actual unused/prefer-const findings; inspect whether BlurFade is imported before removing a legacy component. Format the six reported authored files in a separate mechanical diff. No bulk source cleanup beyond verified unused code.
3. Run the final gates once after edits: Svelte check, scoped ESLint/Prettier, production build, meaningful regressions from A–D.
4. One batched browser review, then one confirmation pass after fixes: home, catalog, article, gallery and lab preview; desktop + phone together. Capture light/dark where relevant. Review 320/390/768/1440px and 200% zoom. Record what was not tested (especially physical devices, touch gestures and assistive technology).
5. Finish with `$impeccable polish` only after functional acceptance. Report upstream build warnings separately from application regressions. Do not make a large lazy 3D bundle eager to silence a chunk warning.

## Review checkpoints and reporting

Keep each batch reviewable and independent. Order A → B/C → D → E → F; avoid doing all visual changes in a single broad patch. After A, B and D, return the changed files, outcome, actual checks and desktop/phone evidence before expanding scope. Do not claim the entire audit fixed if alt descriptions or device testing remain unfinished.

Final output should include: finding IDs addressed, any deferred IDs with a concrete reason, checks and browser sizes exercised, remaining warnings, before/after asset totals, and screenshots for the visually changed surfaces. Provide a clean diff; publishing is a separate action.

## Copyable task prompt

> Current follow-up only: read `planning/2026-10-18-WEBSITE-AUDIT-FOLLOW-UP.md`. Batches A–F and the two CSS follow-up changes are already present. Do not duplicate them. Complete the remaining acceptance checks and fix only reproducible defects. Preserve the approved minimal Chinese design, English-first content, exact photography quotation, Markdown authoring, dynamic Threlte, D3 scales, centered article and default-hidden left TOC. Keep the code clean. Do not redesign, publish, push, or run a live Instagram refresh.

# Round 4 — Notes and English articles

Status: awaiting user review; homepage direction remains approved and untouched.

## Deliverables

- notes.html: English archive with the existing published AI Resources entry; review-only sample separated from real content.
- ai-resources.html: full existing Markdown body in an English reading template. Source facts have not been independently refreshed.
- index.html: English adaptation of the approved interactive reading direction.
- note.md: editable Markdown source for the interactive sample.

## Design decisions

Georgia serif prose at 19px desktop / 18px mobile; approximately 60–70 characters per line at the desktop reading width. Muted sans-serif labels, cinnabar accents, paper/ink themes. Desktop marginal note and contents; mobile contents can collapse and marginal explanation follows the article. Code scrolls inside its container. MathML demonstrates the pairwise gravity equation.

## Huashu-design critique

- Concept: prose and experiments cooperate to build intuition; interactive samples do not displace the identity of the Notes archive.
- Philosophy: the homepage's quiet paper/ink language continues through typography rather than repeating landscape art on every page.
- Hierarchy: title, prose, contents, caption and marginal note have distinct roles. Keep the reading column visually dominant.
- Craft: checked desktop/mobile light and dark rendering, code overflow containment, source view, theme persistence and simulation controls.
- Functionality: archive links to the full existing note; review-only sample stays outside the published archive.
- Originality: restrained editorial continuity rather than another decorative hero. Review whether serif prose is comfortable for the user's expected technical writing.

## Prototype boundaries / implementation handoff

View Markdown and the review banners are author-review tools, not required public UI. Current interactive grammar supports a single known preset. The math block is a specific specimen of the pairwise force equation, not a general LaTeX parser; production must use a proper validated math pipeline. Code is plain monospaced text here, not syntax-highlighted. The figure is a planar numerical model, not Threlte 3D. Production must preserve existing blog URLs and implement shared navigation without copying prototype renderer duplication.

## Validation

verify.cjs confirms playback changes the canvas, reset restores initial state, speed control, persisted theme, source viewing, mobile page-width containment and a working link to the complete existing resource note. No script exceptions observed. PNGs show the desktop and mobile states. Production checks are deferred until implementation.

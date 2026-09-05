# Round 5 — Photography review

Status: awaiting approval. Twelve most recent existing photographs copied from static/ig using static/photos.json. No generated photography or new captions. Dates displayed from cached metadata; image viewer uses UTC consistently. The complete archive has 60 entries; this bounded design study previews 12.

Design: quiet three-column gallery with uncropped images in equal-height display areas, single column on mobile. Shared paper/ink themes, no autoplay or scroll interception. Full-viewport native modal viewer has previous/next, close, keyboard arrows/Escape, basic horizontal swipe and focus return. Theme switching is available inside viewer. Original captions and Instagram links remain available there.

Huashu review: concept is observation through the user's own photos. Keep original colors and framing, clear visual hierarchy and restrained metadata. Craft checked in light/dark desktop and mobile. Viewer functionality checked for opening, next, endpoint disabling, Escape, focus return, theme switching and no horizontal overflow. Remaining refinement: original aspect ratios vary, so the aligned gallery intentionally contains blank space around shorter photos. Ask user whether this rhythm feels right. Generic alt text for images beyond the first three is temporary and needs content-specific authoring before production.

Production should use responsive optimized previews, keep full-resolution images on demand, validate metadata and safely handle failed loads; do not ship copied prototype assets or scripts without review. Swipe behavior is implemented but has not been tested on a physical touch device. This draft does not change Instagram synchronization or publish new content.

## User correction — all photographs and automatic updates

The 12-image review subset was rejected. Current preview now includes all 60 cached photos; original framing and lazy loading remain. Existing Instagram token is verified expired locally; workflow failure and pagination limitations are documented in ../instagram-sync-findings.md. Production synchronization remains outstanding, and all cached photos must not be described as the complete Instagram archive.

## Pagination revision

User requests a limited photo count per page for mobile usability. Current prototype: desktop 12 photos/page, mobile 6; previous/next and numbered pages; page status; page change scrolls to the gallery top and focuses the active page control. All 60 cached photos remain reachable. Viewer navigation still spans the complete archive. These page-size defaults are proposed, not explicitly selected by the user.

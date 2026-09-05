# Round 6 — Exploration review

Status: approved by the user (“approve”). This is a standalone design prototype, not production implementation.

## Intent

An English-first article opens a quiet, full-screen exploration surface. Paper/ink colours and restrained typography carry the site's identity; the Dao landscape remains the homepage focus. This scientific example belongs inside a note, not the homepage hero.

## Review scope

- Reading → Explore → Back to reading, with scroll position, simulation state and speed retained; playback pauses on exit.
- Actual Three.js WebGL perspective view of a planar three-body simulation. Camera orbit is three-dimensional; the physical trajectory remains planar.
- Play/pause, reset, speed, orbit visibility, perspective/top camera, zoom and rotation.
- Light/dark scene and UI; stacked, scrollable mobile controls.
- Loading and unavailable states with retry and an exit to reading. “Preview unavailable state” is a review-only control.

## Design assessment

Concept: exploration extends the article's explanation without taking over the personal homepage.
Hierarchy: scene first, compact controls second, clear return action.
Typography: English serif headings and restrained supporting labels match the reading pages.
Colour: low-contrast reference grid, distinct body colours, theme-aware canvas.
Interaction: explicit entry, paused initial state, reversible controls and preserved reading context.

## Verified

`node design-demos/round-6/verify.cjs` passed in Chrome: WebGL creation, controls, themes, shared speed, scroll and focus restoration, canvas removal, unavailable-state/retry, and 390px layout without horizontal overflow or footer overlap. Desktop and mobile screenshots were visually reviewed. Touch gestures on a physical phone, GPU memory profiling, real network failures and production performance remain implementation checks.

## Implementation boundary

Use the approved SvelteKit architecture and evaluate compatible Threlte dependencies during implementation. Do not copy this standalone prototype into production. Separate numerical state, scene lifecycle, controls and article bridge; validate Markdown presets through a component whitelist. Lazy-load the scene, dispose GPU resources on exit, support reduced motion and preserve a readable static article when WebGL is unavailable.

Exploration layout and controls are approved. Existing Instagram reconnection and sync findings remain separate unresolved integration work in ../instagram-sync-findings.md.

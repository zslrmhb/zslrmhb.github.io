# Interactive notes

Interactive Markdown stays declarative. A note only names a validated component and preset:

````text
```interactive
component: three-body
preset: figure-eight
controls: [play, reset, speed]
explore: true
````

```

`scripts/remark-interactive.js` parses that block and renders the registered Svelte component. The author does not import Svelte, Three.js, or D3 from a note.

## Rendering policy

- **2D:** the current experiment uses a small Canvas renderer. Coordinate transforms live in `plot.ts` and use D3 scales, so an SVG or data-graphic renderer can share the same domain and range later.
- **3D:** `ThrelteScene.svelte` owns the Three.js scene through `@threlte/core` and `@threlte/extras`. The local `ThrelteCanvas` wrapper creates the renderer context, while `T.*` and `OrbitControls` provide scene lifecycle and camera bindings; the physics module stays renderer-agnostic.
- **Widgets:** `src/lib/components/interactive` contains the stable UI vocabulary: `WidgetFrame`, `RangeControl`, `ToggleControl`, and `SegmentedControl`. New experiments should compose these controls instead of creating one-off markup.

The private `interaction-lab.md` page is the regression surface. Keep it unpublished and update it whenever a widget contract changes. Published notes should contain the explanation and a short interactive declaration only.

Do not add another renderer just because a library can draw the current example. Add D3 modules when a note needs scales, shapes, axes, layouts, or data joins. Add Threlte scene helpers when a 3D note needs reactive scene composition, shared camera state, or reusable controls. This keeps the bundle and mental model small while leaving both paths ready for richer work.
```

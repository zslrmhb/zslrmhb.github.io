# Hongbin Miao · personal site

SvelteKit 5 portfolio and Markdown-first notes site with a quiet Chinese visual language.

## Content workflow

- Add a note as `src/content/<slug>.md` with frontmatter and Markdown body.
- Set `published: true` when it is ready for the public notes index.
- Use a fenced `interactive` block only when the note needs a registered visual experiment.
- Keep `src/content/interaction-lab.md` unpublished; it is the regression surface for the interaction system.

## Interaction architecture

The 2D test renderer uses Canvas with D3 scales in `src/lib/interactive/plot.ts`. The 3D test renderer uses Threlte (`@threlte/core` and `@threlte/extras`) over Three.js. Both share the renderer-agnostic numerical model in `physics.ts`. The 3D explorer is dynamically imported only after a reader selects “Explore in 3D”, keeping the initial note bundle light.

Reusable UI controls live in [`src/lib/components/interactive`](src/lib/components/interactive):

- `WidgetFrame` — title, subtitle, content, and caption shell;
- `RangeControl` — labelled numeric range input;
- `ToggleControl` — labelled boolean input;
- `SegmentedControl` — accessible mutually exclusive choices.

Markdown authors do not import these components directly. `scripts/remark-interactive.js` validates a small YAML declaration and maps it to a registered Svelte widget.

## Checks

```sh
npm run check
npm run build
```

`docs/` is the generated GitHub Pages artifact. `design-demos/` contains historical design review material and is ignored by Git.

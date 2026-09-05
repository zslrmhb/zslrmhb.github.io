# Production implementation quality contract

User requirement: clean code. This is a handoff constraint, not authorization to start production implementation.

- Use the existing SvelteKit architecture and package manager. Review dependencies before additions. Preserve existing URLs and content.
- Separate page composition, shared navigation/theme, content loading, Markdown transformation and scene components. Name modules for their purpose; avoid giant page files and speculative abstractions.
- Store design tokens in one shared theme layer. Use scoped component styling; remove superseded experiments, duplicate declarations and prototype CSS overrides from production.
- Maintain typed content and interactive-preset contracts. Validate frontmatter, component identifiers, presets and controls with file/line context for errors. Do not execute arbitrary scripts from Markdown configuration.
- Keep authoring in Markdown; do not require per-article Svelte imports for standard presets. The prototype's limited parser is not a production YAML implementation.
- Lazy-load heavy 3D features. Isolate numerical logic from rendering and user controls. Cancel animation frames and dispose observers, listeners, geometries, materials and textures on unmount. Handle reduced motion and load failures deliberately.
- Preserve theme choice without initial flash or a forced light-mode reset. Navigation and image-viewer controls must remain accessible by keyboard and touch.
- Use approved assets, optimized display sizes, intrinsic dimensions and useful image alternatives. Do not ship review scripts, screenshots, abandoned variants or generation metadata in the site bundle.
- Add focused tests for meaningful behavior: content publication rules, configuration validation, theme persistence, state restoration and numerical invariants where appropriate. Avoid tests that merely repeat the implementation.
- Before each handoff unit, run appropriate type checks and build, verify affected routes/states and review the diff. Record unrelated pre-existing failures honestly.
- Deliver one bounded, reviewable change at a time: theme and shell; Home; Notes; article authoring; interactive presets; Photography. Never treat visual approval as permission to change factual content.

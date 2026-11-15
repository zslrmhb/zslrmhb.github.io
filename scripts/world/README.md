# Static photo features

The generator reads original local files named in `src/data/photos.json`, checks that the data matches `static/photos.json`, and writes deterministic feature JSON plus a manifest to `static/world/`. It does not alter photos, captions, routes, or production visuals. New archive entries are discovered from metadata; no feature file or visual rule needs a hand-authored photo ID.

## Pinned toolchain

- Python 3.12.14
- Pillow 12.3.0 (the only Python dependency)
- Existing Node 24 workflow and SvelteKit static adapter

The scheduled GitHub Pages workflow installs the pinned Python/Pillow pair, runs the focused tests, fetches the photo archive, generates and validates features, then runs the existing static build. `static/world/` is copied into `build/world/` by the existing adapter and into `docs/world/` by the existing workflow. No runtime service is added.

For a local run, create a Python 3.12.14 environment and install the single pinned dependency:

```sh
python3.12 -m venv /private/tmp/living-world-venv
source /private/tmp/living-world-venv/bin/activate
python --version  # must print 3.12.14
python -m pip install -r scripts/world/requirements.txt
npm run world:test
npm run photos:fetch
npm run world:features
npm run world:check
npm run build
npm run world:check -- --output build/world
```

Use a Python 3.12.14 interpreter for the environment creation command; the generator exits with an explicit version error otherwise. The GitHub Actions workflow is the canonical automated environment: Ubuntu, Python 3.12.14, Pillow 12.3.0, and the repository's existing Node 24 static build. It runs the focused tests before fetching, then regenerates and checks the static feature files before the SvelteKit build. No GitHub Pages settings or runtime services are added.

`world:features` writes atomically and refuses to replace unowned files. Existing feature URLs are immutable: if the same URL would receive different bytes, generation fails and keeps the original file. Change the extractor or analysis-config identity before publishing changed feature content. The manifest can be updated after owned feature files validate. `world:check` recomputes the expected outputs and compares them without writing. A non-default `--output` is available for isolated repeatability checks.

The site prerenders the full, chronological photo archive from `photos.json`. Visual echoes uses the generated colour atlas and contour analysis only when visitors choose to compare photographs.

## Feature contract

Each feature file uses `living-world/features@1` and the reviewed `boundary-field-1.3.0` analysis equations. Measurements are configured only by `feature-analysis.config.json` (`living-world/analysis-config@1`). `grammar.config.json` contains scene, camera, animation, lighting, and visual styling values; it is not read by the extractor, so presentation changes do not invalidate image measurements. The manifest's `configSha256` is the SHA-256 of the exact analysis-config bytes.

The feature records source SHA-256, extractor/config identity, oriented dimensions and aspect, luminance distribution, structure-tensor orientation/coherence, complexity/confidence, bright-region centroid, and 192 boundary samples with local boundary support. IDs exist only in the manifest to associate features with archive entries; they do not participate in analysis.

When measurement behavior changes, bump `EXTRACTOR_VERSION`. The extraction equations are explicitly pinned to `boundary-field-1.3.0`; `validate_analysis_config()` rejects a different equation version. When the serialized feature fields or their meaning changes, bump `FEATURE_SCHEMA` and update the Python validator and TypeScript contract. Changing analysis-config bytes changes the analysis hash and output identity. Scene/render-only configuration changes do not.

Images are EXIF-transposed for analysis, tagged profiles are converted to sRGB, and untagged images are assumed sRGB. Transparency is composited over the approved day-paper color for analysis only. Original bytes are not rewritten. Invalid profiles, missing originals, duplicated IDs, out-of-root paths, and mismatched source metadata fail with a direct error.

Three hashes/identities have distinct jobs:

- **Input-derived filename:** the URL contains source SHA-256, extractor version, analysis-config SHA-256, and the cache key. Changes to any of these identities produce a new URL.
- **`cacheKey`:** SHA-256 over canonical JSON containing source SHA-256, extractor version, analysis-config SHA-256, Python version, and Pillow version. This is a reproducibility identity, not a disk cache and not a hash of the output payload.
- **`featureSha256`:** SHA-256 of the exact canonical feature JSON bytes. The validator checks this output-integrity hash and the recorded byte length.

This means a future extractor or toolchain change cannot silently reuse an old feature URL. The generator accepts only the pinned Python/Pillow pair; the manifest validator recomputes the cache key and expected filename from each entry. JSON uses sorted keys, stable numeric rounding, and no timestamps. Independent runs on the same pinned toolchain are byte-identical. The scheduled Linux workflow is the canonical build environment; byte identity across operating systems and image-codec builds has not been established.

### Stale generated feature files

The generator never deletes output. If a photo, analysis config, extractor, or toolchain identity changes, the new manifest points to a new content-addressed feature file and the old file may remain as an unreferenced static artifact. Removed archive photos can likewise leave stale files. This conservative policy avoids destructive pruning. If manual cleanup is needed, first recover a previous manifest from version control or an archived build and confirm its schema and `generatedBy` identity. Remove only feature files it explicitly lists whose current bytes still match each listed `featureSha256`. If that manifest cannot be recovered, leave the orphans untouched. Leave unlisted/modified files and files referenced by the current manifest untouched. Then rerun generation, validation, and the static build.

The generator only prepares measurements. It does not calculate scene geometry, render scenes, or interpret image meaning.

Colour Echoes uses a separate static atlas (`static/world/colour-echoes.json`).
Run `python3 scripts/world/build_colour_echoes.py` with the same pinned Pillow
dependency to refresh it locally. The existing Instagram workflow runs this
after fetching photos. Image digests reuse unchanged measurements across runs;
a change to the extractor, image normalization config, or Pillow version
invalidates them. Include the generated atlas with the implementation so the
static site works before the next scheduled refresh.

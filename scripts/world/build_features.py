#!/usr/bin/env python3
"""Build the versioned, static feature dataset for A Living World.

Only Pillow is needed for pixel analysis. Original images are read, never edited.
The measurements and boundary-support equations are carried forward from the
reviewed boundary-field 1.3 study; this command does not produce scene geometry.
"""

from __future__ import annotations

import argparse
import hashlib
import io
import json
import math
import os
import platform
import re
import sys
import tempfile
from pathlib import Path, PurePosixPath
from typing import Any

from PIL import Image, ImageCms, ImageOps, __version__ as PILLOW_VERSION


ROOT = Path(__file__).resolve().parents[2]
GENERATOR_PATH = "scripts/world/build_features.py"
FEATURE_SCHEMA = "living-world/features@1"
MANIFEST_SCHEMA = "living-world/manifest@1"
ANALYSIS_CONFIG_SCHEMA = "living-world/analysis-config@1"
EXTRACTOR_VERSION = "living-world-extractor-1.0.0"
SUPPORTED_PYTHON = "3.12.14"
SUPPORTED_PILLOW = "12.3.0"
ANALYSIS_CONFIG_FIELDS = {
    "schema",
    "equations",
    "analysisLongEdge",
    "boundarySamples",
    "analysisAlphaMatte",
    "supportPolicy",
    "supportDepthPixels",
    "supportGradientLow",
    "supportGradientHigh",
    "supportActiveThreshold",
}
FEATURE_FIELDS = {
    "schema",
    "sourceSha256",
    "extractor",
    "configSha256",
    "seed",
    "aspect",
    "dimensions",
    "mean",
    "quantiles",
    "histogram",
    "coherence",
    "tangent",
    "complexity",
    "confidence",
    "centroid",
    "concentration",
    "boundary",
    "boundarySupport",
    "supportPolicy",
}
HEX_SHA256 = re.compile(r"^[a-f0-9]{64}$")


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def canonical_json(value: Any) -> bytes:
    return (json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"), allow_nan=False) + "\n").encode("utf-8")


def linear_srgb(channel: int) -> float:
    value = channel / 255
    return value / 12.92 if value <= 0.04045 else ((value + 0.055) / 1.055) ** 2.4


def quantile(sorted_values: list[float], percent: float) -> float:
    return sorted_values[round(percent * (len(sorted_values) - 1))]


def clamp(value: float) -> float:
    return min(1.0, max(0.0, value))


def smoothstep(low: float, high: float, value: float) -> float:
    t = clamp((value - low) / (high - low))
    return t * t * (3 - 2 * t)


def validate_analysis_config(config: Any) -> None:
    if not isinstance(config, dict) or set(config) != ANALYSIS_CONFIG_FIELDS:
        raise ValueError("analysis config fields do not match living-world/analysis-config@1")
    if config["schema"] != ANALYSIS_CONFIG_SCHEMA:
        raise ValueError("analysis config schema version mismatch")
    if config["equations"] != "boundary-field-1.3.0":
        raise ValueError("unsupported feature equations; expected boundary-field-1.3.0")
    if config["supportPolicy"] != "inward-gradient-persistence-v1":
        raise ValueError("unknown boundary support policy")
    for field, minimum in (("analysisLongEdge", 3), ("boundarySamples", 1)):
        value = config[field]
        if not isinstance(value, int) or isinstance(value, bool) or value < minimum:
            raise ValueError(f"analysis config {field} must be an integer >= {minimum}")
    if config["boundarySamples"] != 48:
        raise ValueError("boundary-field-1.3.0 requires exactly 48 samples per side")
    depths = config["supportDepthPixels"]
    if (
        not isinstance(depths, list)
        or not depths
        or any(not isinstance(value, int) or isinstance(value, bool) or value < 1 for value in depths)
    ):
        raise ValueError("analysis config supportDepthPixels must contain positive integers")
    matte = config["analysisAlphaMatte"]
    if not isinstance(matte, str) or not re.fullmatch(r"#[a-fA-F0-9]{6}", matte):
        raise ValueError("analysis config analysisAlphaMatte must be a six-digit sRGB hex color")
    for field in ("supportGradientLow", "supportGradientHigh", "supportActiveThreshold"):
        if not _number(config[field]) or not 0 <= config[field] <= 1:
            raise ValueError(f"analysis config {field} must be finite and in [0, 1]")
    if config["supportGradientLow"] >= config["supportGradientHigh"]:
        raise ValueError("analysis config supportGradientLow must be below supportGradientHigh")


def _paper_rgb(config: dict[str, Any]) -> tuple[int, int, int]:
    color = config["analysisAlphaMatte"].lstrip("#")
    return tuple(int(color[index : index + 2], 16) for index in (0, 2, 4))  # type: ignore[return-value]


def normalize_for_analysis(raw: bytes, source_name: str, config: dict[str, Any]) -> Image.Image:
    """Decode as displayed, convert tagged color to sRGB, and composite alpha.

    Untagged images are assumed to be sRGB. Alpha is composited over the
    analysis matte color for analysis only; the source bytes stay intact.
    Invalid embedded profiles fail with an actionable error instead of being
    silently ignored.
    """
    try:
        with Image.open(io.BytesIO(raw)) as opened:
            opened.load()
            profile_bytes = opened.info.get("icc_profile")
            transparency = "transparency" in opened.info
            has_alpha = "A" in opened.getbands() or transparency
            oriented = ImageOps.exif_transpose(opened)
            alpha = oriented.convert("RGBA").getchannel("A") if has_alpha else None

            if oriented.mode in ("LA", "La"):
                color = oriented.getchannel("L")
            elif oriented.mode == "L":
                color = oriented
            elif oriented.mode == "CMYK" and profile_bytes:
                # Preserve the profile's input color space until LittleCMS has
                # converted it. Converting first would reinterpret CMYK values
                # as RGB and silently produce incorrect measurements.
                color = oriented
            else:
                color = oriented.convert("RGB")

            if profile_bytes:
                try:
                    input_profile = ImageCms.ImageCmsProfile(io.BytesIO(profile_bytes))
                    output_profile = ImageCms.createProfile("sRGB")
                    rgb = ImageCms.profileToProfile(
                        color,
                        input_profile,
                        output_profile,
                        renderingIntent=ImageCms.Intent.PERCEPTUAL,
                        outputMode="RGB",
                    )
                except Exception as error:
                    raise ValueError(f"invalid or incompatible ICC profile: {error}") from error
            else:
                rgb = color.convert("RGB")

            if alpha is not None:
                rgba = rgb.convert("RGBA")
                rgba.putalpha(alpha)
                background = Image.new("RGBA", rgba.size, (*_paper_rgb(config), 255))
                rgb = Image.alpha_composite(background, rgba).convert("RGB")

            # Copy out of the decoder context; callers own this normalized image.
            return rgb.copy()
    except ValueError:
        raise
    except Exception as error:
        raise ValueError(f"could not decode {source_name}: {error}") from error


def extract_feature(
    source_path: Path,
    config: dict[str, Any],
    config_sha256: str,
) -> dict[str, Any]:
    raw = source_path.read_bytes()
    source_sha = sha256(raw)
    image = normalize_for_analysis(raw, str(source_path), config)
    width, height = image.size
    if width < 3 or height < 3:
        raise ValueError(f"image is too small to analyze (minimum 3×3): {source_path}")

    sample = image.copy()
    edge = int(config["analysisLongEdge"])
    sample.thumbnail((edge, edge), Image.Resampling.BOX)
    sample_width, sample_height = sample.size
    if sample_width < 3 or sample_height < 3:
        raise ValueError(f"analysis sample is too small: {source_path}")

    pixel_data = sample.get_flattened_data() if hasattr(sample, "get_flattened_data") else sample.getdata()
    rgb = list(pixel_data)
    luminance = [
        0.2126 * linear_srgb(red) + 0.7152 * linear_srgb(green) + 0.0722 * linear_srgb(blue)
        for red, green, blue in rgb
    ]
    ordered_luminance = sorted(luminance)
    q05, q50, q95, q99 = [
        quantile(ordered_luminance, p) for p in (0.05, 0.5, 0.95, 0.99)
    ]
    spread = q95 - q05

    xx = yy = xy = 0.0
    edges: list[float] = []
    for y in range(1, sample_height - 1):
        for x in range(1, sample_width - 1):
            def at(dx: int, dy: int) -> float:
                return luminance[(y + dy) * sample_width + x + dx]

            dx = (
                -at(-1, -1)
                + at(1, -1)
                - 2 * at(-1, 0)
                + 2 * at(1, 0)
                - at(-1, 1)
                + at(1, 1)
            ) / 8
            dy = (
                -at(-1, -1)
                - 2 * at(0, -1)
                - at(1, -1)
                + at(-1, 1)
                + 2 * at(0, 1)
                + at(1, 1)
            ) / 8
            xx += dx * dx
            yy += dy * dy
            xy += dx * dy
            edges.append(math.hypot(dx, dy))

    coherence = math.sqrt((xx - yy) ** 2 + 4 * xy * xy) / (xx + yy + 1e-9)
    tangent = (0.5 * math.atan2(2 * xy, xx - yy) + math.pi / 2) % math.pi
    histogram = [0] * 16
    for value in luminance:
        histogram[min(15, int(value * 16))] += 1

    bright_weights = [max(0.0, value - q50) for value in luminance]
    bright_total = sum(bright_weights)
    if bright_total > 0.001:
        centroid = [
            sum((index % sample_width) / (sample_width - 1) * weight for index, weight in enumerate(bright_weights)) / bright_total,
            sum((index // sample_width) / (sample_height - 1) * weight for index, weight in enumerate(bright_weights)) / bright_total,
        ]
    else:
        centroid = [0.5, 0.5]

    concentration = sum(
        value > q50 + max(0.015, spread * 0.55) for value in luminance
    ) / len(luminance)
    complexity = sum(value > 0.035 for value in edges) / max(1, len(edges))
    confidence = clamp((q99 - q05 - 0.02) / 0.28) * clamp(
        (quantile(sorted(edges), 0.95) + 0.003) / 0.035
    )

    boundary_count = int(config["boundarySamples"])
    boundary: list[list[float | int]] = []
    supports: list[float] = []
    for side in range(4):
        for index in range(boundary_count):
            position = index / boundary_count
            u, v = (
                (position, 0),
                (1, position),
                (1 - position, 1),
                (0, 1 - position),
            )[side]
            source_x = min(width - 1, round(u * (width - 1)))
            source_y = min(height - 1, round(v * (height - 1)))
            red, green, blue = image.getpixel((source_x, source_y))

            sample_x = min(sample_width - 2, max(1, round(u * (sample_width - 1))))
            sample_y = min(sample_height - 2, max(1, round(v * (sample_height - 1))))
            patch = [
                luminance[(sample_y + oy) * sample_width + sample_x + ox]
                for ox in (-1, 0, 1)
                for oy in (-1, 0, 1)
            ]
            boundary.append(
                [round(u, 5), round(v, 5), red, green, blue, round(max(patch) - min(patch), 5)]
            )

            gradients = []
            for depth in config["supportDepthPixels"]:
                axis_x, axis_y = sample_x, sample_y
                if side == 0:
                    axis_y = min(sample_height - 2, depth)
                elif side == 1:
                    axis_x = max(1, sample_width - 1 - depth)
                elif side == 2:
                    axis_y = max(1, sample_height - 1 - depth)
                else:
                    axis_x = min(sample_width - 2, depth)

                if side in (0, 2):
                    gradient = (
                        luminance[axis_y * sample_width + min(sample_width - 1, axis_x + 1)]
                        - luminance[axis_y * sample_width + max(0, axis_x - 1)]
                    ) / 2
                else:
                    gradient = (
                        luminance[min(sample_height - 1, axis_y + 1) * sample_width + axis_x]
                        - luminance[max(0, axis_y - 1) * sample_width + axis_x]
                    ) / 2
                gradients.append(gradient)

            same_sign = all(value > 0 for value in gradients) or all(
                value < 0 for value in gradients
            )
            minimum = min(abs(value) for value in gradients)
            maximum = max(abs(value) for value in gradients)
            persistence = minimum / (maximum + 1e-9) if same_sign else 0.0
            supports.append(
                persistence
                * smoothstep(
                    float(config["supportGradientLow"]),
                    float(config["supportGradientHigh"]),
                    minimum,
                )
                * confidence
            )

    # Preserve the reviewed circular [1, 2, 1] smoothing and activation floor.
    support_count = len(supports)
    supports = [
        (supports[(index - 1) % support_count] + 2 * supports[index] + supports[(index + 1) % support_count])
        / 4
        for index in range(support_count)
    ]
    supports = [
        value if value >= float(config["supportActiveThreshold"]) else 0.0
        for value in supports
    ]
    supports = [round(value, 5) for value in supports]

    feature = {
        "schema": FEATURE_SCHEMA,
        "sourceSha256": source_sha,
        "extractor": EXTRACTOR_VERSION,
        "configSha256": config_sha256,
        "seed": int(source_sha[:8], 16),
        "aspect": width / height,
        "dimensions": [width, height],
        "mean": round(sum(luminance) / len(luminance), 5),
        "quantiles": [round(value, 5) for value in (q05, q50, q95, q99)],
        "histogram": [round(value / len(luminance), 5) for value in histogram],
        "coherence": round(coherence, 5),
        "tangent": round(tangent, 5),
        "complexity": round(complexity, 5),
        "confidence": round(confidence, 5),
        "centroid": [round(value, 5) for value in centroid],
        "concentration": round(concentration, 5),
        "boundary": boundary,
        "boundarySupport": supports,
        "supportPolicy": config["supportPolicy"],
    }
    validate_feature(feature, source_sha, config_sha256)
    return feature


def _number(value: Any) -> bool:
    return isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value)


def validate_feature(
    feature: Any,
    expected_source_sha: str | None = None,
    expected_config_sha: str | None = None,
) -> None:
    if not isinstance(feature, dict):
        raise ValueError("feature must be a JSON object")
    if set(feature) != FEATURE_FIELDS:
        missing = sorted(FEATURE_FIELDS - set(feature))
        extra = sorted(set(feature) - FEATURE_FIELDS)
        raise ValueError(f"feature fields do not match schema (missing={missing}, extra={extra})")
    if feature["schema"] != FEATURE_SCHEMA:
        raise ValueError("feature schema version mismatch")
    if feature["extractor"] != EXTRACTOR_VERSION:
        raise ValueError("feature extractor version mismatch")
    for key in ("sourceSha256", "configSha256"):
        if not isinstance(feature[key], str) or not HEX_SHA256.fullmatch(feature[key]):
            raise ValueError(f"{key} must be a lowercase SHA-256 hex digest")
    if expected_source_sha is not None and feature["sourceSha256"] != expected_source_sha:
        raise ValueError("source SHA-256 does not match original image")
    if expected_config_sha is not None and feature["configSha256"] != expected_config_sha:
        raise ValueError("feature config hash mismatch")

    dimensions = feature["dimensions"]
    if (
        not isinstance(dimensions, list)
        or len(dimensions) != 2
        or any(not isinstance(value, int) or isinstance(value, bool) or value < 3 for value in dimensions)
    ):
        raise ValueError("dimensions must contain two positive integers >= 3")
    if not _number(feature["aspect"]) or feature["aspect"] <= 0:
        raise ValueError("aspect must be finite and positive")
    if not math.isclose(feature["aspect"], dimensions[0] / dimensions[1], rel_tol=1e-12):
        raise ValueError("aspect does not match oriented dimensions")
    if not isinstance(feature["seed"], int) or isinstance(feature["seed"], bool) or not 0 <= feature["seed"] <= 0xFFFFFFFF:
        raise ValueError("seed must be a 32-bit unsigned integer")

    for key in ("mean", "coherence", "complexity", "confidence", "concentration"):
        if not _number(feature[key]) or not 0 <= feature[key] <= 1:
            raise ValueError(f"{key} must be finite and in [0, 1]")
    if not _number(feature["tangent"]) or not 0 <= feature["tangent"] < math.pi:
        raise ValueError("tangent must be finite and in [0, π)")

    for key, expected_length in (("quantiles", 4), ("histogram", 16), ("centroid", 2)):
        values = feature[key]
        if not isinstance(values, list) or len(values) != expected_length:
            raise ValueError(f"{key} must contain exactly {expected_length} values")
        if any(not _number(value) or not 0 <= value <= 1 for value in values):
            raise ValueError(f"{key} contains a non-finite or out-of-range value")
    if feature["quantiles"] != sorted(feature["quantiles"]):
        raise ValueError("quantiles must be sorted")
    if abs(sum(feature["histogram"]) - 1) > 0.0001:
        raise ValueError("histogram must sum to 1 within rounding tolerance")
    if feature["supportPolicy"] != "inward-gradient-persistence-v1":
        raise ValueError("unknown boundary support policy")

    boundary = feature["boundary"]
    support = feature["boundarySupport"]
    if not isinstance(boundary, list) or len(boundary) != 192:
        raise ValueError("boundary must contain exactly 192 samples")
    if not isinstance(support, list) or len(support) != 192:
        raise ValueError("boundarySupport must contain exactly 192 values")
    for sample in boundary:
        if not isinstance(sample, list) or len(sample) != 6:
            raise ValueError("boundary sample must have six values")
        u, v, red, green, blue, contrast = sample
        if not _number(u) or not _number(v) or not 0 <= u <= 1 or not 0 <= v <= 1:
            raise ValueError("boundary coordinates must be finite and normalized")
        if any(not isinstance(channel, int) or isinstance(channel, bool) or not 0 <= channel <= 255 for channel in (red, green, blue)):
            raise ValueError("boundary RGB values must be integers in [0, 255]")
        if not _number(contrast) or not 0 <= contrast <= 1:
            raise ValueError("boundary contrast must be finite and in [0, 1]")
    if any(not _number(value) or not 0 <= value <= 1 for value in support):
        raise ValueError("boundarySupport contains a non-finite or out-of-range value")


def feature_cache_key(source_sha: str, config_sha: str, toolchain: dict[str, str]) -> str:
    """Identity of one measurement run; the payload hash is stored separately."""
    return sha256(
        canonical_json(
            {
                "sourceSha256": source_sha,
                "extractor": EXTRACTOR_VERSION,
                "configSha256": config_sha,
                "python": toolchain["python"],
                "pillow": toolchain["pillow"],
            }
        )
    )


def _resolve_original(root: Path, photo: dict[str, Any]) -> Path:
    photo_id = photo.get("id")
    url = photo.get("url")
    if not isinstance(photo_id, str) or not photo_id:
        raise ValueError("photo metadata contains a missing/invalid id")
    if not isinstance(url, str) or not url.startswith("/ig/"):
        raise ValueError(f"photo {photo_id} must use a local /ig/ original URL")
    relative = PurePosixPath(url.lstrip("/"))
    if ".." in relative.parts:
        raise ValueError(f"photo {photo_id} has an unsafe original path")
    static_root = (root / "static").resolve()
    source = (static_root / Path(*relative.parts)).resolve()
    try:
        source.relative_to(static_root)
    except ValueError as error:
        raise ValueError(f"photo {photo_id} original path escapes static/") from error
    if not source.is_file():
        raise ValueError(f"photo {photo_id} original is missing: {source.relative_to(root)}")
    return source


def build_payloads(root: Path = ROOT) -> tuple[dict[str, bytes], dict[str, Any]]:
    config_path = root / "scripts/world/feature-analysis.config.json"
    config_bytes = config_path.read_bytes()
    config = json.loads(config_bytes)
    validate_analysis_config(config)
    config_sha = sha256(config_bytes)
    photos_bytes = (root / "src/data/photos.json").read_bytes()
    source_photos = json.loads(photos_bytes)
    static_photos = json.loads((root / "static/photos.json").read_bytes())
    if not isinstance(source_photos, list) or not source_photos:
        raise ValueError("src/data/photos.json must contain a non-empty photo array")
    if source_photos != static_photos:
        raise ValueError("src/data/photos.json and static/photos.json are out of sync")
    ids = [photo.get("id") for photo in source_photos if isinstance(photo, dict)]
    if len(ids) != len(source_photos) or len(set(ids)) != len(ids):
        raise ValueError("photo metadata contains an invalid or duplicate ID")

    toolchain = {"python": platform.python_version(), "pillow": PILLOW_VERSION}
    features: dict[str, bytes] = {}
    entries = []
    for photo in source_photos:
        source = _resolve_original(root, photo)
        feature = extract_feature(source, config, config_sha)
        feature_data = canonical_json(feature)
        feature_sha = sha256(feature_data)
        cache_key = feature_cache_key(feature["sourceSha256"], config_sha, toolchain)
        filename = f"{feature['sourceSha256']}-{EXTRACTOR_VERSION}-{config_sha}-{cache_key}.json"
        relative_feature_path = f"features/{filename}"
        url = f"/world/{relative_feature_path}"
        features[relative_feature_path] = feature_data
        entries.append(
            {
                "photoId": photo["id"],
                "sourceSha256": feature["sourceSha256"],
                "featureSha256": feature_sha,
                "featureUrl": url,
                "cacheKey": cache_key,
                "width": feature["dimensions"][0],
                "height": feature["dimensions"][1],
                "bytes": len(feature_data),
                "schema": FEATURE_SCHEMA,
                "status": "ready",
            }
        )

    manifest = {
        "schema": MANIFEST_SCHEMA,
        "generatedBy": GENERATOR_PATH,
        "extractor": EXTRACTOR_VERSION,
        "analysisConfigSchema": ANALYSIS_CONFIG_SCHEMA,
        "configSha256": config_sha,
        "toolchain": toolchain,
        "imagePolicy": {
            "orientation": "EXIF-transposed for analysis; original bytes unchanged",
            "color": "embedded ICC converted to sRGB; untagged input assumed sRGB",
            "alpha": f"analysis-only composite over {config['analysisAlphaMatte']}",
        },
        "featureCount": len(entries),
        "entries": entries,
    }
    validate_manifest(manifest, source_photos, features)
    payloads = dict(features)
    payloads["manifest.json"] = canonical_json(manifest)
    return payloads, manifest


def validate_manifest(
    manifest: Any,
    source_photos: list[dict[str, Any]],
    feature_payloads: dict[str, bytes] | None = None,
) -> None:
    if not isinstance(manifest, dict) or manifest.get("schema") != MANIFEST_SCHEMA:
        raise ValueError("manifest schema version mismatch")
    if manifest.get("generatedBy") != GENERATOR_PATH:
        raise ValueError("manifest generator identity mismatch")
    if manifest.get("extractor") != EXTRACTOR_VERSION:
        raise ValueError("manifest extractor version mismatch")
    if manifest.get("analysisConfigSchema") != ANALYSIS_CONFIG_SCHEMA:
        raise ValueError("manifest analysis config schema mismatch")
    config_sha = manifest.get("configSha256")
    if not isinstance(config_sha, str) or not HEX_SHA256.fullmatch(config_sha):
        raise ValueError("manifest config hash must be SHA-256")
    entries = manifest.get("entries")
    if not isinstance(entries, list) or len(entries) != len(source_photos):
        raise ValueError("manifest entries do not match the photo archive")
    ids = [entry.get("photoId") for entry in entries if isinstance(entry, dict)]
    if len(ids) != len(entries) or len(set(ids)) != len(ids):
        raise ValueError("manifest contains an invalid or duplicate photo ID")
    if ids != [photo["id"] for photo in source_photos]:
        raise ValueError("manifest photo order/IDs do not match the source archive")
    if manifest.get("featureCount") != len(entries):
        raise ValueError("manifest feature count mismatch")
    toolchain = manifest.get("toolchain")
    if (
        not isinstance(toolchain, dict)
        or set(toolchain) != {"python", "pillow"}
        or any(not isinstance(value, str) for value in toolchain.values())
    ):
        raise ValueError("manifest toolchain is missing")
    if not isinstance(manifest.get("imagePolicy"), dict):
        raise ValueError("manifest image normalization policy is missing")

    for entry in entries:
        if entry.get("schema") != FEATURE_SCHEMA or entry.get("status") != "ready":
            raise ValueError(f"manifest has an unsupported feature status: {entry.get('photoId')}")
        if not HEX_SHA256.fullmatch(str(entry.get("sourceSha256", ""))):
            raise ValueError(f"manifest source hash is invalid: {entry.get('photoId')}")
        if not HEX_SHA256.fullmatch(str(entry.get("featureSha256", ""))):
            raise ValueError(f"manifest feature hash is invalid: {entry.get('photoId')}")
        if not HEX_SHA256.fullmatch(str(entry.get("cacheKey", ""))):
            raise ValueError(f"manifest cache key is invalid: {entry.get('photoId')}")
        expected_cache_key = feature_cache_key(entry["sourceSha256"], config_sha, toolchain)
        if entry["cacheKey"] != expected_cache_key:
            raise ValueError(f"manifest cache key does not match source/config/toolchain: {entry.get('photoId')}")
        expected_url = (
            f"/world/features/{entry['sourceSha256']}-{EXTRACTOR_VERSION}-{config_sha}-{expected_cache_key}.json"
        )
        if entry.get("featureUrl") != expected_url:
            raise ValueError(f"manifest feature URL is invalid: {entry.get('photoId')}")
        if any(not isinstance(entry.get(key), int) or entry[key] <= 0 for key in ("width", "height", "bytes")):
            raise ValueError(f"manifest dimensions/size are invalid: {entry.get('photoId')}")
        if feature_payloads is not None:
            relative = entry["featureUrl"].removeprefix("/world/")
            payload = feature_payloads.get(relative)
            if payload is None:
                raise ValueError(f"manifest feature file is missing: {entry['featureUrl']}")
            feature = json.loads(payload)
            validate_feature(feature, entry["sourceSha256"], config_sha)
            if len(payload) != entry["bytes"] or sha256(payload) != entry["featureSha256"]:
                raise ValueError(f"manifest feature size/hash mismatch: {entry['featureUrl']}")

    if toolchain != {"python": SUPPORTED_PYTHON, "pillow": SUPPORTED_PILLOW}:
        raise ValueError("manifest toolchain is unsupported")


def _existing_manifest(output_dir: Path) -> dict[str, Any] | None:
    path = output_dir / "manifest.json"
    if path.is_symlink():
        raise ValueError(f"refusing to replace a symlinked generated manifest: {path}")
    if not path.exists():
        if output_dir.exists() and any(output_dir.iterdir()):
            raise ValueError(f"refusing to write into non-empty unowned directory: {output_dir}")
        return None
    try:
        manifest = json.loads(path.read_bytes())
    except Exception as error:
        raise ValueError(f"refusing to replace unreadable existing manifest: {path}") from error
    if (
        not isinstance(manifest, dict)
        or manifest.get("schema") != MANIFEST_SCHEMA
        or manifest.get("generatedBy") != GENERATOR_PATH
    ):
        raise ValueError(f"refusing to replace unowned existing manifest: {path}")
    entries = manifest.get("entries")
    if not isinstance(entries, list):
        raise ValueError(f"refusing to replace invalid generated manifest: {path}")
    for entry in entries:
        if not isinstance(entry, dict):
            raise ValueError(f"refusing to replace invalid generated manifest: {path}")
        feature_url = entry.get("featureUrl")
        if not isinstance(feature_url, str) or not feature_url.startswith("/world/"):
            raise ValueError(f"refusing to replace invalid generated manifest URL: {path}")
        relative = feature_url.removeprefix("/world/")
        relative_path = PurePosixPath(relative)
        if (
            relative_path.is_absolute()
            or len(relative_path.parts) != 2
            or relative_path.parts[:1] != ("features",)
            or any(part in ("", ".", "..") for part in relative_path.parts)
        ):
            raise ValueError(f"generated manifest references an unsafe feature: {relative}")
        feature_path = output_dir / relative
        try:
            feature_path.resolve().relative_to(output_dir.resolve())
        except ValueError as error:
            raise ValueError(f"generated manifest feature escapes output directory: {relative}") from error
        if feature_path.is_symlink():
            raise ValueError(f"generated manifest feature is a symlink: {relative}")
        if not feature_path.is_file() or not HEX_SHA256.fullmatch(str(entry.get("featureSha256", ""))):
            raise ValueError(f"generated manifest references a missing/unsafe feature: {relative}")
        if sha256(feature_path.read_bytes()) != entry.get("featureSha256"):
            raise ValueError(f"refusing to overwrite modified generated feature: {relative}")
    return manifest


def write_payloads(output_dir: Path, payloads: dict[str, bytes]) -> None:
    _existing_manifest(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    # Write feature data first. The manifest is the commit marker and is written last.
    ordered = sorted((path, data) for path, data in payloads.items() if path != "manifest.json")
    ordered.extend([("manifest.json", payloads["manifest.json"])])
    for relative, data in ordered:
        relative_path = PurePosixPath(relative)
        if relative_path.is_absolute() or any(part in ("", ".", "..") for part in relative_path.parts):
            raise ValueError(f"refusing to write unsafe generated path: {relative}")
        destination = output_dir.joinpath(*relative_path.parts)
        try:
            destination.resolve().relative_to(output_dir.resolve())
        except ValueError as error:
            raise ValueError(f"generated path escapes output directory: {relative}") from error
        cursor = output_dir
        if cursor.is_symlink():
            raise ValueError(f"refusing to write through a symlinked output directory: {cursor}")
        for part in relative_path.parts:
            cursor = cursor / part
            if cursor.is_symlink():
                raise ValueError(f"refusing to write through a symlinked output path: {cursor}")
        destination.parent.mkdir(parents=True, exist_ok=True)
        if destination.exists():
            current = destination.read_bytes()
            if current == data:
                continue
            if relative != "manifest.json":
                raise ValueError(
                    "refusing to overwrite immutable generated feature URL with different content; "
                    f"bump extractor or analysis config identity: {destination}"
                )
        temporary_name = None
        try:
            with tempfile.NamedTemporaryFile(
                mode="wb", dir=destination.parent, prefix=f".{destination.name}.", delete=False
            ) as temporary:
                temporary.write(data)
                temporary.flush()
                os.fsync(temporary.fileno())
                temporary_name = temporary.name
            os.replace(temporary_name, destination)
        finally:
            if temporary_name and os.path.exists(temporary_name):
                os.unlink(temporary_name)


def check_payloads(output_dir: Path, payloads: dict[str, bytes]) -> None:
    if not output_dir.is_dir():
        raise ValueError(f"generated feature directory is missing: {output_dir}")
    for relative, expected in payloads.items():
        path = output_dir / relative
        if not path.is_file():
            raise ValueError(f"generated output is missing: {path}")
        if path.read_bytes() != expected:
            raise ValueError(f"generated output is stale or nondeterministic: {path}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=ROOT, help="repository root")
    parser.add_argument("--output", type=Path, help="output directory (default: ROOT/static/world)")
    parser.add_argument("--check", action="store_true", help="recompute and compare without writing")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    python_version = platform.python_version()
    if python_version != SUPPORTED_PYTHON:
        raise SystemExit(f"Expected Python {SUPPORTED_PYTHON}; found {python_version}")
    if PILLOW_VERSION != SUPPORTED_PILLOW:
        raise SystemExit(f"Expected Pillow {SUPPORTED_PILLOW}; found {PILLOW_VERSION}")
    root = args.root.resolve()
    output_dir = (args.output or root / "static/world").resolve()
    payloads, manifest = build_payloads(root)
    if args.check:
        check_payloads(output_dir, payloads)
        action = "validated without writing"
    else:
        write_payloads(output_dir, payloads)
        action = "generated"
    features = [
        json.loads(data)
        for relative, data in payloads.items()
        if relative.startswith("features/")
    ]
    print(
        json.dumps(
            {
                "action": action,
                "photos": len(features),
                "schema": manifest["schema"],
                "extractor": manifest["extractor"],
                "configSha256": manifest["configSha256"],
                "toolchain": manifest["toolchain"],
                "featureBytes": sum(len(data) for name, data in payloads.items() if name.startswith("features/")),
                "output": str(output_dir),
            },
            indent=2,
        )
    )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (OSError, ValueError, json.JSONDecodeError) as error:
        print(f"world feature build failed: {error}", file=sys.stderr)
        raise SystemExit(1) from error

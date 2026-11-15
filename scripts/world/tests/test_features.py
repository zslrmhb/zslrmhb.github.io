import hashlib
import json
import sys
import tempfile
import unittest
from pathlib import Path

from PIL import Image, ImageCms

WORLD_DIR = Path(__file__).resolve().parents[1]
ROOT = WORLD_DIR.parents[1]
sys.path.insert(0, str(WORLD_DIR))

from build_features import (  # noqa: E402
    EXTRACTOR_VERSION,
    build_payloads,
    canonical_json,
    extract_feature,
    feature_cache_key,
    validate_analysis_config,
    validate_feature,
    validate_manifest,
    write_payloads,
)


class FeatureExtractionTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.config_path = WORLD_DIR / "feature-analysis.config.json"
        cls.config_bytes = cls.config_path.read_bytes()
        cls.config = json.loads(cls.config_bytes)
        cls.config_sha = hashlib.sha256(cls.config_bytes).hexdigest()
        cls.scene_config_bytes = (WORLD_DIR / "grammar.config.json").read_bytes()
        cls.reference_fixtures = json.loads(
            (WORLD_DIR / "tests/fixtures/sol-v1.3-reference.json").read_text()
        )

    @staticmethod
    def stable_round(value):
        if isinstance(value, bool):
            return value
        if isinstance(value, (int, float)):
            return round(float(value), 5)
        if isinstance(value, list):
            return [FeatureExtractionTests.stable_round(item) for item in value]
        if isinstance(value, dict):
            return {key: FeatureExtractionTests.stable_round(item) for key, item in value.items()}
        return value

    def make_image(self, directory, name, mode="RGB", size=(96, 64)):
        path = Path(directory) / name
        image = Image.new(mode, size)
        pixels = image.load()
        for y in range(size[1]):
            for x in range(size[0]):
                value = round(255 * x / max(1, size[0] - 1))
                if mode == "RGB":
                    pixels[x, y] = (value, 255 - value, (x + y) % 256)
                elif mode == "RGBA":
                    pixels[x, y] = (value, 40, 220, 0 if x < size[0] // 2 else 255)
                else:
                    pixels[x, y] = value
        image.save(path)
        return path

    def test_analysis_config_is_separate_and_locks_reviewed_equations(self):
        validate_analysis_config(self.config)
        wrong_equations = dict(self.config, equations="new-scene-grammar")
        with self.assertRaisesRegex(ValueError, "unsupported feature equations"):
            validate_analysis_config(wrong_equations)
        scene_config = json.loads(self.scene_config_bytes)
        with self.assertRaisesRegex(ValueError, "analysis-config@1"):
            validate_analysis_config(scene_config)

    def test_v13_features_match_sol_reference_for_four_photographs(self):
        photos = {photo["id"]: photo for photo in json.loads((ROOT / "src/data/photos.json").read_text())}
        self.assertEqual(self.reference_fixtures["schema"], "living-world/reference-fixtures@1")
        for reference in self.reference_fixtures["photos"]:
            photo_id = reference["photoId"]
            with self.subTest(photo_id=photo_id):
                photo = photos[photo_id]
                source = ROOT / "static" / photo["url"].lstrip("/")
                current = extract_feature(source, self.config, self.config_sha)
                for field in self.reference_fixtures["scalarFields"]:
                    self.assertEqual(current[field], reference["values"][field], field)
                for field in self.reference_fixtures["arrayFieldsHashed"]:
                    actual_hash = hashlib.sha256(
                        canonical_json(self.stable_round(current[field]))
                    ).hexdigest()
                    self.assertEqual(actual_hash, reference["arraySha256"][field], field)
                self.assertEqual(current["extractor"], EXTRACTOR_VERSION)

    def test_exif_orientation_is_applied_to_analysis_dimensions(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "rotated.jpg"
            image = Image.new("RGB", (80, 40), (80, 130, 180))
            exif = Image.Exif()
            exif[274] = 6
            image.save(path, exif=exif, quality=100, subsampling=0)
            expected_hash = hashlib.sha256(path.read_bytes()).hexdigest()

            feature = extract_feature(path, self.config, self.config_sha)

        self.assertEqual(feature["dimensions"], [40, 80])
        self.assertAlmostEqual(feature["aspect"], 0.5)
        self.assertEqual(feature["sourceSha256"], expected_hash)

    def test_embedded_srgb_profile_is_normalized_without_changing_original_hash(self):
        with tempfile.TemporaryDirectory() as directory:
            plain = self.make_image(directory, "plain.png")
            profiled = Path(directory) / "profiled.png"
            Image.open(plain).save(
                profiled,
                icc_profile=ImageCms.ImageCmsProfile(ImageCms.createProfile("sRGB")).tobytes(),
            )

            plain_feature = extract_feature(plain, self.config, self.config_sha)
            profiled_feature = extract_feature(profiled, self.config, self.config_sha)

        self.assertNotEqual(plain_feature["sourceSha256"], profiled_feature["sourceSha256"])
        self.assertEqual(plain_feature["mean"], profiled_feature["mean"])
        self.assertEqual(plain_feature["coherence"], profiled_feature["coherence"])

    def test_transparent_hidden_rgb_does_not_change_analysis(self):
        with tempfile.TemporaryDirectory() as directory:
            first = self.make_image(directory, "alpha-a.png", mode="RGBA")
            second = Path(directory) / "alpha-b.png"
            image = Image.open(first).copy()
            pixels = image.load()
            for y in range(image.height):
                for x in range(image.width // 2):
                    pixels[x, y] = (255, 0, 0, 0)
            image.save(second)

            a = extract_feature(first, self.config, self.config_sha)
            b = extract_feature(second, self.config, self.config_sha)

        self.assertNotEqual(a["sourceSha256"], b["sourceSha256"])
        self.assertEqual(a["mean"], b["mean"])
        self.assertEqual(a["boundary"], b["boundary"])
        self.assertEqual(a["boundarySupport"], b["boundarySupport"])

    def test_validator_rejects_wrong_schema_and_non_finite_measurements(self):
        with tempfile.TemporaryDirectory() as directory:
            source = self.make_image(directory, "valid.png")
            feature = extract_feature(source, self.config, self.config_sha)

        validate_feature(feature, expected_config_sha=self.config_sha)
        wrong_schema = dict(feature, schema="living-world/features@0")
        with self.assertRaisesRegex(ValueError, "schema"):
            validate_feature(wrong_schema, expected_config_sha=self.config_sha)

        non_finite = dict(feature, coherence=float("nan"))
        with self.assertRaisesRegex(ValueError, "finite"):
            validate_feature(non_finite, expected_config_sha=self.config_sha)

    def test_rejects_corrupt_embedded_profile_and_too_small_images(self):
        with tempfile.TemporaryDirectory() as directory:
            corrupt_profile = Path(directory) / "corrupt-profile.png"
            Image.new("RGB", (32, 24), (80, 120, 160)).save(
                corrupt_profile, icc_profile=b"not an ICC profile"
            )
            too_small = self.make_image(directory, "too-small.png", size=(2, 8))

            with self.assertRaisesRegex(ValueError, "ICC profile"):
                extract_feature(corrupt_profile, self.config, self.config_sha)
            with self.assertRaisesRegex(ValueError, "too small"):
                extract_feature(too_small, self.config, self.config_sha)

    def test_new_archive_photo_needs_no_photo_specific_code_or_feature_id(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "scripts/world").mkdir(parents=True)
            (root / "static/ig").mkdir(parents=True)
            (root / "src/data").mkdir(parents=True)
            (root / "scripts/world/feature-analysis.config.json").write_bytes(self.config_bytes)
            scene_config_path = root / "scripts/world/grammar.config.json"
            scene_config_path.write_bytes(self.scene_config_bytes)
            photo = {
                "id": "new-archive-photo-42",
                "url": "/ig/new-archive-photo-42.png",
                "width": 48,
                "height": 32,
            }
            photo_bytes = canonical_json([photo])
            (root / "src/data/photos.json").write_bytes(photo_bytes)
            (root / "static/photos.json").write_bytes(photo_bytes)
            source = root / "static/ig/new-archive-photo-42.png"
            Image.new("RGB", (48, 32), (40, 120, 180)).save(source)
            source_hash = hashlib.sha256(source.read_bytes()).hexdigest()

            payloads, manifest = build_payloads(root)
            scene_config = json.loads(scene_config_path.read_bytes())
            scene_config.update(
                {
                    "dayPaper": "#111111",
                    "nightPaper": "#eeeeee",
                    "cameraYawMaxDegrees": 35,
                    "openingMs": 250,
                }
            )
            scene_config_path.write_text(json.dumps(scene_config))
            second_payloads, second_manifest = build_payloads(root)

        feature_paths = [path for path in payloads if path.startswith("features/")]
        self.assertEqual(manifest["featureCount"], 1)
        self.assertEqual(len(feature_paths), 1)
        self.assertEqual(payloads, second_payloads)
        self.assertEqual(manifest["configSha256"], second_manifest["configSha256"])
        feature = json.loads(payloads[feature_paths[0]])
        self.assertEqual(feature["sourceSha256"], source_hash)
        self.assertNotIn("photoId", feature)
        self.assertNotIn("new-archive-photo-42", payloads[feature_paths[0]].decode("utf-8"))
        entry = manifest["entries"][0]
        self.assertEqual(
            entry["featureSha256"], hashlib.sha256(payloads[feature_paths[0]]).hexdigest()
        )
        identity = {
            "sourceSha256": entry["sourceSha256"],
            "extractor": EXTRACTOR_VERSION,
            "configSha256": manifest["configSha256"],
            **manifest["toolchain"],
        }
        expected_cache_key = hashlib.sha256(canonical_json(identity)).hexdigest()
        self.assertEqual(
            feature_cache_key(entry["sourceSha256"], manifest["configSha256"], manifest["toolchain"]),
            expected_cache_key,
        )
        self.assertEqual(entry["cacheKey"], expected_cache_key)
        self.assertTrue(entry["featureUrl"].endswith(f"-{expected_cache_key}.json"))
        self.assertNotEqual(entry["featureSha256"], entry["cacheKey"])

        changed_toolchain = json.loads(json.dumps(manifest))
        changed_toolchain["toolchain"]["pillow"] = "12.3.1"
        with self.assertRaisesRegex(ValueError, "cache key"):
            validate_manifest(changed_toolchain, [photo], payloads)

    def test_writer_refuses_to_modify_unowned_output(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "world"
            output.mkdir()
            unrelated = output / "keep.txt"
            unrelated.write_text("user data")

            with self.assertRaisesRegex(ValueError, "non-empty unowned"):
                write_payloads(output, {"manifest.json": b"{}\n"})

            self.assertEqual(unrelated.read_text(), "user data")
            self.assertEqual([path.name for path in output.iterdir()], ["keep.txt"])

    def test_writer_never_overwrites_different_bytes_at_an_existing_feature_url(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "world"
            original = b"original feature bytes\n"
            feature_path = "features/immutable.json"
            manifest = {
                "schema": "living-world/manifest@1",
                "generatedBy": "scripts/world/build_features.py",
                "entries": [
                    {
                        "featureUrl": "/world/features/immutable.json",
                        "featureSha256": hashlib.sha256(original).hexdigest(),
                    }
                ],
            }
            write_payloads(output, {feature_path: original, "manifest.json": canonical_json(manifest)})

            with self.assertRaisesRegex(
                ValueError,
                "immutable generated feature URL.*bump extractor or analysis config identity",
            ):
                write_payloads(
                    output,
                    {feature_path: b"changed feature bytes\n", "manifest.json": canonical_json(manifest)},
                )

            self.assertEqual((output / feature_path).read_bytes(), original)


if __name__ == "__main__":
    unittest.main()

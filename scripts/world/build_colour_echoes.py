"""Build a static, content-addressed atlas of local colour samples."""
import hashlib
import json
import math
from pathlib import Path

from PIL import Image, __version__

from build_features import normalize_for_analysis, _resolve_original

ROOT = Path(__file__).resolve().parents[2]
SIZE = 5


def measure(raw, path, config):
    image = normalize_for_analysis(raw, str(path), config)
    image.thumbnail((160, 160), Image.Resampling.BOX)
    width, height = image.size
    regions = []
    for row in range(SIZE):
        for col in range(SIZE):
            x, y = col * .19, row * .19
            window = image.crop((int(x * width), int(y * height),
                                 math.ceil((x + .24) * width), math.ceil((y + .24) * height)))
            # Sixteen sub-samples preserve colour variation in a region rather than
            # collapsing a mixed patch to one (possibly unrepresented) colour.
            regions.append(window.resize((4, 4), Image.Resampling.BOX).tobytes().hex())
    return regions, image.resize((8, 8), Image.Resampling.BOX).tobytes().hex()


def main():
    output = ROOT / 'static/world/colour-echoes.json'
    config_path = ROOT / 'scripts/world/feature-analysis.config.json'
    config = json.loads(config_path.read_bytes())
    version = hashlib.sha256(Path(__file__).read_bytes() + config_path.read_bytes()
                             + Path(__file__).with_name('build_features.py').read_bytes()
                             + __version__.encode()).hexdigest()
    previous = json.loads(output.read_text()) if output.exists() else {}
    cache = previous.get('samples', {}) if previous.get('version') == version else {}
    whole_cache = previous.get('whole', {})
    samples, whole, photos = {}, {}, {}
    reused = 0
    for photo in json.loads((ROOT / 'static/photos.json').read_text()):
        path = _resolve_original(ROOT, photo)
        raw = path.read_bytes()
        digest = hashlib.sha256(raw).hexdigest()
        photos[photo['id']] = digest
        if digest not in samples:
            if digest in cache and digest in whole_cache:
                samples[digest] = cache[digest]
                whole[digest] = whole_cache[digest]
                reused += 1
            else:
                samples[digest], whole[digest] = measure(raw, path, config)
    payload = json.dumps(dict(version=version, photos=photos, samples=samples, whole=whole), separators=(',', ':')) + '\n'
    if not output.exists() or output.read_text() != payload:
        output.parent.mkdir(parents=True, exist_ok=True)
        temporary = output.with_suffix('.tmp')
        temporary.write_text(payload)
        temporary.replace(output)
    print(f'Color Echoes: {len(photos)} photos, {reused} reused, {len(samples) - reused} analyzed')


if __name__ == '__main__':
    main()

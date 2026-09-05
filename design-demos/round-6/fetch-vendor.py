from urllib.request import urlopen
from pathlib import Path
root=Path(__file__).parent/'vendor'
for src,dst in [('build/three.module.js','three.module.js'),('build/three.core.js','three.core.js'),('examples/jsm/controls/OrbitControls.js','OrbitControls.js')]:
 with urlopen('https://unpkg.com/three@0.180.0/'+src,timeout=20) as r:
  (root/dst).write_bytes(r.read())
 print('Saved',dst)

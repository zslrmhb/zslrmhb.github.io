import { readFile, writeFile } from 'node:fs/promises';
import { marked } from 'marked';
const base = new URL('./', import.meta.url);
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
// Deliberately small configuration grammar for this review prototype, not a general YAML parser.
export function config(text, allowed) {
  const out = {};
  for (const line of text.trim().split('\n')) {
    if (!line.trim()) continue;
    const match = line.match(/^([a-z]+):\s*(.+)$/);
    if (!match || !allowed.includes(match[1]) || Object.hasOwn(out, match[1])) throw new Error(`Invalid or duplicate configuration: ${line}`);
    out[match[1]] = match[2].trim();
  }
  return out;
}
const source = await readFile(new URL('note.md', base), 'utf8');
const front = source.match(/^---\n([\s\S]*?)\n---\n/);
if (!front) throw new Error('note.md: missing frontmatter');
const meta = config(front[1], ['title','description','author','layout']);
if (!meta.title || !meta.author || meta.layout !== 'explorable') throw new Error('note.md: title/author/explorable layout required');
let componentCount = 0;
const headings = [];
marked.use({renderer:{
  html({text}) { return esc(text); },
  heading({tokens,depth}) {
    const text = this.parser.parseInline(tokens);
    const id = `section-${headings.length + 1}`;
    headings.push({id,text});
    return `<h${depth} id="${id}">${text}</h${depth}>`;
  },
  code({text,lang}) {
    if(lang === 'math') return `<div class="formula" role="math" aria-label="F equals G times m one times m two divided by r squared"><math display="block"><mi>F</mi><mo>=</mo><mfrac><mrow><mi>G</mi><msub><mi>m</mi><mn>1</mn></msub><msub><mi>m</mi><mn>2</mn></msub></mrow><msup><mi>r</mi><mn>2</mn></msup></mfrac></math><span class="formula-note">Pairwise gravitational force</span></div>`;
    if(lang !== 'interactive') return `<pre><code>${esc(text)}</code></pre>`;
    const c = config(text,['component','preset','controls']);
    if(c.component !== 'three-body' || c.preset !== 'figure-eight' || c.controls !== '[play, reset, speed]') throw new Error('note.md: supported preset is three-body / figure-eight with [play, reset, speed]');
    if(++componentCount > 1) throw new Error('This review supports one interactive component per article');
    return `<figure class="experiment" aria-labelledby="figure-title"><div class="figure-top"><span id="figure-title">The figure-eight orbit</span><span class="figure-sub">Equal masses · Planar model</span></div><canvas id="simulation" aria-label="A numerical figure-eight orbit of three equal masses">Canvas is unavailable. Three equal masses follow a shared figure-eight path; the article remains readable.</canvas><div class="legend"><span><i class="one"></i>Body I</span><span><i class="two"></i>Body II</span><span><i class="three"></i>Body III</span></div><div class="controls"><button id="play" class="primary" aria-pressed="false">Play</button><button id="reset">Reset</button><label for="speed">Speed <input id="speed" type="range" min="0.25" max="2" step="0.25" value="1"><output id="speed-value" for="speed">1×</output></label></div><figcaption><span id="sim-status" role="status">Ready when you are</span><span>Numerical approximation · 2D</span></figcaption></figure>`;
  }
}});
const content = marked.parse(source.slice(front[0].length));
const css = await readFile(new URL('style.css',base),'utf8');
const js = await readFile(new URL('interaction.js',base),'utf8');
const toc = headings.map((h,i)=>`<a href="#${h.id}"><span>0${i+1}</span>${h.text}</a>`).join('');
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>${esc(meta.title)} · Hongbin Miao</title><script>try{const t=localStorage.getItem('hongbin-design-theme');document.documentElement.dataset.theme=t==='dark'||t==='light'?t:matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}catch{document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}</script><style>${css}</style></head><body><a class="skip" href="#article">Skip to content</a><header><a class="identity" href="../round-3/">Hongbin Miao<span lang="zh">缪鸿彬</span></a><div class="tools"><button id="source-toggle" aria-expanded="false" aria-controls="source-panel">View Markdown</button><button id="theme" aria-label="Switch to dark mode">Dark ◐</button></div></header><div class="review"><span>ARTICLE DESIGN · ROUND 04</span><a href="notes.html">← All notes</a></div><main><div class="title-block"><p class="eyebrow">NOTES / EXPLORABLE EXPLANATION</p><h1>${esc(meta.title)}</h1><p class="dek">${esc(meta.description)}</p><div class="byline"><span>${esc(meta.author)}</span><span>Design sample · Not published</span></div></div><div class="reading-layout"><aside class="toc"><details open><summary>On this page</summary>${toc}<a class="download" href="note.md" download>Download Markdown ↓</a></details></aside><article id="article">${content}</article><aside class="margin"><span class="seal" aria-hidden="true">观</span><p>Observe first.<br>Then explain.</p><p class="small">The figure-eight is a special solution, not the general case.</p></aside></div><section id="source-panel" hidden><div class="source-head"><h2>The source of this note</h2><a href="note.md" download>Download .md ↓</a></div><p>Write the prose in Markdown. An interactive block selects a preset. This prototype supports the configuration shown below.</p><pre><code>${esc(source)}</code></pre></section></main><footer><span>Hongbin Miao · Learning through making.</span><a href="#">Back to top ↑</a></footer><script>${js}</script></body></html>`;
await writeFile(new URL('index.html',base),html);
console.log(`Built note.md → index.html; ${headings.length} sections, ${componentCount} preset.`);

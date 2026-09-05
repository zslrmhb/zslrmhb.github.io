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
    if(lang !== 'interactive') return `<pre><code>${esc(text)}</code></pre>`;
    const c = config(text,['component','preset','controls']);
    if(c.component !== 'three-body' || c.preset !== 'figure-eight' || c.controls !== '[play, reset, speed]') throw new Error('note.md: supported preset is three-body / figure-eight with [play, reset, speed]');
    if(++componentCount > 1) throw new Error('This review supports one interactive component per article');
    return `<figure class="experiment" aria-labelledby="figure-title"><div class="figure-top"><span id="figure-title">三体 · 八字轨道</span><span class="figure-sub">等质量 / 平面引力模型</span></div><canvas id="simulation" aria-label="三个等质量物体的八字轨道数值模拟">你的浏览器未能显示画布。三个等质量物体沿同一条八字形轨道依次运动，正文仍可阅读。</canvas><div class="legend"><span><i class="one"></i>物体一</span><span><i class="two"></i>物体二</span><span><i class="three"></i>物体三</span></div><div class="controls"><button id="play" class="primary" aria-pressed="false">播放</button><button id="reset">重置</button><label for="speed">播放速度 <input id="speed" type="range" min="0.25" max="2" step="0.25" value="1"><output id="speed-value" for="speed">1×</output></label></div><figcaption><span id="sim-status" role="status">已就绪 · 点击播放</span><span>数值近似 · 非三维场景</span></figcaption></figure>`;
  }
}});
const content = marked.parse(source.slice(front[0].length));
const css = await readFile(new URL('style.css',base),'utf8');
const js = await readFile(new URL('interaction.js',base),'utf8');
const toc = headings.map((h,i)=>`<a href="#${h.id}"><span>0${i+1}</span>${h.text}</a>`).join('');
const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>${esc(meta.title)} · 缪鸿彬</title><script>try{const t=localStorage.getItem('hongbin-design-theme');document.documentElement.dataset.theme=t==='dark'||t==='light'?t:matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}catch{document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}</script><style>${css}</style></head><body><a class="skip" href="#article">跳到正文</a><header><a class="identity" href="../index.html">缪鸿彬<span>个人札记</span></a><div class="tools"><button id="source-toggle" aria-expanded="false" aria-controls="source-panel">查看 Markdown</button><button id="theme" aria-label="切换至深色模式">深色 ☾</button></div></header><div class="review"><span>第二轮 · 阅读与写作体验</span><a href="../index.html">返回方向稿 ↗</a></div><main><div class="title-block"><p class="eyebrow">笔记 / 交互式解释</p><h1>${esc(meta.title)}</h1><p class="dek">${esc(meta.description)}</p><div class="byline"><span>${esc(meta.author)}</span><span>样稿 · 非已发布笔记</span></div></div><div class="reading-layout"><aside class="toc"><p>本篇内容</p>${toc}<a class="download" href="note.md" download>下载 Markdown ↓</a></aside><article id="article">${content}</article><aside class="margin"><span class="seal" aria-hidden="true">观</span><p>先让问题<br>变得可见。</p><p class="small">图解与文字共享一个阅读空间。</p></aside></div><section id="source-panel" hidden><div class="source-head"><h2>这篇笔记的源文件</h2><a href="note.md" download>下载 .md ↓</a></div><p>正文使用 Markdown；interactive 代码块调用预设组件，无需编写脚本。这一原型仅支持下方演示的配置格式。</p><pre><code>${esc(source)}</code></pre></section></main><footer><span>缪鸿彬 · 学习，实践，记录。</span><a href="#">回到页首 ↑</a></footer><script>${js}</script></body></html>`;
await writeFile(new URL('index.html',base),html);
console.log(`Built note.md → index.html; ${headings.length} sections, ${componentCount} preset.`);

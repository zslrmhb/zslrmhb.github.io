(() => {
  const root = document.documentElement;
  const theme = document.getElementById('theme');
  const media = matchMedia('(prefers-color-scheme: dark)');
  let explicit = false;
  try { explicit = ['light','dark'].includes(localStorage.getItem('hongbin-design-theme')); } catch {}
  function themeLabel() {
    const dark = root.dataset.theme === 'dark';
    theme.textContent = dark ? '浅色 ☀' : '深色 ☾';
    theme.setAttribute('aria-label', dark ? '切换至浅色模式' : '切换至深色模式');
  }
  themeLabel();
  theme.onclick = () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    explicit = true;
    try { localStorage.setItem('hongbin-design-theme',root.dataset.theme); } catch {}
    themeLabel(); draw();
  };
  media.addEventListener('change',event => {
    if (!explicit) { root.dataset.theme = event.matches ? 'dark' : 'light'; themeLabel(); draw(); }
  });
  const toggle = document.getElementById('source-toggle');
  toggle.onclick = () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded',String(open));
    document.getElementById('source-panel').hidden = !open;
    document.body.classList.toggle('source-open',open);
    toggle.textContent = open ? '返回阅读' : '查看 Markdown';
    if (open) pause();
    window.scrollTo({top:0,behavior:'instant'});
    if (!open) resize();
  };
  // Equal masses, G=1; rounded initial data for the figure-eight choreography.
  const initial = [
    -.97000436,.24308753,.466203685,.43236573,
    .97000436,-.24308753,.466203685,.43236573,
    0,0,-.93240737,-.86473146
  ];
  let state = initial.slice(), trails = [[],[],[]], running = false;
  let request = 0, last = 0, accumulator = 0, steps = 0;
  const canvas = document.getElementById('simulation');
  const ctx = canvas.getContext('2d');
  const play = document.getElementById('play');
  const speed = document.getElementById('speed');
  const status = document.getElementById('sim-status');
  let width=600,height=280;
  function derivative(s) {
    const d = new Array(12).fill(0);
    for (let i=0;i<3;i++) {
      const a=i*4; d[a]=s[a+2]; d[a+1]=s[a+3];
      for(let j=0;j<3;j++) if(i!==j) {
        const b=j*4, dx=s[b]-s[a],dy=s[b+1]-s[a+1];
        const r2=dx*dx+dy*dy;
        if(r2<1e-10) throw new Error('Encounter too close');
        const factor=1/(r2*Math.sqrt(r2));
        d[a+2]+=dx*factor; d[a+3]+=dy*factor;
      }
    }
    return d;
  }
  function integrate(s,h) {
    const a=derivative(s),b=derivative(s.map((v,i)=>v+h*a[i]/2));
    const c=derivative(s.map((v,i)=>v+h*b[i]/2)),d=derivative(s.map((v,i)=>v+h*c[i]));
    return s.map((v,i)=>v+h*(a[i]+2*b[i]+2*c[i]+d[i])/6);
  }
  function draw() {
    if(!ctx) return;
    const colors=getComputedStyle(root);
    const scale=Math.min(width/2.9,height/1.7);
    const project=(x,y)=>[width/2+x*scale,height/2-y*scale];
    ctx.clearRect(0,0,width,height);
    ctx.strokeStyle=colors.getPropertyValue('--line');ctx.lineWidth=1;
    ctx.setLineDash([3,6]);ctx.beginPath();ctx.moveTo(16,height/2);ctx.lineTo(width-16,height/2);ctx.moveTo(width/2,16);ctx.lineTo(width/2,height-16);ctx.stroke();ctx.setLineDash([]);
    for(let i=0;i<3;i++) {
      const color=colors.getPropertyValue(['--trail-one','--trail-two','--trail-three'][i]).trim();
      ctx.strokeStyle=color;ctx.lineWidth=1.3;ctx.globalAlpha=.55;
      ctx.beginPath();trails[i].forEach(([x,y],j)=>{const p=project(x,y);if(j)ctx.lineTo(...p);else ctx.moveTo(...p)});ctx.stroke();ctx.globalAlpha=1;
      const p=project(state[i*4],state[i*4+1]);
      ctx.fillStyle=color;ctx.beginPath();ctx.arc(...p,6,0,2*Math.PI);ctx.fill();
      ctx.strokeStyle=colors.getPropertyValue('--panel');ctx.lineWidth=2;ctx.stroke();
    }
  }
  function resize() {
    const box=canvas.getBoundingClientRect();if(!box.width)return;
    width=box.width;height=box.height;const ratio=Math.min(devicePixelRatio||1,2);
    canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
    if(ctx)ctx.setTransform(ratio,0,0,ratio,0,0);draw();
  }
  function pause() {
    running=false;cancelAnimationFrame(request);last=0;
    play.textContent='播放';play.setAttribute('aria-pressed','false');
    status.textContent=steps?'已暂停 · 可继续或重置':'已就绪 · 点击播放';
  }
  function frame(now) {
    if(!running)return;
    if(last)accumulator+=Math.min((now-last)/1000,.05)*Number(speed.value);
    last=now;
    try {
      while(accumulator>=.003) {
        state=integrate(state,.003);accumulator-=.003;steps++;
        if(steps%4===0) for(let i=0;i<3;i++) {
          trails[i].push([state[i*4],state[i*4+1]]);
          if(trails[i].length>650)trails[i].shift();
        }
      }
    } catch {pause();status.textContent='计算已停止，请重置';return;}
    draw();request=requestAnimationFrame(frame);
  }
  play.onclick=()=>{
    if(running){pause();return;}
    running=true;last=0;play.textContent='暂停';play.setAttribute('aria-pressed','true');status.textContent='正在运行 · 可调节观看速度';request=requestAnimationFrame(frame);
  };
  document.getElementById('reset').onclick=()=>{pause();state=initial.slice();steps=0;accumulator=0;seedTrails();status.textContent='已重置 · 初始条件与速度已恢复';speed.value='1';document.getElementById('speed-value').value='1×';draw();};
  speed.oninput=()=>document.getElementById('speed-value').value=`${Number(speed.value)}×`;
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&running)pause()});
  // One numerical period supplies a quiet initial preview, not a decorative ellipse.
  function seedTrails() {
    trails=[[],[],[]];let preview=initial.slice();
    for(let n=0;n<2109;n++) {
      if(n%4===0)for(let i=0;i<3;i++)trails[i].push([preview[i*4],preview[i*4+1]]);
      preview=integrate(preview,.003);
    }
  }
  if(!ctx){play.disabled=true;document.getElementById('reset').disabled=true;speed.disabled=true;status.textContent='画布不可用，正文仍可阅读';return;}
  seedTrails();new ResizeObserver(resize).observe(canvas);resize();
})();

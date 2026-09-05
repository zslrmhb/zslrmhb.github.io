// Design prototype only: numerical planar orbit, projected into a rotatable view.
(() => {
  const canvas = document.querySelector('#orbit');
  if (!canvas) return;
  const context = canvas.getContext('2d');
  const play = document.querySelector('#orbit-play');
  const view = document.querySelector('#orbit-view');
  const reset = document.querySelector('#orbit-reset');
  if (!context) { [play, view, reset].forEach(button => button.disabled = true); return; }
  const initial = [-.97000436,.24308753,.466203685,.43236573,.97000436,-.24308753,.466203685,.43236573,0,0,-.93240737,-.86473146];
  const step = .003;
  function derivative(state) {
    const result = Array(12).fill(0);
    for (let i = 0; i < 3; i++) {
      const offset = i * 4;
      result[offset] = state[offset + 2]; result[offset + 1] = state[offset + 3];
      for (let j = 0; j < 3; j++) if (i !== j) {
        const dx = state[j * 4] - state[offset], dy = state[j * 4 + 1] - state[offset + 1];
        const radiusSquared = dx * dx + dy * dy;
        const force = 1 / Math.pow(Math.max(radiusSquared, 1e-10), 1.5);
        result[offset + 2] += dx * force; result[offset + 3] += dy * force;
      }
    }
    return result;
  }
  function advance(state) {
    const a = derivative(state);
    const b = derivative(state.map((value, i) => value + a[i] * step / 2));
    const c = derivative(state.map((value, i) => value + b[i] * step / 2));
    const d = derivative(state.map((value, i) => value + c[i] * step));
    return state.map((value, i) => value + step * (a[i] + 2 * b[i] + 2 * c[i] + d[i]) / 6);
  }
  // Cache one period for the homepage study; production simulation belongs in a separate module.
  const samples = []; let state = initial.slice();
  for (let i = 0; i < 2109; i++) { samples.push(state); state = advance(state); }
  let width = 600, height = 445, rotation = -.64, tilt = .32, phase = 330;
  let playing = false, frameId = 0, previousTime = 0, drag = null;
  function draw() {
    const palette = getComputedStyle(document.documentElement);
    const ink = palette.getPropertyValue('--orbit').trim();
    const accent = palette.getPropertyValue('--dot').trim();
    const paper = palette.getPropertyValue('--paper').trim();
    const scale = Math.min(width / 2.7, height / 2.25);
    function project(x, y) {
      const rx = x * Math.cos(rotation) - y * Math.sin(rotation);
      const ry = x * Math.sin(rotation) + y * Math.cos(rotation);
      const depth = rx * Math.sin(tilt);
      const perspective = 3.5 / (3.5 + depth);
      return [width / 2 + rx * Math.cos(tilt) * scale * perspective, height / 2 + ry * scale * perspective];
    }
    context.clearRect(0, 0, width, height);
    context.strokeStyle = ink; context.lineWidth = 1;
    context.beginPath();
    samples.forEach((sample, index) => {
      const point = project(sample[0], sample[1]);
      if (index) context.lineTo(...point); else context.moveTo(...point);
    });
    context.closePath(); context.stroke();
    const current = samples[Math.floor(phase) % samples.length];
    for (let i = 0; i < 3; i++) {
      const point = project(current[i * 4], current[i * 4 + 1]);
      context.beginPath(); context.fillStyle = i === 0 ? accent : ink;
      context.arc(...point, i === 0 ? 7 : 5, 0, Math.PI * 2); context.fill();
      context.strokeStyle = paper; context.lineWidth = 2; context.stroke();
      context.fillStyle = ink; context.font = '12px Georgia';
      context.fillText(['I', 'II', 'III'][i], point[0] + 12, point[1] - 12);
    }
  }
  function resize() {
    const bounds = canvas.getBoundingClientRect(); width = bounds.width; height = bounds.height;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0); draw();
  }
  function pause() {
    playing = false; cancelAnimationFrame(frameId); previousTime = 0;
    play.textContent = 'Play orbit'; play.setAttribute('aria-pressed', 'false');
  }
  function frame(time) {
    if (!playing) return;
    if (previousTime) phase = (phase + Math.min(time - previousTime, 50) / 3) % samples.length;
    previousTime = time; draw(); frameId = requestAnimationFrame(frame);
  }
  play.addEventListener('click', () => {
    if (playing) return pause();
    playing = true; previousTime = 0; play.textContent = 'Pause orbit';
    play.setAttribute('aria-pressed', 'true'); frameId = requestAnimationFrame(frame);
  });
  view.addEventListener('click', () => { rotation += Math.PI / 6; draw(); });
  reset.addEventListener('click', () => { pause(); rotation = -.64; tilt = .32; phase = 330; draw(); });
  canvas.addEventListener('pointerdown', event => { drag = { x: event.clientX, y: event.clientY }; canvas.setPointerCapture(event.pointerId); });
  canvas.addEventListener('pointermove', event => {
    if (!drag) return;
    rotation += (event.clientX - drag.x) * .007;
    tilt = Math.max(-1.1, Math.min(1.1, tilt + (event.clientY - drag.y) * .006));
    drag = { x: event.clientX, y: event.clientY }; draw();
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) canvas.addEventListener(type, () => { drag = null; });
  canvas.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault(); rotation += event.key === 'ArrowRight' ? .15 : -.15; draw();
  });
  const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(canvas);
  const intersection = new IntersectionObserver(entries => { if (!entries[0].isIntersecting) pause(); }); intersection.observe(canvas);
  window.addEventListener('themechange', draw);
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  window.addEventListener('pagehide', () => { pause(); resizeObserver.disconnect(); intersection.disconnect(); }, { once: true });
  window.addEventListener('pageshow', event => { if(event.persisted) {resizeObserver.observe(canvas); intersection.observe(canvas); resize();} });
  resize();
})();

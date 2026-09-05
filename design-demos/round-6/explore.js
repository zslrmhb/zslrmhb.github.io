const dialog=document.querySelector('#explore-dialog');
const enter=document.querySelector('#enter-3d');
const message=document.querySelector('#scene-message');
const speed=document.querySelector('#scene-speed');
const play=document.querySelector('#scene-play');
const controls=[...document.querySelectorAll('.scene-controls button,.scene-controls input')];
let session=null,view=null,savedScroll=0,generation=0;
function status(running){play.textContent=running?'Pause':'Play';play.setAttribute('aria-pressed',String(running));document.querySelector('#scene-status').textContent=running?'Playing · View controls remain available':'Paused · Ready to explore';}
function save(){if(session){const state=session.dispose();view=state.view;window.articleExperiment.set(state);session=null;}}
function fallback(){save();controls.forEach(el=>el.disabled=true);message.hidden=false;message.innerHTML='<h3>A quiet pause.</h3><p>The 3D view isn’t available. You can still read the article and use its inline diagram.</p><button id="retry-scene">Try again</button>';document.querySelector('#retry-scene').onclick=()=>load();document.querySelector('#scene-status').textContent='Scene unavailable · Reading remains available';}
async function load(){const attempt=++generation;controls.forEach(el=>el.disabled=true);message.hidden=false;message.innerHTML='<h3>Preparing the scene…</h3><p>Your reading position is saved.</p>';try{const {createScene}=await import('./scene.js');if(!dialog.open||attempt!==generation)return;session=createScene(document.querySelector('#scene'),window.articleExperiment.get(),view,status);controls.forEach(el=>el.disabled=false);speed.value=String(window.articleExperiment.get().speed);document.querySelector('#scene-speed-value').value=speed.value+'×';document.querySelector('#show-trail').checked=true;message.hidden=true;status(false);}catch{if(attempt===generation&&dialog.open)fallback();}}
enter.onclick=()=>{savedScroll=scrollY;window.articleExperiment.pause();dialog.showModal();document.body.classList.add('exploring');load();};
document.querySelector('#exit-3d').onclick=()=>dialog.close();
dialog.addEventListener('close',()=>{generation++;save();document.body.classList.remove('exploring');window.scrollTo({top:savedScroll,behavior:'instant'});enter.focus({preventScroll:true});});
document.querySelector('#explore-theme').onclick=()=>document.querySelector('#theme').click();
play.onclick=()=>session?.play();speed.oninput=()=>{document.querySelector('#scene-speed-value').value=speed.value+'×';session?.speed(Number(speed.value));};
document.querySelector('#scene-reset').onclick=()=>{session?.reset();speed.value='1';document.querySelector('#scene-speed-value').value='1×';document.querySelector('#show-trail').checked=true;};
document.querySelector('#show-trail').onchange=event=>session?.trails(event.target.checked);
document.querySelector('#perspective-view').onclick=()=>session?.view(false);document.querySelector('#top-view').onclick=()=>session?.view(true);
document.querySelector('#zoom-in').onclick=()=>session?.zoom(.85);document.querySelector('#zoom-out').onclick=()=>session?.zoom(1.15);document.querySelector('#rotate-view').onclick=()=>session?.rotate();
document.querySelector('#test-fallback').onclick=()=>{generation++;fallback();};
window.addEventListener('pagehide',()=>save());

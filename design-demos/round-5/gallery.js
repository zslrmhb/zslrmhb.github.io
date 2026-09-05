(async () => {
 const response = await fetch('photos.json');
 const photos = await response.json();
 const dialog = document.querySelector('#viewer');
 const image = document.querySelector('#large-image');
 const previous = document.querySelector('#previous');
 const next = document.querySelector('#next');
 const error = document.querySelector('#image-error');
 const cards = [...document.querySelectorAll('.gallery figure')];
 const narrow = matchMedia('(max-width:760px)');
 let pageSize = narrow.matches ? 6 : 12;
 let activePage = 1;
 const pagePrevious = document.querySelector('#page-prev');
 const pageNext = document.querySelector('#page-next');
 const pageNumbers = document.querySelector('#page-numbers');
 function renderPage(scroll = false) {
  const total = Math.ceil(cards.length / pageSize);
  activePage = Math.max(1, Math.min(activePage, total));
  cards.forEach((card, index) => card.hidden = index < (activePage - 1) * pageSize || index >= activePage * pageSize);
  pagePrevious.disabled = activePage === 1;
  pageNext.disabled = activePage === total;
  pageNumbers.replaceChildren();
  for (let number = 1; number <= total; number++) {
   const button = document.createElement('button');
   button.textContent = number;
   button.setAttribute('aria-label', `Page ${number}`);
   if (number === activePage) button.setAttribute('aria-current','page');
   button.addEventListener('click', () => { activePage = number; renderPage(true); });
   pageNumbers.append(button);
  }
  document.querySelector('#page-status').textContent = `Page ${activePage} of ${total} · Photos ${(activePage - 1) * pageSize + 1}–${Math.min(activePage * pageSize, cards.length)} of ${cards.length}`;
  if (scroll) {
   const top = document.querySelector('.gallery-meta').getBoundingClientRect().top + window.scrollY - 24;
   window.scrollTo({top, behavior:'instant'});
   pageNumbers.querySelector('[aria-current]')?.focus({preventScroll:true});
  }
 }
 pagePrevious.addEventListener('click', () => { activePage--; renderPage(true); });
 pageNext.addEventListener('click', () => { activePage++; renderPage(true); });
 narrow.addEventListener('change', () => {
  const first = (activePage - 1) * pageSize;
  pageSize = narrow.matches ? 6 : 12;
  activePage = Math.floor(first / pageSize) + 1;
  renderPage();
 });
 renderPage();

 let current = 0, origin = null, start = null;
 function display(index) {
  current = Math.max(0, Math.min(photos.length - 1, index));
  const photo = photos[current];
  error.hidden = true; image.hidden = false;
  image.alt = photo.alt; image.src = photo.url;
  document.querySelector('#counter').textContent = `${String(current + 1).padStart(2,'0')} / ${photos.length}`;
  document.querySelector('#photo-date').textContent = new Date(photo.takenAt).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric',timeZone:'UTC'});
  document.querySelector('#photo-date').dateTime = photo.takenAt.slice(0,10);
  document.querySelector('#caption').textContent = photo.caption || '';
  document.querySelector('#original').href = photo.permalink;
  previous.disabled = current === 0; next.disabled = current === photos.length - 1;
 }
 image.addEventListener('error',()=>{image.hidden=true;error.hidden=false;});
 document.querySelectorAll('.photo').forEach(button=>button.addEventListener('click',()=>{
  origin=button;display(Number(button.dataset.index));dialog.showModal();document.body.classList.add('viewer-open');
 }));
 document.querySelector('#close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{document.body.classList.remove('viewer-open');origin?.focus({preventScroll:true});});
 previous.addEventListener('click',()=>display(current-1)); next.addEventListener('click',()=>display(current+1));
 dialog.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'){event.preventDefault();display(current-1);}
  if(event.key==='ArrowRight'){event.preventDefault();display(current+1);}
 });
 image.addEventListener('pointerdown',event=>{start={x:event.clientX,y:event.clientY};});
 image.addEventListener('pointerup',event=>{
  if(!start)return;const dx=event.clientX-start.x,dy=event.clientY-start.y;
  if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))display(current+(dx<0?1:-1));start=null;
 });
 image.addEventListener('pointercancel',()=>{start=null;});
})().catch(()=>{
 document.querySelector('.review-note').textContent='The gallery viewer could not load. Photographs remain available below.';
 document.querySelectorAll('.photo').forEach(button=>button.addEventListener('click',()=>window.location.assign(button.querySelector('img').src)));
});

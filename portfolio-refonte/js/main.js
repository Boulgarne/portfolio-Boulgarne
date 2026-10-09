(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const loader = $('#loader');
  window.addEventListener('load', () => setTimeout(() => loader?.classList.add('done'), 500));
  setTimeout(() => loader?.classList.add('done'), 1800);
  $('#year').textContent = new Date().getFullYear();
  const menu = $('#mainNav'), toggle = $('#menuToggle');
  toggle?.addEventListener('click', () => { const open = menu.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
  $$('#mainNav a').forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); toggle?.setAttribute('aria-expanded','false'); }));
  const themeButton = $('#themeToggle');
  const savedTheme = localStorage.getItem('zb-theme');
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
  themeButton?.addEventListener('click', () => { const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = next; localStorage.setItem('zb-theme', next); });
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('revealed');observer.unobserve(e.target);} }), {threshold:.12});
    $$('.reveal').forEach(el => observer.observe(el));
  } else $$('.reveal').forEach(el => el.classList.add('revealed'));
  const sections = $$('main section[id]');
  if ('IntersectionObserver' in window) { const navObserver = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){ $$('#mainNav a').forEach(a => a.classList.toggle('active',a.getAttribute('href') === '#'+e.target.id)); } }), {rootMargin:'-30% 0px -60% 0px'}); sections.forEach(s => navObserver.observe(s)); }
  $$('.filter-chip').forEach(btn => btn.addEventListener('click', () => { $$('.filter-chip').forEach(b => b.classList.toggle('active', b===btn)); const f=btn.dataset.filter; $$('.project-card').forEach(card => card.hidden = !(f==='all'||card.dataset.category===f)); }));
  const form = $('#contactForm');
  form?.addEventListener('submit', e => { e.preventDefault(); const data = new FormData(form); if(data.get('website')) return; const subject = encodeURIComponent('Prise de contact depuis le portfolio'); const body = encodeURIComponent(`Bonjour Zakaria,\n\n${data.get('message')}\n\n${data.get('name')}\n${data.get('email')}`); window.location.href = `mailto:zakariaboulgarne@gmail.com?subject=${subject}&body=${body}`; $('#formNote').textContent='Ton application e-mail devrait s’ouvrir avec le message prérempli.'; });
  // Canvas réseau léger, sans animation continue si l'utilisateur réduit les mouvements.
  const canvas = $('#networkCanvas');
  if(canvas){const ctx=canvas.getContext('2d');let w=0,h=0,nodes=[],raf=0;const resize=()=>{const r=canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,1.5);w=r.width;h=r.height;canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);nodes=Array.from({length:Math.min(55,Math.max(22,Math.round(w*h/18000)))},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22}));draw();};const draw=()=>{ctx.clearRect(0,0,w,h);for(let i=0;i<nodes.length;i++){const a=nodes[i];for(let j=i+1;j<nodes.length;j++){const b=nodes[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);if(d<130){ctx.strokeStyle=`rgba(69,229,204,${.18*(1-d/130)})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}ctx.fillStyle='rgba(69,229,204,.55)';ctx.fillRect(a.x-1,a.y-1,2,2);if(!reduce){a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>w)a.vx*=-1;if(a.y<0||a.y>h)a.vy*=-1;}}if(!reduce)raf=requestAnimationFrame(draw);};const onResize=()=>{cancelAnimationFrame(raf);resize();};resize();addEventListener('resize',onResize,{passive:true});}
})();

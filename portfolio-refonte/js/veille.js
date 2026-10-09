(async () => {
  const list = document.querySelector('#watchEntries');
  if (!list) return;
  const search = document.querySelector('#watchSearch');
  const tagSelect = document.querySelector('#watchTag');
  let entries = [];
  try {
    const res = await fetch('veille/index.json');
    if (!res.ok) throw new Error('index indisponible');
    const index = await res.json();
    entries = await Promise.all(index.map(async item => {
      try {
        const response = await fetch(`veille/${item.file}`);
        const text = await response.text();
        const get = key => (text.match(new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, 'm')) || [,''])[1];
        const tagsBlock = (text.match(/^tags:\s*\n((?:\s+-.*\n?)*)/m)||[])[1]||'';
        const tags = [...tagsBlock.matchAll(/^\s+-\s+(.+)$/gm)].map(m=>m[1].trim());
        const summary = (text.match(/^## Résumé\s*\n([\s\S]*?)(?=\n## |$)/m)||[])[1]||'';
        return {...item,title:get('title')||item.title,date:get('date')||item.date,source:get('source')||item.source,tags,summary:summary.trim().replace(/\n/g,' '),body:text};
      } catch { return item; }
    }));
  } catch { return; }
  const tags = [...new Set(entries.flatMap(e=>e.tags||[]))];
  tags.forEach(t=>{const o=document.createElement('option');o.value=t;o.textContent=t;tagSelect.append(o);});
  const render = () => {
    const q=(search.value||'').toLowerCase(),tag=tagSelect.value;
    const filtered=entries.filter(e=>(tag==='all'||(e.tags||[]).includes(tag))&&`${e.title} ${e.summary||''} ${(e.tags||[]).join(' ')}`.toLowerCase().includes(q)).sort((a,b)=>(b.date||'').localeCompare(a.date||''));
    list.replaceChildren();
    if(!filtered.length){const p=document.createElement('p');p.className='empty-state';p.textContent='Aucune fiche ne correspond à cette recherche.';list.append(p);return;}
    filtered.forEach(e=>{const article=document.createElement('article');article.className='watch-entry';const time=document.createElement('time');time.textContent=e.date||'Date à préciser';const h=document.createElement('h3');h.textContent=e.title;const p=document.createElement('p');p.textContent=e.summary||'Résumé à compléter dans le fichier Markdown.';const a=document.createElement('a');a.href=`veille/${e.file}`;a.textContent='Lire la fiche ↗';article.append(time,h,p,a);list.append(article);});
  };
  search.addEventListener('input',render);tagSelect.addEventListener('change',render);render();
})();

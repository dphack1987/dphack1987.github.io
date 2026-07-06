(function(){
  async function loadCategory(category){
    const paths = [`./data/classified/${category}.json`, `./data/${category}.json`];
    for(const path of paths){
      try{
        const res = await fetch(path);
        if(!res.ok) throw new Error('not found');
        const data = await res.json();
        return data.map(normalize);
      }catch(e){
        // continue to next fallback path
      }
    }
    console.warn('No se pudo cargar categoría', category);
    return [];
  }

  function normalize(item){
    return {
      id: item.id || item.nombre?.toLowerCase?.().replace(/\s+/g,'-') || '',
      nombre: item.nombre || item.title || '',
      tipo: item.tipo || '',
      municipio: item.municipio || item.ubicacion || '',
      descripcion: item.desc || item.descripcion || item.description || '',
      servicios: item.servicios || [],
      precio: item.precio || item.price || '',
      telefono: item.telefono || (item.telefonos && item.telefonos[0]) || item.contacto || '',
      whatsapp: item.whatsapp || item.whatsApp || '',
      maps: item.maps || item.website || '',
      imagen: item.imagen || item.imagenes || item.image || './assets/images/decoraciones/D5VTOP7OQ5EYDJZUEMFDPXZ22E.jpg',
      nivel: item.nivel || 'estandar'
    };
  }

  function defaultRender(container, items){
    const c = container; const e = container.nextElementSibling && container.nextElementSibling.classList.contains('no-results') ? container.nextElementSibling : null;
    if(!items || !items.length){ if(e) e.style.display='block'; return }
    if(e) e.style.display='none';
    c.innerHTML = '';
    items.forEach(n => {
      const d = document.createElement('article'); d.className = 'biz-card';
      d.innerHTML = `<div class="biz-card-img-wrap"><img src="${n.imagen}" alt="${n.nombre}" class="biz-card-img" loading="lazy"><span class="biz-badge ${n.nivel}">${n.nivel === 'premium' ? '⭐ Premium' : '✓ Verificado'}</span></div>
        <div class="biz-card-body"><div class="biz-tipo">${n.tipo} · ${n.municipio}</div><h3>${n.nombre}</h3><p>${n.descripcion}</p>
        <div class="biz-servicios">${(n.servicios||[]).slice(0,3).map(s=>`<span class="biz-tag">${s}</span>`).join('')}</div>
        <div class="biz-precio">${n.precio? '💰 '+n.precio : ''}</div>
        <div class="biz-actions"><a href="${(window.generateWhatsAppLink && typeof window.generateWhatsAppLink==='function')? window.generateWhatsAppLink(n) : ('https://wa.me/'+(n.whatsapp||n.telefono))}" target="_blank" rel="noopener" class="btn-wa">💬 Reservar</a><a href="${n.maps||'#'}" target="_blank" rel="noopener" class="btn-maps">📍 Llegar</a>${n.telefono?`<a href="tel:${n.telefono}" class="btn-tel">📞</a>`:''}</div></div>`;
      c.appendChild(d);
    });
  }

  async function init(){
    const containers = Array.from(document.querySelectorAll('[data-list-category]'));
    for(const container of containers){
      const cat = container.getAttribute('data-list-category');
      const items = await loadCategory(cat);
      // attach smart filters UI above the container
      attachSmartFilters(container, items, (filtered)=>{
        // render filtered items using page render or default
        if(window.render && typeof window.render === 'function'){
          window.render(filtered);
          if(window.onListingsLoaded && typeof window.onListingsLoaded === 'function') window.onListingsLoaded(filtered);
        } else {
          defaultRender(container, filtered);
          if(window.onListingsLoaded && typeof window.onListingsLoaded === 'function') window.onListingsLoaded(filtered);
        }
      });
      // If page defines global render(), use it; else defaultRender
      // initial render (all items)
      if(window.render && typeof window.render === 'function'){
        window.render(items);
        if(window.onListingsLoaded && typeof window.onListingsLoaded === 'function') window.onListingsLoaded(items);
      } else {
        defaultRender(container, items);
        if(window.onListingsLoaded && typeof window.onListingsLoaded === 'function') window.onListingsLoaded(items);
      }
    }
  }

  // ----- Smart filters -----
  function attachSmartFilters(container, items, onFilter){
    if(!container) return;
    const wrap = document.createElement('div'); wrap.className = 'smart-filters';
    wrap.innerHTML = `
      <div class="smart-filters-row">
        <div class="experience-filters">
          <button data-intent="all" class="sf-btn active">Todos</button>
          <button data-intent="aventura" class="sf-btn">Aventura</button>
          <button data-intent="gastronomia" class="sf-btn">Gastronomía</button>
          <button data-intent="cultura" class="sf-btn">Cultura</button>
          <button data-intent="relajacion" class="sf-btn">Relajación</button>
          <button data-intent="negocios" class="sf-btn">Negocios</button>
        </div>
        <div class="season-filter">
          <label>Cuándo viajar:</label>
          <select id="sf-season">
            <option value="all">Cualquiera</option>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
        </div>
      </div>`;
    container.parentElement.insertBefore(wrap, container);

    const btns = wrap.querySelectorAll('.sf-btn'); const season = wrap.querySelector('#sf-season');
    let activeIntent = 'all'; let activeSeason = 'all';

    btns.forEach(b => b.addEventListener('click', ()=>{
      btns.forEach(x=>x.classList.remove('active'));
      b.classList.add('active'); activeIntent = b.getAttribute('data-intent'); applyFilter();
    }));
    season.addEventListener('change', (e)=>{ activeSeason = e.target.value; applyFilter(); });

    function applyFilter(){
      let filtered = items.slice();
      if(activeIntent && activeIntent !== 'all') filtered = filtered.filter(i => matchIntent(i, activeIntent));
      if(activeSeason && activeSeason !== 'all') filtered = filtered.filter(i => matchSeason(i, activeSeason));
      onFilter(filtered);
    }
  }

  function matchIntent(item, intent){
    const text = ((item.descripcion||'') + ' ' + (item.servicios||[]).join(' ') + ' ' + (item.tipo||'')).toLowerCase();
    const map = {
      aventura: ['senderismo','tirolesa','canopy','avventura','aventura','tour','parque','tirolesa','canopy','trek','travesía','cabalgata','rafting'],
      gastronomia: ['restaurante','degust','cafe','chocolate','cacao','gastronom','comida','postre'],
      cultura: ['museo','cultura','historia','tradición','artesan','centro cultural','patrimonio'],
      relajacion: ['spa','piscina','relaj','glamping','posada','hotel campestre','retiro','bienestar'],
      negocios: ['auditorio','salon','evento','congreso','reunión','cowork']
    };
    const kws = map[intent] || [];
    return kws.some(k => text.includes(k));
  }

  function matchSeason(item, season){
    // prefer explicit field 'temporada' in item (alta/media/baja) or 'season'
    const s = (item.temporada || item.season || '').toLowerCase();
    if(s) return s === season;
    // fallback: accept all (no season info)
    return true;
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

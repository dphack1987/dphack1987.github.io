(function(){
  const container = document.querySelector('.pautas-grid');
  if(!container) return;

  async function loadPautantes(){
    try{
      const res = await fetch('./data/pautantes.json');
      const data = await res.json();
      renderPautas(data);
      setupModal(data);
    }catch(e){
      console.error('No se pudo cargar pautantes', e);
    }
  }

  function renderPautas(data){
    container.innerHTML = '';
    data.forEach(p => {
      const div = document.createElement('div');
      div.className = 'pauta-grid-item';
      div.innerHTML = `<img src="${p.imagen}" alt="${p.nombre}" loading="lazy" data-pauta-id="${p.id}" style="cursor:zoom-in">`;
      container.appendChild(div);
    });

    container.querySelectorAll('img[data-pauta-id]').forEach(img => {
      img.addEventListener('click', (e)=>{
        const id = e.currentTarget.getAttribute('data-pauta-id');
        openModal(id);
      });
    });
  }

  function setupModal(data){
    if(document.getElementById('pautaModal')) return;
    const overlay = document.createElement('div');
    overlay.className = 'pauta-modal-overlay';
    overlay.id = 'pautaModalOverlay';
    overlay.innerHTML = `
      <div class="pauta-modal" id="pautaModal">
        <div class="pauta-media"><img src="" alt=""></div>
        <div class="pauta-body">
          <h3 id="pautaTitle"></h3>
          <p id="pautaDesc"></p>
          <div class="pauta-meta" id="pautaMeta"></div>
          <div class="pauta-actions">
            <a id="pautaWA" class="btn-wa" href="#" target="_blank" rel="noopener">WhatsApp</a>
            <a id="pautaMAP" class="btn-maps" href="#" target="_blank" rel="noopener">Ver mapa</a>
            <button id="closePauta" class="btn-maps" style="background:transparent;border:none;padding:0;margin-left:auto;color:var(--text3)">Cerrar</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e)=>{
      if(e.target === overlay) closeModal();
    });
    document.getElementById('closePauta').addEventListener('click', closeModal);

    // store data for lookup
    window.__pautantes = (data||[]).reduce((acc,x)=>{acc[x.id]=x;return acc;},{})
  }

  function openModal(id){
    const item = window.__pautantes && window.__pautantes[id];
    if(!item) return console.warn('Pautante no encontrado', id);
    const overlay = document.getElementById('pautaModalOverlay');
    overlay.classList.add('open');
    const modal = document.getElementById('pautaModal');
    modal.querySelector('.pauta-media img').src = item.imagen;
    modal.querySelector('.pauta-media img').alt = item.nombre;
    document.getElementById('pautaTitle').textContent = item.nombre;
    document.getElementById('pautaDesc').textContent = item.desc || '';
    const meta = document.getElementById('pautaMeta');
    meta.innerHTML = `<div><strong>${item.tipo||''}</strong></div><div>${item.municipio||''}</div><div style="color:var(--a1);font-weight:800">${item.precio||''}</div>`;
    const wa = document.getElementById('pautaWA');
    wa.href = (window.generateWhatsAppLink && typeof window.generateWhatsAppLink === 'function') ? window.generateWhatsAppLink(item) : (`https://wa.me/${item.whatsapp}`);
    const mp = document.getElementById('pautaMAP');
    mp.href = item.maps || '#';
  }

  function closeModal(){
    const overlay = document.getElementById('pautaModalOverlay');
    if(overlay) overlay.classList.remove('open');
  }

  loadPautantes();
})();

(function(){
  const containerId = 'fincas-gallery';
  const dataUrl = './data/pautas_images_index_enhanced.json';

  async function load() {
    try {
      const res = await fetch(dataUrl, {cache: 'no-store'});
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      // find key for fincas
      const key = Object.keys(data).find(k => k.includes('fincas') || k.includes('alquiler'));
      if (!key) return;
      const items = data[key].items || [];
      const gallery = document.getElementById(containerId);
      if (!gallery) return;
      gallery.innerHTML = '';
      items.forEach(it => {
        const card = document.createElement('article');
        card.className = 'biz-card';
        const imgUrl = it.file || it.imagen || '';
        const nombre = it.pautante && it.pautante.nombre ? it.pautante.nombre : it.filename.replace(/\.[^.]+$/, '').replace(/[_\-]/g,' ');
        const telefono = it.pautante && it.pautante.telefono ? it.pautante.telefono : null;
        const maps = it.pautante && it.pautante.maps ? it.pautante.maps : '#';
        card.innerHTML = `
          <div class="biz-card-img-wrap"><a href="${imgUrl}" target="_blank" rel="noopener"><img src="${imgUrl}" alt="${nombre}" class="biz-card-img" loading="lazy"></a></div>
          <div class="biz-card-body"><h3>${nombre}</h3>
            ${telefono?`<div style="margin:8px 0"><a href="tel:${telefono}" class="btn-tel">📞 ${telefono}</a></div>`:''}
            <div style="display:flex;gap:8px;margin-top:12px"><a href="${maps}" target="_blank" class="btn-maps">📍 Ver en mapa</a><a href="${imgUrl}" target="_blank" class="btn-cta">🔎 Ver imagen</a></div>
          </div>`;
        gallery.appendChild(card);
      });
    } catch (e) {
      console.warn('No se pudo cargar pautas fincas:', e);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load); else load();
})();

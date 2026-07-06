(function(){
  function getQueryParam(name){const params=new URLSearchParams(window.location.search);return params.get(name)}
  function loadPautantes(){return fetch('./data/pautantes.json').then(res=>res.json())}
  function renderPauta(pauta){
    if(!pauta){document.getElementById('pauta-root').innerHTML='<p style="color:#dc2626;font-weight:700">Pauta no encontrada.</p>';return}
    document.title = pauta.nombre + ' | ' + (pauta.tipo || 'Servicio') + ' Quindío';
    document.getElementById('pauta-title').textContent = pauta.nombre;
    document.getElementById('pauta-subtitle').textContent = pauta.desc || '';
    document.getElementById('pauta-meta').innerHTML = `<div><strong>${pauta.tipo||''}</strong></div><div>${pauta.municipio||''}</div><div>${pauta.precio? '💰 '+pauta.precio : ''}</div>`;
    const waLink = (window.generateWhatsAppLink && typeof window.generateWhatsAppLink === 'function') ? window.generateWhatsAppLink(pauta) : `https://wa.me/${pauta.whatsapp}`;
    document.getElementById('pauta-whatsapp').href = waLink;
    document.getElementById('pauta-map-link').href = pauta.maps || '#';
    document.getElementById('pauta-video-frame').src = pauta.video || '';
    if(pauta.video){document.getElementById('pauta-video').style.display='block'}
    const gallery = document.getElementById('pauta-gallery');
    (pauta.galeria || []).forEach(src => {
      const img = document.createElement('img'); img.src = src; img.alt = pauta.nombre; img.loading = 'lazy';
      img.addEventListener('click', ()=>{document.getElementById('pauta-main-img').src = src});
      gallery.appendChild(img);
    });
    if(pauta.mainImagen){document.getElementById('pauta-main-img').src = pauta.mainImagen}
    if(pauta.tour360){
      const btn = document.getElementById('pauta-360-button');
      btn.style.display='inline-flex';
      btn.addEventListener('click', ()=>{
        const overlay = document.getElementById('pauta-360-overlay');
        overlay.classList.add('open');
        const iframe = document.getElementById('pauta-360-frame');
        iframe.src = pauta.tour360;
      });
    }
  }
  function init(){
    const id = getQueryParam('id');
    if(!id){document.getElementById('pauta-root').innerHTML='<p style="color:#dc2626;font-weight:700">ID de pauta faltante.</p>';return}
    loadPautantes().then(data=>{
      const pauta = data.find(item=>item.id===id);
      renderPauta(pauta);
    }).catch(()=>{
      document.getElementById('pauta-root').innerHTML='<p style="color:#dc2626;font-weight:700">Error cargando datos.</p>';
    });
    document.getElementById('pauta-360-close').addEventListener('click', ()=>{
      const overlay = document.getElementById('pauta-360-overlay');
      overlay.classList.remove('open');
      document.getElementById('pauta-360-frame').src = '';
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
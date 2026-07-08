(function(){
  const containerId = 'fincas-gallery';

  // Lista hardcodeada de fincas
  const items = [
    { file: "./pautas_publicitarias/Alquiler_de_fincas_quindio/casa_campestre_lacosecha.png", nombre: "Casa Campestre La Cosecha" },
    { file: "./pautas_publicitarias/Alquiler_de_fincas_quindio/finca_cafetera_el_ocaso.png", nombre: "Finca Cafetera El Ocaso" },
    { file: "./pautas_publicitarias/Alquiler_de_fincas_quindio/finca_la_floresta.png", nombre: "Finca La Floresta" },
    { file: "./pautas_publicitarias/Alquiler_de_fincas_quindio/hacienda_moraleja.png", nombre: "Hacienda Moraleja" },
    { file: "./pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_alma_nativa.png", nombre: "Hotel Alma Nativa" },
    { file: "./pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_cafe_cafe_campestre.png", nombre: "Hotel Café Café Campestre" },
    { file: "./pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_deliriocampestre.png", nombre: "Hotel Delirio Campestre" },
    { file: "./pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_linaje_salvaje.png", nombre: "Hotel Linaje Salvaje" }
  ];

  function load() {
    const gallery = document.getElementById(containerId);
    if (!gallery) return;
    gallery.innerHTML = '';
    items.forEach(it => {
      const card = document.createElement('article');
      card.className = 'biz-card';
      const imgUrl = it.file;
      const nombre = it.nombre;
      card.innerHTML = `
        <div class="biz-card-img-wrap"><a href="${imgUrl}" target="_blank" rel="noopener"><img src="${imgUrl}" alt="${nombre}" class="biz-card-img" loading="lazy"></a></div>
        <div class="biz-card-body"><h3>${nombre}</h3>
          <div style="display:flex;gap:8px;margin-top:12px"><a href="${imgUrl}" target="_blank" class="btn-cta">🔎 Ver imagen</a></div>
        </div>`;
      gallery.appendChild(card);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load); else load();
})();

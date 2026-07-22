(function(){
  const containerId = 'fincas-gallery';

  // Lista hardcodeada de fincas con sus IDs correspondientes a subpáginas
  const items = [
    { file: "./pautas_publicitarias/Alquiler_de_fincas_quindio/casa_campestre_lacosecha.png", nombre: "Casa Campestre La Cosecha", id: "casa-campestre-la-cosecha" },
    { file: "./pautas_publicitarias/Alquiler_de_fincas_quindio/finca_cafetera_el_ocaso.png", nombre: "Finca Cafetera El Ocaso", id: "finca-cafetera-el-ocaso" },
    { file: "./pautas_publicitarias/Alquiler_de_fincas_quindio/finca_la_floresta.png", nombre: "Finca La Floresta", id: "la-floresta-hotel-campestre" },
    { file: "./pautas_publicitarias/Alquiler_de_fincas_quindio/hacienda_moraleja.png", nombre: "Hacienda Moraleja", id: "hacienda-moraleja" },
    { file: "./pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_alma_nativa.png", nombre: "Hotel Alma Nativa", id: "alma-nativa-hotel-campestre" },
    { file: "./pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_cafe_cafe_campestre.png", nombre: "Hotel Café Café Campestre", id: "hotel-cafe-cafe-campestre" },
    { file: "./pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_deliriocampestre.png", nombre: "Hotel Delirio Campestre", id: "hotel-delirio-campestre-quindio" },
    { file: "./pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_linaje_salvaje.png", nombre: "Hotel Linaje Salvaje", id: "linaje-salvaje" }
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
      const subpageLink = it.id ? `./negocios/${it.id}.html` : '#';
      card.innerHTML = `
        <div class="biz-card-img-wrap"><a href="${subpageLink}"><img src="${imgUrl}" alt="${nombre}" class="biz-card-img" loading="lazy"></a></div>
        <div class="biz-card-body"><h3><a href="${subpageLink}" style="color:inherit;text-decoration:none">${nombre}</a></h3>
          <div style="display:flex;gap:8px;margin-top:12px"><a href="${subpageLink}" class="btn-cta">📋 Ver detalles</a><a href="${imgUrl}" target="_blank" class="btn-wa">🔎 Ver imagen</a></div>
        </div>`;
      gallery.appendChild(card);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load); else load();
})();

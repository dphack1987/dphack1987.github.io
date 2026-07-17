(function () {
  const PLACEHOLDER = './assets/images/decoraciones/D5VTOP7OQ5EYDJZUEMFDPXZ22E.jpg';

  const PATH_FIXES = {
    './pautas/p1.png': './assets/images/decoraciones/2149015443.jpg',
    './pautas/p2.png': './assets/images/decoraciones/8940221_4042181.jpg',
    './pautas/p3.png': './assets/images/decoraciones/9081966_4092826.jpg',
    './pautas/p4.png': './assets/images/decoraciones/2151973988.jpg',
    './pautas/p5.png': './pautas_publicitarias/Alquiler_de_fincas_quindio/casa_campestre_lacosecha.png',
    './pautas/p6.png': './pautas_publicitarias/Alquiler_de_fincas_quindio/finca_cafetera_el_ocaso.png',
    './pautas/p7.png': './pautas_publicitarias/Alquiler_de_fincas_quindio/finca_la_floresta.png',
    './pautas/p8.png': './pautas_publicitarias/Alquiler_de_fincas_quindio/hacienda_moraleja.png',
    './pautas/p9.png': './pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_alma_nativa.png',
    './pautas/p10.png': './pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_cafe_cafe_campestre.png',
    './pautas/p11.png': './pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_deliriocampestre.png',
    './pautas/p12.png': './pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_linaje_salvaje.png',
    './pautas/p13.png': './pautas_publicitarias/Alquiler_de_fincas_quindio/casa_campestre_lacosecha.png',
    './pautas/p14.png': './pautas_publicitarias/Alquiler_de_fincas_quindio/finca_cafetera_el_ocaso.png',
    './pautas/p15.png': './pautas_publicitarias/Alquiler_de_fincas_quindio/finca_la_floresta.png',
    './pautas/p16.png': './pautas_publicitarias/Alquiler_de_fincas_quindio/hacienda_moraleja.png',
    './pautas/p17.png': './pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_alma_nativa.png',
    './pautas/p18.png': './pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_cafe_cafe_campestre.png',
    './pautas/p19.png': './pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_deliriocampestre.png',
    './pautas/p21.png': './pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_linaje_salvaje.png',
    './pautas/p22.png': './pautas_publicitarias/Transportes/transportes_union_cafetera.png',
    './pautas/p23.png': './pautas_publicitarias/Transportes/transportes_mocca.png',
    './pautas/p24.png': './pautas_publicitarias/Transportes/transportes_joselu.png',
    './pautas/p25.png': './pautas_publicitarias/Transportes/rutas_y_turismo.png',
    './pautas/p26.png': './pautas_publicitarias/Transportes/radio_taxi.png',
    './pautas/p27.png': './pautas_publicitarias/Transportes/del_eje.png',
    './pautas/P27.png': './pautas_publicitarias/Transportes/del_eje.png',
    './pautas_circasia/pauta1.jpg': './assets/images/decoraciones/9081966_4092826.jpg',
    './pautas_circasia/pauta2.png': './assets/images/decoraciones/2149015443.jpg',
    './pautas_circasia/pauta3.png': './assets/images/decoraciones/8940221_4042181.jpg',
    './pautas_circasia/pauta4.png': './assets/images/decoraciones/2151973988.jpg',
    './pautas_circasia/pauta5.png': './assets/images/paisajes/48159.jpg',
    './pautas_circasia/pauta6.png': './assets/images/paisajes/56855.jpg',
    './pautas_circasia/pauta7.png': './assets/images/paisajes/10834.jpg',
    './pautas_circasia/pauta8.png': './assets/images/paisajes/D5VTOP7OQ5EYDJZUEMFDPXZ22E.jpg',
    './pautas_publicitarias/Alquiler_de_fincas/casa_campestre_lacosecha.png': './pautas_publicitarias/Alquiler_de_fincas_quindio/casa_campestre_lacosecha.png',
    './pautas_publicitarias/Alquiler_de_fincas/finca_cafetera_el_ocaso.png': './pautas_publicitarias/Alquiler_de_fincas_quindio/finca_cafetera_el_ocaso.png',
    './pautas_publicitarias/Alquiler_de_fincas/hotel_cafe_cafe_campestre.png': './pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_cafe_cafe_campestre.png',
    './pautas_publicitarias/Alquiler_de_fincas/hotel_delirio_campestre_quindio.png': PLACEHOLDER,
    './pautas_publicitarias/hoteles_armenia/hotel_san_jerónimo.png': './pautas_publicitarias/hoteles_armenia/hotel_san_jeronimo.png',
    './pautas_publicitarias/hoteles_armenia/hotel_san-jeronimo.png': './pautas_publicitarias/hoteles_armenia/hotel_san_jeronimo.png',
    './pautas_publicitarias/Centros_Comerciales/centro_comercial_sansur.png': './pautas_publicitarias/Centros Comerciales/centro_comercial_sansur.png',
    './pautas_publicitarias/Comidas_Rapidas/arepa_town.png': './pautas_publicitarias/Comidas_Rapidas/arepa_town.png',
    './pautas_publicitarias/Comidas_Rapidas/jhon_chewing_food.png': './pautas_publicitarias/Comidas_Rapidas/jhon_chewing_food.png',
    './pautas_publicitarias/Comidas_Rapidas/mostricos.png': './pautas_publicitarias/Comidas_Rapidas/mostricos.png',
    './pautas_publicitarias/Comidas_Rapidas/sanduches_sandukes.png': './pautas_publicitarias/Comidas_Rapidas/sanduches_sandukes.png',
    './pautas_publicitarias/Deportes_y_entretenimiento/camino_al_futbol.png': './pautas_publicitarias/Deportes y entretenimiento/camino_al_futbol.png',
    './pautas_publicitarias/atractivos_turisticos/Complejo_Turístico_y_Deportivo_Soledén.png': './pautas_publicitarias/atractivos_turisticos/Complejo_Turístico_y_Deportivo_Soledén.png',
    './pautas_publicitarias/atractivos_turisticos/quinti_casa_patasarriba.png': './pautas_publicitarias/atractivos_turisticos/quinti_casa_patasarriba.png',
    './pautas_publicitarias/atractivos_turisticos/parque_los_arrieros.png': './pautas_publicitarias/atractivos_turisticos/parque_los_arrieros.png',
    './assets/images/alojamientos/armont.jpg': PLACEHOLDER,
    './assets/images/seguro de viajes/diana_seguros.jpg': PLACEHOLDER,
    './assets/images/logo mapaquindio-com.png': './assets/images/logo_mapa/logo.png'
  };

  const normalizePath = (src) => {
    if (!src || typeof src !== 'string') return src;
    const trimmed = src.trim();
    if (!trimmed || trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:') || trimmed.startsWith('mailto:') || trimmed.startsWith('#')) {
      return trimmed;
    }

    const clean = trimmed.split('?')[0].split('#')[0];
    const direct = PATH_FIXES[clean] || PATH_FIXES['./' + clean.replace(/^\.\//, '')] || PATH_FIXES[clean.replace(/^\.\//, '')];
    if (direct) {
      return direct.replace(/^\.?\//, '/');
    }

    const absoluteRoot = clean.replace(/^(?:\.\.\/|\.\/)+/, '/');
    if (/^(?:\/)?(pautas_publicitarias|pautas|assets)\//.test(clean)) {
      return absoluteRoot.startsWith('/') ? absoluteRoot : `/${absoluteRoot}`;
    }

    if (clean.includes('/Alquiler_de_fincas/')) return clean.replace('/Alquiler_de_fincas/', '/Alquiler_de_fincas_quindio/');
    if (clean.includes('/Centros_Comerciales/')) return clean.replace('/Centros_Comerciales/', '/Centros Comerciales/');
    if (clean.includes('/Comidas_Rapidas/')) return clean.replace('/Comidas_Rapidas/', '/Comidas_Rapidas/');
    if (clean.includes('/Deportes_y_entretenimiento/')) return clean.replace('/Deportes_y_entretenimiento/', '/Deportes y entretenimiento/');
    if (clean.includes('/hoteles_armenia/')) return clean.replace('/hoteles_armenia/', '/hoteles_armenia/');
    return clean;
  };

  const patchElement = (element) => {
    if (!element || !(element instanceof HTMLImageElement)) return;
    const src = element.getAttribute('src');
    if (src) {
      const fixed = normalizePath(src);
      if (fixed && fixed !== src) element.setAttribute('src', fixed);
    }
    const srcset = element.getAttribute('srcset');
    if (srcset) {
      const parts = srcset.split(',').map(part => part.trim()).filter(Boolean).map(part => {
        const [url, ...rest] = part.split(/\s+/);
        const fixed = normalizePath(url);
        return fixed ? [fixed, ...rest].join(' ') : part;
      });
      if (parts.join(', ') !== srcset) element.setAttribute('srcset', parts.join(', '));
    }
  };

  const patchAllImages = () => {
    document.querySelectorAll('img').forEach(patchElement);
  };

  const init = () => {
    patchAllImages();
    if (window.MutationObserver) {
      const observer = new MutationObserver(() => patchAllImages());
      observer.observe(document.documentElement || document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'srcset']
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

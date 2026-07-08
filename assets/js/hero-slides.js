// Lista generada de imágenes publicitarias (png) en pautas_publicitarias
const HERO_SLIDES = [
  './pautas_publicitarias/Alquiler_de_fincas_quindio/casa_campestre_lacosecha.png',
  './pautas_publicitarias/Alquiler_de_fincas_quindio/finca_cafetera_el_ocaso.png',
  './pautas_publicitarias/Alquiler_de_fincas_quindio/finca_la_floresta.png',
  './pautas_publicitarias/Alquiler_de_fincas_quindio/hacienda_moraleja.png',
  './pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_alma_nativa.png',
  './pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_cafe_cafe_campestre.png',
  './pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_deliriocampestre.png',
  './pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_linaje_salvaje.png',

  './pautas_publicitarias/hoteles_armenia/hotel_el_bosque_armenia.png',
  './pautas_publicitarias/hoteles_armenia/hotel_isa_victory.png',
  './pautas_publicitarias/hoteles_armenia/hotel_san_jeronimo.png',

  './pautas_publicitarias/atractivos_turisticos/cascadas_rio_verde.png',
  './pautas_publicitarias/atractivos_turisticos/Complejo_Turístico_y_Deportivo_Soledén.png',
  './pautas_publicitarias/atractivos_turisticos/eco_parque_peñas_blancas.png',
  './pautas_publicitarias/atractivos_turisticos/finca_las_flores.png',
  './pautas_publicitarias/atractivos_turisticos/Granja_agricola_mama_lulu.png',
  './pautas_publicitarias/atractivos_turisticos/jardin_botanico_del_quindio.png',
  './pautas_publicitarias/atractivos_turisticos/laberinto_mil_caminos.png',
  './pautas_publicitarias/atractivos_turisticos/mirador_encanto_filandia.png',
  './pautas_publicitarias/atractivos_turisticos/panaca.png',
  './pautas_publicitarias/atractivos_turisticos/parque_los_arrieros.png',
  './pautas_publicitarias/atractivos_turisticos/quinti_casa_patasarriba.png',

  './pautas_publicitarias/Gastronomia_tipica/restaurante_el_fogon.png',
  './pautas_publicitarias/Gastronomia_tipica/restaurante_el_roble.png',
  './pautas_publicitarias/Gastronomia_tipica/restaurante_la_feria_del_platano.png',

  './pautas_publicitarias/Transportes/del_eje.png',
  './pautas_publicitarias/Transportes/radio_taxi.png',
  './pautas_publicitarias/Transportes/rutas_y_turismo.png',
  './pautas_publicitarias/Transportes/transportes_joselu.png',
  './pautas_publicitarias/Transportes/transportes_mocca.png',
  './pautas_publicitarias/Transportes/transportes_union_cafetera.png',

  './pautas_publicitarias/Cocteles_licores/boutique_licores_doscielos.png',
  './pautas_publicitarias/Cocteles_licores/cantina_el_desmadre.png',
  './pautas_publicitarias/Cocteles_licores/lafogata_circasia.png',
  './pautas_publicitarias/Cocteles_licores/la_fogata.png',

  './pautas_publicitarias/Comidas_Rapidas/arepa_town.png',
  './pautas_publicitarias/Comidas_Rapidas/jhon_chewing_food.png',
  './pautas_publicitarias/Comidas_Rapidas/mostricos.png',
  './pautas_publicitarias/Comidas_Rapidas/sanduches_sandukes.png',

  './pautas_publicitarias/Tiendas_de_cafe/anatolia.png',
  './pautas_publicitarias/Tiendas_de_cafe/artesanias_turronycafe.png',
  './pautas_publicitarias/Tiendas_de_cafe/cafe_la_terraza.png',
  './pautas_publicitarias/Tiendas_de_cafe/cafe_sensorial.png',
  './pautas_publicitarias/Tiendas_de_cafe/queso_y_cafe.png',
  './pautas_publicitarias/Tiendas_de_cafe/tienda_de_cafe_y_academia_cafeina.png',

  './pautas_publicitarias/agencias_de_turismo/agencia_operador_turistico_quindiotravel.png',
  './pautas_publicitarias/agencias_de_turismo/buen_vuelo_tours.png',
  './pautas_publicitarias/agencias_de_turismo/del_eje.png',
  './pautas_publicitarias/agencias_de_turismo/juan_arrubla.png',
  './pautas_publicitarias/agencias_de_turismo/viajes_turismo_enlaces.png',

  './pautas_publicitarias/Centros Comerciales/centro_comercial_sansur.png',
  './pautas_publicitarias/Centros Comerciales/centro_comercial_unicentro.png',

  './pautas_publicitarias/comida_de_mar/restaurante_magangue.png',
  './pautas_publicitarias/Deportes y entretenimiento/camino_al_futbol.png',
  './pautas_publicitarias/Deportes y entretenimiento/Complejo_Turistico_y_Deportivo_Soledén.png',
  './pautas_publicitarias/glamping/eco_parque_peñas_blancas.png',
  './pautas_publicitarias/glamping/hacienda_moraleja.png',
  './pautas_publicitarias/grupos_musicales/orquesta_quinta_base.png',
  './pautas_publicitarias/postres_y_dulces/reina__querida.png',
  './pautas_publicitarias/seguros/seguros_confia.png'
];

// Hero Slider Functionality
let currentSlideIndex = 0;
let slideInterval;

function initHeroSlider() {
  const sliderContainer = document.getElementById('hero-slider');
  const counterCurrent = document.getElementById('hero-slide-current');
  const counterTotal = document.getElementById('hero-slide-total');

  if (!sliderContainer) return;

  // Clear existing slide
  sliderContainer.innerHTML = '';

  // Add all slides from HERO_SLIDES
  HERO_SLIDES.forEach((imageSrc, index) => {
    const slide = document.createElement('div');
    slide.className = `hero-slide ${index === 0 ? 'active' : ''}`;
    slide.setAttribute('aria-hidden', index !== 0);
    slide.innerHTML = `
      <img src="${imageSrc}" alt="Publicidad del Quindío - Slide ${index + 1}" loading="${index === 0 ? 'eager' : 'lazy'}">
      <div class="hero-slide-meta">
        <span>Publicidad destacada</span>
      </div>
    `;
    sliderContainer.appendChild(slide);
  });

  // Update counter
  counterTotal.textContent = HERO_SLIDES.length;
  counterCurrent.textContent = 1;

  // Start autoplay
  startAutoplay();
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const counterCurrent = document.getElementById('hero-slide-current');

  if (!slides.length) return;

  // Remove active class from current slide
  slides[currentSlideIndex].classList.remove('active');
  slides[currentSlideIndex].setAttribute('aria-hidden', 'true');

  // Calculate new index
  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;

  // Update current index
  currentSlideIndex = index;

  // Add active class to new slide
  slides[currentSlideIndex].classList.add('active');
  slides[currentSlideIndex].setAttribute('aria-hidden', 'false');

  // Update counter
  counterCurrent.textContent = currentSlideIndex + 1;
}

function startAutoplay() {
  // Clear existing interval if any
  if (slideInterval) clearInterval(slideInterval);

  // Start new interval
  slideInterval = setInterval(() => {
    goToSlide(currentSlideIndex + 1);
  }, 3000); // Change slide every 3 seconds
}

// Initialize slider when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroSlider);
} else {
  initHeroSlider();
}

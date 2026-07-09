// Lista generada de imágenes publicitarias (png/jpg) en pautas_publicitarias
const HERO_SLIDES = [
  "pautas_publicitarias/agencias_de_turismo/agencia_operador_turistico_quindiotravel.png",
  "pautas_publicitarias/agencias_de_turismo/buen_vuelo_tours.png",
  "pautas_publicitarias/agencias_de_turismo/del_eje.png",
  "pautas_publicitarias/agencias_de_turismo/juan_arrubla.png",
  "pautas_publicitarias/agencias_de_turismo/viajes_turismo_enlaces.png",
  "pautas_publicitarias/Alquiler_de_fincas_quindio/casa_campestre_lacosecha.png",
  "pautas_publicitarias/Alquiler_de_fincas_quindio/finca_cafetera_el_ocaso.png",
  "pautas_publicitarias/Alquiler_de_fincas_quindio/finca_la_floresta.png",
  "pautas_publicitarias/Alquiler_de_fincas_quindio/hacienda_moraleja.png",
  "pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_alma_nativa.png",
  "pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_cafe_cafe_campestre.png",
  "pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_deliriocampestre.png",
  "pautas_publicitarias/Alquiler_de_fincas_quindio/hotel_linaje_salvaje.png",
  "pautas_publicitarias/artesanias/artesanias_turronycafe.png",
  "pautas_publicitarias/artesanias/ceramicas_alfarero.jpg",
  "pautas_publicitarias/atractivos_turisticos/cascadas_rio_verde.png",
  "pautas_publicitarias/atractivos_turisticos/Complejo_Turístico_y_Deportivo_Soledén.png",
  "pautas_publicitarias/atractivos_turisticos/eco_parque_peñas_blancas.png",
  "pautas_publicitarias/atractivos_turisticos/finca_las_flores.png",
  "pautas_publicitarias/atractivos_turisticos/Granja_agricola_mama_lulu.png",
  "pautas_publicitarias/atractivos_turisticos/jardin_botanico_del_quindio.png",
  "pautas_publicitarias/atractivos_turisticos/laberinto_mil_caminos.png",
  "pautas_publicitarias/atractivos_turisticos/mirador_encanto_filandia.png",
  "pautas_publicitarias/atractivos_turisticos/panaca.png",
  "pautas_publicitarias/atractivos_turisticos/parque_los_arrieros.png",
  "pautas_publicitarias/atractivos_turisticos/quinti_casa_patasarriba.png",
  "pautas_publicitarias/atractivos_turisticos/recorrido_cacaotero.png",
  "pautas_publicitarias/atractivos_turisticos/recorrido_de_la_cultura_cafetera.png",
  "pautas_publicitarias/Centros Comerciales/centro_comercial_sansur.png",
  "pautas_publicitarias/Centros Comerciales/centro_comercial_unicentro.png",
  "pautas_publicitarias/Cocteles_licores/boutique_licores_doscielos.png",
  "pautas_publicitarias/Cocteles_licores/cantina_el_desmadre.png",
  "pautas_publicitarias/Cocteles_licores/lafogata_circasia.png",
  "pautas_publicitarias/Cocteles_licores/la_fogata.png",
  "pautas_publicitarias/Comidas_Rapidas/arepa_town.png",
  "pautas_publicitarias/Comidas_Rapidas/jhon_chewing_food.png",
  "pautas_publicitarias/Comidas_Rapidas/mostricos.png",
  "pautas_publicitarias/Comidas_Rapidas/sanduches_sandukes.png",
  "pautas_publicitarias/comida_de_mar/restaurante_magangue.png",
  "pautas_publicitarias/Deportes y entretenimiento/camino_al_futbol.png",
  "pautas_publicitarias/Deportes y entretenimiento/Complejo_Turístico_y_Deportivo_Soledén.png",
  "pautas_publicitarias/Gastronomia_tipica/restaurante_el_fogon.png",
  "pautas_publicitarias/Gastronomia_tipica/restaurante_el_roble.png",
  "pautas_publicitarias/Gastronomia_tipica/restaurante_la_feria_del_platano.png",
  "pautas_publicitarias/glamping/eco_parque_peñas_blancas.png",
  "pautas_publicitarias/glamping/hacienda_moraleja.png",
  "pautas_publicitarias/grupos_musicales/orquesta_quinta_base.png",
  "pautas_publicitarias/hoteles_armenia/hotel_el_bosque_armenia.png",
  "pautas_publicitarias/hoteles_armenia/hotel_isa_victory.png",
  "pautas_publicitarias/hoteles_armenia/hotel_san_jeronimo.png",
  "pautas_publicitarias/postres_y_dulces/reina__querida.png",
  "pautas_publicitarias/seguros/seguros_confia.png",
  "pautas_publicitarias/Tiendas_de_cafe/anatolia.png",
  "pautas_publicitarias/Tiendas_de_cafe/artesanias_turronycafe.png",
  "pautas_publicitarias/Tiendas_de_cafe/cafe_la_terraza.png",
  "pautas_publicitarias/Tiendas_de_cafe/cafe_sensorial.png",
  "pautas_publicitarias/Tiendas_de_cafe/queso_y_cafe.png",
  "pautas_publicitarias/Tiendas_de_cafe/tienda_de_cafe_y_academia_cafeina.png",
  "pautas_publicitarias/Transportes/del_eje.png",
  "pautas_publicitarias/Transportes/radio_taxi.png",
  "pautas_publicitarias/Transportes/rutas_y_turismo.png",
  "pautas_publicitarias/Transportes/transportes_joselu.png",
  "pautas_publicitarias/Transportes/transportes_mocca.png",
  "pautas_publicitarias/Transportes/transportes_union_cafetera.png"
];

// Hero Slider Functionality
let currentSlideIndex = 0;
let slideInterval = null;
const AUTOPLAY_INTERVAL = 4000; // 4 segundos

function initHeroSlider() {
  const sliderContainer = document.getElementById('hero-slider');
  const counterCurrent = document.getElementById('hero-slide-current');
  const counterTotal = document.getElementById('hero-slide-total');
  const prevBtn = document.getElementById('hero-slide-prev');
  const nextBtn = document.getElementById('hero-slide-next');

  // Debug log
  console.log('Initializing hero slider', {
    sliderContainer: !!sliderContainer,
    heroSlidesCount: HERO_SLIDES?.length || 0,
    prevBtn: !!prevBtn,
    nextBtn: !!nextBtn
  });

  if (!sliderContainer || !HERO_SLIDES || HERO_SLIDES.length === 0) {
    console.error('Hero slider container or HERO_SLIDES not found');
    return;
  }

  // Clear existing content
  sliderContainer.innerHTML = '';

  // Add all slides from HERO_SLIDES
  HERO_SLIDES.forEach((imageSrc, index) => {
    const slide = document.createElement('div');
    slide.className = 'hero-slide' + (index === 0 ? ' active' : '');
    slide.setAttribute('aria-hidden', index !== 0 ? 'true' : 'false');
    slide.innerHTML = '<img src="' + imageSrc + '" alt="Publicidad del Quindío - Slide ' + (index + 1) + '" loading="' + (index === 0 ? 'eager' : 'lazy') + '"><div class="hero-slide-meta"><span>Publicidad destacada</span></div>';
    sliderContainer.appendChild(slide);
  });

  // Update counter
  if (counterTotal) counterTotal.textContent = HERO_SLIDES.length;
  if (counterCurrent) counterCurrent.textContent = '1';

  // Attach button events
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      console.log('Previous button clicked');
      goToSlide(currentSlideIndex - 1);
      resetAutoplay();
    });
  } else {
    console.warn('Previous button not found');
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      console.log('Next button clicked');
      goToSlide(currentSlideIndex + 1);
      resetAutoplay();
    });
  } else {
    console.warn('Next button not found');
  }

  // Pause autoplay on mouse enter, resume on mouse leave
  sliderContainer.addEventListener('mouseenter', stopAutoplay);
  sliderContainer.addEventListener('mouseleave', startAutoplay);

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      goToSlide(currentSlideIndex - 1);
      resetAutoplay();
    } else if (e.key === 'ArrowRight') {
      goToSlide(currentSlideIndex + 1);
      resetAutoplay();
    }
  });

  // Start autoplay
  startAutoplay();
  console.log('Hero slider initialized successfully');
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const counterCurrent = document.getElementById('hero-slide-current');

  if (!slides.length) return;

  // Remove active class from current slide
  slides[currentSlideIndex].classList.remove('active');
  slides[currentSlideIndex].setAttribute('aria-hidden', 'true');

  // Calculate new index
  if (index >= slides.length) {
    index = 0;
  }
  if (index < 0) {
    index = slides.length - 1;
  }

  // Update current index
  currentSlideIndex = index;

  // Add active class to new slide
  slides[currentSlideIndex].classList.add('active');
  slides[currentSlideIndex].setAttribute('aria-hidden', 'false');

  // Update counter
  if (counterCurrent) {
    counterCurrent.textContent = currentSlideIndex + 1;
  }
  
  console.log('Slide changed to: ' + (currentSlideIndex + 1));
}

function startAutoplay() {
  // Clear existing interval if any
  if (slideInterval) {
    clearInterval(slideInterval);
  }

  // Start new interval
  slideInterval = setInterval(function() {
    goToSlide(currentSlideIndex + 1);
  }, AUTOPLAY_INTERVAL);
}

function stopAutoplay() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
}

function resetAutoplay() {
  stopAutoplay();
  startAutoplay();
}

// Initialize slider when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroSlider);
} else {
  initHeroSlider();
}

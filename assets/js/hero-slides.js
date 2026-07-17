(function() {
  const SLIDES_DATA_URL = '/assets/js/hero-slides-data.json';
  const MAX_INITIAL_SLIDES = 5;
  let slidesData = [];
  let currentSlideIndex = 0;
  let slideInterval = null;
  let slidesLoaded = false;
  let sliderContainerRef = null;
  const AUTOPLAY_INTERVAL = 5000;

  function resolveAssetPath(src) {
    if (!src || typeof src !== 'string') return src;
    const trimmed = src.trim();
    if (/^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith('/')) return trimmed;
    return '/' + trimmed.replace(/^\.?\//, '');
  }

  function createSlideElement(slideData, index) {
    const slide = document.createElement('div');
    slide.className = 'hero-slide' + (index === 0 ? ' active' : '');
    slide.setAttribute('role', 'presentation');
    slide.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
    slide.innerHTML =
      '<img src="' + resolveAssetPath(slideData.src) + '" alt="' + slideData.alt + '" loading="' + (index === 0 ? 'eager' : 'lazy') + '" aria-hidden="true">' +
      '<div class="hero-slide-meta"><span>' + slideData.caption + '</span></div>';
    return slide;
  }

  function appendSlides(container, startIndex, endIndex) {
    for (let i = startIndex; i < endIndex; i++) {
      if (!slidesData[i]) continue;
      const slide = createSlideElement(slidesData[i], i);
      container.appendChild(slide);
    }
    if (endIndex >= slidesData.length) {
      slidesLoaded = true;
    }
  }

  function ensureAllSlidesLoaded() {
    if (slidesLoaded || !sliderContainerRef) return;
    appendSlides(sliderContainerRef, MAX_INITIAL_SLIDES, slidesData.length);
    slidesLoaded = true;
  }

  function loadSlidesData() {
    return fetch(SLIDES_DATA_URL, { cache: 'force-cache' })
      .then(response => {
        if (!response.ok) throw new Error('Failed to load hero slides data');
        return response.json();
      })
      .then(data => {
        slidesData = Array.isArray(data) ? data : [];
      })
      .catch(error => {
        console.error('Error loading hero slides data:', error);
        slidesData = [];
      });
  }

  async function initHeroSlider() {
    sliderContainerRef = document.getElementById('hero-slider');
    const counterCurrent = document.getElementById('hero-slide-current');
    const counterTotal = document.getElementById('hero-slide-total');
    const prevBtn = document.getElementById('hero-slide-prev');
    const nextBtn = document.getElementById('hero-slide-next');

    if (!sliderContainerRef) return;

    await loadSlidesData();
    if (!slidesData.length) return;

    sliderContainerRef.innerHTML = '';
    appendSlides(sliderContainerRef, 0, Math.min(slidesData.length, MAX_INITIAL_SLIDES));
    if (slidesData.length <= MAX_INITIAL_SLIDES) slidesLoaded = true;

    if (counterTotal) counterTotal.textContent = slidesData.length;
    if (counterCurrent) counterCurrent.textContent = '1';

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        ensureAllSlidesLoaded();
        goToSlide(currentSlideIndex - 1);
        resetAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        ensureAllSlidesLoaded();
        goToSlide(currentSlideIndex + 1);
        resetAutoplay();
      });
    }

    sliderContainerRef.addEventListener('mouseenter', stopAutoplay);
    sliderContainerRef.addEventListener('mouseleave', startAutoplay);

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          ensureAllSlidesLoaded();
          observer.disconnect();
        }
      }, { rootMargin: '200px' });
      observer.observe(sliderContainerRef);
    }

    document.addEventListener('keydown', function(event) {
      if (event.key === 'ArrowLeft') {
        ensureAllSlidesLoaded();
        goToSlide(currentSlideIndex - 1);
        resetAutoplay();
      } else if (event.key === 'ArrowRight') {
        ensureAllSlidesLoaded();
        goToSlide(currentSlideIndex + 1);
        resetAutoplay();
      }
    });

    startAutoplay();
  }

  function goToSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const counterCurrent = document.getElementById('hero-slide-current');

    if (!slides.length) return;

    if (slides[currentSlideIndex]) {
      slides[currentSlideIndex].classList.remove('active');
      slides[currentSlideIndex].setAttribute('aria-hidden', 'true');
    }

    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    currentSlideIndex = index;

    if (slides[currentSlideIndex]) {
      slides[currentSlideIndex].classList.add('active');
      slides[currentSlideIndex].setAttribute('aria-hidden', 'false');
    }

    if (counterCurrent) counterCurrent.textContent = currentSlideIndex + 1;
  }

  function startAutoplay() {
    if (slideInterval) clearInterval(slideInterval);
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroSlider);
  } else {
    initHeroSlider();
  }
})();

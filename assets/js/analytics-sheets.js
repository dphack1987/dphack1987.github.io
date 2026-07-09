/**
 * MAPA TURÍSTICO QUINDÍO - Analytics Tracker
 * Envía eventos a Google Apps Script → Google Sheets
 * 
 * Configuración requerida:
 * 1. GOOGLE_SHEET_WEBHOOK_URL = URL del Google Apps Script Deploy
 * 2. Data attributes en HTML: data-negocio-slug, data-municipio
 */

// ============================================
// CONFIGURACIÓN (Actualizar con tu URL)
// ============================================
const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzFVx2qVW4pMuX_pWh8g9UGVcthaZpMtgBRSvf6PtlioXlh44bvDR06hXRcBzAfYMYaGA/exec';

// ============================================
// SISTEMA DE USUARIOS ANÓNIMOS
// ============================================
function getOrCreateUserId() {
  const storageKey = 'mtq_analytics_user_id';
  let userId = localStorage.getItem(storageKey);
  
  if (!userId) {
    userId = 'user_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
    try {
      localStorage.setItem(storageKey, userId);
    } catch (e) {
      console.warn('LocalStorage no disponible:', e);
    }
  }
  
  return userId;
}

// ============================================
// FUNCIÓN PRINCIPAL: Enviar evento a Google Sheet
// ============================================
async function trackEventToSheet(evento, metadata = {}) {
  if (!GOOGLE_SHEET_WEBHOOK_URL.includes('script.googleapis.com')) {
    console.warn('⚠️ Google Apps Script URL no configurada. Events no se guardan.');
    return;
  }

  try {
    const payload = {
      timestamp: new Date().toISOString(),
      evento: evento,
      negocio_slug: metadata.negocio_slug || document.body.dataset.negocioSlug || null,
      municipio: metadata.municipio || document.body.dataset.municipio || null,
      usuario_id: getOrCreateUserId(),
      url: window.location.pathname,
      referrer: document.referrer || 'direct',
      user_agent: navigator.userAgent,
      metadata: metadata
    };

    // Enviar sin bloquear (async)
    fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify(payload)
    }).catch(err => {
      // Silenciar error (no bloquea usuario)
      console.debug('Analytics sent:', evento);
    });

  } catch (error) {
    console.error('Analytics error:', error);
  }
}

// ============================================
// EVENTO: Page View (Rastrear visita)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  trackEventToSheet('page_view', {
    page_title: document.title,
    page_path: window.location.pathname
  });
});

// ============================================
// EVENTO: WhatsApp Click (MÁS IMPORTANTE)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="https://wa.me"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const negocioSlug = document.body.dataset.negocioSlug || 'general';
      const municipio = document.body.dataset.municipio || 'unknown';
      const whatsappNumber = link.getAttribute('href').match(/\d+/)[0];
      
      trackEventToSheet('whatsapp_click', {
        negocio_slug: negocioSlug,
        municipio: municipio,
        whatsapp_number: whatsappNumber,
        timestamp_click: new Date().toISOString()
      });
      
      // Log visual (solo desarrollo)
      console.log('📱 WhatsApp click:', negocioSlug, municipio);
    });
  });
});

// ============================================
// EVENTO: Cambio de filtro (En listados)
// ============================================
function trackFilterChange(filterName, filterValue) {
  trackEventToSheet('filter_changed', {
    filter_name: filterName,
    filter_value: filterValue
  });
}

// ============================================
// EVENTO: Error (Para debugging)
// ============================================
window.addEventListener('error', (event) => {
  trackEventToSheet('js_error', {
    error_message: event.message,
    error_file: event.filename,
    error_line: event.lineno
  });
});

// ============================================
// EXPORTAR FUNCIONES (Para uso manual)
// ============================================
window.Analytics = {
  track: trackEventToSheet,
  trackFilter: trackFilterChange,
  getUserId: getOrCreateUserId,
  configure: function(webhookUrl) {
    if (webhookUrl) {
      window.GOOGLE_SHEET_WEBHOOK_URL = webhookUrl;
      console.log('✅ Analytics configurado');
    }
  }
};

console.log('📊 Analytics initialized. User ID:', getOrCreateUserId());

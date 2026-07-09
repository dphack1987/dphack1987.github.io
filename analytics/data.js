/**
 * ANALYTICS DATA - Placeholder
 * Este archivo se rellena con datos reales desde Google Sheets
 * Por ahora contiene datos simulados
 */

window.ANALYTICS_DATA = {
  source: 'mock', // Cambiar a 'google_sheets' cuando esté conectado
  lastUpdate: new Date().toISOString(),
  data: {
    kpis: {
      visitas_mes: 0,
      whatsapp_mes: 0,
      cambio_visitas: '--',
      cambio_whatsapp: '--'
    },
    negocios: [],
    municipios: []
  }
};

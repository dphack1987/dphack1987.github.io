(function() {
  function normalizePhone(value) {
    return String(value || '').replace(/\D/g, '');
  }

  function buildMessage(negocio, options = {}) {
    const nombre = negocio.nombre || 'este negocio';
    const tipo = negocio.tipo ? ` (${negocio.tipo})` : '';
    const origin = options.origin || 'MapaQuindio';
    const municipio = options.municipio || 'Quindío';
    const pageId = options.pageId || 'general';

    return encodeURIComponent(
      `Hola ${nombre},\nvi tu perfil en el Mapa Turístico del Quindío y quiero información sobre ${nombre}${tipo}.\nOrigen: ${origin} | Municipio: ${municipio} | Página: ${pageId}`
    );
  }

  window.generateWhatsAppLink = function(negocio, options = {}) {
    const numero = normalizePhone(negocio.whatsapp);
    if (!numero) return '#';
    return `https://wa.me/${numero}?text=${buildMessage(negocio, options)}`;
  };
})();

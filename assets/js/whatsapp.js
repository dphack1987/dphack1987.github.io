(function() {
  function normalizePhone(value) {
    return String(value || '').replace(/\D/g, '');
  }

  function buildMessage(negocio) {
    const nombre = negocio.nombre || 'este negocio';
    const tipo = negocio.tipo ? ` (${negocio.tipo})` : '';
    return encodeURIComponent(
      `Hola ${nombre},\nvi tu perfil en el Mapa Turístico del Quindío y quiero información sobre ${nombre}${tipo}.`
    );
  }

  window.generateWhatsAppLink = function(negocio) {
    const numero = normalizePhone(negocio.whatsapp);
    if (!numero) return '#';
    return `https://wa.me/${numero}?text=${buildMessage(negocio)}`;
  };
})();

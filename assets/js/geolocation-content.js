
// Dynamic content based on user's location
(function() {
  const municipiosData = [
    { id: 'armenia', nombre: 'Armenia', lat: 4.5339, lng: -75.6811, radio: 10,
      banner: '¡Bienvenido a Armenia! 🏙️',
      sugerencias: ['hotel-el-bosque', 'isa-victory-hotel', 'el-fogon-cuyabro']
    },
    { id: 'circasia', nombre: 'Circasia', lat: 4.6167, lng: -75.6333, radio: 8,
      banner: '¡Descubre Circasia! 🌿',
      sugerencias: ['la-fogata-express']
    },
    { id: 'montenegro', nombre: 'Montenegro', lat: 4.5667, lng: -75.75, radio: 8,
      banner: '¡Montenegro te espera! 🎢',
      sugerencias: ['hotel-delirio-campestre']
    }
  ];

  function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  function findNearestMunicipio(userLat, userLng) {
    let nearest = null;
    let minDist = Infinity;
    municipiosData.forEach(m => {
      const dist = calculateDistance(userLat, userLng, m.lat, m.lng);
      if (dist < minDist) {
        minDist = dist;
        nearest = { ...m, distancia: dist };
      }
    });
    return nearest;
  }

  function showDynamicBanner(municipio) {
    const banner = document.createElement('div');
    banner.style.cssText = `
      position: fixed; top: 120px; left: 0; right: 0;
      background: linear-gradient(135deg, #059669, #fbbf24);
      color: white; padding: 12px 20px; text-align: center;
      font-weight: 700; font-size: 16px; z-index: 9998;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    `;
    banner.innerHTML = `
      ${municipio.banner}
      <button onclick="this.parentElement.remove()" style="margin-left:20px;background:none;border:2px solid white;color:white;padding:6px 12px;border-radius:50px;cursor:pointer;font-weight:700;">✕</button>
    `;
    document.body.prepend(banner);
  }

  // Try to get user's location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const nearest = findNearestMunicipio(userLat, userLng);
        if (nearest && nearest.distancia <= nearest.radio) {
          showDynamicBanner(nearest);
          console.log(`📍 Usuario en ${nearest.nombre} (${nearest.distancia.toFixed(1)} km)`);
        }
      },
      () => {
        console.log('❌ No se pudo obtener la ubicación del usuario');
      }
    );
  }
})();

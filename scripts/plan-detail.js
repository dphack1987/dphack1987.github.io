import '/scripts/planes.js';

const PHONE = window.PlanesConfig?.whatsapp || '573174426044';

const PLAN_IMAGES = {
  'plan-express-quindio': '/planes_turisticos/planes_turisticos_transporte_especial/plan_1_especial.png',
  'plan-cafe-y-paisajes': '/planes_turisticos/planes_turisticos_transporte_especial/plan_2_especial.png',
  'plan-fin-de-semana-quindio': '/planes_turisticos/planes_turisticos_transporte_especial/plan_3_especial.png',
  'plan-taxi-urbano': '/planes_turisticos/planes_turisticos_transporte_taxi/plan_1_taxi.png',
  'plan-taxi-rural': '/planes_turisticos/planes_turisticos_transporte_taxi/plan_2_taxi.png',
  'plan-taxi-experiencia': '/planes_turisticos/planes_turisticos_transporte_taxi/plan_3_taxi.png'
};

const PLAN_TITLES = {
  'plan-express-quindio': 'Plan Express Quindío',
  'plan-cafe-y-paisajes': 'Plan Café y Paisajes',
  'plan-fin-de-semana-quindio': 'Plan Fin de Semana Quindío',
  'plan-taxi-urbano': 'Plan Taxi Urbano',
  'plan-taxi-rural': 'Plan Taxi Rural',
  'plan-taxi-experiencia': 'Plan Taxi Experiencia'
};

const DEFAULT_ITINERARIES = {
  'plan-express-quindio': [
    'Llegada a Quindío, check-in y recorrido en Parque del Café.',
    'Desayuno, visita a Salento y Valle de Cocora, regreso al hotel.'
  ],
  'plan-cafe-y-paisajes': [
    'Recorrido por fincas cafeteras y miradores del Quindío.',
    'Visita a pueblos, degustación y regreso con experiencias paisajísticas.'
  ],
  'plan-fin-de-semana-quindio': [
    'Check-in, alojamiento y recorrido suave en el primer día.',
    'Ruta flexible por el Quindío con actividades seleccionadas.'
  ],
  'plan-taxi-urbano': [
    'Movilidad dentro de la ciudad para los principales puntos de interés.',
    'Regreso seguro y atención personalizada según solicitud.'
  ],
  'plan-taxi-rural': [
    'Conexión entre municipios y visitas a atractivos rurales.',
    'Retorno al punto de partida con recomendaciones locales.'
  ],
  'plan-taxi-experiencia': [
    'Día completo con acompañamiento, rutas flexibles y paradas guiadas.',
    'Regreso por la tarde con servicio ajustado al grupo.'
  ]
};

function waHref(details){
  const base='https://wa.me/';
  const msg = `Hola Quindío Travel, solicito cotización:\nPlan: ${details.plan}\nNoches: ${details.nights}\nAcomodación: ${details.accommodation}\nOcupación: ${details.occupancy}\nTemporada: ${details.season}\nTransporte: ${details.transport}`;
  return base + encodeURIComponent(PHONE) + '?text=' + encodeURIComponent(msg);
}

function getPlanSlug(){
  const file = window.location.pathname.split('/').pop();
  return file.replace('.html','');
}

function fetchPriceData(){
  return fetch('../data/prices.json').then(res=>res.json()).catch(()=> (window._priceData || {}));
}

function renderGallery(gallery, planSlug){
  const img = PLAN_IMAGES[planSlug] || '/planes_turisticos/planes_turisticos_transporte_especial/plan_1_especial.png';
  gallery.innerHTML = `<img src="${img}" alt="Imagen del plan" loading="lazy">`;
}

function renderItinerary(itDiv, planSlug){
  const itinerary = DEFAULT_ITINERARIES[planSlug] || [];
  const html = '<ol style="margin:0;padding-left:18px">' + itinerary.map((line,index)=>`<li><strong>Día ${index+1}:</strong> ${line}</li>`).join('') + '</ol>';
  itDiv.innerHTML = html;
}

function init(){
  const gallery = document.getElementById('pd-gallery');
  const itDiv = document.getElementById('pd-itinerary');
  const planSlug = getPlanSlug();
  const planName = PLAN_TITLES[planSlug] || planSlug.replace(/-/g,' ').replace(/\b\w/g, c=>c.toUpperCase());

  renderGallery(gallery, planSlug);
  renderItinerary(itDiv, planSlug);

  const season = document.getElementById('pd-season');
  const accom = document.getElementById('pd-accom');
  const transport = document.getElementById('pd-transport');
  const occupancy = document.getElementById('pd-occupancy');
  const nights = document.getElementById('pd-nights');
  const calc = document.getElementById('pd-calc');
  const q = document.getElementById('pd-quote');
  const waTop = document.getElementById('pd-wa-top');
  const waQuote = document.getElementById('pd-wa-quote');

  let priceData = {};
  fetchPriceData().then(data=>{ priceData = data; calcQuote(); });

  function calcQuote(){
    const planPrices = priceData[planSlug] || {};
    const sea = season.value;
    const acc = accom.value;
    const occ = occupancy?.value || 'Doble';
    const trans = transport.value;
    const n = parseInt(nights.value,10) || 1;
    let unit = null;

    if(planPrices[sea] && planPrices[sea][acc]){
      const accObj = planPrices[sea][acc];
      if(trans.toLowerCase().includes('radio') && planPrices['radio_taxi']?.[sea]?.[acc]?.[occ] !== undefined){
        unit = planPrices['radio_taxi'][sea][acc][occ];
      } else if(accObj[occ] !== undefined){
        unit = accObj[occ];
      } else if(trans.toLowerCase().includes('radio') && accObj['Radio taxi'] !== undefined){
        unit = accObj['Radio taxi'];
      } else if(accObj['Placa blanca'] !== undefined){
        unit = accObj['Placa blanca'];
      }
    }

    if(!unit) unit = 200000;
    const total = unit * n;
    q.innerHTML = `Precio unitario (${occ}, ${trans}): <strong>$ ${unit.toLocaleString('es-CO')}</strong><br>Total para ${n} noche(s): <strong>$ ${total.toLocaleString('es-CO')}</strong>`;
    const waDetails = { plan: planName, nights: n, accommodation: acc, occupancy: occ, season: sea, transport: trans };
    waTop.href = waHref(waDetails);
    waQuote.href = waTop.href;
  }

  [season, accom, transport, occupancy, nights].forEach(el => {
    if(el) el.addEventListener('change', calcQuote);
  });
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();

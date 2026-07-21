import '/scripts/planes.js';

const PHONE = window.PlanesConfig?.whatsapp || '573174426044';

function waHref(details){
  const base='https://wa.me/';
  const msg = `Hola Quindío Travel, solicito cotización:\nPlan: ${details.plan}\nNoches: ${details.nights}\nAcomodación: ${details.accommodation}\nTemporada: ${details.season}\nTransporte: ${details.transport}`;
  return base + encodeURIComponent(PHONE) + '?text=' + encodeURIComponent(msg);
}

function init(){
  const gallery = document.getElementById('pd-gallery');
  const itDiv = document.getElementById('pd-itinerary');
  const planSlug = 'plan-express-quindio';

  // populate gallery from existing images
  const imgs = [
    '/planes_turisticos/planes_turisticos_transporte_especial/plan_1_especial.png',
    '/planes_turisticos/planes_turisticos_transporte_especial/plan_2_especial.png',
    '/planes_turisticos/planes_turisticos_transporte_especial/plan_3_especial.png'
  ];
  gallery.innerHTML = imgs.map(src=>`<img src="${src}" alt="Imagen del plan" loading="lazy">`).join('');

  // simple itinerary using data
  const data = window._planesData || [];
  const p = data.find(x=>x.slug===planSlug) || data[0] || {};
  const days = 2;
  let html = '<ol style="margin:0;padding-left:18px">';
  html += `<li><strong>Día 1:</strong> Llegada, alojamiento y visita a Parque del Café.</li>`;
  html += `<li><strong>Día 2:</strong> Recorrido por Salento y Valle de Cocora, regreso.</li>`;
  html += '</ol>';
  itDiv.innerHTML = html;

  // pricing controls
  const season = document.getElementById('pd-season');
  const accom = document.getElementById('pd-accom');
  const transport = document.getElementById('pd-transport');
  const nights = document.getElementById('pd-nights');
  const calc = document.getElementById('pd-calc');
  const q = document.getElementById('pd-quote');
  const waTop = document.getElementById('pd-wa-top');
  const waQuote = document.getElementById('pd-wa-quote');

  function calcQuote(){
    const prices = window._priceData || window._priceData || {};
    const planPrices = prices[planSlug];
    const sea = season.value;
    const acc = accom.value;
    const trans = transport.value;
    const n = parseInt(nights.value,10)||1;
    let unit=null;
    if(planPrices && planPrices[sea] && planPrices[sea][acc]){
      const accObj = planPrices[sea][acc];
      if(trans.toLowerCase().includes('radio') && accObj['Radio taxi']) unit = accObj['Radio taxi'];
      else if(accObj['Placa blanca']) unit = accObj['Placa blanca'];
      else if(accObj['Doble']) unit = accObj['Doble'];
    }
    if(!unit) unit = 200000;
    const total = unit * n;
    q.innerHTML = `Tarifa estimada: <strong>$ ${total.toLocaleString('es-CO')}</strong>`;
    waTop.href = waHref({plan: 'Plan Express Quindío', nights:n, accommodation:acc, season:sea, transport:trans});
    waQuote.href = waTop.href;
  }

  calc.addEventListener('click',calcQuote);
  // initial
  setTimeout(calcQuote,300);
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();

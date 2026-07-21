import './planes.js'; // ensures base module is available

const PHONE = window.PlanesConfig?.whatsapp || '573174426044';

function buildWhatsAppMessage(details){
  return `Hola Quindío Travel, solicito cotización:\nPlan: ${details.plan}\nNoches: ${details.nights}\nAcomodación: ${details.accommodation}\nTemporada: ${details.season}\nTransporte: ${details.transport}\nAdultos: ${details.adults || 1}\nNiños: ${details.children || 0}\nComentarios: ${details.comments || ''}`;
}

function whatsappHref(details){
  const base = 'https://wa.me/';
  const msg = buildWhatsAppMessage(details);
  return base + encodeURIComponent(PHONE) + '?text=' + encodeURIComponent(msg);
}

function initEnhanced(){
  const planSelect = document.getElementById('pt-plan-select');
  const nights = document.getElementById('pt-nights');
  const accommodation = document.getElementById('pt-accommodation');
  const season = document.getElementById('pt-season');
  const transport = document.getElementById('pt-transport');
  const itBtn = document.getElementById('pt-generate-itinerary');
  const calcBtn = document.getElementById('pt-calculate');
  const waBtn = document.getElementById('pt-wa-quote');
  const itDiv = document.getElementById('pt-itinerary');
  const qDiv = document.getElementById('pt-quote');

  function populatePlans(){
    const data = window._planesData || [];
    planSelect.innerHTML = data.map(p => `<option value="${p.slug}">${p.title}</option>`).join('');
  }

  function generateItinerary(){
    const n = parseInt(nights.value,10)||1;
    const plan = planSelect.value;
    // simple itinerary generator: day by day suggestions using highlights
    const data = window._planesData || [];
    const p = data.find(x=>x.slug===plan) || data[0] || {};
    const days = Math.max(1,n);
    let html = `<h4 style="margin:0 0 8px;">Itinerario sugerido — ${days} día(s)</h4><ol style="margin:0;padding-left:18px">`;
    for(let d=1;d<=days;d++){
      const highlight = p.highlights && p.highlights[(d-1)%p.highlights.length] || '';
      html += `<li><strong>Día ${d}:</strong> ${highlight || 'Actividad principal y visitas guiadas.'}</li>`;
    }
    html += `</ol>`;
    itDiv.innerHTML = html;
  }

  function calculateQuote(){
    const data = window._planesData || [];
    const plan = planSelect.value;
    const nightsVal = parseInt(nights.value,10)||1;
    const acc = accommodation.value;
    const trans = transport.value;
    const sea = season.value;

    // If price data is available (from folders), attempt exact lookup
    const priceData = window._priceData || null;
    let total = null;
    if(priceData && priceData[plan]){
      try{
        const planPrices = priceData[plan]; // expected structure: { baja: { Acomodacion: { Doble: number, Triple: number, "Sin Transporte": number } }, alta: {...} }
        const seasonKey = sea==='alta'?'alta':'baja';
        const roomKey = acc; // 'Económico', 'Intermedio', 'Intermedio VIP', 'VIP'
        // occupancy guess: choose 'Doble' for standard, otherwise base on nights (simple heuristic)
        const occ = nightsVal>2? 'Doble' : 'Doble';
        const transportKey = (trans && trans.toLowerCase().includes('radio'))? 'Radio taxi' : 'Placa blanca';
        // Prefer transport-specific price, else fallback to occupancy price
        let priceObj = planPrices[seasonKey] && planPrices[seasonKey][roomKey];
        if(priceObj){
          // try transport-specific
          if(priceObj[transportKey]){
            total = Math.round(priceObj[transportKey] * nightsVal);
          } else if(priceObj[occ]){
            total = Math.round(priceObj[occ] * nightsVal);
          }
        }
      }catch(e){ total = null; }
    }

    if(total === null){
      // fallback estimation (multiplier rules)
      const baseByPlan = { 'plan-express-quindio': 200000, 'plan-cafe-y-paisajes': 250000, 'plan-fin-de-semana-quindio': 180000, 'plan-taxi-urbano':120000, 'plan-taxi-rural':150000, 'plan-taxi-experiencia':200000 };
      const accMultiplier = { 'Económico':1, 'Intermedio':1.15, 'Intermedio VIP':1.35, 'VIP':1.8 };
      const transportMultiplier = trans.includes('Radio')?1.25:1.0;
      const seasonMultiplier = sea==='alta'?1.25:1.0;
      const base = baseByPlan[plan]||200000;
      total = Math.round(base * accMultiplier[acc] * transportMultiplier * seasonMultiplier * nightsVal);
    }

    qDiv.innerHTML = `<div>Tarifa estimada: <span style="font-size:1.2rem;">$ ${total.toLocaleString('es-CO')}</span></div><div style="font-size:.9rem;color:#475569;margin-top:6px">Nota: esta es una estimación rápida. Para cotización exacta contacte por WhatsApp.</div>`;

    // prepare whatsapp href
    const details = { plan, nights: nightsVal, accommodation: acc, season: sea, transport: trans };
    waBtn.href = whatsappHref(details);
  }

  // attempt to load price JSON files from the given folders
  async function loadPriceFiles(){
    const candidates = ['./planes_turisticos_transporte_especial/prices.json','./planes_turisticos_transporte_taxi/prices.json','./data/prices.json'];
    const aggregated = {};
    for(const url of candidates){
      try{
        const r = await fetch(url);
        if(r.ok){
          const js = await r.json();
          Object.assign(aggregated, js);
        }
      }catch(e){ /* ignore missing files */ }
    }
    if(Object.keys(aggregated).length) window._priceData = aggregated;
  }

  loadPriceFiles();

  // events
  itBtn.addEventListener('click', generateItinerary);
  calcBtn.addEventListener('click', calculateQuote);

  // when data ready
  const waitData = setInterval(()=>{
    if(window._planesData){
      clearInterval(waitData);
      populatePlans();
      generateItinerary();
      calculateQuote();
    }
  },200);
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',initEnhanced);
}else{initEnhanced();}

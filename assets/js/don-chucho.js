/* Don Chucho - Chat flotante + Cotizador
   - Inserta un widget fijo en la esquina inferior derecha
   - Abre un chat que puede enviar queries a un endpoint configurado (Ollama/Llama)
   - Consume `data/pautantes.json` para contexto (hospedaje, transporte, precios)
   - Incluye cotizador basado en precio por noche y envío por WhatsApp
*/
(function(){
  const API_URL = window.DON_CHUCHO_API_URL || null; // setear en página si se desea

  function formatCurrency(n){
    if(typeof n !== 'number') return n;
    return n.toLocaleString('es-CO', {style:'currency',currency:'COP',maximumFractionDigits:0});
  }

  function parsePriceString(s){
    if(!s) return 0;
    // extrae primer número continuo
    const m = String(s).replace(/\./g,'').match(/(\d{3,}|\d+)/);
    if(!m) return 0;
    const num = parseInt(m[0],10);
    return isNaN(num)?0:num;
  }

  // Load site data for context
  let SITE_DATA = [];
  fetch('./data/pautantes.json').then(r=>r.json()).then(j=>{SITE_DATA=j}).catch(()=>{SITE_DATA=[]});

  // Create DOM
  const container = document.createElement('div'); container.id = 'don-chucho-root';
  container.innerHTML = `
    <div class="don-chucho-btn" id="donChuchoBtn">🐦 Don Chucho</div>
    <div class="don-chucho-panel" id="donChuchoPanel" aria-hidden="true">
      <div class="dc-header"><strong>Don Chucho</strong><span class="dc-close" id="donChuchoClose">✕</span></div>
      <div class="dc-body">
        <div class="dc-chat" id="dcChat"></div>
        <div class="dc-input-row">
          <input id="dcInput" placeholder="Pregunta sobre hospedaje, transporte o precios..." />
          <button id="dcSend">Enviar</button>
        </div>
        <div class="dc-divider">Cotizador</div>
        <div class="dc-quote">
          <label>Selecciona una pauta (finca/hotel)</label>
          <select id="dcSelectPauta"><option value="">-- elegir --</option></select>
          <div class="dc-fields">
            <label>N° personas<input type="number" id="dcPeople" min="1" value="2"></label>
            <label>N° noches<input type="number" id="dcNights" min="1" value="1"></label>
          </div>
          <div class="dc-total">Total: <span id="dcTotal">-</span></div>
          <div class="dc-actions"><button id="dcReserve" class="btn-wa">Reservar ahora</button></div>
        </div>
      </div>
    </div>`;
  document.body.appendChild(container);

  // Populate select when data is ready
  function populatePautas(){
    const sel = document.getElementById('dcSelectPauta');
    if(!SITE_DATA.length) return;
    SITE_DATA.forEach(p=>{
      const opt = document.createElement('option'); opt.value = p.id; opt.textContent = p.nombre + (p.precio?(' — '+p.precio):'');
      sel.appendChild(opt);
    });
  }
  // try to populate after load
  setTimeout(populatePautas,800);
  // also when fetch completes
  (function waitForData(){ if(SITE_DATA.length){populatePautas()} else setTimeout(waitForData,500) })();

  // UI handlers
  const btn = document.getElementById('donChuchoBtn'); const panel = document.getElementById('donChuchoPanel'); const close = document.getElementById('donChuchoClose');
  btn.addEventListener('click', ()=>{panel.setAttribute('aria-hidden','false'); panel.classList.add('open'); btn.style.display='none'});
  close.addEventListener('click', ()=>{panel.setAttribute('aria-hidden','true'); panel.classList.remove('open'); btn.style.display='flex'});

  // Chat send
  const chat = document.getElementById('dcChat'); const input = document.getElementById('dcInput'); const send = document.getElementById('dcSend');
  function appendMessage(who, text){ const el = document.createElement('div'); el.className='dc-msg dc-'+who; el.textContent=text; chat.appendChild(el); chat.scrollTop = chat.scrollHeight; }

  async function sendToModel(text){
    appendMessage('user', text);
    appendMessage('bot','Pensando...');
    const context = buildContext(text);
    try{
      if(API_URL){
        const res = await fetch(API_URL, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({role:'Guía turístico experto en el Quindío',query:text,context})});
        const data = await res.json();
        // expect { reply: '...' }
        chat.querySelector('.dc-bot-temp')?.remove();
        appendMessage('bot', data.reply || JSON.stringify(data));
      } else {
        // fallback: simple local answer using SITE_DATA
        const reply = localAnswer(text, context);
        chat.querySelector('.dc-bot-temp')?.remove();
        appendMessage('bot', reply);
      }
    }catch(e){ chat.querySelector('.dc-bot-temp')?.remove(); appendMessage('bot','Error al conectar con el modelo.'); }
  }

  send.addEventListener('click', ()=>{ const t=input.value.trim(); if(!t) return; sendToModel(t); input.value=''; });
  input.addEventListener('keydown', e=>{ if(e.key==='Enter'){ e.preventDefault(); send.click(); } });

  // Build small context: find matching pautas by name or category
  function buildContext(query){
    const q = String(query||'').toLowerCase();
    const hits = SITE_DATA.filter(p=> (p.nombre||'').toLowerCase().includes(q) || (p.municipio||'').toLowerCase().includes(q) || (p.categoria||'').toLowerCase().includes(q));
    const top = hits.slice(0,6).map(p=>({id:p.id,nombre:p.nombre,categoria:p.categoria,municipio:p.municipio,precio:p.precio,telefono:p.telefono,whatsapp:p.whatsapp}));
    return {site:'mapaturisticodelquindio.com',hits:top};
  }

  function localAnswer(query, context){
    if(context.hits && context.hits.length){
      return 'Encontré estos negocios relacionados:\n' + context.hits.map(h=>`• ${h.nombre} (${h.categoria}) — ${h.precio||'precio no disponible'}`).join('\n');
    }
    if(/precio|noche|tarifa/.test(query.toLowerCase())) return 'Para ver precios por noche, abre la ficha de la propiedad o selecciona una pauta en el cotizador.';
    return 'Hola — soy Don Chucho, tu guía. Puedo ayudar con hospedaje, transporte y precios. Selecciona una pauta o pregúntame directamente.';
  }

  // Cotizador
  const sel = document.getElementById('dcSelectPauta'); const people = document.getElementById('dcPeople'); const nights = document.getElementById('dcNights'); const totalEl = document.getElementById('dcTotal'); const reserveBtn = document.getElementById('dcReserve');
  function compute(){
    const id = sel.value; if(!id){ totalEl.textContent='-'; return; }
    const item = SITE_DATA.find(x=>x.id===id); if(!item){ totalEl.textContent='-'; return; }
    const price = parsePriceString(item.precio||item.price||item.rate);
    if(!price){ totalEl.textContent='Precio no disponible'; return; }
    const nightsVal = Math.max(1, parseInt(nights.value||1,10)); const peopleVal = Math.max(1, parseInt(people.value||1,10));
    const subtotal = price * nightsVal; // keep per-night, ignore per-person adjustments
    totalEl.textContent = formatCurrency(subtotal) + ` (${nightsVal} noches)`;
  }
  sel.addEventListener('change', compute); people.addEventListener('input', compute); nights.addEventListener('input', compute);

  reserveBtn.addEventListener('click', ()=>{
    const id = sel.value; if(!id) return alert('Selecciona una pauta.');
    const item = SITE_DATA.find(x=>x.id===id); if(!item) return alert('Pauta no encontrada.');
    const nightsVal = Math.max(1, parseInt(nights.value||0,10)); const peopleVal = Math.max(1, parseInt(people.value||0,10));
    if(!nightsVal || !peopleVal) return alert('Completa número de personas y noches.');
    const price = parsePriceString(item.precio||item.price||item.rate);
    if(!price) return alert('Precio no disponible para esta pauta. Por favor contacta al anunciante.');
    const subtotal = price * nightsVal;
    const message = `Hola ${item.nombre || ''}, quiero reservar: \n- Personas: ${peopleVal}\n- Noches: ${nightsVal}\n- Total: ${formatCurrency(subtotal)}\nNombre: \nTeléfono: \n¿Está disponible?`;
    const wa = (window.generateWhatsAppLink && typeof window.generateWhatsAppLink === 'function') ? window.generateWhatsAppLink(Object.assign({}, item, {message})) : (`https://wa.me/${item.whatsapp}?text=${encodeURIComponent(message)}`);
    window.open(wa,'_blank');
  });

  // Expose for debugging
  window.DON_CHUCHO = {sendToModel, buildContext, SITE_DATA};

})();

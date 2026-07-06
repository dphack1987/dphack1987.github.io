/* Don Chucho - Modo guía narrativo y plantillas de 'Top' */
(function(){
  function ready(fn){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fn); else fn(); }
  ready(()=>{
    if(!window.DON_CHUCHO) return;
    const root = document.getElementById('donChuchoPanel'); if(!root) return;

    const box = document.createElement('div'); box.style.display='flex'; box.style.gap='8px'; box.style.marginTop='6px';
    box.innerHTML = `<button id="dcNarrate" class="sf-btn">Narrar Paisaje</button><button id="dcTop5" class="sf-btn">Top 5 pueblos</button>`;
    root.querySelector('.dc-body').insertBefore(box, root.querySelector('.dc-body').querySelector('.dc-chat'));

    document.getElementById('dcNarrate').addEventListener('click', async ()=>{
      const prompt = 'Eres un guía turístico experto del Quindío. Narra la historia del Paisaje Cultural Cafetero en un tono cálido y recomienda 3 lugares imperdibles con una pequeña explicación.';
      appendLocalUser('Narrativo');
      await generateGuideResponse(prompt);
    });

    document.getElementById('dcTop5').addEventListener('click', async ()=>{
      const prompt = 'Genera un artículo tipo "Top 5 pueblos más mágicos del Quindío" con 5 bullets, una breve intro y sugerencia de 2 actividades por pueblo.';
      appendLocalUser('Top 5 pueblos');
      await generateGuideResponse(prompt);
    });

    function appendLocalUser(label){ const chat = document.getElementById('dcChat'); const el = document.createElement('div'); el.className='dc-msg dc-user'; el.textContent=label; chat.appendChild(el); }

    async function generateGuideResponse(prompt){
      const chat = document.getElementById('dcChat'); const botTemp = document.createElement('div'); botTemp.className='dc-msg dc-bot'; botTemp.textContent='Generando...'; chat.appendChild(botTemp); chat.scrollTop = chat.scrollHeight;
      try{
        // prefer configured API
        if(window.DON_CHUCHO && window.DON_CHUCHO.sendToModel){
          await window.DON_CHUCHO.sendToModel(prompt);
        } else {
          // fallback: simple local generator using site data
          const items = window.DON_CHUCHO && window.DON_CHUCHO.SITE_DATA ? window.DON_CHUCHO.SITE_DATA : [];
          const reply = localGuide(prompt, items.slice(0,12));
          botTemp.remove(); const el = document.createElement('div'); el.className='dc-msg dc-bot'; el.textContent = reply; chat.appendChild(el); chat.scrollTop = chat.scrollHeight;
        }
      }catch(e){ botTemp.textContent = 'Error generando respuesta.'; }
    }

    function localGuide(prompt, items){
      if(prompt.includes('Top 5')){
        const top = items.slice(0,5).map((p,i)=>`${i+1}. ${p.nombre} — ${p.municipio}. Actividades: ${(p.servicios||[]).slice(0,2).join(', ') || 'Visitar'}`);
        return `Top 5 pueblos más mágicos del Quindío:\n\n${top.join('\n\n')}\n\nConsejo: Reserva con antelación en fines de semana y consulta temporadas.`;
      }
      // default narrative
      const sample = items.slice(0,3).map(p=>`${p.nombre} (${p.municipio}) — ${p.descripcion || ''}`);
      return `El Paisaje Cultural Cafetero es...\n\nLugares recomendados:\n- ${sample.join('\n- ')}`;
    }
  });
})();

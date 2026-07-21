const PHONE = window.PlanesConfig?.whatsapp || '573174426044';
const DATA_PATH = window.PlanesConfig?.dataPath || './data/planes-quindio-travel.json';

function whatsappLink(phone, text) {
  const base = 'https://wa.me/';
  return base + encodeURIComponent(phone) + '?text=' + encodeURIComponent(text);
}

function renderPlanCard(plan, transport) {
  const highlights = (plan.highlights || []).map(h => `<li>${h}</li>`).join('');
  const text = `${plan.title} - ${plan.category}. Precio: ${plan.price}. Transporte: ${transport}. Estoy interesado en este plan.`;
  const wa = whatsappLink(PHONE, text);
  return `
    <article class="plan-card" data-category="${plan.category}">
      <img loading="lazy" src="${plan.image}" alt="${plan.title}">
      <div class="plan-card-body">
        <span class="plan-chip">${plan.category}</span>
        <h3>${plan.title}</h3>
        <p>${plan.description}</p>
        <div class="plan-meta">
          <span>⏱️ ${plan.duration}</span>
          <span>💵 ${plan.price}</span>
        </div>
        <ul style="padding-left:18px; color:#475569; line-height:1.6; margin:0 0 16px;">
          ${highlights}
        </ul>
        <div style="display:flex; gap:10px; align-items:center;">
          <a class="btn-ws" href="${wa}" target="_blank" rel="noopener">Contactar por WhatsApp →</a>
          <a class="btn-detail" href="/planes/${plan.slug}.html" style="background:#eef2ff;color:#3730a3;padding:10px 14px;border-radius:999px;text-decoration:none;font-weight:700;">Ver detalle</a>
        </div>
      </div>
    </article>
  `;
}

async function loadPlans() {
  try {
    const res = await fetch(DATA_PATH);
    const data = await res.json();
    window._planesData = data;
    renderPlans(data);
  } catch (e) {
    document.getElementById('plans-container').innerHTML = '<p style="color:#64748b;">No fue posible cargar la información en este momento.</p>';
  }
}

function renderPlans(data) {
  const container = document.getElementById('plans-container');
  const transport = document.getElementById('transport-select')?.value || 'Placa blanca';
  const filter = document.getElementById('plan-filter')?.value || 'all';
  const list = data.filter(p => filter === 'all' ? true : p.category === filter);
  container.innerHTML = list.map(p => renderPlanCard(p, transport)).join('');
}

function wireControls() {
  const filter = document.getElementById('plan-filter');
  const transport = document.getElementById('transport-select');
  if (filter) {
    filter.addEventListener('change', () => renderPlans(window._planesData || []));
  }
  if (transport) {
    transport.addEventListener('change', () => renderPlans(window._planesData || []));
  }
}

// init
loadPlans().then(() => wireControls());

export {};

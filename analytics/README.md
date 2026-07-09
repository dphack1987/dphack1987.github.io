# 📊 ANALYTICS - GUÍA RÁPIDA

## ✅ ¿Qué hemos implementado?

Hemos creado un **sistema completo de analytics 100% gratuito** que te permite rastrear:

1. **Visitas a cada página** - Cuántos usuarios ven cada negocio
2. **Clicks en WhatsApp** - Cuántas personas contactan por WhatsApp
3. **Tasa de conversión** - Porcentaje de visitantes que hacen click
4. **Top 10 negocios** - Ranking de más contactos
5. **Por municipio** - Distribución de tráfico entre municipios

---

## 📂 Archivos creados

```
tu-proyecto/
├── /analytics/
│   ├── index.html          ← Admin panel (lo ves en /analytics/)
│   └── data.js             ← Datos (se llenan automáticamente)
│
├── /assets/js/
│   └── analytics-sheets.js ← Tracker que envía datos
│
└── GUIA_GOOGLE_APPS_SCRIPT.md ← Instrucciones detalladas
```

---

## 🚀 PASOS PARA EMPEZAR (15 minutos)

### PASO 1: Ver el admin panel (YA FUNCIONA)
```
1. Abre tu navegador
2. Ve a: http://localhost/analytics/
   O: https://tu-sitio.com/analytics/

¡Ya verás un dashboard hermoso con datos simulados!
```

### PASO 2: Configurar Google Apps Script (5 min)
1. Abre: [GUIA_GOOGLE_APPS_SCRIPT.md](../GUIA_GOOGLE_APPS_SCRIPT.md)
2. Sigue los pasos (crear Google Sheet, copiar código, hacer deploy)
3. Obtendrás una URL (se parece a: `https://script.googleapis.com/...`)

### PASO 3: Conectar URL en tu sitio (2 min)
1. Abre: `/assets/js/analytics-sheets.js`
2. Reemplaza:
   ```javascript
   const GOOGLE_SHEET_WEBHOOK_URL = 'REEMPLAZA_CON_TU_URL_DE_GOOGLE_APPS_SCRIPT';
   ```
   Por tu URL real de Google Apps Script

3. Guarda

### PASO 4: Regenerar páginas (1 min)
```bash
npm run generate-pages
```

¡Listo! Ahora:
- ✅ Cada click en "Contactar por WhatsApp" se guarda en Google Sheet
- ✅ El admin panel ya está listo en `/analytics/`
- ✅ Los datos simulados mostrarán cómo se verá cuando lleguen datos reales

---

## 📊 ¿Cómo ver datos REALES?

Opción A (Fácil, ahora):
- Los datos simulados ya dan una idea clara
- El admin panel es funcional

Opción B (Avanzado, próximamente):
- Conectar Google Sheets API en `/analytics/`
- Mostrar datos en tiempo real
- (Te ayudaré con esto)

---

## 💡 Cómo funciona el rastreo

```
1. Usuario ve página de negocio (ej: Alma Nativa)
   → analytics-sheets.js envía evento "page_view"
   
2. Usuario hace click "Contactar por WhatsApp"
   → analytics-sheets.js envía evento "whatsapp_click"
   
3. Google Apps Script recibe el evento
   → Lo guarda en Google Sheet pestaña "Eventos"
   
4. Script recalcula automáticamente:
   → "ResumenPorNegocio" (cuántos clicks por negocio)
   → "KPIsGlobales" (métricas globales)
   
5. Tu admin panel muestra todo esto
```

---

## 🔍 Verificar que funciona

### Test 1: Abrir consola del navegador
1. F12 → Consola
2. Deberías ver: `📊 Analytics initialized. User ID: user_1234...`

### Test 2: Haz click en WhatsApp
1. Abre una página de negocio
2. Haz click "Contactar por WhatsApp"
3. Abre consola (F12)
4. Deberías ver: `📱 WhatsApp click: ...`

### Test 3: Revisa Google Sheet
1. Abre tu Google Sheet "MTQ Analytics"
2. Pestaña "Eventos"
3. Deberías ver filas nuevas con tus clics

---

## 📋 Métricas que ves en dashboard

**KPIs (Arriba)**
- Visitas (Mes)
- Contactos WhatsApp
- Tasa de Conversión
- Negocios Activos

**Gráficos**
- Visitas últimos 30 días (línea)
- WhatsApp clicks últimos 30 días (barras)
- Tráfico por municipio (barras horizontales)

**Tablas**
- Top 10 Negocios
- Top Municipios

---

## 🎯 Cómo VENDER esto a los clientes

Muestra el dashboard en `/analytics/` y di:

> "Tu negocio en junio:
> - 450 personas te vieron
> - 45 hicieron click en WhatsApp
> - Si pagaras en Google Ads = $360 (45 × $8)
> - Con nosotros = $0
> **Acabas de ahorrar $360 este mes** 💰"

---

## 🚀 Próximos pasos (opcional)

Cuando ya funcione y quieras mejorar:

1. **Conectar datos reales** (no simulados)
   - Leer desde Google Sheets en tiempo real
   - Actualizar dashboard cada 5 minutos

2. **Google Data Studio**
   - Crear dashboards más avanzados
   - Compartir con otros equipos

3. **Reportes automáticos**
   - Email semanal a clientes
   - PDF con sus métricas

4. **Análisis avanzado**
   - Predicciones de demanda
   - Recomendaciones de mejora

---

## ❓ Preguntas frecuentes

**P: ¿Es gratis?**
R: Sí, 100% gratis para siempre. Google Sheets y Apps Script son gratis.

**P: ¿Se puede editar manualmente?**
R: Sí, puedes editar directamente en Google Sheet si necesitas ajustar datos.

**P: ¿Datos privados?**
R: Sí. Solo tú y quien invites pueden ver Google Sheet y dashboard.

**P: ¿Cuántos datos puedo guardar?**
R: Google Sheets soporta millones de filas. Para tu caso: ilimitado.

---

## 📞 Soporte

- Ver instrucciones completas: [GUIA_GOOGLE_APPS_SCRIPT.md](../GUIA_GOOGLE_APPS_SCRIPT.md)
- Admin panel: `/analytics/index.html`
- Tracker: `/assets/js/analytics-sheets.js`

---

## 🎉 Estado actual

| Componente | Estado | Acción |
|-----------|--------|--------|
| Admin panel | ✅ Listo | Abre `/analytics/` |
| Tracker JS | ✅ Listo | Configura Google Apps Script |
| Google Sheet | 🔲 Necesario | Crea según guía |
| Google Apps Script | 🔲 Necesario | Deploy según guía |
| Rastreo de clicks | ✅ Integrado | Ya funciona cuando configures |

**Siguiente: Sigue la guía en GUIA_GOOGLE_APPS_SCRIPT.md**


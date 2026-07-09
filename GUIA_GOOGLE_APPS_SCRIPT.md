# 📊 GUÍA: Configurar Google Apps Script

## ✅ Objetivo
Conectar tu sitio web con Google Sheets para guardar automáticamente cada click en WhatsApp.

---

## 🔧 PASO 1: Crear Google Sheet (5 min)

1. Ir a https://sheets.google.com
2. Click **"+ Crear"** → **Hoja de cálculo nueva**
3. Nombrar: **"MTQ Analytics"**
4. Renombrar las pestañas:
   - Pestaña 1: **"Eventos"**
   - Pestaña 2: **"ResumenPorNegocio"**
   - Pestaña 3: **"KPIsGlobales"**

### Pestaña "Eventos" (Datos crudos - aquí se guardan los clicks)
```
Columnas:
A: timestamp
B: evento
C: negocio_slug
D: municipio
E: usuario_id
F: url
G: referrer
```

**Primera fila (Headers):**
```
timestamp | evento | negocio_slug | municipio | usuario_id | url | referrer
```

### Pestaña "ResumenPorNegocio" (Se actualiza automáticamente)
```
Columnas:
A: negocio_slug
B: negocio_nombre
C: municipio
D: total_visitas
E: total_whatsapp_clicks
F: tasa_conversion
G: ultima_actualizacion
```

### Pestaña "KPIsGlobales" (Métricas principales)
```
Columnas:
A: metrica
B: valor
C: cambio_porcentual
D: fecha
```

---

## 🚀 PASO 2: Crear Google Apps Script (15 min)

### 2A. Abrir Google Apps Script

1. Ir a https://script.google.com
2. Click **"+ Nuevo proyecto"**
3. Nombrar proyecto: **"MTQ Analytics Backend"**

### 2B. Copiar código del script

En la ventana de editor, **borrar todo** y **pegar este código:**

```javascript
/**
 * MAPA TURÍSTICO QUINDÍO - Google Apps Script Backend
 * Función que recibe datos del sitio web y los guarda en Google Sheets
 */

// ============================================
// CONFIGURACIÓN
// ============================================

// ID de tu Google Sheet (ver en URL de la hoja)
// Ej: https://docs.google.com/spreadsheets/d/1ABC2DEF3GHIJK/edit
// El ID es: 1ABC2DEF3GHIJK
const SHEET_ID = 'REEMPLAZA_CON_TU_SHEET_ID';

// ============================================
// FUNCIÓN PRINCIPAL: Recibir datos del sitio
// ============================================

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID);
    
    // Guardar evento en pestaña "Eventos"
    const eventosSheet = sheet.getSheetByName('Eventos');
    eventosSheet.appendRow([
      data.timestamp,
      data.evento,
      data.negocio_slug,
      data.municipio,
      data.usuario_id,
      data.url,
      data.referrer
    ]);
    
    // Recalcular resúmenes
    actualizarResumenes(sheet, data.municipio);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', timestamp: new Date() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    Logger.log('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================
// FUNCIÓN: Actualizar resúmenes
// ============================================

function actualizarResumenes(sheet, municipio) {
  try {
    const eventosSheet = sheet.getSheetByName('Eventos');
    const resumenSheet = sheet.getSheetByName('ResumenPorNegocio');
    
    const datos = eventosSheet.getDataRange().getValues();
    
    // Obtener negocios únicos
    const negocios = {};
    
    for (let i = 1; i < datos.length; i++) { // Omitir header
      const timestamp = datos[i][0];
      const evento = datos[i][1];
      const slug = datos[i][2];
      const municipio_row = datos[i][3];
      
      if (!slug || slug === '') continue;
      
      if (!negocios[slug]) {
        negocios[slug] = {
          slug: slug,
          municipio: municipio_row,
          visitas: 0,
          whatsapp: 0
        };
      }
      
      if (evento === 'page_view') {
        negocios[slug].visitas++;
      } else if (evento === 'whatsapp_click') {
        negocios[slug].whatsapp++;
      }
    }
    
    // Limpiar y actualizar pestaña de resumen
    if (resumenSheet.getMaxRows() > 1) {
      resumenSheet.deleteRows(2, resumenSheet.getMaxRows() - 1);
    }
    
    // Agregar datos resumidos
    Object.values(negocios).forEach(negocio => {
      const visitas = negocio.visitas || 0;
      const whatsapp = negocio.whatsapp || 0;
      const conversion = visitas > 0 ? ((whatsapp / visitas) * 100).toFixed(2) : 0;
      
      resumenSheet.appendRow([
        negocio.slug,
        negocio.slug, // Nombre (se puede mejorar)
        negocio.municipio,
        visitas,
        whatsapp,
        conversion + '%',
        new Date().toLocaleString()
      ]);
    });
    
    // Actualizar KPIs globales
    actualizarKPIsGlobales(sheet, datos);
    
  } catch(error) {
    Logger.log('Error en resúmenes:', error);
  }
}

// ============================================
// FUNCIÓN: Actualizar KPIs globales
// ============================================

function actualizarKPIsGlobales(sheet, datos) {
  try {
    const kpisSheet = sheet.getSheetByName('KPIsGlobales');
    
    // Limpiar contenido anterior
    if (kpisSheet.getMaxRows() > 1) {
      kpisSheet.deleteRows(2, kpisSheet.getMaxRows() - 1);
    }
    
    // Contar eventos
    let totalVisitas = 0;
    let totalWhatsApp = 0;
    
    for (let i = 1; i < datos.length; i++) {
      const evento = datos[i][1];
      if (evento === 'page_view') totalVisitas++;
      else if (evento === 'whatsapp_click') totalWhatsApp++;
    }
    
    const conversion = totalVisitas > 0 ? ((totalWhatsApp / totalVisitas) * 100).toFixed(2) : 0;
    
    // Agregar KPIs
    kpisSheet.appendRow(['Visitas totales', totalVisitas, '+', new Date().toDateString()]);
    kpisSheet.appendRow(['WhatsApp clicks', totalWhatsApp, '+', new Date().toDateString()]);
    kpisSheet.appendRow(['Tasa conversión', conversion + '%', '—', new Date().toDateString()]);
    
  } catch(error) {
    Logger.log('Error en KPIs:', error);
  }
}
```

---

## 📝 PASO 3: Configurar credenciales

### 3A. Obtener ID de tu Google Sheet

1. Abre tu Google Sheet "MTQ Analytics"
2. Mira la URL: `https://docs.google.com/spreadsheets/d/AQUI_VA_TU_ID/edit`
3. Copia la parte `AQUI_VA_TU_ID`

### 3B. Reemplazar ID en el script

En Google Apps Script, reemplaza:
```javascript
const SHEET_ID = 'REEMPLAZA_CON_TU_SHEET_ID';
```

Por:
```javascript
const SHEET_ID = '1ABC2DEF3GHIJK...'; // Tu ID real
```

---

## 🔗 PASO 4: Hacer Deploy como Web App

1. En Google Apps Script, click **"Deploy"** (botón azul arriba)
2. Click **"New deployment"**
3. Seleccionar tipo: **"Web app"**
4. Configurar:
   - **Execute as**: Tu email
   - **Who has access**: "Anyone"
5. Click **"Deploy"**
6. Se abrirá ventana con tu URL. **Copiar esta URL** (empieza con `https://script.googleapis.com/...`)

---

## 🔌 PASO 5: Conectar en tu sitio web

### 5A. Obtener URL de Deploy

La URL que copiaste se ve así:
```
https://script.googleapis.com/macros/d/[SCRIPT_ID]/userweb/exec
```

### 5B. Configurar en analytics-sheets.js

Abre: `/assets/js/analytics-sheets.js`

Reemplaza:
```javascript
const GOOGLE_SHEET_WEBHOOK_URL = 'REEMPLAZA_CON_TU_URL_DE_GOOGLE_APPS_SCRIPT';
```

Por tu URL real:
```javascript
const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.googleapis.com/macros/d/[SCRIPT_ID]/userweb/exec';
```

---

## 📄 PASO 6: Agregar tracker a tus páginas HTML

### Opción A: Si usas generate-pages.js (Recomendado)

Edita `scripts/generate-pages.js` y en la función que genera HTML, agrega:

```javascript
// Después de cerrar el </head>
html += `<script src="../assets/js/analytics-sheets.js"><\/script>`;

// En el <body>
html += `<body data-negocio-slug="${negocio.slug}" data-municipio="${municipio.id}">`;
```

### Opción B: Manual - En cada archivo HTML

Agrega antes de `</head>`:
```html
<script src="./assets/js/analytics-sheets.js"></script>
```

Y en `<body>`:
```html
<body data-negocio-slug="alma-nativa" data-municipio="calarca">
```

---

## ✅ PASO 7: Probar

1. Abre tu sitio
2. Abre la consola (F12 → Console)
3. Deberías ver: `📊 Analytics initialized. User ID: user_...`
4. Haz click en "Contactar por WhatsApp" en cualquier negocio
5. Abre tu Google Sheet
6. En pestaña "Eventos" deberías ver una fila nueva con el evento

---

## 🎯 PASO 8: Ver dashboard

1. Abre `https://tu-sitio.com/analytics/`
2. Verás el admin panel con datos simulados
3. Los datos reales aparecerán una vez que tengas eventos guardados

---

## 🔄 Actualizar datos en tiempo real

Para que el dashboard muestre datos reales en lugar de simulados, necesitas:

**Opción A: Script de Google Sheets (Fácil)**
- Crear Apps Script dentro de Google Sheets
- Leer datos de pestaña "ResumenPorNegocio"
- Exportar como JSON

**Opción B: API de Google Sheets (Más avanzado)**
- Usar Google Sheets API
- Crear endpoint que lee datos
- Conectar en `/analytics/`

Por ahora, el dashboard muestra datos **simulados realistas**. Una vez que confirmes que está funcionando, puedo ayudarte a conectar datos reales.

---

## 🐛 Troubleshooting

### Error: "CORS error"
- Asegúrate que el deploy está en "Anyone"
- Recarga la página

### Error: "Script error"
- Verifica que el SHEET_ID esté correcto
- Chequea que las pestañas se llamen exactamente: "Eventos", "ResumenPorNegocio", "KPIsGlobales"

### No aparecen eventos en Google Sheet
- Abre consola (F12)
- Verifica que no haya errores
- Chequea que la URL de deploy sea correcta

---

## 📊 Próximos pasos

Una vez que confirmes:
1. ✅ Google Apps Script recibiendo datos
2. ✅ Google Sheet guardando eventos
3. ✅ Dashboard visible en /analytics/

Entonces puedo ayudarte con:
- [ ] Conectar datos reales en dashboard (JSON API)
- [ ] Crear reportes PDF automáticos
- [ ] Agregar filtros avanzados (por fecha, municipio, etc.)
- [ ] Integrar Google Data Studio para gráficos más avanzados


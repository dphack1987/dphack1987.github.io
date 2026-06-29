"""
Script para enviar URLs a Google Indexing API y forzar su indexación.
Requisitos:
1. Crear un proyecto en Google Cloud Console (https://console.cloud.google.com/)
2. Habilitar la Google Indexing API
3. Crear una cuenta de servicio y descargar el archivo JSON de credenciales (guardarlo como 'secreto_google.json')
4. Añadir la cuenta de servicio como propietario en Google Search Console
"""

import json
import time
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Cargar rutas SEO
with open("rutas_seo.json", "r", encoding="utf-8") as f:
    rutas_seo = json.load(f)

# Configurar credenciales
SCOPES = ["https://www.googleapis.com/auth/indexing"]
SERVICE_ACCOUNT_FILE = "secreto_google.json"

try:
    credentials = Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES
    )
except FileNotFoundError:
    print("ERROR: No se encontró el archivo 'secreto_google.json'")
    print("\nPara usar este script, primero:")
    print("1. Crea un proyecto en Google Cloud Console")
    print("2. Habilita la Google Indexing API")
    print("3. Crea una cuenta de servicio y descarga el JSON de credenciales")
    print("4. Guarda el archivo como 'secreto_google.json' en el mismo directorio")
    print("5. Añade la cuenta de servicio como 'Propietario' en Google Search Console")
    exit(1)

# Construir el servicio
service = build("indexing", "v3", credentials=credentials)

# Lista de URLs para enviar (añadimos .html ya que es un sitio estático)
urls = [f"{ruta['url']}.html" for ruta in rutas_seo]

print(f"Se van a enviar {len(urls)} URLs a Google Indexing API...")
print("-" * 60)

# Enviar lotes de 100 URLs (límite recomendado por Google)
lote_tamano = 100
for i in range(0, len(urls), lote_tamano):
    lote = urls[i:i+lote_tamano]
    print(f"\nEnviando lote {i//lote_tamano + 1} ({len(lote)} URLs)...")
    
    for url in lote:
        try:
            # Construir la solicitud
            body = {
                "url": url,
                "type": "URL_UPDATED"
            }
            
            # Enviar la solicitud
            response = service.urlNotifications().publish(body=body).execute()
            
            print(f"✅ {url} - Enviado correctamente")
            print(f"   Respuesta: {response}")
            
        except HttpError as e:
            print(f"❌ {url} - Error: {e}")
            print(f"   Código de error: {e.status_code}")
            print(f"   Mensaje: {e.reason}")
        
        # Pequeña pausa para no exceder los límites de la API
        time.sleep(0.5)

print("\n" + "-" * 60)
print("Proceso completado!")
print(f"Total de URLs enviadas: {len(urls)}")

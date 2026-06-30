#!/usr/bin/env python3
"""
Motor de Monetización de Mapa Turístico del Quindío
Script de producción para procesamiento de leads y despacho de peticiones reales
Autor: Mapa Turístico
Versión: 1.0.0
"""

import os
import sqlite3
import json
import datetime
from typing import List, Dict, Optional
import requests

# ------------------------------
# CONFIGURACIÓN DE PRODUCCIÓN
# ------------------------------
# Configurar variables de entorno (o usa constantes para desarrollo/debug
URL_API = os.environ.get("WHATSAPP_API_URL", "https://api.whatsapp-pasarela.com/v1/mensajes")
AUTH_TOKEN = os.environ.get("WHATSAPP_API_TOKEN", "token-secreto-produccion")
DATABASE_FILE = os.path.join(os.path.dirname(__file__), "monetizacion.db")
EVENTOS_FILE = os.path.join(os.path.dirname(__file__), "eventos_produccion.jsonl")

# ------------------------------
# BASE DE DATOS DE PRODUCCIÓN
# ------------------------------
def inicializar_base_datos():
    """Crea y configura la base de datos y tablas si no existen"""
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()

    # Tabla de pautantes
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS pautantes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            telefono TEXT NOT NULL UNIQUE,
            municipio TEXT NOT NULL,
            categoria TEXT NOT NULL,
            nivel TEXT NOT NULL CHECK(nivel IN ('Premium', 'Gratis'))
        )
    ''')

    # Tabla de leads
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cliente_nombre TEXT NOT NULL,
            cliente_telefono TEXT NOT NULL,
            municipio_destino TEXT NOT NULL,
            categoria_interes TEXT NOT NULL,
            fecha_viaje TEXT,
            personas INTEGER,
            procesado INTEGER DEFAULT 0,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    conn.commit()
    conn.close()

# ------------------------------
# MOTOR DE ENRUTAMIENTO SQL
# ------------------------------
def obtener_pautantes_premium(municipio: str, categoria: str) -> List[Dict]:
    """Consulta parametrizada (segura) para obtener pautantes Premium por municipio y categoría.

    Args:
        municipio: Municipio donde busca el cliente
        categoria: Categoría de interés

    Returns:
        Lista de diccionarios con nombre y telefono de pautantes
    """
    conn = sqlite3.connect(DATABASE_FILE)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    try:
        cursor.execute('''
            SELECT id, nombre, telefono FROM pautantes
            WHERE municipio = ? AND categoria = ? AND nivel = 'Premium'
        ''', (municipio, categoria))

        resultados = cursor.fetchall()
        return [dict(row) for row in resultados]
    finally:
        conn.close()

# ------------------------------
# DESPACHO HTTP REAL
# ------------------------------
def despachar_lead_real(lead_id: int) -> bool:
    """Procesa un lead y despacha mensajes reales a los pautantes Premium.

    Args:
        lead_id: ID del lead en la base de datos

    Returns:
        True si el despacho fue exitoso, False en caso contrario
    """
    # 1. Consultar datos del lead
    conn = sqlite3.connect(DATABASE_FILE)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    try:
        cursor.execute('''
            SELECT * FROM leads WHERE id = ?
        ''', (lead_id,))
        lead = cursor.fetchone()
        if not lead:
            return False
        lead = dict(lead)
        conn.close()

        # 2. Obtener pautantes Premium
        pautantes = obtener_pautantes_premium(lead['municipio_destino'], lead['categoria_interes'])
        if not pautantes:
            return False

        # 3. Construir el mensaje
        mensaje = f'''
        🌟 Nuevo Lead del Mapa Turístico!
        👤 Cliente: {cliente_nombre}
        📱 WhatsApp: https://wa.me/{cliente_telefono}
        📍 Destino: {municipio_destino}
        🗺️ Categoría: {categoria_interes}
        📅 Fecha de viaje: {fecha_viaje}
        👥 Personas: {personas}
        ⏰ Registro: {timestamp}
        '''.format(**lead)

        # 4. Despachar peticiones HTTP a la API de WhatsApp
        for pautante in pautantes:
            payload = {
                "destinatario": pautante['telefono'],
                "mensaje": mensaje
            }
            headers = {
                "Authorization": f"Bearer {AUTH_TOKEN}",
                "Content-Type": "application/json"
            }
            try:
                respuesta = requests.post(URL_API, json=payload, headers=headers, timeout=10)
                if respuesta.status_code != 200:
                    print(f"[ERROR] Al enviar a {pautante['nombre']} ({pautante['telefono']}): {respuesta.text}")
                else:
                    print(f"[OK] Enviado a {pautante['nombre']} ({pautante['telefono']})")
            except requests.exceptions.RequestException as e:
                print(f"[EXCEPCIÓN] Error HTTP: {str(e)}")

        # 5. Marcar como procesado en base de datos
        conn = sqlite3.connect(DATABASE_FILE)
        cursor = conn.cursor()
        cursor.execute('''
            UPDATE leads SET procesado = 1 WHERE id = ?
        ''', (lead_id,))
        conn.commit()
        conn.close()
        return True

    except Exception as e:
        print(f"[EXCEPCIÓN] Error general en despacho de lead {lead_id}: {str(e)}")
        return False

# ------------------------------
# REGISTRO DE EVENTOS PARA ANALYTICS
# ------------------------------
def registrar_evento_trafico(municipio: str, categoria: str):
    """Registra un evento de tráfico en JSON Lines (JSONL) para Analytics.

    Args:
        municipio: Municipio donde ocurrió el evento
        categoria: Categoría de la página
    """
    evento = {
        "evento": "visita_categoria",
        "municipio": municipio,
        "categoria": categoria,
        "timestamp": datetime.datetime.utcnow().isoformat()
    }
    with open(EVENTOS_FILE, "a", encoding="utf-8") as f:
        json.dump(evento, f)
        f.write("\n")

# ------------------------------
# EJECUCIÓN PRINCIPAL
# ------------------------------
if __name__ == "__main__":
    print("Iniciando Motor de Monetizacion de Mapa Turistico del Quindio...")
    inicializar_base_datos()
    print("Base de datos inicializada correctamente.")
    print(f"Archivos de produccion:")
    print(f"   - Base de datos: {DATABASE_FILE}")
    print(f"   - Eventos: {EVENTOS_FILE}")
    print("\nPara probar manualmente:")
    print("   - Registrar un pautante Premium: INSERT INTO pautantes (nombre, telefono, municipio, categoria, nivel) VALUES ('Hotel El Paraiso', '573001234567', 'Salento', 'alojamiento', 'Premium');")
    print("   - Registrar un lead: INSERT INTO leads (cliente_nombre, cliente_telefono, municipio_destino, categoria_interes, fecha_viaje, personas) VALUES ('Juan Perez', '573009876543', 'Salento', 'alojamiento', '2026-07-15', 4);")
    print("   - Despachar un lead: python -c \"from motor_monetizacion import despachar_lead_real; despachar_lead_real(1)\";")

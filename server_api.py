#!/usr/bin/env python3
"""
API Server para Cotizador de Viajes - Mapa Turístico del Quindío
Recibe leads y los almacena en la base de datos
"""

import os
import sqlite3
import json
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS

# Inicializar app
app = Flask(__name__)
CORS(app)  # Habilitar CORS para solicitudes desde el frontend

# Configurar rutas
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_FILE = os.path.join(BASE_DIR, 'monetizacion.db')


def inicializar_base_datos():
    """Crear tablas si no existen"""
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
            presupuesto TEXT,
            procesado INTEGER DEFAULT 0,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()


@app.route('/api/leads', methods=['POST'])
def recibir_lead():
    """Endpoint para recibir leads del cotizador"""
    try:
        datos = request.get_json()
        
        # Validar datos
        campos_requeridos = ['cliente_nombre', 'cliente_telefono', 'municipio_destino', 'categoria_interes']
        for campo in campos_requeridos:
            if campo not in datos or not datos[campo]:
                return jsonify({'error': f'Falta el campo requerido: {campo}'}), 400
        
        # Guardar en base de datos
        conn = sqlite3.connect(DATABASE_FILE)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO leads 
            (cliente_nombre, cliente_telefono, municipio_destino, categoria_interes, fecha_viaje, personas, presupuesto)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            datos['cliente_nombre'],
            datos['cliente_telefono'],
            datos['municipio_destino'],
            datos['categoria_interes'],
            datos.get('fecha_viaje'),
            datos.get('personas'),
            datos.get('presupuesto')
        ))
        
        lead_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        print(f"[{datetime.now()}] Lead recibido: {datos['cliente_nombre']} - {datos['municipio_destino']} - {datos['categoria_interes']}")
        
        return jsonify({
            'exito': True,
            'mensaje': 'Lead recibido correctamente',
            'lead_id': lead_id
        }), 201
        
    except Exception as e:
        print(f"Error al procesar lead: {str(e)}")
        return jsonify({'error': 'Error interno del servidor'}), 500


@app.route('/api/leads', methods=['GET'])
def obtener_leads():
    """Endpoint para obtener todos los leads (solo para administración)"""
    try:
        conn = sqlite3.connect(DATABASE_FILE)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM leads ORDER BY timestamp DESC')
        leads = cursor.fetchall()
        
        resultado = []
        for lead in leads:
            resultado.append(dict(lead))
        
        conn.close()
        return jsonify({'leads': resultado}), 200
        
    except Exception as e:
        print(f"Error al obtener leads: {str(e)}")
        return jsonify({'error': 'Error interno del servidor'}), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check para verificar que el servidor está funcionando"""
    return jsonify({'status': 'ok', 'timestamp': datetime.now().isoformat()}), 200


if __name__ == '__main__':
    inicializar_base_datos()
    print("=" * 60)
    print("🚀 API Server - Cotizador de Viajes")
    print("📍 Mapa Turístico del Quindío")
    print("=" * 60)
    print(f"Base de datos: {DATABASE_FILE}")
    print(f"Endpoints:")
    print(f"  - POST /api/leads  -> Recibir lead")
    print(f"  - GET /api/leads   -> Obtener todos los leads")
    print(f"  - GET /api/health  -> Health check")
    print("=" * 60)
    print("✅ Servidor iniciado en http://localhost:5000")
    print("\n⚠️ Para producción, configura un servidor WSGI adecuado (Gunicorn, etc.)")
    app.run(debug=True, host='0.0.0.0', port=5000)

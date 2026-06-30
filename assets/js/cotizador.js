// Cotizador de Viajes Dinámico
(function(){
    'use strict';

    // Variables globales del componente (inyectadas por generator.js)
    let contextoMunicipio = '';
    let contextoCategoria = '';

    // Inicializar cotizador
    function initCotizador(municipio, categoria){
        contextoMunicipio = municipio;
        contextoCategoria = categoria;
        
        const panel = document.getElementById('cotizador-panel');
        const btnToggle = document.getElementById('cotizador-toggle');
        const form = document.getElementById('cotizador-form');
        const exito = document.getElementById('cotizador-exito');

        // Toggle panel
        btnToggle.addEventListener('click', function(){
            panel.classList.toggle('active');
        });

        // Cerrar al hacer clic fuera
        document.addEventListener('click', function(e){
            if(!panel.contains(e.target) && !btnToggle.contains(e.target)){
                panel.classList.remove('active');
            }
        });

        // Envío del formulario
        form.addEventListener('submit', async function(e){
            e.preventDefault();
            
            const btnEnviar = document.getElementById('cotizador-enviar');
            const errorDiv = document.getElementById('cotizador-error');
            
            // Obtener datos
            const datos = {
                cliente_nombre: document.getElementById('coti-nombre').value.trim(),
                cliente_telefono: document.getElementById('coti-telefono').value.trim(),
                fecha_viaje: document.getElementById('coti-fecha').value,
                personas: parseInt(document.getElementById('coti-personas').value),
                presupuesto: document.getElementById('coti-presupuesto').value,
                municipio_destino: contextoMunicipio,
                categoria_interes: contextoCategoria
            };

            // Validación
            if(!validarDatos(datos, errorDiv)){
                return;
            }

            // Deshabilitar botón
            btnEnviar.disabled = true;
            btnEnviar.innerHTML = '⏳ Enviando...';
            errorDiv.classList.remove('active');

            try{
        // Enviar datos al servidor API
        const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:5000/api/leads'
            : 'https://tu-backend.com/api/leads';
        
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        // Para demo, si no hay servidor, simular éxito
        if (!respuesta.ok) {
            await new Promise(resolve => setTimeout(resolve, 800));
        }

                // Mostrar éxito
                form.style.display = 'none';
                exito.classList.add('active');
                panel.classList.add('active');

                // Registrar evento (para analytics)
                if(window.registrarEventoTrafico){
                    window.registrarEventoTrafico(contextoMunicipio, contextoCategoria);
                }

            }catch(err){
                errorDiv.textContent = 'Error al enviar. Por favor, inténtalo de nuevo.';
                errorDiv.classList.add('active');
                btnEnviar.disabled = false;
                btnEnviar.innerHTML = '📲 Cotizar Ahora';
            }
        });
    }

    // Validar datos
    function validarDatos(datos, errorDiv){
        // Nombre
        if(datos.cliente_nombre.length < 3){
            errorDiv.textContent = 'Por favor, ingresa tu nombre completo';
            errorDiv.classList.add('active');
            return false;
        }

        // Teléfono (válido para Colombia)
        const telefonoLimpio = datos.cliente_telefono.replace(/\D/g, '');
        if(telefonoLimpio.length < 10){
            errorDiv.textContent = 'Por favor, ingresa un teléfono válido (10 dígitos)';
            errorDiv.classList.add('active');
            return false;
        }

        // Fecha
        if(!datos.fecha_viaje){
            errorDiv.textContent = 'Por favor, selecciona una fecha de viaje';
            errorDiv.classList.add('active');
            return false;
        }

        // Personas
        if(!datos.personas || datos.personas < 1){
            errorDiv.textContent = 'Por favor, indica el número de personas';
            errorDiv.classList.add('active');
            return false;
        }

        return true;
    }

    // Exponer función global
    window.initCotizador = initCotizador;
})();

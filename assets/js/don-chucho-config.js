// Don Chucho config (opcional)
// Si quieres que Don Chucho use un endpoint real de modelo (Ollama/Llama/otro),
// edita la variable `window.DON_CHUCHO_API_URL` con la URL de tu proxy/endpoint.

// Ejemplo:
// window.DON_CHUCHO_API_URL = 'http://localhost:11434/v1/ask';

// Nota de seguridad: No incluyas credenciales secretas en este archivo si el sitio
// va a ser público. Mejor usar un proxy seguro en servidor.

// Dejar vacío significa que Don Chucho funcionará en modo local (respuestas básicas).
window.DON_CHUCHO_API_URL = window.DON_CHUCHO_API_URL || null;

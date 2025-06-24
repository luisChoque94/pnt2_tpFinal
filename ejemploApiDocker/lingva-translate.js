// lingva-translate.js

// Si usás Node.js versión 18 o superior, fetch ya está disponible.
// Si tenés una versión más vieja, ejecutá: npm install node-fetch
// Y descomentá esta línea:
// const fetch = require('node-fetch');

async function traducir(texto, de = 'en', a = 'es') {
  const url = `https://lingva.ml/api/v1/${de}/${a}/${encodeURIComponent(texto)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    const data = await res.json();

    console.log(`Texto original: ${texto}`);
    console.log(`Traducción (${de} → ${a}): ${data.translation}`);
  } catch (err) {
    console.error('Error al traducir:', err.message);
  }
}

// Ejemplo
//traducir('Hello, how are you?', 'en', 'es');
traducir('hola como estas', 'es', 'en');


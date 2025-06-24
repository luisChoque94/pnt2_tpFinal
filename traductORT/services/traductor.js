export async function traducir(texto, de = 'en', a = 'es') {
  //const url = `http://localhost:3000/api/v1/${de}/${a}/${encodeURIComponent(texto)}`;
  const url = `http://192.168.1.40:3000/api/v1/${de}/${a}/${encodeURIComponent(texto)}`;
  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    console.log('Traducción:', datos.translation);
    return datos.translation;
  } catch (error) {
    console.error('Error al traducir:', error);
    return null;
  }
}

// Ejemplo de uso
//
export const traducir = async (texto, sourceLanguage, targetLanguage) => {
  try {
    //https://mymemory.translated.net/doc/spec.php
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${texto}&langpair=${sourceLanguage}|${targetLanguage}`,
    )
    const data = await response.json()
    if (data.responseData && data.responseData.translatedText) {
      return data.responseData.translatedText
    } else {
      console.error("Error en la traducción:", data)
      return "Error al traducir"
    }
  } catch (error) {
    console.error("Error al realizar la solicitud de traducción:", error)
    return "Error al traducir"
  }
}

/* Local docker using lingva image
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
 */

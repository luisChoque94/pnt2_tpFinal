import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"
import { db } from "./firebase"
import { traducir } from "./traductorService"

// ========== FIRESTORE Storage ==========

// Guardar una nueva traducción
export const guardarTraduccion = async (userId, traduccionData) => {
  try {
    const docRef = await addDoc(collection(db, "traducciones"), {
      userId: userId,
      textoOriginal: traduccionData.textoOriginal,
      textoTraducido: traduccionData.textoTraducido,
      idiomaOrigen: traduccionData.idiomaOrigen,
      idiomaDestino: traduccionData.idiomaDestino,
      fechaCreacion: serverTimestamp(),
      favorito: false,
    })

    console.log("Traducción guardada con ID: ", docRef.id)
    return docRef.id
  } catch (error) {
    console.error("Error al guardar traducción: ", error)
    throw error
  }
}

// Función combinada: traducir y guardar
export const traducirYGuardar = async (userId, textoOriginal, idiomaOrigen, idiomaDestino) => {
  try {
    // 1. Traducir usando la función del servicio traductor
    const textoTraducido = await traducir(textoOriginal, idiomaOrigen, idiomaDestino)

    if (textoTraducido && textoTraducido !== "Error al traducir") {
      // 2. Guardar en Firestore
      await guardarTraduccion(userId, {
        textoOriginal: textoOriginal.trim(),
        textoTraducido: textoTraducido,
        idiomaOrigen: idiomaOrigen,
        idiomaDestino: idiomaDestino,
      })
    }

    return textoTraducido
  } catch (error) {
    console.error("Error en traducirYGuardar:", error)
    throw error
  }
}

// Buscar en el historial
export const buscarEnHistorial = async (userId, textoBusqueda) => {
  try {
    const historial = await obtenerHistorialUsuario(userId)

    // Filtrar por texto original o traducido
    const resultados = historial.filter(
      (traduccion) =>
        traduccion.textoOriginal.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
        traduccion.textoTraducido.toLowerCase().includes(textoBusqueda.toLowerCase())
    )

    return resultados
  } catch (error) {
    console.error("Error al buscar en historial:", error)
    return []
  }
}

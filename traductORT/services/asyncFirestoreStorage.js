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

// Traducir y guardar
export const traducirYGuardar = async (userId, textoOriginal, idiomaOrigen, idiomaDestino) => {
  try {
    const textoTraducido = await traducir(textoOriginal, idiomaOrigen, idiomaDestino)

    if (textoTraducido && textoTraducido !== "Error al traducir") {
      
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

// Obtener historial de traducciones del usuario
export const obtenerHistorialUsuario = async (userId) => {
  try {
    const q = query(collection(db, "traducciones"), where("userId", "==", userId), orderBy("fechaCreacion", "desc"))

    const querySnapshot = await getDocs(q)
    const traducciones = []

    querySnapshot.forEach((doc) => {
      traducciones.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    return traducciones
  } catch (error) {
    console.error("Error al obtener historial: ", error)
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

// Eliminar una traducción
export const eliminarTraduccion = async (traduccionId) => {
  try {
    await deleteDoc(doc(db, "traducciones", traduccionId))
    console.log("Traducción eliminada")
  } catch (error) {
    console.error("Error al eliminar traducción: ", error)
    throw error
  }
}


// Limpiar todo el historial del usuario
export const limpiarHistorial = async (userId) => {
  try {
    const q = query(collection(db, "traducciones"), where("userId", "==", userId))
    const querySnapshot = await getDocs(q)

    const deletePromises = []
    querySnapshot.forEach((documento) => {
      deletePromises.push(deleteDoc(doc(db, "traducciones", documento.id)))
    })

    await Promise.all(deletePromises)
    console.log("Historial limpiado")
  } catch (error) {
    console.error("Error al limpiar historial: ", error)
    throw error
  }
}
import { useState, useEffect, useCallback } from "react"
import { obtenerHistorialUsuario } from "../services/asyncFirestoreStorage"

export const useHistorial = (userId) => {
  const [historial, setHistorial] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Función para cargar el historial
  const fetchHistorial = useCallback(async () => {
    if (!userId) {
      setLoading(false)
      return
    }

    try {
      setError(null)
      setLoading(true)
      const data = await obtenerHistorialUsuario(userId)
      setHistorial(data)
    } catch (err) {
      console.error("Error al cargar historial:", err)
      setError("No se pudo cargar el historial")
    } finally {
      setLoading(false)
    }
  }, [userId])

  // Función para refrescar (pull to refresh)
  const refreshHistorial = useCallback(async () => {
    await fetchHistorial()
  }, [fetchHistorial])

  // Cargar historial al montar el componente o cambiar userId
  useEffect(() => {
    fetchHistorial()
  }, [fetchHistorial])

  return {
    historial,
    loading,
    error,
    refreshHistorial,
    // Preparado para futuras funcionalidades
    isEmpty: historial.length === 0,
  }
}

import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

const HistorialItem = ({ item, onPress }) => {
  // Formatear fecha
  const formatearFecha = (timestamp) => {
    if (!timestamp) return ""

    const fecha = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return fecha.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Obtener nombres de idiomas
  const obtenerNombreIdioma = (codigo) => {
    const idiomas = {
      en: "Inglés",
      es: "Español",
      fr: "Francés",
      it: "Italiano",
      de: "Alemán",
    }
    return idiomas[codigo] || codigo.toUpperCase()
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress && onPress(item)} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.idiomas}>
          {obtenerNombreIdioma(item.idiomaOrigen)} → {obtenerNombreIdioma(item.idiomaDestino)}
        </Text>
        <Text style={styles.fecha}>{formatearFecha(item.fechaCreacion)}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.textoOriginal} numberOfLines={2}>
          {item.textoOriginal}
        </Text>
        <View style={styles.separator} />
        <Text style={styles.textoTraducido} numberOfLines={2}>
          {item.textoTraducido}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  idiomas: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
  },
  fecha: {
    fontSize: 12,
    color: "#666",
  },
  content: {
    gap: 8,
  },
  textoOriginal: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  separator: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 4,
  },
  textoTraducido: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
    fontStyle: "italic",
  },
})

export default HistorialItem

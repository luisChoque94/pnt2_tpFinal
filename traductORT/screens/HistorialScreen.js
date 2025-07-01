import { useState } from "react"
import { View, Text, FlatList, RefreshControl, ActivityIndicator, Alert } from "react-native"
import { useAuth } from "../context/AuthContext"
import { useHistorial } from "../hooks/useHistorial"
import HistorialItem from "../components/Historial/HistorialItem"
import { styles } from "../styles/historialStyle"

export default function HistorialScreen() {
  const { user } = useAuth()
  const { historial, loading, error, refreshHistorial, isEmpty } = useHistorial(user?.uid)
  const [refreshing, setRefreshing] = useState(false)

  // Manejar pull to refresh
  const onRefresh = async () => {
    setRefreshing(true)
    await refreshHistorial()
    setRefreshing(false)
  }

  // Manejar press en item
  const handleItemPress = (item) => {
    Alert.alert("Traducción", `${item.textoOriginal}\n\n→ ${item.textoTraducido}`, [{ text: "OK" }])
  }

  // Renderizar item de la lista
  const renderItem = ({ item }) => <HistorialItem item={item} onPress={handleItemPress} />

  // Componente de estado vacío
  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No hay traducciones</Text>
      <Text style={styles.emptySubtitle}>Tus traducciones aparecerán aquí automáticamente</Text>
    </View>
  )

  // Componente de error
  const ErrorState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Error al cargar</Text>
      <Text style={styles.emptySubtitle}>{error}</Text>
    </View>
  )

  // Loading inicial
  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando historial...</Text>
      </View>
    )
  }

  // Error state
  if (error && !refreshing) {
    return <ErrorState />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={historial}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#007AFF"]} tintColor="#007AFF" />
        }
        ListEmptyComponent={isEmpty ? <EmptyState /> : null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={isEmpty ? styles.emptyList : styles.list}
      />
    </View>
  )
}

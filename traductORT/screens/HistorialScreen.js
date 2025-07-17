import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert,
  TouchableOpacity
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useHistorial } from "../hooks/useHistorial";
import HistorialItem from "../components/Historial/HistorialItem";
import { styles } from "../styles/historialStyle";

import { useRoute } from "@react-navigation/native";
import { generateAndPrintHistorialPDF } from "../services/imiprimir"; // Importamos el nuevo servicio

export default function HistorialScreen({ navigation }) {
  const { user } = useAuth();
  const { historial, loading, error, refreshHistorial, isEmpty } = useHistorial(
    user?.uid
  );
  const [refreshing, setRefreshing] = useState(false);
  const route = useRoute();

  // Ref para exponer la función de impresión
  const printRef = useRef();

  console.log("=== HistorialScreen renderizado ===");
  console.log("Route params:", route.params);
  console.log("Historial length:", historial?.length || 0);
  console.log("Loading:", loading);
  console.log("Error:", error);

  // Manejar pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await refreshHistorial();
    setRefreshing(false);
  };

  // Manejar press en item
  const handleItemPress = (item) => {
    Alert.alert(
      "Traducción",
      `${item.textoOriginal}\n\n→ ${item.textoTraducido}`,
      [{ text: "OK" }]
    );
  };

  // Función para manejar la impresión
  const handlePrint = async () => {
    console.log("=== handlePrint ejecutado ===")
    console.log("Historial para imprimir:", historial?.length || 0, "elementos")

    if (!historial || historial.length === 0) {
      console.log("Historial vacío, mostrando alerta")
      Alert.alert("Historial vacío", "No hay traducciones para imprimir.")
      return
    }

    try {
      console.log("Llamando a generateAndPrintHistorialPDF...")
      await generateAndPrintHistorialPDF(historial)
      console.log("Impresión completada exitosamente")
    } catch (err) {
      console.error("Error en impresión:", err)
      Alert.alert("Error", err.message || "No se pudo generar el PDF.")
    }
  }

  // Exponer la función de impresión para que pueda ser llamada desde el header
  useEffect(() => {
    if (navigation) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => {
              console.log("Botón Imprimir presionado directamente")
              handlePrint()
            }}
          >
            <Text style={{ color: "#007AFF", fontSize: 16 }}>Imprimir</Text>
          </TouchableOpacity>
        ),
      })
    }
  }, [navigation, historial]) // Incluir historial para que se actualice cuando cambie

  // Renderizar item de la lista
  const renderItem = ({ item }) => (
    <HistorialItem item={item} onPress={handleItemPress} />
  );

  // Componente de estado vacío
  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No hay traducciones</Text>
      <Text style={styles.emptySubtitle}>
        Tus traducciones aparecerán aquí automáticamente
      </Text>
    </View>
  );

  // Componente de error
  const ErrorState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Error al cargar</Text>
      <Text style={styles.emptySubtitle}>{error}</Text>
    </View>
  );

  // Loading inicial
  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando historial...</Text>
      </View>
    );
  }

  // Error state
  if (error && !refreshing) {
    return <ErrorState />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={historial}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#007AFF"]}
            tintColor="#007AFF"
          />
        }
        ListEmptyComponent={isEmpty ? <EmptyState /> : null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={isEmpty ? styles.emptyList : styles.list}
      />
    </View>
  );
}

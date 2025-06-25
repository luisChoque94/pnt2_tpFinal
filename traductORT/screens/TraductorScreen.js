"use client"

import { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { traducir } from "../services/traductor"
import { useAuth } from "../context/AuthContext"
import { signOut } from "../services/auth"

export default function TraductorScreen() {
  const [textoOriginal, setTextoOriginal] = useState("")
  const [traduccion, setTraduccion] = useState("")
  const { user } = useAuth()

  const manejarTraduccion = async () => {
    if (!textoOriginal.trim()) {
      Alert.alert("Error", "Por favor ingresa texto para traducir")
      return
    }

    const resultado = await traducir(textoOriginal, "en", "es")
    if (resultado) setTraduccion(resultado)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      Alert.alert("Error", "No se pudo cerrar sesión")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>¡Hola, {user?.displayName || user?.email}!</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Text style={styles.signOutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Traductor Inglés → Español</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribí texto en inglés"
        value={textoOriginal}
        onChangeText={setTextoOriginal}
        multiline
      />

      <Button title="Traducir" onPress={manejarTraduccion} />

      {traduccion ? (
        <View style={styles.resultadoContainer}>
          <Text style={styles.resultadoLabel}>Traducción:</Text>
          <Text style={styles.resultado}>{traduccion}</Text>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  signOutButton: {
    padding: 8,
  },
  signOutText: {
    color: "#007AFF",
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    minHeight: 80,
    textAlignVertical: "top",
  },
  resultadoContainer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
  },
  resultadoLabel: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  resultado: {
    fontSize: 18,
  },
})

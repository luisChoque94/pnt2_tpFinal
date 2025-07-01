import { useState } from "react"
import { View, Text, TextInput, Button, TouchableOpacity, Alert } from "react-native"
import { traducirYGuardar } from "../services/asyncFirestoreStorage"
import { useAuth } from "../context/AuthContext"
import { signOut } from "../services/authService"
import { styles } from "../styles/traductorStyle"

import { Picker } from "@react-native-picker/picker" //componente para seleccionar idioma con desplegable

//lista de idiomas para mostrar en el picker
const idiomasDisponibles = [
  { label: "Inglés", value: "en" },
  { label: "Español", value: "es" },
  { label: "Francés", value: "fr" },
  { label: "Italiano", value: "it" },
  { label: "Alemán", value: "de" },
]

export default function TraductorScreen() {
  const [textoOriginal, setTextoOriginal] = useState("")
  const [traduccion, setTraduccion] = useState("")
  const [idiomaOrigen, setIdiomaOrigen] = useState("en")          //por default ingles
  const [idiomaDestino, setIdiomaDestino] = useState("es")        //por default español
  const [cargando, setCargando] = useState(false)
  const { user } = useAuth()

  const manejarTraduccion = async () => {
    if (!textoOriginal.trim()) {
      Alert.alert("Error", "Por favor ingresa texto para traducir")
      return
    }

    setCargando(true)
    try {
      const resultado = await traducirYGuardar(user.uid, textoOriginal, idiomaOrigen, idiomaDestino)
      if (resultado) setTraduccion(resultado)
    } catch (error) {
      Alert.alert("Error", "No se pudo traducir el texto")
    } finally {
      setCargando(false)
    }
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

      <Text style={styles.title}>TraducORT</Text>

      <Text style={styles.label}>Idioma de origen:</Text>
      <Picker
        selectedValue={idiomaOrigen}
        onValueChange={(itemValue) => setIdiomaOrigen(itemValue)}
        style={styles.picker}
      >
        {idiomasDisponibles.map((idioma) => (
          <Picker.Item key={idioma.value} label={idioma.label} value={idioma.value} />
        ))}
      </Picker>

      <Text style={styles.label}>Idioma destino:</Text>
      <Picker
        selectedValue={idiomaDestino}
        onValueChange={(itemValue) => setIdiomaDestino(itemValue)}
        style={styles.picker}
      >
        {idiomasDisponibles.map((idioma) => (
          <Picker.Item key={idioma.value} label={idioma.label} value={idioma.value} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Escribí el texto"
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

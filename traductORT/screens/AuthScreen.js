"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from "../services/authService"
import { styles } from "../styles/authStyle"

export default function AuthScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)


  const handleEmailAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos")
      return
    }

    setLoading(true)
    try {
      if (isLogin) {
        await signInWithEmail(email, password)
      } else {
        if (!displayName) {
          Alert.alert("Error", "Por favor ingresa tu nombre")
          return
        }
        await signUpWithEmail(email, password, displayName)
      }
    } catch (error) {
      Alert.alert("Error", error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setLoading(true)
    try {
      await signInWithGoogle()
    } catch (error) {
      Alert.alert("Error", "No se pudo iniciar sesión con Google")
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.header}>
        <Text style={styles.title}>TraductORT</Text>
        <Text style={styles.subtitle}>{isLogin ? "Inicia sesión" : "Crea tu cuenta"}</Text>
      </View>

      <View style={styles.form}>
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            value={displayName}
            onChangeText={setDisplayName}
            autoCapitalize="words"
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handleEmailAuth} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Cargando..." : isLogin ? "Iniciar Sesión" : "Registrarse"}</Text>
        </TouchableOpacity>

        {Platform.OS === "web" && (
          <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={handleGoogleAuth} disabled={loading}>
            <Text style={styles.buttonText}>Continuar con Google</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.switchButton} onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.switchText}>
            {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

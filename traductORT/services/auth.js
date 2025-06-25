import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { auth } from "./firebase"

// Registro con email y password
export const signUpWithEmail = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    // Opcional: actualizar el perfil con el nombre
    await userCredential.user.updateProfile({ displayName })
    return userCredential.user
  } catch (error) {
    console.error("Error en registro:", error)
    throw error
  }
}

// Login con email y password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error("Error en login:", error)
    throw error
  }
}

// Login con Google (solo para web por ahora)
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    return result.user
  } catch (error) {
    console.error("Error con Google:", error)
    throw error
  }
}

// Cerrar sesión
export const signOut = () => firebaseSignOut(auth)

// Usuario actual
export const getCurrentUser = () => auth.currentUser

// Listener de cambios de auth
export const onAuthStateChanged = (callback) => firebaseOnAuthStateChanged(auth, callback)

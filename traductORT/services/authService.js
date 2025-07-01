import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
} from "firebase/auth"
import { auth } from "./firebase"
import * as Google from "expo-auth-session"
import * as WebBrowser from "expo-web-browser"
import { Platform } from "react-native"

// Configuración para móvil
WebBrowser.maybeCompleteAuthSession()

const [ request, response, promptAsync]  = Google.useAuthRequest({
  ios: "IOS_CLIENT_ID.apps.googleusercontent.com",
  androidClientId: "943235911101-7etp1nldpu2dpclqovro6c63dt64r4f5.apps.googleusercontent.com",
}) 

// Registro con email y password
export const signUpWithEmail = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
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

// Login con Google
export const signInWithGoogle = async () => {
  try {
    if (Platform.OS === "web") {
      // Web implementation
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      return result.user
    } else {
      const clientId = GOOGLE_CLIENT_ID.android 

      const redirectUrl = Google.makeRedirectUri({
        useProxy: true,
      })

      const request = new Google.AuthRequest({
        clientId: clientId,
        scopes: ["openid", "profile", "email"],
        redirectUri: redirectUrl,
        responseType: AuthSession.ResponseType.IdToken,
      })

      const result = await Google.promptAsync()

      if (result.type === "success") {
        const { id_token } = result.params
        const credential = GoogleAuthProvider.credential(id_token)
        const userCredential = await signInWithCredential(auth, credential)
        return userCredential.user
      } else {
        throw new Error("Google sign-in was cancelled")
      }
    }
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

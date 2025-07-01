import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Sacar a config file las keys
const firebaseConfig = {
  apiKey: "AIzaSyDAk1EX8shUdXQn9Jz7ndcSKpV2f_dUo6c",
  authDomain: "traductort-a6992.firebaseapp.com",
  projectId: "traductort-a6992",
  storageBucket: "traductort-a6992.firebasestorage.app",
  messagingSenderId: "440387280914",
  appId: "1:440387280914:web:21088ab053755d3cf7f8cb",
  measurementId: "G-3BQFE19H1P"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Auth with platform detection
const initializeFirebaseAuth = () => {
  try {
    // Try React Native first
    const { initializeAuth, getReactNativePersistence } = require("firebase/auth")
    const AsyncStorage = require("@react-native-async-storage/async-storage").default

    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    })
  } catch (error) {
    // Fallback to web
    const { getAuth } = require("firebase/auth")
    return getAuth(app)
  }
}

export const auth = initializeFirebaseAuth()
export const db = getFirestore(app)

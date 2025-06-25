// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
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
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
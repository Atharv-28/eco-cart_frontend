// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAN5MDYlT4PerdxFCEx3pQ0ENRxQDxZKsw",
  authDomain: "eco-cart-4549d.firebaseapp.com",
  projectId: "eco-cart-4549d",
  storageBucket: "eco-cart-4549d.appspot.com",
  messagingSenderId: "1571542446",
  appId: "1:1571542446:web:4edf5d5e90e540cc2f643f",
  measurementId: "G-QP0YK51BSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firebase Storage
export const storage = getStorage(app);
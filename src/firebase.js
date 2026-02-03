import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCaWldywrv3JK6v8qK5kvQU6km8CbKysc",
  authDomain: "ns-personal.firebaseapp.com",
  projectId: "ns-personal",
  storageBucket: "ns-personal.firebasestorage.app",
  messagingSenderId: "632349743526",
  appId: "1:632349743526:web:afe7b0eb6e50b894c91767",
  measurementId: "G-MW3HPY5ZRY"
};

const app = initializeApp(firebaseConfig);

console.log("✅ Connected Firebase projectId:", firebaseConfig.projectId);

export const db = getFirestore(app);


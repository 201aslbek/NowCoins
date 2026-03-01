import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBO0efWQ_Z8ipBRjsdUXWmLapyReqdVnWs",
  authDomain: "nowcoins-16e77.firebaseapp.com",
  projectId: "nowcoins-16e77",
  storageBucket: "nowcoins-16e77.firebasestorage.app",
  messagingSenderId: "964314087347",
  appId: "1:964314087347:web:2b6c8aec79af3d432ed5c6",
  measurementId: "G-NG2MZTKM0Q"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, serverTimestamp };

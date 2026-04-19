// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  getMetadata,
  deleteObject
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3n_Ko_NGdUhpvsmznNAqlB0cM-BSK1c8",
  authDomain: "paratimilob.firebaseapp.com",
  projectId: "paratimilob",
  storageBucket: "paratimilob.firebasestorage.app",
  messagingSenderId: "455489022509",
  appId: "1:455489022509:web:ba12bcd7f4d6e6d2a166a4",
  measurementId: "G-X5C3RJQVV9"
};

// Initialize Firebase
console.log('🔥 Inicializando Firebase...');
const app = initializeApp(firebaseConfig);
console.log('✅ App inicializado:', app.name);

const analytics = getAnalytics(app);
console.log('✅ Analytics cargado');

const storage = getStorage(app);
console.log('✅ Storage inicializado:', storage.bucket);

// Expose Firebase objects and storage helpers so script.js can use them
window.firebaseApp = app;
window.firebaseAnalytics = analytics;
window.firebaseStorage = storage;
window.ref = ref;
window.uploadBytes = uploadBytes;
window.getDownloadURL = getDownloadURL;
window.listAll = listAll;
window.getMetadata = getMetadata;
window.deleteObject = deleteObject;

console.log('✅ Firebase globals expuestos a window');

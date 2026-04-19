// Configuración de Firebase
// Reemplaza estos valores con los de tu proyecto Firebase
// Obtén estos valores desde: https://console.firebase.google.com/

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT_ID.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT_ID.appspot.com",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Hacer storage disponible globalmente
window.firebaseStorage = storage;
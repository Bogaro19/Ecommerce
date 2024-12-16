// Importar las funciones necesarias desde el SDK de Firebase
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");

// Configuración de tu aplicación Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBTlBOVzKNrh0VYl2sHGP7g4Q5fJoVu6Y0",
  authDomain: "v1-coffedey.firebaseapp.com",
  projectId: "v1-coffedey",
  storageBucket: "v1-coffedey.firebasestorage.app",
  messagingSenderId: "391912757980",
  appId: "1:391912757980:web:d9940bed68518763e1b219",
  measurementId: "G-J2C7CZQLPY",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Analytics (opcional, solo en entornos de navegador)
let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (error) {
  console.warn("Analytics no está disponible en el entorno de servidor:", error.message);
}

// Exportar la configuración y las instancias necesarias
module.exports = {
  app,
  analytics,
};

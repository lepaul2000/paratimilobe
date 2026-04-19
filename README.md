# San-Valentin
¿Sin ideas para San Valentín? 💖✨ Sorprende a tu crush con este código especial y geek. 💻💕 ¡Porque el amor también se programa! 😏🔥 #SanValentín #Programación #CodeYourLove

## 🚀 Despliegue en Netlify con Almacenamiento en la Nube

Esta aplicación ahora incluye almacenamiento en la nube usando Firebase Storage, perfecto para desplegar en Netlify.

### 📋 Requisitos Previos

1. **Cuenta de Firebase**: Crea una cuenta gratuita en [Firebase Console](https://console.firebase.google.com/)
2. **Cuenta de Netlify**: Crea una cuenta gratuita en [Netlify](https://netlify.com)

### 🔧 Configuración de Firebase

1. **Crear un proyecto Firebase**:
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Haz clic en "Crear un proyecto"
   - Dale un nombre a tu proyecto (ej: "san-valentin-album")
   - Sigue los pasos para crear el proyecto

2. **Habilitar Storage**:
   - En el menú lateral, ve a "Storage"
   - Haz clic en "Comenzar"
   - Elige "Empezar en modo de prueba" (para desarrollo)
   - Selecciona una ubicación para tu bucket

3. **Obtener las credenciales**:
   - Ve a "Configuración del proyecto" (icono de engranaje)
   - Desplázate hacia abajo hasta "Tus apps"
   - Haz clic en el ícono de "</>" para agregar una app web
   - Registra tu app con un nombre (ej: "san-valentin-web")
   - Copia la configuración que aparece

4. **Configurar firebase-config.js**:
   - Abre el archivo `firebase-config.js`
   - Reemplaza los valores placeholder con tus credenciales reales:
   ```javascript
   const firebaseConfig = {
     apiKey: "tu-api-key-real",
     authDomain: "tu-project-id.firebaseapp.com",
     projectId: "tu-project-id",
     storageBucket: "tu-project-id.appspot.com",
     messagingSenderId: "tu-messaging-sender-id",
     appId: "tu-app-id"
   };
   ```

### 🌐 Despliegue en Netlify

1. **Subir el código a Git**:
   - Crea un repositorio en GitHub/GitLab
   - Sube todos los archivos del proyecto

2. **Desplegar en Netlify**:
   - Ve a [Netlify](https://netlify.com) y haz login
   - Haz clic en "New site from Git"
   - Conecta tu repositorio
   - Configura el build:
     - **Build command**: (dejar vacío)
     - **Publish directory**: `.` (raíz del proyecto)
   - Haz clic en "Deploy site"

3. **Configurar reglas de Firebase Storage** (opcional pero recomendado):
   - Ve a Firebase Console > Storage > Reglas
   - Para producción, cambia las reglas para restringir el acceso:
   ```
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /album-photos/{allPaths=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

### 🎨 Características

- ❤️ Interfaz romántica con animaciones
- 📸 Álbum de fotos con hasta 200 imágenes
- 🎠 Carrusel para visualizar fotos
- 🎵 Música de fondo con control
- 🖱️ Arrastrar y soltar para ordenar fotos
- ☁️ Almacenamiento en la nube con Firebase
- 📱 Diseño responsivo

### 🛠️ Archivos Importantes

- `index.html`: Estructura principal
- `script.js`: Lógica de la aplicación
- `styles.css`: Estilos y animaciones
- `firebase-config.js`: Configuración de Firebase (¡configúralo!)
- `musiquita .wav`: Archivo de audio (asegúrate de que exista)

### ⚠️ Notas Importantes

- **Firebase Storage**: Las fotos se almacenan en la nube, no localmente
- **Límite de fotos**: Hasta 200 fotos por álbum
- **Audio**: Asegúrate de que el archivo `musiquita .wav` esté presente
- **Privacidad**: Configura las reglas de Firebase según tus necesidades de privacidad

### 🎯 Uso

1. Abre la aplicación
2. Responde a la pregunta romántica
3. Entra al álbum de recuerdos
4. Sube fotos usando el botón de selección
5. Visualiza fotos en el carrusel
6. Arrastra fotos para reordenarlas
7. Controla la música con el botón

¡Disfruta sorprender a tu ser especial! 💕

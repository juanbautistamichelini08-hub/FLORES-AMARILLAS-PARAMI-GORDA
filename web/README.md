# 💛 Para Vos — Un Campo de Tulipanes al Atardecer

> Una experiencia web cinematográfica, romántica e interactiva: un mar en calma al atardecer con un campo de tulipanes amarillos mecidos por el viento, partículas doradas de luz, música suave y un mensaje especial.

---

## ✨ Características

- **Diseño Cinematográfico:** Océano en calma con reflejos dorados del sol en el horizonte y cielo crepuscular.
- **Campo de Tulipanes Procedural:** Renderizado en Canvas con 3 niveles de profundidad, tallos, hojas y balanceo natural por el viento.
- **Narrativa en 2 Escenas:** Transición suave con mensajes poéticos secuenciados que culminan en el gran mensaje de amor.
- **Efectos Atmosféricos:** Lluvia de pétalos de tulipán, partículas doradas de polen/bokeh y efecto parallax con el movimiento del ratón y el giroscopio/touch en móviles.
- **Audio Inteligente:**
  - Sintetizador ambiental procedural integrado (Web Audio API) que produce una melodía suave de piano de ensueño sin necesidad de archivos externos.
  - Soporte para colocar tu propia canción favorita en `assets/audio/music.mp3`.
  - Botón discreto de control musical (▶ / 🔇).
- **100% Compatible con GitHub Pages:** Rutas relativas, sin frameworks pesados, carga instantánea y optimizado para móviles (Android & iOS).

---

## 📁 Estructura del Proyecto

```text
/
├── index.html            # Estructura principal y maquetado de las dos escenas
├── css/
│   └── style.css         # Estilos cinematográficos, tipografía, glassmorphism y responsive
├── js/
│   ├── scene.js          # Motor en Canvas: mar, sol, tulipanes, viento y partículas
│   ├── audio.js          # Control de música (MP3 + sintetizador Web Audio API)
│   └── app.js            # Orquestador de transiciones narrativas e interacciones
├── assets/
│   ├── audio/
│   │   ├── README.txt    # Instrucciones para añadir tu música favorita
│   │   └── music.mp3     # (Opcional) Tu archivo MP3 personalizado
│   └── images/
│       └── tulip.svg     # Ícono de tulipán amarillo (Favicon)
├── README.md             # Esta guía
└── .gitignore            # Archivos ignorados por Git
```

---

## 🚀 Cómo Ejecutar el Proyecto Localmente

Al ser un proyecto creado con **HTML5, CSS3 y JavaScript moderno nativo**, no requiere instalación obligatoria de paquetes ni configuraciones complejas.

### Opción 1: Abrir directamente en el navegador
Puedes hacer doble clic en `index.html` o arrastrarlo a cualquier navegador web (Chrome, Edge, Firefox, Safari).

### Opción 2: Con un servidor local (Recomendado para simular GitHub Pages)
Si tienes Node.js instalado:
```bash
# Iniciar un servidor ligero al instante
npx serve .
```
O con Python:
```bash
# Python 3
python -m http.server 8000
```
Luego abre tu navegador en `http://localhost:8000` o la URL que indique la consola.

---

## 🎵 Cómo Personalizar la Música

1. Consigue tu canción favorita en formato `.mp3`.
2. Renómbrala a `music.mp3`.
3. Cópiala dentro de la carpeta `assets/audio/music.mp3`.
4. ¡Listo! La página la detectará automáticamente al interactuar.

---

## 🌐 Cómo Subirlo a GitHub y Activar GitHub Pages

Sigue estos sencillos pasos para publicar la página y obtener un enlace público para compartir con tu novia:

### Paso 1: Crear el repositorio en GitHub
1. Entra a [github.com](https://github.com/) e inicia sesión.
2. Haz clic en el botón verde **"New"** (Nuevo repositorio).
3. Elige un nombre para el repositorio (por ejemplo: `flores-amarillas` o `para-vos`).
4. Selecciona **Public** (Público).
5. **No** marques las casillas de agregar README ni .gitignore (ya están creados en este proyecto).
6. Haz clic en **"Create repository"**.

### Paso 2: Subir el proyecto desde tu computadora
Abre una terminal en esta carpeta y ejecuta los siguientes comandos (sustituyendo `TU-USUARIO` y `TU-REPOSITORIO` por los tuyos):

```bash
# 1. Inicializar Git
git init

# 2. Agregar todos los archivos
git add .

# 3. Guardar el primer commit
git commit -m "💛 Experiencia romántica de flores amarillas para mi novia"

# 4. Cambiar a la rama principal 'main'
git branch -M main

# 5. Conectar con tu repositorio de GitHub
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git

# 6. Subir los archivos
git push -u origin main
```

### Paso 3: Activar GitHub Pages
1. En la página de tu repositorio en GitHub, ve a la pestaña **Settings** (Configuración) en la parte superior.
2. En el menú lateral izquierdo, haz clic en **Pages**.
3. En la sección **Build and deployment**:
   - **Source**: Selecciona `Deploy from a branch`.
   - **Branch**: Selecciona la rama `main` y la carpeta `/ (root)`.
4. Haz clic en **Save** (Guardar).

### Paso 4: Obtener la URL pública
1. Espera entre 1 y 2 minutos mientras GitHub publica el sitio.
2. En esa misma sección de **Pages** aparecerá un recuadro verde con tu enlace:
   `https://TU-USUARIO.github.io/TU-REPOSITORIO/`
3. ¡Copia el enlace y envíaselo a tu novia! 💛

---

## 🔄 Cómo Actualizar Posteriormente la Página

Si en el futuro deseas cambiar los textos o agregar tu música favorita:

1. Modifica los archivos en tu computadora.
2. Ejecuta en la terminal:
   ```bash
   git add .
   git commit -m "Actualizar dedicatoria y música"
   git push
   ```
3. GitHub Pages actualizará automáticamente la página en unos segundos.

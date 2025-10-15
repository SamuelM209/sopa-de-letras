#  Sopa de Letras - Generador Automático de Palabras de Animales

## Descripción del Proyecto

Este proyecto consiste en una **Sopa de Letras dinámica y totalmente funcional**, desarrollada con tecnologías web (HTML, CSS y JavaScript puro).  
El objetivo principal es generar automáticamente una cuadrícula de letras que contenga los nombres de **8 animales aleatorios**, distribuidos en **todas las direcciones posibles** (horizontal, vertical y diagonal, en ambas direcciones).

El jugador debe encontrar las palabras subrayándolas directamente con el mouse.  
Si la selección es correcta, se muestra un mensaje de acierto en **verde** y la palabra permanece resaltada en la sopa.  
Si la selección es incorrecta, se muestra una notificación en **rojo**, pero sin eliminar las palabras ya encontradas.

Al finalizar, el botón **“Terminado”** permite verificar si quedaron palabras sin encontrar.  
Las palabras faltantes se muestran resaltadas con otro color, indicando su ubicación exacta y listando sus nombres.

---

##  Características Principales

-  **Generación automática** de la sopa con letras aleatorias.
-  **Selección aleatoria** de 8 animales de una lista predefinida.
-  Palabras distribuidas en **todas las direcciones posibles**:
  - Horizontal (izquierda → derecha y derecha → izquierda)
  - Vertical (arriba → abajo y abajo → arriba)
  - Diagonal (en las cuatro direcciones)
-  Interacción por **selección con el mouse** (sin textbox).
-  Notificación visual de **acierto o error**.
-  Las palabras encontradas **permanecen marcadas** en verde.
-  Selecciones incorrectas **no eliminan progreso previo**.
-  Al presionar “Terminado”, las palabras faltantes se revelan con otro color.
-  **Interfaz adaptativa** y moderna con diseño responsivo.

---

##  Tecnologías Empleadas

| Categoría | Herramienta / Tecnología | Descripción |
|------------|--------------------------|--------------|
| **Lenguaje principal** | **JavaScript (ES6)** | Controla la generación de la sopa, validación de palabras y eventos del usuario. |
| **Estructura** | **HTML5** | Define la estructura visual del juego y los contenedores dinámicos. |
| **Estilos** | **CSS3 (Flexbox / Grid)** | Diseño adaptable, resaltado de letras y colores dinámicos. |
| **Frameworks / Librerías** | *No se usaron frameworks externos* | El proyecto está desarrollado con código nativo para reforzar la comprensión de lógica y manipulación del DOM. |
| **Recursos especiales** | `Math.random()`, `Array.includes()`, `addEventListener()` | Utilizados para generar letras aleatorias, validar direcciones y manejar eventos de selección. |

---

##  Recursos Especiales Utilizados

1. **Algoritmo de generación aleatoria bidireccional:**
   - Calcula posiciones válidas dentro de la cuadrícula.
   - Asegura que las palabras no salgan del límite del tablero.
   - Permite la escritura en las ocho direcciones posibles.

2. **Sistema de resaltado interactivo:**
   - Detección de celdas mediante eventos `mousedown`, `mousemove` y `mouseup`.
   - Cálculo de la línea trazada y comparación con las posiciones reales de las palabras.

3. **Mecanismo de validación visual:**
   - Colores dinámicos según resultado:
     - 🟩 Verde → Palabra encontrada correctamente.
     - 🟥 Rojo → Selección incorrecta.
     - 🟦 Azul → Palabra faltante al finalizar el juego.

4. **Gestión de estado:**
   - Las palabras encontradas se almacenan en un arreglo que persiste durante la sesión.
   - Se evita perder el progreso en caso de errores.

---

##  Guía de Despliegue Local

Sigue estos pasos para ejecutar el proyecto en tu equipo:

###  Requisitos Previos
- Tener instalado un navegador moderno (Chrome, Edge, Firefox o Safari).
- (Opcional) Tener **VS Code** o cualquier editor de texto con servidor local (Live Server).

###  Instalación y Ejecución
1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/SamuelM209/sopa-de-letras.git

   Accede a la carpeta del proyecto:

cd sopa-de-letras


Abre el proyecto en Visual Studio Code (opcional):

code .


Ejecuta el proyecto:

Opción 1: Abre el archivo index.html directamente en tu navegador.

Opción 2 (recomendada): Usa la extensión Live Server en VS Code.

Clic derecho sobre index.html → “Open with Live Server”.

¡Listo! La sopa de letras se generará automáticamente con palabras nuevas cada vez que recargues la página.

## Ejemplo de Funcionamiento

Al iniciar, se muestran las palabras a buscar (8 nombres de animales).

El jugador puede hacer clic y arrastrar el mouse sobre las letras.

Si forma una palabra correcta:

Se muestra un mensaje verde: “✅ ¡Palabra encontrada!”

La palabra queda resaltada permanentemente.

Si es incorrecta:

Se muestra un mensaje rojo: “❌ No es una palabra válida.”

No se borra el progreso previo.

Al presionar Terminado:

Se muestran en azul las palabras no encontradas.

Se listan en un cuadro de resumen.

## Autor

Samuel Moncada Pulgarín

Brayan Sneider Velez

Estudiantes de Tecnología en Desarrollo de Software

Proyecto académico para reforzar conocimientos en:

Manipulación del DOM

Algoritmos de generación aleatoria

Validación lógica y estructuras bidimensionales

Diseño de interfaces interactivas con JavaScript

 Versión: 1.0
 Repositorio: https://github.com/SamuelM209/sopa-de-letras
 Licencia

Este proyecto se distribuye bajo la licencia MIT, lo que permite su uso, modificación y distribución con fines educativos o personales.

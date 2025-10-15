const TAM = 14;
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const animales = ["GATO", "PERRO", "LEON", "TIGRE", "CABALLO", "OSO", "ZORRO", "RANA"];

let tablero = Array.from({ length: TAM }, () => Array(TAM).fill(""));
let palabrasEncontradas = [];

// DIRECCIONES: derecha, izquierda, abajo, arriba, y diagonales
const direcciones = [
  [0, 1], [0, -1], [1, 0], [-1, 0],
  [1, 1], [1, -1], [-1, 1], [-1, -1]
];

// Generar la sopa de letras
function generarSopa() {
  animales.forEach(palabra => colocarPalabra(palabra));

  // Rellenar los espacios vacíos
  for (let i = 0; i < TAM; i++) {
    for (let j = 0; j < TAM; j++) {
      if (!tablero[i][j]) tablero[i][j] = letras[Math.floor(Math.random() * letras.length)];
    }
  }

  mostrarTablero();
}

// Colocar palabra en una dirección aleatoria
function colocarPalabra(palabra) {
  let colocada = false;
  let intentos = 0;

  while (!colocada && intentos < 500) {
    const [dx, dy] = direcciones[Math.floor(Math.random() * direcciones.length)];
    const fila = Math.floor(Math.random() * TAM);
    const col = Math.floor(Math.random() * TAM);

    if (puedeColocar(palabra, fila, col, dx, dy)) {
      for (let k = 0; k < palabra.length; k++) {
        tablero[fila + k * dx][col + k * dy] = palabra[k];
      }
      colocada = true;
    }

    intentos++;
  }
}

// Validar que se pueda colocar
function puedeColocar(palabra, fila, col, dx, dy) {
  for (let k = 0; k < palabra.length; k++) {
    const x = fila + k * dx;
    const y = col + k * dy;
    if (x < 0 || x >= TAM || y < 0 || y >= TAM) return false;
    if (tablero[x][y] && tablero[x][y] !== "" && tablero[x][y] !== palabra[k]) return false;
  }
  return true;
}

// Mostrar la sopa en pantalla
function mostrarTablero() {
  const contenedor = document.getElementById("tablero");
  contenedor.innerHTML = "";

  for (let i = 0; i < TAM; i++) {
    for (let j = 0; j < TAM; j++) {
      const cell = document.createElement("div");
      cell.textContent = tablero[i][j];
      cell.classList.add("cell");
      cell.dataset.fila = i;
      cell.dataset.col = j;
      contenedor.appendChild(cell);
    }
  }
}

// Buscar una palabra y marcarla
function buscarYSubrayar(palabra) {
  palabra = palabra.toUpperCase();

  for (let i = 0; i < TAM; i++) {
    for (let j = 0; j < TAM; j++) {
      for (const [dx, dy] of direcciones) {
        let x = i, y = j, k;

        for (k = 0; k < palabra.length; k++) {
          if (
            x < 0 || x >= TAM || y < 0 || y >= TAM ||
            tablero[x][y] !== palabra[k]
          ) break;
          x += dx;
          y += dy;
        }

        if (k === palabra.length) {
          subrayarPalabra(i, j, dx, dy, palabra.length);
          return true;
        }
      }
    }
  }
  return false;
}

// Subrayar las celdas correctas
function subrayarPalabra(fila, col, dx, dy, longitud) {
  for (let k = 0; k < longitud; k++) {
    const x = fila + k * dx;
    const y = col + k * dy;
    const cell = document.querySelector(`[data-fila="${x}"][data-col="${y}"]`);
    cell.classList.add("subrayada");
  }
}

// Verificar palabra ingresada
document.getElementById("btnVerificar").addEventListener("click", () => {
  const input = document.getElementById("inputPalabra");
  const mensaje = document.getElementById("mensaje");
  const palabra = input.value.trim().toUpperCase();

  if (!palabra) return;

  if (animales.includes(palabra)) {
    if (!palabrasEncontradas.includes(palabra)) {
      const encontrada = buscarYSubrayar(palabra);
      if (encontrada) {
        palabrasEncontradas.push(palabra);
        mensaje.textContent = `✅ "${palabra}" encontrada!`;
        mensaje.style.color = "green";
      }
    } else {
      mensaje.textContent = `⚠️ "${palabra}" ya fue encontrada.`;
      mensaje.style.color = "orange";
    }
  } else {
    mensaje.textContent = `❌ "${palabra}" no está en la lista de animales.`;
    mensaje.style.color = "red";
  }

  input.value = "";
});

// Mostrar resultados finales
document.getElementById("btnTerminado").addEventListener("click", () => {
  const ul = document.getElementById("resultado-lista");
  ul.innerHTML = "";

  const noEncontradas = animales.filter(p => !palabrasEncontradas.includes(p));

  ul.innerHTML = `
    <li><strong>Encontradas (${palabrasEncontradas.length}):</strong> ${palabrasEncontradas.join(", ") || "Ninguna"}</li>
    <li><strong>No encontradas (${noEncontradas.length}):</strong> ${noEncontradas.join(", ") || "Ninguna"}</li>
  `;
});

// Inicializar el juego
generarSopa();

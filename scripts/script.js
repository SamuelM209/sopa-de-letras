const tamaño = 14;
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let tablero = Array.from({ length: tamaño }, () => Array(tamaño).fill(""));
let palabras = [];

async function cargarPalabras() {
  try {
    const res = await fetch('data/palabras.json');
    const data = await res.json();
    palabras = data.palabras.map(p => p.toUpperCase());
  } catch (err) {
    console.error("Error al cargar palabras:", err);
    palabras = [];
  }
  mostrarPalabras();
  generarSopa();
}

function mostrarPalabras() {
  const ul = document.getElementById("lista-palabras");
  ul.innerHTML = "";
  palabras.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    ul.appendChild(li);
  });
}

function generarSopa() {
  // Reiniciar tablero
  tablero = Array.from({ length: tamaño }, () => Array(tamaño).fill(""));

  // Intentar colocar cada palabra
  palabras.forEach(palabra => colocarPalabra(palabra));

  // Rellenar vacíos
  for (let i = 0; i < tamaño; i++) {
    for (let j = 0; j < tamaño; j++) {
      if (!tablero[i][j]) tablero[i][j] = letras.charAt(Math.floor(Math.random() * letras.length));
    }
  }

  mostrarMatriz();
}

function colocarPalabra(palabra) {
  const direcciones = [
    [0, 1],   // derecha
    [0, -1],  // izquierda
    [1, 0],   // abajo
    [-1, 0],  // arriba
    [1, 1],   // diag abajo derecha
    [1, -1],  // diag abajo izquierda
    [-1, 1],  // diag arriba derecha
    [-1, -1], // diag arriba izquierda
  ];

  let colocada = false;
  let intentos = 0;

  while (!colocada && intentos < 500) {
    const [dx, dy] = direcciones[Math.floor(Math.random() * direcciones.length)];
    const fila = Math.floor(Math.random() * tamaño);
    const col = Math.floor(Math.random() * tamaño);

    if (puedeColocar(palabra, fila, col, dx, dy)) {
      for (let k = 0; k < palabra.length; k++) {
        tablero[fila + k * dx][col + k * dy] = palabra[k];
      }
      colocada = true;
    }
    intentos++;
  }

  if (!colocada) {
    console.warn(`No se pudo colocar "${palabra}" (intentos: ${intentos})`);
  }
}

function puedeColocar(palabra, fila, col, dx, dy) {
  for (let k = 0; k < palabra.length; k++) {
    const x = fila + k * dx;
    const y = col + k * dy;
    if (x < 0 || x >= tamaño || y < 0 || y >= tamaño) return false;
    if (tablero[x][y] && tablero[x][y] !== "" && tablero[x][y] !== palabra[k]) return false;
  }
  return true;
}

function mostrarMatriz() {
  const pre = document.getElementById("matriz");
  pre.textContent = tablero.map(fila => fila.join(",")).join("\n");
}

document.getElementById("btnVerificar").addEventListener("click", verificarPalabras);

function verificarPalabras() {
  const resultados = [];

  palabras.forEach(palabra => {
    const encontrada = buscarPalabra(palabra);
    resultados.push({ palabra, encontrada });
  });

  mostrarResultados(resultados);
}

function buscarPalabra(palabra) {
  const direcciones = [
    [0, 1], [0, -1], [1, 0], [-1, 0],
    [1, 1], [1, -1], [-1, 1], [-1, -1]
  ];

  for (let i = 0; i < tamaño; i++) {
    for (let j = 0; j < tamaño; j++) {
      if (tablero[i][j] === palabra[0]) {
        for (const [dx, dy] of direcciones) {
          let x = i, y = j, k;
          for (k = 0; k < palabra.length; k++) {
            if (x < 0 || x >= tamaño || y < 0 || y >= tamaño || tablero[x][y] !== palabra[k]) break;
            x += dx; y += dy;
          }
          if (k === palabra.length) return true;
        }
      }
    }
  }
  return false;
}

// Inicializar
cargarPalabras();

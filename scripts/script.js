

const tamaño = 14;
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const palabras = ["GATO", "PERRO", "ELEFANTE", "ZORRO", "LAGARTO", "OSO", "MONO", "RATON"];

let tablero = [];
let wordPositions = {};
let palabrasEncontradas = new Set();

const direcciones = [
  [0, 1], [0, -1], [1, 0], [-1, 0],
  [1, 1], [1, -1], [-1, 1], [-1, -1]
];

function generarSopa() {
  tablero = Array.from({ length: tamaño }, () => Array(tamaño).fill(""));
  wordPositions = {};
  palabrasEncontradas.clear();

  for (const palabra of palabras) colocarPalabra(palabra);

  for (let i = 0; i < tamaño; i++) {
    for (let j = 0; j < tamaño; j++) {
      if (!tablero[i][j]) tablero[i][j] = letras.charAt(Math.floor(Math.random() * letras.length));
    }
  }

  mostrarTablero();
}

function colocarPalabra(palabra) {
  let colocada = false;
  let intentos = 0;

  while (!colocada && intentos < 500) {
    intentos++;
    const [dx, dy] = direcciones[Math.floor(Math.random() * direcciones.length)];
    const fila = Math.floor(Math.random() * tamaño);
    const col = Math.floor(Math.random() * tamaño);

    if (!puedeColocar(palabra, fila, col, dx, dy)) continue;

    const coords = [];
    for (let k = 0; k < palabra.length; k++) {
      const x = fila + k * dx;
      const y = col + k * dy;
      tablero[x][y] = palabra[k];
      coords.push([x, y]);
    }
    wordPositions[palabra] = coords;
    colocada = true;
  }
}

function puedeColocar(palabra, fila, col, dx, dy) {
  for (let k = 0; k < palabra.length; k++) {
    const x = fila + k * dx;
    const y = col + k * dy;
    if (x < 0 || x >= tamaño || y < 0 || y >= tamaño) return false;
    if (tablero[x][y] && tablero[x][y] !== palabra[k] && tablero[x][y] !== "") return false;
  }
  return true;
}


function mostrarTablero() {
  const contenedor = document.getElementById("tablero");
  contenedor.innerHTML = "";
  contenedor.style.gridTemplateColumns = `repeat(${tamaño}, 32px)`;

  for (let i = 0; i < tamaño; i++) {
    for (let j = 0; j < tamaño; j++) {
      const celda = document.createElement("div");
      celda.classList.add("cell");
      celda.textContent = tablero[i][j];
      celda.dataset.row = i;
      celda.dataset.col = j;
      contenedor.appendChild(celda);
    }
  }


  const ul = document.getElementById("lista-palabras");
  ul.innerHTML = "";
  palabras.forEach(p => {
    const li = document.createElement("li");
    li.id = `pal-${p}`;
    li.textContent = p;
    ul.appendChild(li);
  });

  prepararSeleccion();
}


let seleccionActiva = false;
let seleccion = [];
let inicioCell = null;

function prepararSeleccion() {
  const celdas = document.querySelectorAll(".cell");

  celdas.forEach(cell => {
    cell.addEventListener("mousedown", e => {
      e.preventDefault();
      seleccionActiva = true;
      seleccion = [cell];
      inicioCell = cell;
      cell.classList.add("seleccionada");
    });

    cell.addEventListener("mouseenter", e => {
      if (seleccionActiva && !seleccion.includes(cell)) {
        seleccion.push(cell);
        cell.classList.add("seleccionada");
      }
    });

    cell.addEventListener("mouseup", e => {
      if (!seleccionActiva) return;
      seleccionActiva = false;

      const finCell = cell;
      const palabra = obtenerPalabra(inicioCell, finCell);
      verificarPalabra(palabra);
      limpiarSeleccionTemporal();
    });
  });

  document.addEventListener("mouseup", () => (seleccionActiva = false));
}

function obtenerPalabra(inicioCell, finCell) {
  const i1 = parseInt(inicioCell.dataset.row);
  const j1 = parseInt(inicioCell.dataset.col);
  const i2 = parseInt(finCell.dataset.row);
  const j2 = parseInt(finCell.dataset.col);

  const dx = Math.sign(i2 - i1);
  const dy = Math.sign(j2 - j1);

  const esLineaValida = dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy);
  if (!esLineaValida) return "";

  let x = i1, y = j1;
  const letrasSel = [];
  while (true) {
    const celda = document.querySelector(`[data-row="${x}"][data-col="${y}"]`);
    if (!celda) break;
    letrasSel.push(celda.textContent);
    if (x === i2 && y === j2) break;
    x += dx;
    y += dy;
  }
  return letrasSel.join("");
}

function verificarPalabra(palabra) {
  const mensaje = document.getElementById("mensaje");
  const invertida = palabra.split("").reverse().join("");
  const correcta = palabras.find(p => p === palabra || p === invertida);

  if (correcta) {
    if (palabrasEncontradas.has(correcta)) {
      mensaje.textContent = `⚠️ "${correcta}" ya fue encontrada.`;
      mensaje.style.color = "orange";
      return;
    }

    palabrasEncontradas.add(correcta);
    const coords = wordPositions[correcta];
    coords.forEach(([r, c]) => {
      const cel = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
      if (cel) cel.classList.add("encontrada");
    });

    const li = document.getElementById(`pal-${correcta}`);
    if (li) li.classList.add("encontrada");

    mensaje.textContent = `✅ "${correcta}" encontrada.`;
    mensaje.style.color = "green";
  } else {
    mensaje.textContent = `❌ "${palabra}" no es correcta.`;
    mensaje.style.color = "red";
  }
}


function limpiarSeleccionTemporal() {
  document.querySelectorAll(".seleccionada").forEach(c => c.classList.remove("seleccionada"));
}


document.getElementById("btnTerminado").addEventListener("click", () => {
  const resultado = document.getElementById("resultado-lista");
  resultado.innerHTML = "";

  const faltantes = palabras.filter(p => !palabrasEncontradas.has(p));
  faltantes.forEach(p => {
    const coords = wordPositions[p];
    coords.forEach(([r, c]) => {
      const cel = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
      if (cel && !cel.classList.contains("encontrada")) cel.classList.add("faltante");
    });
  });

  resultado.innerHTML = `
    <li><strong>Encontradas (${palabrasEncontradas.size}):</strong> ${[...palabrasEncontradas].join(", ") || "Ninguna"}</li>
    <li><strong>Faltantes (${faltantes.length}):</strong> ${faltantes.join(", ") || "Ninguna"}</li>
  `;
});

generarSopa();

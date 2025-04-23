// --- Variables y configuración inicial ---
const botones = document.querySelectorAll('#opciones button');
const opciones = ['piedra', 'papel', 'tijera', 'lagarto', 'spock'];
const emojis = {
  piedra: '🪨',
  papel: '📄',
  tijera: '✂️',
  lagarto: '🦎',
  spock: '🖖'
};

let rondas = 0;
let puntosJugador = 0;
let puntosIA = 0;
let rondasParaGanar = 10; 

// Música de fin de partida
const musicaVictoria = new Audio('victoria.wav');
const musicaDerrota = new Audio('derrota.wav');

// --- Función de reinicio común ---
function reiniciarEstadoUI() {
  rondas = 0;
  puntosJugador = 0;
  puntosIA = 0;

  document.getElementById('eleccion-jugador').textContent = '-';
  document.getElementById('eleccion-ia').textContent = '-';
  document.getElementById('texto-resultado').textContent = '-';
  document.getElementById('contador').textContent = '0';
  document.getElementById('puntos-jugador').textContent = '0';
  document.getElementById('puntos-ia').textContent = '0';
}

function reiniciarJuego(mensajeElemento) {
  // quita el mensaje final
  document.body.removeChild(mensajeElemento);
  // restablece interfaz
  reiniciarEstadoUI();
}

// --- Inicialización al cargar la página ---
document.addEventListener('DOMContentLoaded', () => {
  reiniciarEstadoUI();
});

// --- Gestión del modal de reglas ---
const modalReglas = document.getElementById('modal-reglas');
document.getElementById('mostrar-reglas').addEventListener('click', () => {
  modalReglas.classList.remove('oculto');
});
document.getElementById('cerrar-modal').addEventListener('click', () => {
  modalReglas.classList.add('oculto');
});

// --- Gestión del modal de configuración de rondas ---
document.getElementById('btn-configurar-rondas').addEventListener('click', () => {
  modalRondas.classList.remove('oculto');
});

document.getElementById('cerrar-rondas').addEventListener('click', () => {
  modalRondas.classList.add('oculto');
});

document.getElementById('confirmar-rondas').addEventListener('click', () => {
  const rondasElegidas = parseInt(document.getElementById('input-rondas').value);

  if (!isNaN(rondasElegidas) && rondasElegidas > 0) {
    rondasParaGanar = rondasElegidas;
    reiniciarEstadoUI(); // Reinicia los contadores
    modalRondas.classList.add('oculto');
  } else {
    alert("Por favor, introduce un número válido.");
  }
});

document.getElementById('btn-configurar-rondas').addEventListener('click', () => {
  document.getElementById('modal-rondas').classList.remove('oculto');
});

document.getElementById('cerrar-rondas').addEventListener('click', () => {
  document.getElementById('modal-rondas').classList.add('oculto');
});



// --- Lógica del juego ---
const reglas = {
  piedra: ['tijera', 'lagarto'],
  papel: ['piedra', 'spock'],
  tijera: ['papel', 'lagarto'],
  lagarto: ['papel', 'spock'],
  spock: ['tijera', 'piedra']
};

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    const jugador = boton.dataset.eleccion;
    const ia = opciones[Math.floor(Math.random() * opciones.length)];

    // Mostrar elecciones
    document.getElementById('eleccion-jugador').textContent = emojis[jugador];
    document.getElementById('eleccion-ia').textContent = emojis[ia];

    // Determinar resultado
    let resultadoText;
    if (jugador === ia) {
      resultadoText = 'Empate😐';
    } else if (reglas[jugador].includes(ia)) {
      resultadoText = '¡Ganaste!😎';
      puntosJugador++;
    } else {
      resultadoText = 'Perdiste😒';
      puntosIA++;
    }

    // Actualizar UI
    rondas++;
    document.getElementById('texto-resultado').textContent = resultadoText;
    document.getElementById('contador').textContent = rondas;
    document.getElementById('puntos-jugador').textContent = puntosJugador;
    document.getElementById('puntos-ia').textContent = puntosIA;

    // Comprobar fin de partida
    if (puntosJugador === rondasParaGanar || puntosIA === rondasParaGanar) {
      const ganoJugador = puntosJugador === rondasParaGanar;
      const mensaje = document.createElement('div');
      mensaje.classList.add('mensaje-final');
      mensaje.textContent = ganoJugador
        ? '🎉 ¡Ganaste la partida!'
        : '😢 La máquina ganó la partida';
      document.body.appendChild(mensaje);

      // Sonido
      const musica = ganoJugador ? musicaVictoria : musicaDerrota;
      musica.play();

      // Bloquear botones durante el mensaje
      botones.forEach(btn => btn.disabled = true);

      // Después de 3s, parar música, desbloquear y reiniciar.
      setTimeout(() => {
        musica.pause();
        musica.currentTime = 0;
        botones.forEach(btn => btn.disabled = false);
        reiniciarJuego(mensaje);
      }, 3000);
    }
  });
});

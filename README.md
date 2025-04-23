Página web de juego Vadim Denisov

Hola, me presento soy Vadim Denisov de 1-DAM-A, como lo dice arriba y les presento mi pequeño juego. Todo es muy sencillo, hay muchos comentarios sueltos en el código, pero yo voy a explicar un poqutio como funciona cada cosa.

Si no eliges la cantidad de rondas, será hasta 10 por defecto.

Carga del archivo de sonido
const musicaVictoria = new Audio('victoria.wav'); const musicaDerrota = new Audio('derrota.wav');

Aquí se crean dos objetos Audio, uno para cada sonido, cargando los archivos victoria.wav y derrota.wav. Esto los prepara para ser reproducidos más adelante.

Detección del ganador
const ganoJugador = puntosJugador === rondasParaGanar; Esto comprueba si el jugador ha llegado al número de rondas necesarias para ganar. Si no, significa que ganó la IA.

Selección y reproducción del sonido
const musica = ganoJugador ? musicaVictoria : musicaDerrota; musica.play();

Dependiendo de quién ganó, se elige la música correspondiente y se reproduce usando .play().

Parar el sonido tras unos segundos
setTimeout(() => { musica.pause(); musica.currentTime = 0; // ... }, 3000);

Después de 3 segundos (3000 milisegundos), se pausa el audio y se reinicia al principio (currentTime = 0) para que esté listo la próxima vez que se use.

🧾 Botón "Mostrar reglas"

document.getElementById('mostrar-reglas').addEventListener('click', () => { modalReglas.classList.remove('oculto'); }); Cuando el usuario hace clic en el botón con ID mostrar-reglas, se quita la clase oculto del elemento modalReglas, lo que hace que se muestre el modal de reglas.

document.getElementById('cerrar-modal').addEventListener('click', () => { modalReglas.classList.add('oculto'); });

Al hacer clic en el botón de cerrar (cerrar-modal), se vuelve a añadir la clase oculto, ocultando el modal.

🔢 Botón "Cambiar rondas"

document.getElementById('btn-configurar-rondas').addEventListener('click', () => { document.getElementById('modal-rondas').classList.remove('oculto'); });

Al pulsar el botón con ID btn-configurar-rondas, se muestra el modal donde puedes introducir cuántas rondas hay que ganar para terminar la partida.

document.getElementById('confirmar-rondas').addEventListener('click', () => { const rondasElegidas = parseInt(document.getElementById('input-rondas').value); if (!isNaN(rondasElegidas) && rondasElegidas > 0) { rondasParaGanar = rondasElegidas; reiniciarEstadoUI(); modalRondas.classList.add('oculto'); } else { alert("Por favor, introduce un número válido."); } });

Cuando confirmas, toma el número ingresado en el input, lo valida y actualiza rondasParaGanar.

También reinicia el estado del juego (puntos, rondas, elecciones).

Finalmente, oculta el modal.

document.getElementById('cerrar-rondas').addEventListener('click', () => { document.getElementById('modal-rondas').classList.add('oculto'); });

Este botón simplemente cierra el modal sin hacer cambios.

Mostrar reglas: abre/cierra una ventana con instrucciones.

Cambiar rondas: muestra un formulario para cambiar cuántas rondas se necesitan ganar, valida el valor, reinicia el juego y oculta el modal

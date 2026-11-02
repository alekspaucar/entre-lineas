export const story = {
  title: 'El café antes del código',
  subtitle: 'Una mañana, una contraseña olvidada y un pequeño error que resolver.',
  minutes: 5,
  level: 'A2 · Historia 01',
  words: {
    password: 'contraseña',
    laptop: 'computadora portátil',
    screen: 'pantalla',
    server: 'servidor',
    update: 'actualizar',
    message: 'mensaje',
    quiet: 'tranquilo',
    table: 'mesa',
    coffee: 'café',
    keyboard: 'teclado',
    answer: 'respuesta',
    ready: 'listo'
  },
  lines: [
    ['Alexander salió temprano porque quería terminar un pequeño proyecto antes de clase.', 'Alexander left early because he wanted to finish a small project before class.'],
    ['La ciudad todavía estaba tranquila cuando entró a una cafetería cerca de la universidad.', 'The city was still quiet when he walked into a coffee shop near the university.'],
    ['El olor a café lo hizo sonreír.', 'The smell of coffee made him smile.'],
    ['—Un café americano, por favor —dijo.', '“An Americano, please,” he said.'],
    ['Mientras esperaba, abrió su laptop y revisó la pantalla.', 'While he waited, he opened his laptop and looked at the screen.'],
    ['Había un mensaje de su compañero: “El servidor no responde.”', 'There was a message from his classmate: “The server is not responding.”'],
    ['Alexander respiró hondo y buscó una mesa junto a la ventana.', 'Alexander took a deep breath and found a table by the window.'],
    ['Primero intentó conectarse al Wi-Fi, pero olvidó su password.', 'First, he tried to connect to the Wi-Fi, but he forgot his password.'],
    ['Miró la pequeña tarjeta sobre la mesa y encontró la respuesta.', 'He looked at the small card on the table and found the answer.'],
    ['Con el teclado, escribió un comando simple y esperó.', 'Using the keyboard, he typed a simple command and waited.'],
    ['Después de unos segundos, el servidor volvió a responder.', 'After a few seconds, the server started responding again.'],
    ['Alexander sonrió. No era un gran problema, pero ahora estaba ready para su clase.', 'Alexander smiled. It was not a big problem, but now he was ready for class.']
  ]
};

export function createReadingState() {
  return { showSpanish: true };
}

export function toggleSpanish(state) {
  return { ...state, showSpanish: !state.showSpanish };
}

export function lookupTranslation(word) {
  return story.words[word.toLowerCase().replace(/[^a-z]/g, '')] ?? null;
}


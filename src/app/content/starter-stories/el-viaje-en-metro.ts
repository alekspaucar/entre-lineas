import type { Story } from '../../features/reader/story.model';

/** Historia 5 — A1: vida cotidiana, orientarse en una ciudad nueva. */
export const elViajeEnMetro: Story = {
  id: 'el-viaje-en-metro',
  number: 5,
  title: 'El viaje en metro',
  subtitle: 'Sofía llega a una ciudad nueva y tiene que llegar a tiempo a su primera clase.',
  level: 'A1',
  minutes: 4,
  words: {
    station: 'estación',
    ticket: 'boleto',
    line: 'línea',
    map: 'mapa',
    exit: 'salida',
    platform: 'andén',
    direction: 'dirección',
    transfer: 'transbordo',
    arrive: 'llegar',
    lost: 'perdido',
    ask: 'preguntar',
    close: 'cerca',
  },
  lines: [
    {
      es: 'Sofía llegó a la estación con quince minutos de ventaja.',
      en: 'Sofia arrived at the station with fifteen minutes to spare.',
    },
    {
      es: 'Compró su boleto y buscó el mapa en la pared.',
      en: 'She bought her ticket and looked for the map on the wall.',
    },
    {
      es: 'Había que tomar la línea azul y hacer un transbordo en la tercera parada.',
      en: 'She had to take the blue line and make one transfer at the third stop.',
    },
    {
      es: 'Se sentía un poco perdida, pero no quería llegar tarde.',
      en: 'She felt a little lost, but she did not want to arrive late.',
    },
    {
      es: 'Decidió preguntar a la persona que estaba cerca de ella.',
      en: 'She decided to ask the person who was close to her.',
    },
    {
      es: '—Excuse me, which direction is the university? —dijo en inglés.',
      en: '"Excuse me, which direction is the university?" she said in English.',
    },
    {
      es: 'La persona señaló el andén de la derecha sin dudar.',
      en: 'The person pointed to the right platform without hesitation.',
    },
    {
      es: 'Sofía encontró la salida correcta y llegó dos minutos antes.',
      en: 'Sofia found the correct exit and arrived two minutes early.',
    },
    {
      es: 'Esa mañana aprendió que preguntar es más rápido que adivinar.',
      en: 'That morning she learned that asking is faster than guessing.',
    },
  ],
};

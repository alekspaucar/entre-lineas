import type { Story } from '../../features/reader/story.model';

/** Historia 3 — A2: trabajo en equipo remoto, primera reunión virtual. */
export const equipoEnLinea: Story = {
  id: 'equipo-en-linea',
  number: 3,
  title: 'El equipo en línea',
  subtitle: 'Marcus tiene su primera reunión de proyecto por videollamada y algo no funciona.',
  level: 'A2',
  minutes: 5,
  words: {
    meeting: 'reunión',
    muted: 'silenciado',
    camera: 'cámara',
    share: 'compartir',
    screen: 'pantalla',
    connection: 'conexión',
    chat: 'chat',
    deadline: 'fecha límite',
    task: 'tarea',
    team: 'equipo',
    join: 'unirse',
    late: 'tarde',
  },
  lines: [
    {
      es: 'Marcus abrió su computadora cinco minutos antes de la reunión.',
      en: 'Marcus opened his computer five minutes before the meeting.',
    },
    {
      es: 'Era su primer proyecto en equipo y quería entrar puntual.',
      en: 'It was his first team project and he wanted to join on time.',
    },
    {
      es: 'Cuando llegó a la videollamada, todos lo miraron en silencio.',
      en: 'When he joined the video call, everyone looked at him in silence.',
    },
    {
      es: 'Estaba silenciado. No lo había notado.',
      en: 'He was muted. He had not noticed.',
    },
    {
      es: 'Su compañera Sofia escribió en el chat: "Apaga y prende la cámara."',
      en: 'His classmate Sofia wrote in the chat: "Turn your camera off and on."',
    },
    {
      es: 'Marcus lo intentó. La conexión mejoró y todos lo vieron bien.',
      en: 'Marcus tried it. The connection improved and everyone could see him clearly.',
    },
    {
      es: 'El equipo empezó a compartir pantalla y cada miembro explicó su tarea.',
      en: 'The team started to share their screen and each member explained their task.',
    },
    {
      es: 'La fecha límite era el viernes y todavía faltaban tres partes.',
      en: 'The deadline was Friday and there were still three parts missing.',
    },
    {
      es: '—Yo puedo trabajar en la parte de diseño esta tarde —dijo Marcus en inglés.',
      en: '"I can work on the design part this afternoon," said Marcus in English.',
    },
    {
      es: 'Al final de la reunión, el equipo tenía un plan claro.',
      en: 'By the end of the meeting, the team had a clear plan.',
    },
    {
      es: 'Marcus aprendió que llegar tarde no importa si llegas con ideas.',
      en: 'Marcus learned that arriving late does not matter if you arrive with ideas.',
    },
  ],
};

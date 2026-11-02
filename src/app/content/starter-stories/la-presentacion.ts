import type { Story } from '../../features/reader/story.model';

/** Historia 6 — B1: trabajo en equipo, presentación ante un grupo real. */
export const laPresentacion: Story = {
  id: 'la-presentacion',
  number: 6,
  title: 'La presentación',
  subtitle: 'Rodrigo tiene que presentar su proyecto en inglés ante veinte personas que no conoce.',
  level: 'B1',
  minutes: 5,
  words: {
    slide: 'diapositiva',
    audience: 'audiencia',
    nervous: 'nervioso',
    practice: 'practicar',
    feedback: 'retroalimentación',
    clear: 'claro',
    question: 'pregunta',
    answer: 'responder',
    confident: 'seguro',
    pause: 'pausa',
    explain: 'explicar',
    summary: 'resumen',
  },
  lines: [
    {
      es: 'Rodrigo revisó sus diapositivas por última vez diez minutos antes.',
      en: 'Rodrigo reviewed his slides one last time ten minutes before.',
    },
    {
      es: 'Había practicado cuatro veces, pero aún se sentía nervioso.',
      en: 'He had to practice four times, but he still felt nervous.',
    },
    {
      es: 'La audiencia empezó a entrar. Eran veinte personas que no lo conocían.',
      en: 'The audience started to come in. There were twenty people who did not know him.',
    },
    {
      es: 'Comenzó con una pausa larga y una frase simple: «Good morning.»',
      en: 'He started with a long pause and a simple phrase: \"Good morning.\"',
    },
    {
      es: 'Quería ser claro, así que usó solo una idea por diapositiva.',
      en: 'He wanted to be clear, so he used just one idea per slide.',
    },
    {
      es: 'Le pidió a la audiencia que le dejara explicar el problema primero.',
      en: 'He asked the audience to let him explain the problem first.',
    },
    {
      es: 'Al final, presentó un resumen con tres puntos clave.',
      en: 'At the end, he presented a summary with three key points.',
    },
    {
      es: 'Abrió el espacio para preguntas.',
      en: 'He opened the floor for questions.',
    },
    {
      es: '—Could you repeat that? I want to answer you correctly —dijo con calma.',
      en: '\"Could you repeat that? I want to answer you correctly,\" he said calmly.',
    },
    {
      es: 'La audiencia asintió. Esa pregunta era mejor que cualquier respuesta perfecta.',
      en: 'The audience nodded. That question was better than any perfect answer.',
    },
    {
      es: 'Rodrigo recibió retroalimentación positiva. La próxima vez sería más seguro.',
      en: 'Rodrigo received positive feedback. Next time he would feel more confident.',
    },
  ],
};

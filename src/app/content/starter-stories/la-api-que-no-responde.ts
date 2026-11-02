import type { Story } from '../../features/reader/story.model';

/** Historia 7 — B2: programación avanzada, integrar una API externa con errores intermitentes. */
export const laApiQueNoResponde: Story = {
  id: 'la-api-que-no-responde',
  number: 7,
  title: 'La API que no responde',
  subtitle: 'Elena lleva dos horas mirando el mismo error 429 y aprende que el problema no siempre está en tu código.',
  level: 'B2',
  minutes: 6,
  words: {
    request: 'solicitud',
    response: 'respuesta',
    timeout: 'tiempo de espera agotado',
    retry: 'reintentar',
    rate: 'límite de velocidad',
    header: 'encabezado',
    token: 'token de acceso',
    endpoint: 'punto de acceso',
    cache: 'caché',
    throttle: 'regular velocidad',
    fallback: 'alternativa',
    status: 'estado',
  },
  lines: [
    {
      es: 'Elena llevaba dos horas mirando el mismo código. El error 429 seguía apareciendo.',
      en: 'Elena had been staring at the same code for two hours. The 429 error kept appearing.',
    },
    {
      es: 'Ese código significa que la API está rechazando sus solicitudes por exceso de velocidad.',
      en: 'That status code means the API is rejecting her requests due to rate limiting.',
    },
    {
      es: 'Revisó cada header de la respuesta y encontró el tiempo de espera: 60 segundos.',
      en: 'She checked every response header and found the retry timeout: 60 seconds.',
    },
    {
      es: 'Había mandado doscientas solicitudes en un minuto sin darse cuenta.',
      en: 'She had sent two hundred requests in one minute without realizing it.',
    },
    {
      es: 'El problema no era el token ni el endpoint: era su propia lógica de reintentos.',
      en: 'The problem was not the token or the endpoint: it was her own retry logic.',
    },
    {
      es: 'Cada vez que la solicitud fallaba, el código la repetía de inmediato.',
      en: 'Every time a request failed, the code repeated it immediately.',
    },
    {
      es: 'Elena añadió un tiempo de espera exponencial entre reintentos.',
      en: 'Elena added an exponential backoff between retries.',
    },
    {
      es: 'También añadió una caché local para no pedir el mismo dato dos veces.',
      en: 'She also added a local cache to avoid requesting the same data twice.',
    },
    {
      es: 'Como alternativa, preparó una respuesta guardada para cuando la API no respondiera.',
      en: 'As a fallback, she prepared a stored response for when the API did not respond.',
    },
    {
      es: 'Veinte minutos después, el código podía throttle su velocidad de forma automática.',
      en: 'Twenty minutes later, the code could throttle its own speed automatically.',
    },
    {
      es: 'Elena escribió un comentario en el código explicando cada decisión.',
      en: 'Elena wrote a comment in the code explaining each decision.',
    },
    {
      es: 'La próxima persona que leyera ese archivo entendería por qué funcionaba así.',
      en: 'The next person who read that file would understand why it worked that way.',
    },
  ],
};

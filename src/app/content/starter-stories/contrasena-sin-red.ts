import type { Story } from '../../features/reader/story.model';

/** Historia 2 — A1: seguridad digital, primera semana en la universidad. */
export const contrasenaSinRed: Story = {
  id: 'contrasena-sin-red',
  number: 2,
  title: 'La contraseña sin red',
  subtitle: 'Valentina llega a la universidad y descubre que recordar no siempre basta.',
  level: 'A1',
  minutes: 5,
  words: {
    username: 'nombre de usuario',
    email: 'correo electrónico',
    phone: 'teléfono',
    help: 'ayuda',
    forgot: 'olvidé',
    wrong: 'incorrecto',
    reset: 'restablecer',
    link: 'enlace',
    inbox: 'bandeja de entrada',
    done: 'listo',
    new: 'nuevo',
    easy: 'fácil',
  },
  lines: [
    {
      es: 'Valentina llegó a la universidad el primer lunes de agosto.',
      en: 'Valentina arrived at the university on the first Monday of August.',
    },
    {
      es: 'Necesitaba acceder al portal de estudiantes, pero no recordaba su contraseña.',
      en: 'She needed to access the student portal, but she forgot her password.',
    },
    {
      es: 'Probó con su nombre de usuario tres veces y las tres veces fue incorrecto.',
      en: 'She tried her username three times and three times it was wrong.',
    },
    {
      es: 'Una pantalla le pidió su correo electrónico para restablecer el acceso.',
      en: 'A screen asked for her email to reset her access.',
    },
    {
      es: '—Mi teléfono no tiene señal aquí —dijo en voz baja.',
      en: '"My phone has no signal here," she said quietly.',
    },
    {
      es: 'Buscó ayuda y encontró a un estudiante mayor cerca de la entrada.',
      en: 'She looked for help and found an older student near the entrance.',
    },
    {
      es: 'Él le prestó su teléfono para revisar su bandeja de entrada.',
      en: 'He lent her his phone to check her inbox.',
    },
    {
      es: 'El enlace de restablecimiento llegó en segundos.',
      en: 'The reset link arrived in seconds.',
    },
    {
      es: 'Valentina eligió una contraseña nueva y fácil de recordar.',
      en: 'Valentina chose a new password that was easy to remember.',
    },
    {
      es: '—¡Listo! —dijo y sonrió. Era su primer pequeño éxito en la universidad.',
      en: '"Done!" she said and smiled. It was her first small success at the university.',
    },
  ],
};

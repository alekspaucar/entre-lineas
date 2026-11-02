import type { Story } from '../../features/reader/story.model';

/** Historia 4 — B1: programación, depuración de código en un proyecto real. */
export const elPrimerBug: Story = {
  id: 'el-primer-bug',
  number: 4,
  title: 'El primer bug',
  subtitle: 'Daniela encuentra su primer error de código en producción y aprende a leer los mensajes del sistema.',
  level: 'B1',
  minutes: 5,
  words: {
    error: 'error',
    log: 'registro',
    debug: 'depurar',
    function: 'función',
    variable: 'variable',
    output: 'resultado',
    terminal: 'terminal',
    stack: 'pila de errores',
    fix: 'corregir',
    commit: 'guardar cambios',
    deploy: 'publicar',
    review: 'revisión',
  },
  lines: [
    {
      es: 'Daniela revisó el terminal y vio un error que no había estado ahí por la mañana.',
      en: 'Daniela checked the terminal and saw an error that had not been there in the morning.',
    },
    {
      es: 'El log decía: "Undefined variable at line 42."',
      en: 'The log said: "Undefined variable at line 42."',
    },
    {
      es: 'Fue directamente a esa línea, pero el código parecía correcto.',
      en: 'She went directly to that line, but the code looked correct.',
    },
    {
      es: 'Decidió leer la pila de errores completa, algo que antes evitaba.',
      en: 'She decided to read the full stack trace, something she used to avoid.',
    },
    {
      es: 'El problema real estaba en una función diferente, tres archivos más arriba.',
      en: 'The real problem was in a different function, three files up.',
    },
    {
      es: 'La variable se declaraba dentro de un bloque condicional y no salía de ahí.',
      en: 'The variable was declared inside a conditional block and could not leave it.',
    },
    {
      es: 'Daniela movió la declaración fuera del bloque y ejecutó el código de nuevo.',
      en: 'Daniela moved the declaration outside the block and ran the code again.',
    },
    {
      es: 'El resultado en la terminal fue el que esperaba: sin errores.',
      en: 'The output in the terminal was what she expected: no errors.',
    },
    {
      es: 'Hizo un commit pequeño con un mensaje claro: "Fix: variable scope in user validation."',
      en: 'She made a small commit with a clear message: "Fix: variable scope in user validation."',
    },
    {
      es: 'Antes de hacer deploy, pidió una revisión rápida a su compañero.',
      en: 'Before she could deploy, she asked her classmate for a quick review.',
    },
    {
      es: 'Esa noche entendió que para debug hay que leer, no adivinar.',
      en: 'That evening she understood that to debug you must read, not guess.',
    },
  ],
};

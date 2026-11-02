import type { Story } from './story.model';
import { markedWordsIn, segmentLine } from './tokenize';

const words = { password: 'contraseña', server: 'servidor' };

describe('segmentLine', () => {
  it('conserva la frase exacta al volver a unir los fragmentos', () => {
    const text = 'First, he tried to connect to the Wi-Fi, but he forgot his password.';
    const joined = segmentLine(text, words)
      .map((segment) => segment.text)
      .join('');
    expect(joined).toBe(text);
  });

  it('marca solo las palabras del diccionario, sin distinguir mayúsculas', () => {
    const marked = segmentLine('The Server forgot his password.', words).filter((s) => s.word);
    expect(marked.map((s) => [s.text, s.word, s.gloss])).toEqual([
      ['Server', 'server', 'servidor'],
      ['password', 'password', 'contraseña'],
    ]);
  });

  it('ignora propiedades heredadas como «constructor»', () => {
    const segments = segmentLine('constructor toString hasOwnProperty', words);
    expect(segments.every((segment) => segment.word === null)).toBe(true);
  });

  it('respeta comillas tipográficas y puntuación sin marcarlas', () => {
    const segments = segmentLine('“The server is not responding.”', words);
    expect(segments[0]?.text).toBe('“');
    expect(segments.find((s) => s.word)?.text).toBe('server');
  });
});

describe('markedWordsIn', () => {
  const story: Story = {
    id: 'demo',
    number: 1,
    title: 'Demo',
    subtitle: '',
    level: 'A1',
    minutes: 1,
    words: { server: 'servidor', password: 'contraseña', ghost: 'fantasma' },
    lines: [
      { es: '', en: 'The server is down.' },
      { es: '', en: 'He forgot the password, then the server answered.' },
    ],
  };

  it('devuelve cada palabra una sola vez y en orden de aparición', () => {
    expect(markedWordsIn(story)).toEqual(['server', 'password']);
  });

  it('no cuenta palabras declaradas que no aparecen en el texto', () => {
    expect(markedWordsIn(story)).not.toContain('ghost');
  });
});

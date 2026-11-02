import { markedWordsIn } from '../../features/reader/tokenize';
import { cafeAntesDelCodigo as story } from './cafe-antes-del-codigo';

describe('Historia 01 · El café antes del código', () => {
  it('cada palabra declarada aparece de verdad en el inglés (regresión: «update» no aparecía)', () => {
    expect([...markedWordsIn(story)].sort()).toEqual(Object.keys(story.words).sort());
  });

  it('tiene las doce palabras que promete', () => {
    expect(markedWordsIn(story)).toHaveLength(12);
  });

  it('cada frase trae español e inglés', () => {
    expect(story.lines).toHaveLength(12);
    for (const line of story.lines) {
      expect(line.es.trim()).not.toBe('');
      expect(line.en.trim()).not.toBe('');
    }
  });

  it('las glosas son traducciones breves, no definiciones', () => {
    for (const gloss of Object.values(story.words)) {
      expect(gloss.length).toBeLessThanOrEqual(24);
      expect(gloss).not.toMatch(/[.;:]/);
    }
  });
});

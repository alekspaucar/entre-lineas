import type { Segment, Story } from './story.model';

const WORD = /([A-Za-z]+)/;

/** Divide una frase en inglés en texto corriente y palabras marcadas, sin perder ni un carácter. */
export function segmentLine(text: string, words: Story['words']): readonly Segment[] {
  return text
    .split(WORD)
    .filter((part) => part !== '')
    .map((part) => {
      const key = part.toLowerCase();
      // `hasOwn` evita que palabras como «constructor» coincidan con propiedades heredadas.
      const gloss = Object.hasOwn(words, key) ? (words[key] ?? null) : null;
      return { text: part, word: gloss === null ? null : key, gloss };
    });
}

/** Palabras marcadas que de verdad aparecen en el inglés, sin repetir y en orden de aparición. */
export function markedWordsIn(story: Story): readonly string[] {
  const seen = new Set<string>();
  for (const { en } of story.lines) {
    for (const segment of segmentLine(en, story.words)) {
      if (segment.word) seen.add(segment.word);
    }
  }
  return [...seen];
}

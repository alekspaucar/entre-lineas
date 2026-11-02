/** Una idea de la historia: el español que se entiende primero y el inglés que se adquiere. */
export interface StoryLine {
  readonly es: string;
  readonly en: string;
}

export interface Story {
  readonly id: string;
  /** Posición dentro de la colección; se muestra como «Historia 01». */
  readonly number: number;
  readonly title: string;
  readonly subtitle: string;
  /** Nivel MCER aproximado: A1, A2, B1 o B2. */
  readonly level: string;
  readonly minutes: number;
  readonly lines: readonly StoryLine[];
  /** Palabras marcadas: inglés en minúsculas → significado breve en español. */
  readonly words: Readonly<Record<string, string>>;
}

/** Fragmento de una frase en inglés: texto corriente o una palabra marcada con su glosa. */
export interface Segment {
  readonly text: string;
  /** Clave en minúsculas si es una palabra marcada; `null` para texto corriente. */
  readonly word: string | null;
  readonly gloss: string | null;
}

/** Frase lista para pintar: los dos idiomas y el inglés ya dividido en fragmentos. */
export interface ReaderLine {
  readonly index: number;
  readonly es: string;
  readonly en: string;
  readonly segments: readonly Segment[];
}

/** Cómo se muestra el español: nítido, velado (se asoma manteniendo pulsado) u oculto. */
export type SpanishMode = 'visible' | 'veiled' | 'hidden';

export type ThemeChoice = 'system' | 'light' | 'dark';

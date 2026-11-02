import { TestBed } from '@angular/core/testing';
import { markedWordsIn, segmentLine } from '../../features/reader/tokenize';
import { LibraryService } from '../../core/library.service';
import { STARTER_STORIES } from './index';

/**
 * Contrato de calidad para todas las historias de inicio.
 * Cada historia pasa el mismo conjunto de verificaciones.
 */
describe('Índice de historias de inicio', () => {
  it('tiene 7 historias numeradas del 1 al 7 sin huecos', () => {
    const numbers = STARTER_STORIES.map((s) => s.number).sort((a, b) => a - b);
    expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('todos los IDs son únicos', () => {
    const ids = STARTER_STORIES.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('todos los niveles son MCER válidos', () => {
    const valid = new Set(['A1', 'A2', 'B1', 'B2']);
    for (const story of STARTER_STORIES) {
      expect(valid.has(story.level), `${story.id}: nivel inválido '${story.level}'`).toBe(true);
    }
  });

  for (const story of STARTER_STORIES) {
    describe(`Historia ${String(story.number).padStart(2, '0')} · ${story.title}`, () => {
      it('cada frase tiene español e inglés no vacíos', () => {
        for (const line of story.lines) {
          expect(line.es.trim()).not.toBe('');
          expect(line.en.trim()).not.toBe('');
        }
      });

      it('cada palabra declarada aparece en el inglés de alguna frase', () => {
        const found = new Set(markedWordsIn(story));
        for (const word of Object.keys(story.words)) {
          expect(found.has(word), `palabra '${word}' no aparece en el inglés`).toBe(true);
        }
      });

      it('las glosas son traducciones breves (≤ 28 caracteres, sin puntuación de oración)', () => {
        for (const [word, gloss] of Object.entries(story.words)) {
          expect(
            gloss.length,
            `glosa de '${word}' demasiado larga: "${gloss}"`,
          ).toBeLessThanOrEqual(28);
          expect(gloss, `glosa de '${word}' tiene puntuación de oración`).not.toMatch(/[.;:]/);
        }
      });

      it('tiene al menos 8 frases y al menos 8 palabras marcadas', () => {
        expect(story.lines.length).toBeGreaterThanOrEqual(8);
        expect(Object.keys(story.words).length).toBeGreaterThanOrEqual(8);
      });

      it('segmentar el inglés no pierde ni añade texto', () => {
        for (const line of story.lines) {
          const segments = segmentLine(line.en, story.words);
          const reconstructed = segments.map((s) => s.text).join('');
          expect(reconstructed).toBe(line.en);
        }
      });
    });
  }
});

describe('LibraryService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
  });

  it('encuentra una historia por ID', () => {
    const library = TestBed.inject(LibraryService);
    const found = library.findById('cafe-antes-del-codigo');
    expect(found?.title).toBe('El café antes del código');
  });

  it('devuelve undefined para un ID inexistente', () => {
    const library = TestBed.inject(LibraryService);
    expect(library.findById('historia-que-no-existe')).toBeUndefined();
  });

  it('guarda y recupera la última historia leída', () => {
    const library = TestBed.inject(LibraryService);
    expect(library.lastStoryId()).toBeNull();
    library.setLastStory('el-primer-bug');
    expect(library.lastStoryId()).toBe('el-primer-bug');
  });
});

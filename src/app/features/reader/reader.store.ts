import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { LibraryService } from '../../core/library.service';
import { PreferencesService } from '../../core/preferences.service';
import { readStored, writeStored } from '../../core/storage';
import { SpeechService } from '../../shared/audio/speech.service';
import type { ReaderLine, Story } from './story.model';
import { markedWordsIn, segmentLine } from './tokenize';

type PlaybackMode = 'idle' | 'line' | 'all';

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

/** Estado de la sesión de lectura: anotaciones, reproducción y posición en la historia. */
@Injectable()
export class ReaderStore {
  private readonly speech = inject(SpeechService);
  private readonly prefs = inject(PreferencesService);
  private readonly document = inject(DOCUMENT);

  readonly story = signal<Story | null>(null);

  readonly lines = computed<readonly ReaderLine[]>(() => {
    const s = this.story();
    if (!s) return [];
    return s.lines.map(({ es, en }, index) => ({
      index,
      es,
      en,
      segments: segmentLine(en, s.words),
    }));
  });

  readonly markedWords = computed<readonly string[]>(() => {
    const s = this.story();
    return s ? markedWordsIn(s) : [];
  });

  // Anotaciones: las palabras que la persona abrió, en orden. Se guardan en este dispositivo.
  private readonly _notesKey = computed(() => {
    const s = this.story();
    return s ? `notes:${s.id}` : null;
  });

  readonly notes = signal<readonly string[]>([]);
  readonly noteEntries = computed(() => {
    const s = this.story();
    return this.notes().map((word) => ({ word, gloss: s?.words[word] ?? '' }));
  });

  // Posición y reproducción.
  readonly focusIndex = signal(0);
  readonly playingIndex = signal<number | null>(null);
  readonly mode = signal<PlaybackMode>('idle');
  readonly audioProblem = signal<string | null>(null);
  readonly canSpeak = this.speech.canSpeak;

  private resumeFrom = 0;
  private run = 0;

  constructor() {
    // Persistir anotaciones cuando cambien (solo cuando hay historia cargada).
    effect(() => {
      const key = this._notesKey();
      if (key) writeStored(key, this.notes());
    });
  }

  /** Carga una historia por ID desde la biblioteca y restaura sus anotaciones. */
  loadStory(id: string, library: LibraryService): boolean {
    const found = library.findById(id);
    if (!found) return false;
    this.stop();
    this.story.set(found);
    this.focusIndex.set(0);
    this.resumeFrom = 0;
    const key = `notes:${id}`;
    this.notes.set(readStored(key, [], isStringArray));
    library.setLastStory(id);
    return true;
  }

  addNote(word: string): void {
    this.notes.update((notes) => (notes.includes(word) ? notes : [...notes, word]));
  }

  /** Duración aproximada de la locución, solo para animar la línea de audio. */
  estimatedMs(text: string): number {
    return Math.max(900, Math.round((text.length / (14 * this.prefs.rate())) * 1000));
  }

  playLine(index: number): Promise<void> {
    if (this.mode() === 'line' && this.playingIndex() === index) {
      this.stop();
      return Promise.resolve();
    }
    return this.play([index], 'line');
  }

  /** Escucha desde la frase donde se quedó; al volver a pulsar, pausa recordando dónde. */
  toggleAll(): Promise<void> {
    if (this.mode() === 'all') {
      this.stop();
      return Promise.resolve();
    }
    const lines = this.lines();
    const from = this.resumeFrom >= lines.length ? 0 : this.resumeFrom;
    return this.play(
      lines.slice(from).map((line) => line.index),
      'all',
    );
  }

  stop(): void {
    this.run++; // invalida cualquier reproducción en curso
    this.speech.stop();
    this.mode.set('idle');
    this.playingIndex.set(null);
  }

  scrollToLine(index: number): void {
    const reduce =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.document
      .getElementById(`line-${index}`)
      ?.scrollIntoView?.({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
  }

  private async play(indices: readonly number[], mode: 'line' | 'all'): Promise<void> {
    const run = ++this.run;
    const s = this.story();
    this.audioProblem.set(null);
    this.mode.set(mode);
    try {
      for (const index of indices) {
        if (run !== this.run) return;
        this.playingIndex.set(index);
        if (mode === 'all') this.resumeFrom = index;
        const text = s?.lines[index]?.en ?? '';
        const result = await this.speech.speak(text, this.prefs.voiceUri(), this.prefs.rate());
        if (run !== this.run || result === 'stopped') return;
      }
      if (mode === 'all') this.resumeFrom = 0; // terminó: la próxima vez empieza de nuevo
    } catch {
      if (run === this.run) {
        this.audioProblem.set(
          'No pudimos reproducir el audio en este navegador. Prueba con Chrome, Edge o Safari.',
        );
      }
    } finally {
      if (run === this.run) {
        this.mode.set('idle');
        this.playingIndex.set(null);
      }
    }
  }
}

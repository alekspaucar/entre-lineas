import { Injectable, signal } from '@angular/core';
import type { Story } from '../features/reader/story.model';
import { STARTER_STORIES } from '../content/starter-stories/index';
import { readStored, writeStored } from './storage';

const LAST_STORY_KEY = 'last-story-id';
const isString = (v: unknown): v is string => typeof v === 'string';

/** Catálogo y selección de historia. Guarda la última historia leída para retomar la lectura. */
@Injectable({ providedIn: 'root' })
export class LibraryService {
  readonly stories: readonly Story[] = STARTER_STORIES;

  private readonly _lastId = signal<string | null>(
    readStored(LAST_STORY_KEY, null, isString),
  );

  /** ID de la última historia leída, para ofrecer "continuar leyendo". */
  readonly lastStoryId = this._lastId.asReadonly();

  setLastStory(id: string): void {
    this._lastId.set(id);
    writeStored(LAST_STORY_KEY, id);
  }

  findById(id: string): Story | undefined {
    return this.stories.find((s) => s.id === id);
  }

  findByIndex(index: number): Story | undefined {
    return this.stories[index];
  }
}

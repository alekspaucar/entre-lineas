import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import type { SpanishMode, ThemeChoice } from '../features/reader/story.model';
import { readStored, writeStored } from './storage';

interface StoredPreferences {
  readonly theme: ThemeChoice;
  readonly spanishMode: SpanishMode;
  readonly voiceUri: string | null;
  readonly rate: number;
}

export const SPANISH_MODES: readonly SpanishMode[] = ['visible', 'veiled', 'hidden'];
export const THEME_CHOICES: readonly ThemeChoice[] = ['system', 'light', 'dark'];

/** Color de la barra del navegador: coincide con `--paper` de cada apariencia. */
const THEME_COLOR = { light: '#f7f7f5', dark: '#182731' } as const;

const DEFAULTS: StoredPreferences = {
  theme: 'system',
  spanishMode: 'visible',
  voiceUri: null,
  rate: 0.9,
};

function isStored(value: unknown): value is StoredPreferences {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    THEME_CHOICES.includes(v['theme'] as ThemeChoice) &&
    SPANISH_MODES.includes(v['spanishMode'] as SpanishMode) &&
    (v['voiceUri'] === null || typeof v['voiceUri'] === 'string') &&
    typeof v['rate'] === 'number' &&
    v['rate'] >= 0.5 &&
    v['rate'] <= 1.5
  );
}

@Injectable({ providedIn: 'root' })
export class PreferencesService {
  private readonly document = inject(DOCUMENT);
  private readonly saved = readStored('prefs', DEFAULTS, isStored);
  private readonly systemDark = signal(false);

  readonly theme = signal<ThemeChoice>(this.saved.theme);
  readonly spanishMode = signal<SpanishMode>(this.saved.spanishMode);
  readonly voiceUri = signal<string | null>(this.saved.voiceUri);
  readonly rate = signal(this.saved.rate);

  /** Apariencia efectiva: la elegida, o la del sistema si sigue en automático. */
  readonly resolvedTheme = computed<'light' | 'dark'>(() => {
    const choice = this.theme();
    return choice === 'system' ? (this.systemDark() ? 'dark' : 'light') : choice;
  });

  constructor() {
    if (typeof matchMedia === 'function') {
      const query = matchMedia('(prefers-color-scheme: dark)');
      this.systemDark.set(query.matches);
      query.addEventListener('change', (event) => this.systemDark.set(event.matches));
    }
    effect(() => this.applyTheme(this.resolvedTheme()));
    effect(() =>
      writeStored('prefs', {
        theme: this.theme(),
        spanishMode: this.spanishMode(),
        voiceUri: this.voiceUri(),
        rate: this.rate(),
      }),
    );
  }

  cycleSpanishMode(): void {
    const next = SPANISH_MODES[(SPANISH_MODES.indexOf(this.spanishMode()) + 1) % SPANISH_MODES.length];
    this.spanishMode.set(next ?? 'visible');
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    this.document.documentElement.dataset['theme'] = theme;
    // Una elección manual manda sobre la media query: se unifican los `theme-color` del <head>.
    for (const meta of Array.from(this.document.querySelectorAll('meta[name="theme-color"]'))) {
      meta.removeAttribute('media');
      meta.setAttribute('content', THEME_COLOR[theme]);
    }
  }
}

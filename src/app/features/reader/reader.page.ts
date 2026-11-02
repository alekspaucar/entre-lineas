import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  effect,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LibraryService } from '../../core/library.service';
import { PreferencesService } from '../../core/preferences.service';
import { LinePair } from './line-pair';
import { MarginPanel } from './margin-panel';
import { PlayerBar } from './player-bar';
import { ReaderStore } from './reader.store';
import { SpeakingPractice } from './speaking-practice';

@Component({
  selector: 'app-reader',
  imports: [LinePair, MarginPanel, PlayerBar, SpeakingPractice, RouterLink],
  providers: [ReaderStore],
  templateUrl: './reader.page.html',
  styleUrl: './reader.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown)': 'onKey($event)' },
})
export class ReaderPage {
  protected readonly store = inject(ReaderStore);
  protected readonly prefs = inject(PreferencesService);
  protected readonly number = () => {
    const n = this.store.story()?.number ?? 0;
    return String(n).padStart(2, '0');
  };
  protected notFound = false;

  constructor() {
    const route = inject(ActivatedRoute);
    const library = inject(LibraryService);
    const document = inject(DOCUMENT);
    const destroyRef = inject(DestroyRef);

    // Cargar la historia indicada en la URL.
    const id = route.snapshot.paramMap.get('id') ?? '';
    const found = this.store.loadStory(id, library);
    if (!found) {
      this.notFound = true;
    }

    // La lectura acompaña a la voz: la frase que suena se mantiene en el centro.
    effect(() => {
      const index = this.store.playingIndex();
      if (index !== null && this.store.mode() === 'all') this.store.scrollToLine(index);
    });

    // El margen marca la frase que está en el centro de la pantalla.
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') return;
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.store.focusIndex.set(Number(entry.target.getAttribute('data-index')));
            }
          }
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      document.querySelectorAll('app-line-pair').forEach((line) => observer.observe(line));
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  /** Atajos para escritorio: espacio escucha, E vela el español, J/K cambian de frase. */
  protected onKey(event: KeyboardEvent): void {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest('input, select, textarea, button, [contenteditable], dialog[open]')) return;
    const last = this.store.lines().length - 1;
    switch (event.key) {
      case ' ':
        event.preventDefault();
        void this.store.toggleAll();
        break;
      case 'e':
      case 'E':
        this.prefs.cycleSpanishMode();
        break;
      case 'j':
        this.store.scrollToLine(Math.min(this.store.focusIndex() + 1, last));
        break;
      case 'k':
        this.store.scrollToLine(Math.max(this.store.focusIndex() - 1, 0));
        break;
    }
  }
}

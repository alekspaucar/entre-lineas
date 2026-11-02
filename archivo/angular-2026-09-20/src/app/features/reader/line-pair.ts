import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  afterNextRender,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import type { ReaderLine, SpanishMode } from './story.model';

/** Mantiene la glosa dentro de la pantalla cuando su palabra queda cerca de un borde. */
@Directive({ selector: '[appGlossClamp]' })
export class GlossClamp {
  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    afterNextRender(() => {
      const { left, right } = el.getBoundingClientRect();
      const margin = 12;
      const viewport = el.ownerDocument.documentElement.clientWidth;
      const shift =
        left < margin ? margin - left : right > viewport - margin ? viewport - margin - right : 0;
      if (shift !== 0) el.style.setProperty('--shift', `${Math.round(shift)}px`);
    });
  }
}

/** Una idea en dos idiomas: español arriba, la interlínea que suena en medio, inglés debajo. */
@Component({
  selector: 'app-line-pair',
  imports: [GlossClamp],
  templateUrl: './line-pair.html',
  styleUrl: './line-pair.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-playing]': 'playing()',
    '[attr.id]': '"line-" + line().index',
    '[attr.data-index]': 'line().index',
  },
})
export class LinePair {
  readonly line = input.required<ReaderLine>();
  readonly mode = input<SpanishMode>('visible');
  readonly playing = input(false);
  readonly durationMs = input(3000);

  readonly play = output<number>();
  /** Se emite la primera vez que se abre una palabra: alimenta las anotaciones. */
  readonly lookup = output<string>();

  /** Posiciones (dentro de la frase) de las palabras cuya glosa está abierta. */
  protected readonly opened = signal<ReadonlySet<number>>(new Set());
  protected readonly peeking = signal(false);

  protected isOpen(position: number): boolean {
    return this.opened().has(position);
  }

  protected glossId(position: number): string {
    return `gloss-${this.line().index}-${position}`;
  }

  protected toggle(position: number, word: string): void {
    const next = new Set(this.opened());
    if (next.has(position)) {
      next.delete(position);
    } else {
      next.add(position);
      this.lookup.emit(word);
    }
    this.opened.set(next);
  }
}

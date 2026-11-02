import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ListenError, SpeechService, type ListenFailure } from '../../shared/audio/speech.service';
import { ReaderStore } from './reader.store';

type Phase = 'idle' | 'listening' | 'heard' | 'failed';

const FAILURE_COPY: Record<ListenFailure, string> = {
  unsupported:
    'Este navegador no ofrece reconocimiento de voz. Practica repitiendo la respuesta en voz alta.',
  permission: 'Permite el micrófono en tu navegador para practicar hablando.',
  'no-speech': 'No oí nada. Acércate al micrófono e inténtalo otra vez.',
  network: 'El reconocimiento de voz necesita conexión. Vuelve a intentarlo cuando estés en línea.',
  unknown: 'No pude escuchar con claridad. Inténtalo una vez más.',
};

/** Cierre del capítulo: hablar antes que corregir. Nunca bloquea nada si el micrófono falla. */
@Component({
  selector: 'app-speaking-practice',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section aria-labelledby="closing-title">
      <p class="kicker">Al cerrar el capítulo</p>
      <h2 id="closing-title">Dilo en voz alta.</h2>
      <p class="lead">
        Sin respuestas perfectas: cuéntale a alguien lo que entendiste de esta historia.
      </p>

      @if (speech.canListen) {
        <button
          type="button"
          class="btn btn--solid"
          [disabled]="phase() === 'listening'"
          (click)="start()"
        >
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <rect x="4" y="0.8" width="4" height="6.4" rx="2" />
            <path
              d="M2.4 5.6a3.6 3.6 0 0 0 7.2 0M6 9.2V11"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
            />
          </svg>
          {{ phase() === 'listening' ? 'Te escucho…' : 'Empezar a hablar' }}
        </button>
      }
      <p class="status" role="status" aria-live="polite">{{ message() }}</p>
      @if (phase() === 'heard') {
        <blockquote class="heard" lang="en-US">“{{ heard() }}”</blockquote>
      }

      @if (store.noteEntries().length > 0) {
        <div class="recap">
          <h3 class="label">Palabras que anotaste</h3>
          <ul class="chips">
            @for (note of store.noteEntries(); track note.word) {
              <li>
                {{ note.word }} <em>{{ note.gloss }}</em>
              </li>
            }
          </ul>
          <p class="saved">Quedan guardadas en este dispositivo.</p>
        </div>
      }
    </section>
  `,
  styles: `
    :host {
      display: block;
      margin-top: 5rem;
      padding-top: 2.5rem;
      border-top: 1px solid var(--rule);
    }
    h2 {
      margin: 0.8rem 0 0.9rem;
      font-weight: 500;
      font-size: clamp(2rem, 1.2rem + 3vw, 2.75rem);
      line-height: 1.05;
      letter-spacing: -0.015em;
    }
    .lead {
      max-width: 30rem;
      margin: 0 0 1.4rem;
      font-size: 1.1rem;
      line-height: 1.6;
      color: var(--graphite);
    }
    .status {
      min-height: 1.6em;
      margin: 1rem 0 0;
      font-size: 0.95rem;
      color: var(--graphite);
    }
    .heard {
      margin: 0.6rem 0 0;
      padding-left: 1rem;
      border-left: 2px solid var(--navy);
      font-size: 1.35rem;
      line-height: 1.5;
    }
    .recap {
      margin-top: 2.5rem;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 0.8rem 0;
      padding: 0;
      list-style: none;
    }
    .chips li {
      padding: 0.35rem 0.7rem;
      border: 1px solid var(--rule);
      border-radius: 2px;
    }
    .chips em {
      margin-left: 0.35rem;
      color: var(--graphite);
    }
    .saved {
      margin: 0;
      font-size: 0.85rem;
      color: var(--graphite);
    }
  `,
})
export class SpeakingPractice {
  protected readonly store = inject(ReaderStore);
  protected readonly speech = inject(SpeechService);

  protected readonly phase = signal<Phase>('idle');
  protected readonly heard = signal('');
  private readonly failure = signal<ListenFailure | null>(null);

  protected readonly message = computed(() => {
    switch (this.phase()) {
      case 'listening':
        return 'Te escucho…';
      case 'heard':
        return 'Esto fue lo que entendí:';
      case 'failed': {
        const failure = this.failure();
        return failure ? FAILURE_COPY[failure] : '';
      }
      default:
        return this.speech.canListen ? '' : FAILURE_COPY.unsupported;
    }
  });

  protected async start(): Promise<void> {
    this.store.stop(); // el micrófono no debe captar la narración
    this.phase.set('listening');
    this.failure.set(null);
    this.heard.set('');
    try {
      this.heard.set(await this.speech.listen());
      this.phase.set('heard');
    } catch (error) {
      this.failure.set(error instanceof ListenError ? error.reason : 'unknown');
      this.phase.set('failed');
    }
  }
}

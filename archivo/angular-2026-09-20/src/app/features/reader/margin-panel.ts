import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReaderStore } from './reader.store';
import { SettingsControls } from './settings-controls';

/** El margen de la página en escritorio: anotaciones, herramientas y posición en la historia. */
@Component({
  selector: 'app-margin-panel',
  imports: [SettingsControls],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside aria-label="Herramientas de lectura">
      <section aria-labelledby="notes-title">
        <h2 id="notes-title" class="label">Anotaciones</h2>
        @if (store.noteEntries().length > 0) {
          <ul class="notes">
            @for (note of store.noteEntries(); track note.word) {
              <li>
                <span class="word">{{ note.word }}</span>
                <span class="gloss">{{ note.gloss }}</span>
              </li>
            }
          </ul>
        } @else {
          <p class="empty">Toca una palabra subrayada y quedará anotada aquí.</p>
        }
      </section>

      <section class="tools">
        <button
          type="button"
          class="btn btn--solid listen"
          [attr.aria-pressed]="store.mode() === 'all'"
          (click)="store.toggleAll()"
        >
          @if (store.mode() === 'all') {
            <svg viewBox="0 0 12 12" aria-hidden="true"><rect x="2.5" y="2.5" width="7" height="7" rx="1" /></svg>
            Detener
          } @else {
            <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.8 10.2 6 3 10.2z" /></svg>
            Escuchar la historia
          }
        </button>
        <app-settings-controls />
      </section>

      <section aria-labelledby="position-title">
        <h2 id="position-title" class="label">Posición</h2>
        <ol class="ticks">
          @for (line of store.lines; track line.index) {
            <li>
              <button
                type="button"
                [class.is-current]="store.focusIndex() === line.index"
                [class.is-playing]="store.playingIndex() === line.index"
                [attr.aria-label]="'Ir a la frase ' + (line.index + 1)"
                [attr.aria-current]="store.focusIndex() === line.index ? 'true' : null"
                (click)="store.scrollToLine(line.index)"
              ></button>
            </li>
          }
        </ol>
        <p class="where">Frase {{ store.focusIndex() + 1 }} de {{ store.lines.length }}</p>
        <p class="keys">
          <kbd>Espacio</kbd> escuchar · <kbd>E</kbd> velo · <kbd>J</kbd> <kbd>K</kbd> frase
        </p>
      </section>
    </aside>
  `,
  styles: `
    section + section {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--rule);
    }
    .empty {
      margin: 0.7rem 0 0;
      font-size: 0.9rem;
      line-height: 1.5;
      color: var(--graphite);
    }
    .notes {
      margin: 0.7rem 0 0;
      padding: 0;
      list-style: none;
    }
    .notes li {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 1rem;
      padding: 0.4rem 0;
      border-bottom: 1px dotted var(--rule);
    }
    .word {
      font-size: 1.05rem;
    }
    .gloss {
      font-size: 0.95rem;
      font-style: italic;
      color: var(--navy);
    }
    .listen {
      width: 100%;
      margin-bottom: 1.5rem;
    }
    .ticks {
      display: flex;
      gap: 4px;
      margin: 0.8rem 0 0.5rem;
      padding: 0;
      list-style: none;
    }
    .ticks button {
      display: block;
      width: 10px;
      height: 22px;
      padding: 0;
      border: 0;
      border-radius: 1px;
      background: var(--rule);
      transition:
        background-color 0.2s ease,
        height 0.2s ease;
    }
    .ticks button:hover {
      background: var(--muted);
    }
    .ticks button.is-current,
    .ticks button.is-playing {
      background: var(--navy);
    }
    .ticks button.is-playing {
      height: 30px;
    }
    .where,
    .keys {
      margin: 0.4rem 0 0;
      font-size: 0.85rem;
      color: var(--graphite);
    }
    kbd {
      padding: 0.05rem 0.4rem;
      border: 1px solid var(--rule);
      border-radius: 2px;
      font: inherit;
      font-size: 0.78rem;
    }
  `,
})
export class MarginPanel {
  protected readonly store = inject(ReaderStore);
}

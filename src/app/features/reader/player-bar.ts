import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PreferencesService } from '../../core/preferences.service';
import { ReaderStore } from './reader.store';
import { SettingsDialog } from './settings-dialog';
import type { SpanishMode } from './story.model';

/** Barra al alcance del pulgar para móvil; en escritorio la reemplaza el margen. */
@Component({
  selector: 'app-player-bar',
  imports: [SettingsDialog],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bar" role="toolbar" aria-label="Controles de lectura">
      <button
        type="button"
        class="btn btn--solid"
        [attr.aria-pressed]="store.mode() === 'all'"
        (click)="void store.toggleAll()"
      >
        @if (store.mode() === 'all') {
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <rect x="2.5" y="2.5" width="7" height="7" rx="1" />
          </svg>
          Detener
        } @else {
          <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.8 10.2 6 3 10.2z" /></svg>
          Escuchar
        }
      </button>
      <button
        type="button"
        class="btn"
        [attr.aria-label]="'Español: ' + labels[prefs.spanishMode()] + '. Cambiar'"
        (click)="prefs.cycleSpanishMode()"
      >
        <span class="stack"><small>Español</small>{{ labels[prefs.spanishMode()] }}</span>
      </button>
      <button type="button" class="btn" aria-haspopup="dialog" (click)="settings.open()">
        Ajustes
      </button>
    </div>
    <app-settings-dialog #settings />
  `,
  styles: `
    .bar {
      position: fixed;
      inset: auto 0 0 0;
      z-index: 20;
      display: grid;
      grid-template-columns: 1.3fr 1fr 1fr;
      gap: 0.5rem;
      padding: 0.6rem 1rem calc(0.6rem + env(safe-area-inset-bottom));
      background: color-mix(in srgb, var(--paper) 90%, transparent);
      backdrop-filter: blur(14px);
      border-top: 1px solid var(--rule);
    }
    .bar .btn {
      min-height: 3.1rem;
    }
    .stack {
      display: grid;
      gap: 0.15rem;
      line-height: 1.1;
    }
    .stack small {
      font-size: 0.66rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      opacity: 0.8;
    }
  `,
})
export class PlayerBar {
  protected readonly store = inject(ReaderStore);
  protected readonly prefs = inject(PreferencesService);
  protected readonly labels: Record<SpanishMode, string> = {
    visible: 'Nítido',
    veiled: 'Velado',
    hidden: 'Oculto',
  };
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PreferencesService } from '../../core/preferences.service';
import { SpeechService } from '../../shared/audio/speech.service';

let nextId = 0;

/** Ajustes de lectura: se usan tanto en el margen (escritorio) como en la hoja (móvil). */
@Component({
  selector: 'app-settings-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fieldset class="group">
      <legend class="label">Español</legend>
      <div class="segmented">
        @for (option of spanishOptions; track option.value) {
          <label>
            <input
              type="radio"
              [name]="'spanish-' + uid"
              [checked]="prefs.spanishMode() === option.value"
              (change)="prefs.spanishMode.set(option.value)"
            />
            <span>{{ option.label }}</span>
          </label>
        }
      </div>
    </fieldset>

    <fieldset class="group">
      <legend class="label">Velocidad</legend>
      <div class="segmented">
        @for (option of rateOptions; track option.value) {
          <label>
            <input
              type="radio"
              [name]="'rate-' + uid"
              [checked]="prefs.rate() === option.value"
              (change)="prefs.rate.set(option.value)"
            />
            <span>{{ option.label }}</span>
          </label>
        }
      </div>
    </fieldset>

    <div class="group">
      <label class="label" [attr.for]="'voice-' + uid">Voz</label>
      @if (speech.voices().length > 0) {
        <select [id]="'voice-' + uid" (change)="setVoice($event)">
          <option value="" [selected]="prefs.voiceUri() === null">Automática</option>
          @for (voice of speech.voices(); track voice.voiceURI) {
            <option [value]="voice.voiceURI" [selected]="voice.voiceURI === prefs.voiceUri()">
              {{ voice.name }}
            </option>
          }
        </select>
      } @else {
        <p class="empty">
          Este navegador no ofrece voces en inglés. Abre la historia en Chrome, Edge o Safari para
          escucharla.
        </p>
      }
    </div>

    <fieldset class="group">
      <legend class="label">Apariencia</legend>
      <div class="segmented">
        @for (option of themeOptions; track option.value) {
          <label>
            <input
              type="radio"
              [name]="'theme-' + uid"
              [checked]="prefs.theme() === option.value"
              (change)="prefs.theme.set(option.value)"
            />
            <span>{{ option.label }}</span>
          </label>
        }
      </div>
    </fieldset>
  `,
  styles: `
    .group {
      margin: 0 0 1.4rem;
      padding: 0;
      border: 0;
      min-width: 0;
    }
    .label {
      display: block;
      padding: 0;
      margin: 0 0 0.55rem;
    }
    .segmented {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      border: 1px solid var(--rule);
      border-radius: 2px;
    }
    .segmented label {
      position: relative;
      display: block;
    }
    .segmented label + label span {
      border-left: 1px solid var(--rule);
    }
    .segmented input {
      position: absolute;
      inset: 0;
      margin: 0;
      opacity: 0;
      cursor: pointer;
    }
    .segmented span {
      display: block;
      padding: 0.6rem 0.4rem;
      text-align: center;
      font-size: 0.88rem;
      color: var(--graphite);
      transition:
        background-color 0.2s ease,
        color 0.2s ease;
    }
    .segmented input:checked + span {
      background: var(--navy);
      color: var(--on-navy);
    }
    .segmented input:focus-visible + span {
      outline: 2px solid var(--navy);
      outline-offset: 2px;
    }
    select {
      width: 100%;
      min-height: 2.6rem;
      padding: 0 0.6rem;
      background: var(--paper);
      border: 1px solid var(--rule);
      border-radius: 2px;
    }
    .empty {
      margin: 0;
      font-size: 0.88rem;
      line-height: 1.5;
      color: var(--graphite);
    }
  `,
})
export class SettingsControls {
  protected readonly prefs = inject(PreferencesService);
  protected readonly speech = inject(SpeechService);
  /** Distingue los grupos de radio cuando el panel está montado dos veces (margen y hoja). */
  protected readonly uid = nextId++;

  protected readonly spanishOptions = [
    { value: 'visible', label: 'Nítido' },
    { value: 'veiled', label: 'Velado' },
    { value: 'hidden', label: 'Oculto' },
  ] as const;
  protected readonly rateOptions = [
    { value: 0.75, label: 'Lenta' },
    { value: 0.9, label: 'Natural' },
    { value: 1, label: 'Ágil' },
  ] as const;
  protected readonly themeOptions = [
    { value: 'system', label: 'Automática' },
    { value: 'light', label: 'Clara' },
    { value: 'dark', label: 'Oscura' },
  ] as const;

  protected setVoice(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.prefs.voiceUri.set(value === '' ? null : value);
  }
}

import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import { SettingsControls } from './settings-controls';

/** Hoja de ajustes para móvil, sobre un <dialog> nativo (foco y Escape gestionados por el navegador). */
@Component({
  selector: 'app-settings-dialog',
  imports: [SettingsControls],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog #dialog aria-labelledby="settings-title" (click)="onClick($event)">
      <div class="body">
        <div class="head">
          <h2 id="settings-title" class="label">Ajustes de lectura</h2>
          <button type="button" class="btn" (click)="close()">Cerrar</button>
        </div>
        <app-settings-controls />
      </div>
    </dialog>
  `,
  styles: `
    dialog {
      width: 100%;
      max-width: 34rem;
      margin: auto auto 0;
      padding: 0;
      border: 1px solid var(--rule);
      border-radius: 8px 8px 0 0;
      background: var(--paper);
      color: var(--ink);
    }
    dialog::backdrop {
      background: color-mix(in srgb, var(--ink) 45%, transparent);
    }
    .body {
      padding: 1.25rem 1.25rem calc(1.25rem + env(safe-area-inset-bottom));
    }
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.25rem;
    }
  `,
})
export class SettingsDialog {
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  open(): void {
    this.dialog().nativeElement.showModal();
  }

  close(): void {
    this.dialog().nativeElement.close();
  }

  /** Un clic sobre el fondo (el propio <dialog>, no su contenido) cierra la hoja. */
  protected onClick(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) this.close();
  }
}

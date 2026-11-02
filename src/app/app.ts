import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { filter } from 'rxjs';
import { PreferencesService } from './core/preferences.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly prefs = inject(PreferencesService);
  private readonly updates = inject(SwUpdate, { optional: true });
  protected readonly updateReady = signal(false);

  constructor() {
    this.updates?.versionUpdates
      .pipe(
        filter((event) => event.type === 'VERSION_READY'),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.updateReady.set(true));
  }

  protected toggleTheme(): void {
    this.prefs.theme.set(this.prefs.resolvedTheme() === 'dark' ? 'light' : 'dark');
  }

  protected reload(): void {
    location.reload();
  }
}

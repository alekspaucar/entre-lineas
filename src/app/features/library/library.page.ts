import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LibraryService } from '../../core/library.service';
import { PreferencesService } from '../../core/preferences.service';
import type { Story } from '../reader/story.model';

const LEVEL_ORDER: Record<string, number> = { A1: 1, A2: 2, B1: 3, B2: 4 };
const LEVEL_LABEL: Record<string, string> = {
  A1: 'Principiante',
  A2: 'Básico',
  B1: 'Intermedio',
  B2: 'Intermedio alto',
};

/** Viñeta SVG genérica para historias sin ilustración propia. Devuelve un path según el tema. */
function vignettePath(story: Story): string {
  const themes: Record<string, string> = {
    'cafe-antes-del-codigo':
      'M28 56v-26a22 22 0 0 1 44 0v26zM32 56v-24a18 18 0 0 1 36 0v24M50 4v44M28 32h44M60 56a5 5 0 0 1 10 0M65 46v-3M60 48l-2-2M70 48l2-2M10 64h80M18 54h14l-2 10H20z',
    'contrasena-sin-red':
      'M20 62V30a30 30 0 0 1 60 0v32zM32 46a18 6 0 1 0 36 0M50 40v12M44 52h12M30 28a20 20 0 0 1 40 0',
    'equipo-en-linea':
      'M10 20h80v50H10zM10 28h80M22 20v8M40 20v8M58 20v8M76 20v8M25 42h50M25 52h30',
    'el-primer-bug':
      'M20 16h60v64H20zM28 30h44M28 42h44M28 54h28M65 54l8 8M65 62l8-8',
    'el-viaje-en-metro':
      'M15 55h70M50 20v35M30 25h40M25 55V35a25 15 0 0 1 50 0v20M35 45h30M38 55v6M62 55v6',
    'la-presentacion':
      'M10 15h80v50H10zM10 25h80M30 60l20 12 20-12M50 65V75M35 75h30',
    'la-api-que-no-responde':
      'M20 30h60v40H20zM30 50h10M50 50h20M35 40l10 10-10 10M60 55h15',
  };
  return (
    themes[story.id] ??
    'M20 20h60v60H20zM30 35h40M30 45h40M30 55h25'
  );
}

@Component({
  selector: 'app-library',
  imports: [RouterLink],
  templateUrl: './library.page.html',
  styleUrl: './library.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryPage {
  protected readonly library = inject(LibraryService);
  protected readonly prefs = inject(PreferencesService);

  protected readonly levelLabel = LEVEL_LABEL;

  protected levelOrder(level: string): number {
    return LEVEL_ORDER[level] ?? 9;
  }

  protected vignette(story: Story): string {
    return vignettePath(story);
  }

  protected lastStory(): Story | undefined {
    const id = this.library.lastStoryId();
    return id ? this.library.findById(id) : undefined;
  }
}

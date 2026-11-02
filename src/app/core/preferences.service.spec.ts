import { TestBed } from '@angular/core/testing';
import { PreferencesService } from './preferences.service';

const KEY = 'entre-lineas:v1:prefs';

describe('PreferencesService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
  });

  it('arranca con el español nítido y la apariencia del sistema', () => {
    const prefs = TestBed.inject(PreferencesService);
    expect(prefs.spanishMode()).toBe('visible');
    expect(prefs.theme()).toBe('system');
  });

  it('recorre nítido → velado → oculto → nítido', () => {
    const prefs = TestBed.inject(PreferencesService);
    const seen = [prefs.spanishMode()];
    for (let i = 0; i < 3; i++) {
      prefs.cycleSpanishMode();
      seen.push(prefs.spanishMode());
    }
    expect(seen).toEqual(['visible', 'veiled', 'hidden', 'visible']);
  });

  it('guarda los cambios y los recupera en la siguiente sesión', () => {
    const first = TestBed.inject(PreferencesService);
    first.spanishMode.set('hidden');
    first.theme.set('dark');
    first.rate.set(0.75);
    TestBed.tick();
    expect(JSON.parse(localStorage.getItem(KEY) ?? 'null')).toMatchObject({
      spanishMode: 'hidden',
      theme: 'dark',
      rate: 0.75,
    });

    TestBed.resetTestingModule();
    const second = TestBed.inject(PreferencesService);
    expect(second.spanishMode()).toBe('hidden');
    expect(second.theme()).toBe('dark');
    expect(second.rate()).toBe(0.75);
  });

  it('ignora datos corruptos o de otra forma y vuelve a los valores por defecto', () => {
    localStorage.setItem(KEY, '{"theme":"neon","spanishMode":"visible","voiceUri":null,"rate":0.9}');
    expect(TestBed.inject(PreferencesService).theme()).toBe('system');

    TestBed.resetTestingModule();
    localStorage.setItem(KEY, 'esto no es json');
    expect(TestBed.inject(PreferencesService).spanishMode()).toBe('visible');
  });

  it('aplica la apariencia elegida al documento y a la barra del navegador', () => {
    document.head.insertAdjacentHTML(
      'beforeend',
      '<meta name="theme-color" content="#000" media="(prefers-color-scheme: light)">',
    );
    const prefs = TestBed.inject(PreferencesService);
    prefs.theme.set('dark');
    TestBed.tick();
    expect(document.documentElement.dataset['theme']).toBe('dark');
    const meta = document.querySelector('meta[name="theme-color"]');
    expect(meta?.getAttribute('content')).toBe('#182731');
    expect(meta?.hasAttribute('media')).toBe(false);
    meta?.remove();
  });
});

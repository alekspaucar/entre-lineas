import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  it('muestra la historia completa: título y las doce frases en dos idiomas', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('h1')?.textContent).toContain('El café antes del código');
    expect(el.querySelectorAll('app-line-pair')).toHaveLength(12);
    expect(el.querySelectorAll('.es')).toHaveLength(12);
    expect(el.querySelectorAll('.en')).toHaveLength(12);
  });

  it('cambia entre apariencia clara y oscura y lo recuerda', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    el.querySelector<HTMLButtonElement>('.theme')?.click();
    await fixture.whenStable();
    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(JSON.parse(localStorage.getItem('entre-lineas:v1:prefs') ?? '{}').theme).toBe('dark');
  });

  it('si el navegador no tiene voz, lo dice sin bloquear la lectura', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Este navegador no ofrece reconocimiento de voz');
  });
});

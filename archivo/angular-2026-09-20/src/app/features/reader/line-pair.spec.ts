import { TestBed } from '@angular/core/testing';
import { LinePair } from './line-pair';
import type { ReaderLine, SpanishMode } from './story.model';
import { segmentLine } from './tokenize';

const english = 'First, he forgot his password.';
const line: ReaderLine = {
  index: 3,
  es: 'Primero olvidó su password.',
  en: english,
  segments: segmentLine(english, { password: 'contraseña' }),
};

async function setup(mode: SpanishMode = 'visible') {
  const fixture = TestBed.createComponent(LinePair);
  fixture.componentRef.setInput('line', line);
  fixture.componentRef.setInput('mode', mode);
  await fixture.whenStable();
  return { fixture, el: fixture.nativeElement as HTMLElement };
}

describe('LinePair', () => {
  it('muestra los dos idiomas y solo subraya las palabras marcadas', async () => {
    const { el } = await setup();
    expect(el.querySelector('.es')?.textContent).toBe(line.es);
    expect(el.querySelector('.en')?.getAttribute('lang')).toBe('en-US');
    expect([...el.querySelectorAll('.word')].map((word) => word.textContent)).toEqual(['password']);
  });

  it('escribe la glosa entre las líneas al tocar la palabra y la quita al tocarla otra vez', async () => {
    const { fixture, el } = await setup();
    const word = el.querySelector<HTMLButtonElement>('.word');
    expect(el.querySelector('.gloss')).toBeNull();

    word?.click();
    await fixture.whenStable();
    expect(el.querySelector('.gloss')?.textContent).toBe('contraseña');
    expect(word?.getAttribute('aria-expanded')).toBe('true');
    expect(word?.getAttribute('aria-describedby')).toBe(el.querySelector('.gloss')?.id);

    word?.click();
    await fixture.whenStable();
    expect(el.querySelector('.gloss')).toBeNull();
    expect(word?.getAttribute('aria-expanded')).toBe('false');
  });

  it('avisa qué palabra se abrió para anotarla', async () => {
    const { fixture, el } = await setup();
    const opened: string[] = [];
    fixture.componentInstance.lookup.subscribe((word) => opened.push(word));
    el.querySelector<HTMLButtonElement>('.word')?.click();
    expect(opened).toEqual(['password']);
  });

  it('la interlínea pide escuchar precisamente esta frase', async () => {
    const { fixture, el } = await setup();
    const played: number[] = [];
    fixture.componentInstance.play.subscribe((index) => played.push(index));
    el.querySelector<HTMLButtonElement>('.rail')?.click();
    expect(played).toEqual([3]);
  });

  it('con el español oculto lo saca del árbol de accesibilidad y del foco', async () => {
    const { el } = await setup('hidden');
    const wrap = el.querySelector('.es-wrap');
    expect(wrap?.getAttribute('aria-hidden')).toBe('true');
    expect(wrap?.hasAttribute('inert')).toBe(true);
  });

  it('con el español velado permite llegar a él con el teclado para asomarse', async () => {
    const { el } = await setup('veiled');
    expect(el.querySelector('.es-wrap')?.getAttribute('data-mode')).toBe('veiled');
    expect(el.querySelector('.es')?.getAttribute('tabindex')).toBe('0');
  });
});

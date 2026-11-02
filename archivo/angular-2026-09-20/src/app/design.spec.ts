import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/** Contrato de diseño: paleta neutra elegida, contraste legible y una PWA instalable de verdad. */
const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');
const styles = read('src/styles.css');

function tokens(block: RegExp): Record<string, string> {
  const body = block.exec(styles)?.[1];
  if (!body) throw new Error(`No se encontró el bloque ${block}`);
  return Object.fromEntries(
    [...body.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})\s*;/gi)].flatMap(([, name, hex]) =>
      name && hex ? [[name, hex.toLowerCase()]] : [],
    ),
  );
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [
    number,
    number,
    number,
  ];
  const lin = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

const light = tokens(/:root\s*\{([^}]*)\}/);
const dark = tokens(/:root\[data-theme='dark'\]\s*\{([^}]*)\}/);

describe('paleta neutra', () => {
  it('conserva los colores elegidos: blanco editorial, tinta y azul marino apagado', () => {
    expect(light).toMatchObject({ paper: '#f7f7f5', ink: '#101820', navy: '#253746' });
  });

  it('la apariencia oscura sigue siendo neutra (grises azulados, sin colores llamativos)', () => {
    expect(dark).toMatchObject({ paper: '#182731', ink: '#f7f7f5', navy: '#9baab3' });
  });

  for (const [name, palette] of [
    ['clara', light],
    ['oscura', dark],
  ] as const) {
    it(`todo el texto de la apariencia ${name} supera el contraste AA (4.5:1)`, () => {
      const pairs: [string, string][] = [
        ['ink', 'paper'],
        ['graphite', 'paper'],
        ['muted', 'paper'],
        ['navy', 'paper'],
        ['on-navy', 'navy'],
      ];
      for (const [fg, bg] of pairs) {
        const ratio = contrast(palette[fg] ?? '', palette[bg] ?? '');
        expect(ratio, `${fg} sobre ${bg} en ${name}: ${ratio.toFixed(2)}`).toBeGreaterThanOrEqual(4.5);
      }
    });
  }
});

describe('instalación y modo sin conexión', () => {
  const manifest = JSON.parse(read('public/manifest.webmanifest')) as {
    display: string;
    lang: string;
    icons: { src: string; sizes: string; type: string; purpose?: string }[];
  };

  it('se instala como app independiente, en español', () => {
    expect(manifest.display).toBe('standalone');
    expect(manifest.lang).toBe('es');
  });

  it('trae iconos PNG de 192 y 512 px, y uno maskable separado del resto', () => {
    const sizes = manifest.icons.filter((i) => i.purpose === 'any').map((i) => i.sizes);
    expect(sizes).toEqual(expect.arrayContaining(['192x192', '512x512']));
    expect(manifest.icons.some((i) => i.purpose === 'maskable')).toBe(true);
    expect(manifest.icons.every((i) => !i.purpose?.includes(' '))).toBe(true);
    for (const icon of manifest.icons) {
      expect(existsSync(resolve(process.cwd(), 'public', icon.src)), icon.src).toBe(true);
    }
  });

  it('el service worker guarda por adelantado las fuentes y los iconos', () => {
    const config = JSON.parse(read('ngsw-config.json')) as {
      assetGroups: { installMode: string; resources: { files: string[] } }[];
    };
    const prefetched = config.assetGroups
      .filter((group) => group.installMode === 'prefetch')
      .flatMap((group) => group.resources.files);
    expect(prefetched).toEqual(expect.arrayContaining(['/media/**', '/icons/**', '/index.html']));
  });

  it('la página declara idioma, manifiesto e icono para iPhone', () => {
    const html = read('src/index.html');
    expect(html).toContain('<html lang="es">');
    expect(html).toContain('rel="manifest"');
    expect(html).toContain('rel="apple-touch-icon"');
  });
});

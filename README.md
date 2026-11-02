# Entre líneas

Aprende inglés leyendo historias breves. Cada idea aparece primero en español y, debajo, en inglés; el significado se entiende antes y el idioma se adquiere por exposición en contexto. La meta es que se sienta como leer una novela, no como hacer ejercicios.

La visión completa, la estructura futura y la hoja de ruta están en [docs/](docs/README.md).

## Probarla

Requiere Node `^22.22.3` o `^24.15.0` (el proyecto trae `.nvmrc` con Node 24).

```bash
nvm use
npm ci
npm start
```

Se abre en <http://localhost:4200>. En desarrollo **no** hay service worker, así que siempre ves la última versión de los archivos.

| Comando | Qué hace |
|---|---|
| `npm start` | Servidor de desarrollo con recarga en caliente |
| `npm run test:ci` | Pruebas una sola vez (Vitest) |
| `npm test` | Pruebas en modo vigilancia |
| `npm run build` | Compilación de producción en `dist/entre-lineas/browser` |
| `npm run preview` | Compila y sirve en <http://localhost:4300> para probar la PWA y el modo sin conexión |

## Cómo se lee: «Interlínea»

*Entre líneas* es, en tipografía, el espacio entre renglones. El diseño hace de ese espacio el protagonista:

- **La glosa vive entre las líneas.** Toca una palabra subrayada y su traducción se escribe justo encima. Las palabras que abres se anotan en el margen y se guardan en este dispositivo.
- **La línea que suena.** El trazo con ▸ entre el español y el inglés de cada frase es su botón de audio y se llena mientras suena.
- **El velo del español.** Tres estados: nítido, velado (mantén pulsado o pasa el cursor para asomarte) y oculto.
- **Un solo diseño, dos composiciones.** En móvil, una barra al alcance del pulgar; en escritorio, un margen fijo con anotaciones, ajustes y la posición en la historia.
- **Atajos en escritorio:** `Espacio` escucha o pausa, `E` cambia el velo, `J` y `K` cambian de frase.

La paleta es neutra a propósito: blanco editorial, tinta, grises y azul marino apagado, con apariencia oscura equivalente. La tipografía es Literata, alojada en el proyecto para que funcione sin conexión.

## Probarla en el teléfono

En la red local se puede ver el diseño, pero **instalar la PWA y usar el micrófono exigen HTTPS** (`localhost` es la única excepción). Para probarlo en un teléfono real hay que publicarla, por ejemplo en Cloudflare Pages o GitHub Pages, o abrir un túnel HTTPS temporal.

## Estructura

```text
src/app/
  content/starter-stories/   historias curadas (datos puros)
  core/                      preferencias y almacenamiento local
  shared/audio/              voz del navegador: narración y reconocimiento
  features/reader/           lector: página, frase, margen, barra, ajustes y práctica oral
public/                      manifiesto, iconos
src/fonts/                   Literata (licencia OFL incluida)
docs/                        plan maestro, estructura futura, hoja de ruta y decisiones técnicas
```

Las decisiones de tecnología y sus motivos están en [docs/DECISIONES-TECNICAS.md](docs/DECISIONES-TECNICAS.md).

## Limitaciones conocidas

- La calidad de la voz y el reconocimiento dependen del navegador y del sistema. Se probó en Chrome; **no** se ha verificado en iPhone ni dentro de una PWA instalada en iOS, donde el reconocimiento de voz puede no funcionar.
- El reconocimiento de voz de Chrome usa la red: sin conexión, la práctica oral avisa y no bloquea la lectura.
- Hay una sola historia. Biblioteca, generación con IA, progreso y repetición espaciada son las fases siguientes (ver la hoja de ruta).

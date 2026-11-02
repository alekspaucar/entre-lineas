# Decisiones técnicas

Registro de las decisiones de tecnología del proyecto. Cada una indica el motivo y cuándo conviene revisarla. Las decisiones que siguen abiertas están al final.

## Lenguaje: TypeScript 6.0 en modo estricto

`strict` y `noUncheckedIndexedAccess` activados. Hay una versión más nueva en npm (TypeScript 7.0), pero **Angular 22 solo compila con `>=6.0 <6.1`** (peer dependency de `@angular/compiler-cli`, comprobada el 2026-09-20). Se sube a la 7 cuando Angular la soporte.

## Framework: Angular 22.1

Componentes independientes, señales y detección de cambios sin zone.js. Motivos: soporte oficial para PWA y service worker, encaja con los módulos de [ESTRUCTURA-FUTURA.md](ESTRUCTURA-FUTURA.md) (biblioteca, lector, práctica, progreso, repaso) y ya es la base que se domina en otros proyectos. No hay router todavía: con una sola pantalla no aporta nada; se añade con la biblioteca (Fase 1).

**Requisito de Node:** `^22.22.3 || ^24.15.0` (lo exige la CLI). Por eso el proyecto trae `.nvmrc` con Node 24 LTS.

## Pruebas: Vitest

Es el ejecutor por defecto de Angular 22. Las pruebas comprueban comportamiento (glosas, velo, reproducción, persistencia) y el contrato de diseño: la paleta neutra y el contraste AA de todo el texto en ambas apariencias.

## Tipografía: Literata alojada localmente

Variable, subconjunto latino, normal y cursiva: unos 104 KB en total, licencia OFL-1.1 (incluida en `src/fonts/`). Alojarla en el proyecto evita depender de Google Fonts y permite que el service worker la guarde para leer sin conexión.

## Sin conexión: service worker de Angular

Solo se registra en la compilación de producción. En desarrollo nunca sirve archivos viejos. Precachea la aplicación, las fuentes y los iconos; el cierre de sesión de una versión nueva se avisa con «Hay una versión nueva · Actualizar».

## Datos en el dispositivo

`localStorage`, con prefijo `entre-lineas:v1:` y validación al leer: si los datos están corruptos o son de otra versión, se ignoran. Guarda preferencias (velo del español, apariencia, voz, velocidad) y las palabras anotadas por historia.

## Cadena de audio: voz del navegador

Narración con `speechSynthesis` (una locución por frase, para poder pausar, retomar y animar la línea de audio) y práctica oral con `SpeechRecognition`. Es la opción gratuita y sin servidor; su calidad varía por dispositivo.

## Abierto

- Servicio de IA para generar historias (Fase 4).
- Audio pregrabado de calidad uniforme frente a la voz del navegador, si en pruebas reales la voz del navegador decepciona.
- Base de datos y cuentas para sincronizar (Fase 5).
- Envolver la web con Capacitor para una app Android/iOS, solo si el audio o el micrófono lo justifican.

# Entre líneas

Plataforma web académica y personal para aprender inglés mediante historias. La meta es que la persona sienta que está leyendo una novela interactiva, no estudiando con ejercicios repetitivos.

## Visión del producto

La experiencia parte de una historia independiente de aproximadamente cinco minutos. Al inicio, cada línea aparece en español y debajo en inglés: el significado se comprende primero y el idioma se adquiere por exposición en contexto. El español puede ocultarse progresivamente.

Las historias combinan situaciones cotidianas con inglés de informática y tecnología. El usuario es protagonista por nombre; cada capítulo incorpora personajes distintos. En lugar de listas de vocabulario, aparecen unas doce palabras nuevas dentro de la historia, recuperadas luego mediante repetición espaciada.

Después de leer, la prioridad es hablar: comprensión, speaking y pronunciación. La gramática puede explicarse cuando ayuda, pero nunca debe dirigir la experiencia. El progreso se mide por habilidades reales, historias completadas y recompensas ligeras, sin copiar la dinámica de Duolingo.

## Primera versión incluida

- Historia bilingüe “El café antes del código”, protagonizada por Alexander.
- Español visible u ocultable línea por línea.
- Traducción puntual al tocar una palabra inglesa; no definiciones largas ni ejercicios.
- Lectura en voz estadounidense, con selector de voz femenina o masculina según las voces disponibles en el navegador.
- Actividad final de speaking mediante reconocimiento de voz si el navegador lo soporta.
- Diseño responsive y de alto contraste: blanco, negro, grises neutros y azul marino apagado.
- Instalable como PWA con los archivos principales disponibles sin conexión.

## Lo que vendrá después

1. Biblioteca de historias y selección de nivel.
2. Generación de historias adaptadas con IA, usando intereses y errores reales del usuario.
3. Progreso por comprensión, vocabulario en contexto, pronunciación y fluidez.
4. Revisión espaciada integrada dentro de nuevas historias.
5. Portada generada para cada capítulo y mejor audio narrado.

No se contempla un panel de profesores o administración. Debe mantenerse gratuito y orientado a aprendizaje personal/académico.

## Uso local

Abre `index.html` en un navegador moderno. Para instalarla y habilitar su caché local, sirve la carpeta con un servidor web local; por ejemplo, desde una terminal dentro de esta carpeta: `python3 -m http.server 4174` y abre `http://127.0.0.1:4174`.

## Archivos

- `index.html`: estructura del lector.
- `app.mjs`: interacción, audio y práctica oral.
- `reader.mjs`: historia y traducciones.
- `styles.css`: diseño visual responsive.
- `manifest.webmanifest` y `service-worker.js`: instalación y modo sin conexión.
- `test/reader.test.mjs`: pruebas de las funciones de lectura y la configuración principal.

## Guía para construir el proyecto completo

La visión, estructura futura y orden de implementación están en [docs/README.md](docs/README.md). Esta documentación conserva el plan de producto antes de elegir tecnologías grandes.


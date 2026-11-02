# Estructura futura

Esta es una estructura lógica. Indica responsabilidades y datos, no obliga todavía a escoger React, Angular, una API, una base de datos o un proveedor de IA.

## Mapa de módulos

```text
Perfil del lector
       │
       ├── Historial de lectura ──┐
       ├── Palabras por reforzar ─┼── Personalizador de historias ── Generador IA
       └── Nivel y habilidades ───┘              │
                                                │
Biblioteca ── Selección de historia ── Lector ── Audio / traducción / speaking
                                                │
                                          Cierre del capítulo
                                                │
                                     Progreso y revisión espaciada
```

## Módulos y responsabilidades

| Módulo | Responsabilidad | Nunca debe hacer |
|---|---|---|
| Biblioteca | Mostrar, filtrar y descargar historias | Convertir la selección en una tabla de cursos |
| Lector | Presentar portada, pares bilingües, palabras y audio | Decidir niveles o guardar reglas de repetición |
| Historia | Definir texto, traducciones, escenas, portada y palabras objetivo | Depender de una pantalla concreta |
| Audio y voz | Reproducir narración y recoger práctica oral cuando sea posible | Evaluar al usuario de forma punitiva |
| Comprensión y speaking | Proponer cierres breves y guardar evidencia de habilidad | Añadir ejercicios de relleno por cantidad |
| Perfil de aprendizaje | Mantener nivel, intereses, nombre y preferencias | Contener contraseñas o datos sensibles sin protección |
| Revisión espaciada | Elegir qué palabras o estructuras reaparecen en una nueva historia | Mostrar tarjetas desconectadas de una historia |
| Generador IA | Crear un borrador de historia adaptada y sus metadatos | Publicar contenido sin revisión de seguridad y calidad |
| Sincronización/offline | Guardar historias, progreso y cambios pendientes | Perder lectura local si no hay red |

## Datos que existirán más adelante

### Perfil de lector

```text
ReaderProfile
- id
- displayName
- currentLevel
- interests[]
- preferredNarrator: female | male
- preferredSpanishMode: visible | hidden
- skillSnapshot: reading, listening, speaking, pronunciation
```

### Historia

```text
Story
- id
- title
- coverImage
- level
- estimatedMinutes
- theme: everyday | technology | mixed
- characters[]
- lines[]: spanish, english, audioSegment
- targetWords[]: english, spanish, firstSeenAt
- closingPrompts[]
- generatedForProfileId (opcional)
```

### Progreso y revisión

```text
StoryProgress
- readerId
- storyId
- startedAt, completedAt
- spanishWasHidden
- listeningCompleted
- comprehensionEvidence
- speakingEvidence

ReviewItem
- readerId
- wordOrPattern
- confidence: new | emerging | familiar
- nextNaturalAppearanceAt
- contextsSeen[]
```

## Estructura de archivos cuando el prototipo crezca

```text
src/
  features/
    library/        # catálogo y selección
    reader/         # pantalla y controles de lectura
    story/          # modelo, renderización de líneas y palabras
    practice/       # comprensión, speaking y pronunciación
    progress/       # habilidades y cierre de capítulo
    review/         # selección de repeticiones naturales
    generation/     # solicitud y validación de historias IA
    profile/        # preferencias e intereses
  shared/
    ui/             # piezas visuales reutilizables
    audio/          # voces y reproducción
    offline/        # PWA, caché y sincronización
    accessibility/  # foco, teclado y movimiento reducido
  content/
    starter-stories/# historias curadas mientras no haya IA
docs/
tests/
```

Cada módulo entrega datos claros al siguiente. Por ejemplo, `generation` produce un objeto `Story` validado; el `reader` solo lo presenta; `progress` recibe el resultado final y `review` usa ese resultado para decidir futuras apariciones naturales.

## Límites técnicos deliberadamente abiertos

Estas decisiones se eligen cuando una fase realmente las necesite:

- Framework de interfaz.
- Servicio o modelo de IA.
- Motor de texto a voz y reconocimiento de voz.
- Base de datos y autenticación.
- Dónde guardar y moderar portadas generadas.

El criterio será siempre el mismo: que sean gratuitas o de coste cero para el proyecto académico, protejan los datos y no rompan el modo local de lectura.


# Recuperación de Entre líneas

Recuperación realizada el 2 de noviembre de 2026. La carpeta original `Desktop/Entre-lineas` no se encontró en los lugares accesibles revisados. Esta carpeta nueva conserva y reensambla archivos que permanecían en historiales locales; **no es una copia completa del repositorio original ni conserva su historial Git**.

La versión principal corresponde al desarrollo registrado el **28 de septiembre de 2026**: Angular 22.1, TypeScript 6, biblioteca, siete historias bilingües, lector, preferencias, audio del navegador y PWA. No se localizó una versión posterior verificable.

## Qué se rescató y qué se reconstruyó

Hay **72 archivos de proyecto en la raíz y sus carpetas**, además de **62 archivos en el archivo histórico**. El manifiesto no cuenta dependencias instaladas, archivos de compilación ni este informe.

| Procedencia de los 72 archivos | Cantidad | Alcance |
|---|---:|---|
| Contenido directo conservado en los historiales o en un paquete local verificado | 54 | Lecturas completas, escrituras completas, bloques de archivo, configuración inicial, PNG 512 y fuentes Literata |
| Reensamblados mediante cambios o copias que aparecen expresamente en el historial | 15 | Parches con coincidencia exacta, configuración estricta/PWA, `.nvmrc`, icono maskable y nombre de licencia |
| Reconstruidos en esta recuperación | 3 | Dos tamaños de icono y un `package-lock.json` nuevo |

**La aplicación conserva el contenido original recuperado.** Las lecturas de Antigravity identifican el archivo completo y su número de bytes: se quitaron únicamente los números de línea y se comprobó que el tamaño extraído coincide. En otros archivos se conserva la última escritura completa disponible; el formato puede ser anterior a la pasada de Prettier mencionada en el historial.

Los parches se aplicaron solo cuando su texto anterior coincidía exactamente. Un intento redundante sobre `reader.page.css` se omitió; una lectura completa posterior conservada en el historial contiene el resultado y lo sustituyó. La procedencia de cada archivo, sus versiones intermedias, la línea del historial y el SHA-256 están en `evidencia/manifest.json`.

### Elementos reconstruidos expresamente

- `public/icons/icon-192.png` y `apple-touch-icon.png`: se regeneraron desde el PNG 512 original recuperado con los mismos tamaños y herramienta `sips` que usó el comando original. No se dispone del hash de los dos archivos perdidos para afirmar igualdad binaria.
- `public/icons/icon-maskable-512.png`: el comando original era una copia directa del PNG 512; se reprodujo esa copia sin alterar sus bytes.
- `angular.json`, `tsconfig.json` y `tsconfig.spec.json`: se recuperó el esqueleto completo de la salida original y se repitieron sus cambios explícitos de PWA, modo estricto y tipos de prueba. El contenido es trazable; el espaciado final puede diferir del original.
- `package-lock.json`: **no es el archivo original**. Se resolvió sin conexión usando el `package.json` recuperado y la caché local. Se seleccionaron dos versiones compatibles disponibles en caché: `wrap-ansi@10.0.1` y `@hono/node-server@2.1.5`, en vez de las revisiones más recientes sugeridas por los metadatos. Detalles en `evidencia/dependencias-locales.json`.
- Las dos fuentes y la licencia proceden de `@fontsource-variable/literata@5.3.0`, la versión citada en la salida original. La integridad SHA-512 del archivo de paquete local se verificó antes de extraerlas. Se conserva también una copia adicional de su licencia como `src/fonts/LICENSE`.

## Versiones preservadas

- La raíz y `src/`: versión más reciente recuperable del 28 de septiembre, con siete historias y biblioteca.
- `archivo/prototipo-vanilla/`: trece archivos leídos del prototipo previo a Angular, con su prueba y documentación.
- `archivo/angular-2026-09-20/`: 49 archivos conservados de la sesión inicial de Angular. Es un archivo de material recuperado de esa sesión; no se presenta como una distribución independiente terminada.

## Verificación ejecutada

Se usó Node **24.21.0** ya instalado en el Mac. Se instalaron **380 paquetes únicamente desde la caché local**, con red deshabilitada y scripts de instalación desactivados. No se descargaron paquetes ni se publicaron archivos.

| Comprobación actual | Resultado |
|---|---|
| Compilación de producción Angular | **Correcta**, sin errores |
| Pruebas Angular recuperadas | **81 correctas / 84** |
| Pruebas del prototipo vanilla | **5 correctas / 5** |
| Hashes de los archivos extraídos | Comprobados contra el manifiesto |
| Referencias locales entre archivos de código y plantillas | Sin referencias faltantes detectadas |

Las tres pruebas Angular que fallan están en `src/app/app.spec.ts`: la prueba del 20 de septiembre configura el componente sin enrutador y espera el lector directamente en la página principal. El código del 28 de septiembre usa biblioteca y rutas; el error actual es `No provider found for ActivatedRoute`. Se conservaron las pruebas recuperadas para no presentar una modificación nueva como trabajo rescatado. Esto no impide compilar la aplicación. Las salidas completas están en `evidencia/angular-pruebas.log`, `angular-produccion.log` y `vanilla-pruebas.log`.

No se verificó la aplicación en un navegador real en esta recuperación: el entorno de ejecución no permitió abrir el puerto local de previsualización. Audio, micrófono, PWA instalada y dispositivos móviles requieren comprobación manual.

## Cómo abrir la copia recuperada

Las dependencias locales ya están instaladas. En una terminal, dentro de esta carpeta:

```sh
nvm use
npm start
```

La dirección habitual será `http://localhost:4200`. La compilación ya preparada está en `dist/entre-lineas/browser`. Para instalar de nuevo las dependencias se puede usar `npm ci` con el archivo de dependencias reconstruido; ya no representa la resolución histórica exacta.

## Material que sigue faltando

- La carpeta `.git` propia del proyecto, su commit base `3f2b638` y el historial de cambios original. El repositorio Git que existe en el directorio personal no contiene ese objeto.
- El `package-lock.json` original y algunos ajustes auxiliares del editor, como `.editorconfig`.
- La especificación `docs/superpowers/specs/2026-09-20-narracion-audio-neuronal-design.md`, citada por el Baúl. El índice de historial conserva la identificación de una sesión posterior de audio, pero no se encontró su transcripción local.
- Cualquier avance no conservado en los historiales revisados después del 28 de septiembre. No se recuperaron clips MP3 de narración neuronal.

## Fuentes preservadas sin modificación

1. Historial de Claude de la sesión del 20 de septiembre:
   `/Users/erickvzh/.claude/projects/-Users-erickvzh-Desktop-Entre-lineas--claude-worktrees-project-redesign-polish-8f85c4/b403a33a-79b8-40a7-9e3f-8f5c33132b1d.jsonl`
   SHA-256: `6f6aa106e3c9655968bf3a021aaee46dfcc0d94adfa7c4a66304f6817c97c83a`.
2. Historial de Antigravity CLI de la sesión del 28 de septiembre:
   `/Users/erickvzh/.gemini/antigravity-cli/brain/d0948fe3-2b02-41ea-9cfa-36948e0d2d20/.system_generated/logs/transcript_full.jsonl`
   SHA-256: `17624930fbb53ac687b8bdc3f12176bfcffc31738c0450b21146114ae859fde1`.
3. Paquete Literata 5.3.0 de la caché local: ruta, integridad SHA-512 y SHA-256 en `evidencia/manifest.json`.

Los historiales no se copiaron completos porque contienen también contexto de otras tareas. El manifiesto permite localizar cada fragmento recuperado sin modificar los originales.

## Alcance de la búsqueda y límites

Se revisaron nombres en Desktop, Documents y Downloads, rutas locales accesibles de iCloud y CloudStorage, 25 archivos ZIP, historiales y respaldos accesibles de VS Code/Cursor/Antigravity, historiales locales de Claude/Codex/Antigravity CLI, restos Git y referencias de terminal limitadas a este proyecto. No se encontró una carpeta fuente completa en esas ubicaciones.

La Papelera del usuario y el respaldo MobileSync están protegidos por macOS y no pudieron inspeccionarse. Time Machine indicó que no hay snapshots locales ni destinos configurados. No se examinó contenido privado ajeno al proyecto, no se modificaron proyectos originales, historiales, portafolio ni Baúl, y no se eliminaron ni publicaron archivos.

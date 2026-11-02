const PREFIX = 'entre-lineas:v1:';

/**
 * Lee JSON del almacenamiento local. Ante cualquier fallo (modo privado, datos corruptos o de otra
 * versión) devuelve `fallback`: la lectura nunca debe romperse por no poder recordar preferencias.
 */
export function readStored<T>(
  key: string,
  fallback: T,
  isValid: (value: unknown) => value is T,
): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    const parsed: unknown = JSON.parse(raw);
    return isValid(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function writeStored(key: string, value: unknown): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Almacenamiento no disponible o lleno: la app sigue funcionando sin recordar.
  }
}

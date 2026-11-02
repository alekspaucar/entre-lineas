import { cafeAntesDelCodigo } from './cafe-antes-del-codigo';
import { contrasenaSinRed } from './contrasena-sin-red';
import { elPrimerBug } from './el-primer-bug';
import { elViajeEnMetro } from './el-viaje-en-metro';
import { equipoEnLinea } from './equipo-en-linea';
import { laApiQueNoResponde } from './la-api-que-no-responde';
import { laPresentacion } from './la-presentacion';

/** Todas las historias de la biblioteca de inicio, en orden numérico. */
export const STARTER_STORIES = [
  cafeAntesDelCodigo,
  contrasenaSinRed,
  elViajeEnMetro,
  equipoEnLinea,
  elPrimerBug,
  laPresentacion,
  laApiQueNoResponde,
] as const;

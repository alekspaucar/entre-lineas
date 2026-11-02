import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { createReadingState, lookupTranslation, toggleSpanish } from '../reader.mjs';

test('the reader begins with Spanish visible and can hide it', () => {
  const state = createReadingState();

  assert.equal(state.showSpanish, true);
  assert.equal(toggleSpanish(state).showSpanish, false);
});

test('a highlighted story word returns only its Spanish meaning', () => {
  assert.equal(lookupTranslation('password'), 'contraseña');
});

test('the reader declares an installable offline experience', async () => {
  const manifest = JSON.parse(await readFile(new URL('../manifest.webmanifest', import.meta.url)));
  const page = await readFile(new URL('../index.html', import.meta.url), 'utf8');

  assert.equal(manifest.display, 'standalone');
  assert.match(page, /manifest\.webmanifest/);
  assert.match(page, /serviceWorker\.register/);
});

test('the reader uses the neutral editorial palette', async () => {
  const styles = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(styles, /--paper:\s*#f7f7f5/);
  assert.match(styles, /--ink:\s*#101820/);
  assert.match(styles, /--navy:\s*#253746/);
});

test('offline cache version changes when the reader design changes', async () => {
  const worker = await readFile(new URL('../service-worker.js', import.meta.url), 'utf8');

  assert.match(worker, /entre-lineas-v2/);
});


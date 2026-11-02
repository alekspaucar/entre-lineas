const CACHE = 'entre-lineas-v2';
const ASSETS = ['./', './index.html', './styles.css', './app.mjs', './reader.mjs', './manifest.webmanifest', './icon.svg'];

self.addEventListener('install', (event) => event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS))));
self.addEventListener('activate', (event) => event.waitUntil(
  caches.keys().then((names) => Promise.all(names.filter((name) => name !== CACHE).map((name) => caches.delete(name))))
    .then(() => self.clients.claim())
));
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then((saved) => saved ?? fetch(event.request)));
});


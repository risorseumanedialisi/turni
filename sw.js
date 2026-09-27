// Service worker minimo: serve solo a rendere l'app installabile e a mostrare
// il guscio anche senza rete. NON tocca l'app di Google (sta su un altro
// dominio): i dati passano sempre direttamente da Google.
var CACHE = 'presenze-guscio-v1';
var FILE = ['./', './index.html', './config.js', './manifest.webmanifest',
            './icons/icon-192.png', './icons/icon-512.png', './icons/favicon.svg'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILE); }));
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (k) {
    return Promise.all(k.filter(function (n) { return n !== CACHE; })
                        .map(function (n) { return caches.delete(n); }));
  }).then(function () { return self.clients.claim(); }));
});

// Prima la rete (così una modifica a config.js su GitHub arriva subito),
// la copia salvata solo se la rete non c'è.
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(fetch(req).then(function (r) {
    var copia = r.clone();
    caches.open(CACHE).then(function (c) { c.put(req, copia); });
    return r;
  }).catch(function () {
    return caches.match(req, { ignoreSearch: true }).then(function (r) {
      return r || caches.match('./index.html');
    });
  }));
});

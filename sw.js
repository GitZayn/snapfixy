/* SnapFixy service worker — one job only: keep the background-remover AI
   model (served from staticimgly.com) in Cache Storage, so the one-off
   ~54 MB download is genuinely saved on the device and later visits load
   it from cache instead of the network. Every other request passes
   straight through untouched. */
const CACHE = 'snapfixy-bg-model-v1';

self.addEventListener('install', function (event) {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
  let url;
  try { url = new URL(event.request.url); } catch (e) { return; }
  if (url.hostname !== 'staticimgly.com') return;
  if (url.pathname.indexOf('background-removal-data') === -1) return;

  event.respondWith((async function () {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(event.request, { ignoreVary: true });
    if (hit) return hit;
    const response = await fetch(event.request);
    if (response && (response.status === 200 || response.type === 'opaque')) {
      cache.put(event.request, response.clone());
    }
    return response;
  })());
});


const CACHE_NAME='daily-whisper-v1';
const urlsToCache=['/','/index.html','/css/style.css','/js/app.js','/data/quotes.json'];
self.addEventListener('install', e=>{ e.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(urlsToCache))); });
self.addEventListener('fetch', e=>{ e.respondWith(caches.match(e.request).then(res=>res||fetch(e.request))); });

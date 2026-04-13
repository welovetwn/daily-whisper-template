
const CACHE_NAME='daily-whisper-v4';
const urlsToCache=[
  './',
  'index.html',
  'css/style.css',
  'js/app.js',
  'manifest.json',
  'assets/icon-192.png',
  'submit.html',
  'tags.html',
  'tag-filter.html',
  'author-filter.html'
];

self.addEventListener('install', e=>{
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache=>cache.addAll(urlsToCache))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys().then(cacheNames=>{
      return Promise.all(
        cacheNames
          .filter(name=>name!==CACHE_NAME)
          .map(name=>caches.delete(name))
      );
    }).then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch', e=>{
  e.respondWith(
    caches.match(e.request).then(res=>{
      if(res) return res;
      return fetch(e.request).catch(()=>{
        // 離線時回傳預設回應
        if(e.request.destination==='document'){
          return caches.match('/index.html');
        }
      });
    })
  );
});



const CACHE_NAME='daily-whisper-v2';
const urlsToCache=[
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/manifest.json',
  '/assets/icon-192.png',
  '/favorites.html',
  '/submit.html'
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

// Push 通知處理
self.addEventListener('push', e=>{
  const data = e.data.json();
  const options = {
    body: data.body || '今日語錄已準備好',
    icon: '/assets/icon-192.png',
    badge: '/assets/icon-192.png',
    tag: 'daily-quote',
    requireInteraction: false,
    actions: [
      { action: 'open', title: '查看' },
      { action: 'close', title: '關閉' }
    ],
    data: {
      url: data.url || '/'
    }
  };
  e.waitUntil(
    self.registration.showNotification(data.title || 'Daily Whisper', options)
  );
});

// 通知點擊處理
self.addEventListener('notificationclick', e=>{
  e.notification.close();
  const action = e.action;
  if(action==='open' || !action){
    e.waitUntil(
      clients.openWindow(e.notification.data?.url || '/')
    );
  }
});

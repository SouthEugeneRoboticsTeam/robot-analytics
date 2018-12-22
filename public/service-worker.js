const cacheName = 'robot-analytics-v1.1';
const filesToCache = [
    '/',
    '/favicon.ico',
    '/icon-512.png',
    '/manifest.json',
    '/index.html',
    '/bundle.js',
];

self.addEventListener('install', e => {
    self.skipWaiting();

    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', e => {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});

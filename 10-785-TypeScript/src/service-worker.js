/* eslint-disable no-restricted-globals,@typescript-eslint/explicit-function-return-type */
console.info('init service-worker.js');

const CACHE = 'cache-and-update';

// При генерации итогового файла вместо этой переменной Workbox'а будет массив с нужными данными.
// eslint-disable-next-line no-underscore-dangle
const cacheList = self.__WB_MANIFEST.map(({ url }) => url);

function clearCache() {
    return caches.keys()
        .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
        .then(() => {
            console.info('All cache deleted successfully');
        });
}

function precache() {
    return caches.open(CACHE)
        .then((cache) => cache.addAll(cacheList))
        .then(() => {
            console.info('All files precached successfully', cacheList);
        });
}

function fromCache(request) {
    return caches.match(request)
        .then((resp) => resp || fetch(request)
            .then((response) => caches.open(CACHE)
                .then((cache) => {
                    cache.put(request, response.clone());
                    return response;
                })));
}

function update(request) {
    return caches.open(CACHE)
        .then((cache) => fetch(request)
            .then((response) => cache.put(request, response)));
}

self.addEventListener('install', () => {
    console.info('The service worker is being installed');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.info('The service worker is being activated');
    event.waitUntil(clearCache());
    event.waitUntil(precache());
});

self.addEventListener('fetch', (event) => {
    console.info('The service worker is serving the asset: ', event.request.url);
    event.respondWith(fromCache(event.request));
    event.waitUntil(update(event.request));
});

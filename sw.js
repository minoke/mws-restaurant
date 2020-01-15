var CACHE_NAME = 'cache-v1';
var urlsToCache = [
  '/',
  '/css/styles.css',
  '/data/restaurants.json',
  '/img/',
  '/js/',
];


/**
 * @description open cache and provide files to be cached.
 */
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

/**
 * @description intercept request, check if desired resource is cached.
 * If so, then return it from cache otherwise get resource from network
 */
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

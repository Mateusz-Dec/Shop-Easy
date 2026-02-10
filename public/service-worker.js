// Simple offline cache strategy
const CACHE_NAME = "shopeasy-v1";
const ASSETS_TO_CACHE = ["/", "/index.html", "/data/products.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {
        // It's ok if some assets fail to cache
      });
    }),
  );
});

self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  // Cache-first strategy for assets
  if (
    event.request.url.includes("/data/products.json") ||
    event.request.url.includes(".json")
  ) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) return response;
        return fetch(event.request).then((response) => {
          // Cache successful responses
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        });
      }),
    );
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

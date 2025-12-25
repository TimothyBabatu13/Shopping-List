const CACHE_NAME = "lists-v1";

const APP_SHELL = [
  "/",               
  "/manifest.json",
];

// INSTALL
const cacheCoreAssets = async() => {
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll(APP_SHELL);
}
self.addEventListener("install", (event) => {
  event.waitUntil(cacheCoreAssets())
  self.skipWaiting();
});


const clearOldCaches = async () => {
  const cacheNames = await caches.keys();
  return Promise.all(
    cacheNames
      .filter((name) => name !== CACHE_NAME)
      .map((name) => caches.delete(name))
  );
}
// ACTIVATE
self.addEventListener("activate", (event) => {
  event.waitUntil(clearOldCaches());
  self.clients.claim();
});


const dynamicCaching = async (request) => {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);
    const responseClone = response.clone();
    await cache.put(request, responseClone);
    return response;
  } catch (error) {
    console.error("Dynamic caching failed:", error);
    return caches.match(request);
  }
}
// FETCH
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // ✅ Handle page navigations (deep links, refresh, direct URL)
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() => caches.match("/")) // 🔑 NOT /lists
    );
    return;
  }

  // ✅ Assets (JS, CSS, fonts, icons)
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      return fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return res;
      });
    })
  );
});

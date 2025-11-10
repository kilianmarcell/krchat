// @ts-nocheck
const cacheName = "v1";
async function impl(e) {
  // Skip caching for:
  // - WebSocket connections
  // - Vite HMR requests (with ?t= query params)
  // - Development server requests
  const url = new URL(e.request.url);
  
  if (
    e.request.method !== "GET" ||
    url.protocol === "ws:" ||
    url.protocol === "wss:" ||
    url.search.includes("?t=") ||
    url.pathname.includes("@vite") ||
    url.pathname.includes("node_modules")
  ) {
    return fetch(e.request);
  }

  let cache = await caches.open(cacheName);
  let cacheResponse = await cache.match(e.request);
  if (cacheResponse) return cacheResponse;
  else {
    let networkResponse = await fetch(e.request);
    
    // Only cache successful responses
    if (networkResponse.ok) {
      cache.put(e.request, networkResponse.clone());
    }
    return networkResponse;
  }
}
self.addEventListener("fetch", (e) => e.respondWith(impl(e)));

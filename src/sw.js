self.addEventListener("install", (event) => {
  self.skipWaiting();
  console.log('[sw] install');
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
  console.log('[sw] activate');
});

self.addEventListener("fetch", (event) => {
  // simple network-first strategy - can be improved
  // This is a placeholder for offline caching logic
});

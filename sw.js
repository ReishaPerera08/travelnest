// sw.js — service worker for offline support
const CACHE_NAME = "travelnest-v2";

// files to cache so the site works offline
const FILES_TO_CACHE = [
  "index.html",
  "explore.html",
  "budget.html",
  "trips.html",
  "mood.html",
  "contact.html",
  "styles.css",
  "data.js",
  "script.js",
  "home.js",
  "explore.js",
  "budget.js",
  "trips.js",
  "mood.js",
  "contact.js"
];

// INSTALL: save the listed files into the cache
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// FETCH: serve from cache first, fall back to the network
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      return cached || fetch(event.request);
    })
  );
});
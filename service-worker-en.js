const cacheName = "answers-book-en-v1";
const assets = [
  "./",
  "./index-en.html",
  "./style.css",
  "./script-en.js",
  "./manifest-en.webmanifest",
  "./icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(assets))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});

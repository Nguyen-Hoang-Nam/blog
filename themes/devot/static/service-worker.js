const cacheName = "Static cache";
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll([
                "/images/avatar.webp",
                "/images/cover.webp",
                "/images/logo-light.svg",
                "/images/logo-dark.svg",
            ]);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});

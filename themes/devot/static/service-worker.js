const cacheName = "Static cache";
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll([
                "/images/avatar.webp",
                "/images/avatar.jpeg",
                "/images/avatar.avif",
                "/images/cover.webp",
                "/images/cover.jpeg",
                "/images/cover.avif",
                "/images/logo-light.svg",
                "/images/logo-dark.svg",
                "/images/logo.png",
                "/images/logo-512.png",
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

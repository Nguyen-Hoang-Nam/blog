const cacheName = "Static cache";
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll([
                "/images/avatar.webp",
                "/images/logo-light.svg",
                "/images/logo-dark.svg",
                "/images/GitHub-Mark-32px.png",
                "/images/GitHub-Mark-Light-32px.png",
                "/images/rss-light.png",
                "/images/rss-dark.png",
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

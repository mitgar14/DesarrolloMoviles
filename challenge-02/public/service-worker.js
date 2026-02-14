const CACHE_NAME = "react-pwa-v2";

const APP_SHELL = [
    "/",
    "/index.html",
    "/manifest.json",
    ""
]

function networkFirst(request) {
    return fetch(request)
        .then(response => {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(
                cache => cache.put(request, clone)
            );
            return response;
        })
        .catch(() => caches.match(request));
}

function cacheFirst(request) {
    return caches.match(request)
        .then(cached => {
            if (cached) return cached;
            return fetch(request).then(response => {
                const clone = response.clone();
                caches.open(CACHE_NAME).then(
                    cache => cache.put(request, clone)
                );
                return response;
            });
        });
}

function staleWhileRevalidate(request) {
    return caches.match(request)
        .then(cached => {
            const fetchPromise = fetch(request).then(response => {
                const clone = response.clone();
                caches.open(CACHE_NAME).then(
                    cache => cache.put(request, clone)
                );
                return response;
            });
            return cached || fetchPromise;
        });
}

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(APP_SHELL);
        })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        })
    );
});

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;

    const url = new URL(event.request.url);

    if (event.request.mode === "navigate" || url.pathname.endsWith(".html")) {
        event.respondWith(networkFirst(event.request));
        return;
    }

    if (url.pathname.endsWith(".js") || url.pathname.endsWith(".css")) {
        event.respondWith(cacheFirst(event.request));
        return;
    }

    if (url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|ico)$/)) {
        event.respondWith(staleWhileRevalidate(event.request));
        return;
    }

    if (url.pathname.startsWith("/api") || url.origin !== location.origin) {
        event.respondWith(networkFirst(event.request));
        return;
    }

    event.respondWith(networkFirst(event.request));
    });
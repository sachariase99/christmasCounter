const cacheName = 'christmas-counter-cache-v1'; // Cache version for Christmas countdown

// Event listener for the 'install' event
self.addEventListener('install', event => {
    // Log that the service worker is installing
    console.log('Christmas Countdown Service Worker: Installing');

    // Wait until the cache is opened and assets are added
    event.waitUntil(
        (async () => {
            const cache = await caches.open(cacheName);
            console.log('Christmas Countdown Service Worker: Caching');
            try {
                // Cache the Christmas Countdown app assets
                const resources = [
                    '/',
                    '/index.html',
                    '/static/js/bundle.js',
                ];
                await cache.addAll(resources);
            } catch (error) {
                console.error('Christmas Countdown Service Worker: Failed to cache resources:', error);
            }
        })()
    );
});

// Event listener for the 'activate' event
self.addEventListener('activate', event => {
    // Log that the service worker is activating
    console.log('Christmas Countdown Service Worker: Activating');

    // Wait until caches are checked and old caches are deleted
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                // Iterate through existing cache names
                cacheNames.map(existingCacheName => {
                    if (existingCacheName !== cacheName) {
                        // Log and delete old caches
                        console.log('Christmas Countdown Service Worker: Deleting old cache', existingCacheName);
                        return caches.delete(existingCacheName);
                    }
                })
            );
        })
    );
});

// Event listener for the 'fetch' event
self.addEventListener('fetch', event => {
    // Log that the service worker is fetching a resource
    console.log('Christmas Countdown Service Worker: Fetching', event.request.url);

    // Respond to the fetch event
    event.respondWith(
        caches.match(event.request).then(response => {
            // Check if the requested resource is in the cache
            if (response) {
                return response;
            }

            // If the requested resource is not in the cache, fetch it from the network
            return fetch(event.request).then(networkResponse => {
                // If not in the cache, add it to the cache
                return caches.open(cacheName).then(cache => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            }).catch(() => {
                // If the network request fails, return a custom fallback response
                // You can customize the fallback response for your Christmas Countdown app
                return new Response('Christmas Countdown App is offline.');
            });
        })
    );
});

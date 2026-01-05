const CACHE_NAME = 'dr-sabri-stc-v2';

// Core assets to cache on install (always available offline)
const CORE_ASSETS = [
    '/',
    '/ar',
    '/en',
    '/offline-ar.html',
    '/offline-en.html',
    '/images/stc-logo.jpg',
    '/images/icon-192.png',
    '/images/icon-512.png',
    '/images/dr-sabri.jpg',
    '/manifest.json',
];

// Pages to pre-cache for full offline experience
const PAGES_TO_CACHE = [
    '/ar/about',
    '/en/about',
    '/ar/contact',
    '/en/contact',
    '/ar/verify',
    '/en/verify',
];

// Install event - cache core assets AND pages
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            console.log('[SW] Caching core assets');

            // Cache core assets first (these must succeed)
            await cache.addAll(CORE_ASSETS);

            // Pre-cache pages (best effort - don't fail if some fail)
            console.log('[SW] Pre-caching pages for offline use');
            const pagePromises = PAGES_TO_CACHE.map(async (page) => {
                try {
                    const response = await fetch(page);
                    if (response.ok) {
                        await cache.put(page, response);
                        console.log('[SW] Cached page:', page);
                    }
                } catch (err) {
                    console.log('[SW] Failed to cache page:', page, err);
                }
            });
            await Promise.all(pagePromises);

            console.log('[SW] All caching complete');
        })
    );
    // Activate immediately
    self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name.startsWith('dr-sabri-stc-') && name !== CACHE_NAME)
                    .map((name) => {
                        console.log('[SW] Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        })
    );
    // Take control immediately
    self.clients.claim();
});

// Fetch event - smart caching strategy
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Only handle GET requests
    if (request.method !== 'GET') return;

    // Skip non-http(s) requests
    if (!url.protocol.startsWith('http')) return;

    // Skip API requests
    if (url.pathname.startsWith('/api')) return;

    // Skip external resources (CDNs, fonts, etc.) - let them use normal caching
    if (url.origin !== location.origin) {
        // But cache Google Fonts if needed
        if (url.origin.includes('fonts.googleapis.com') || url.origin.includes('fonts.gstatic.com')) {
            event.respondWith(
                caches.open(CACHE_NAME).then(async (cache) => {
                    const cachedResponse = await cache.match(request);
                    if (cachedResponse) return cachedResponse;

                    try {
                        const response = await fetch(request);
                        if (response.ok) {
                            cache.put(request, response.clone());
                        }
                        return response;
                    } catch {
                        return new Response('', { status: 503 });
                    }
                })
            );
        }
        return;
    }

    // Static assets (JS, CSS, images) - Cache First strategy
    if (
        url.pathname.startsWith('/_next/static/') ||
        url.pathname.match(/\.(js|css|png|jpg|jpeg|webp|svg|ico|woff|woff2)$/)
    ) {
        event.respondWith(
            caches.open(CACHE_NAME).then(async (cache) => {
                const cachedResponse = await cache.match(request);
                if (cachedResponse) {
                    // Return cached version, but update cache in background
                    fetch(request).then((response) => {
                        if (response.ok) {
                            cache.put(request, response);
                        }
                    }).catch(() => { });
                    return cachedResponse;
                }

                // Not in cache, fetch and cache
                try {
                    const response = await fetch(request);
                    if (response.ok) {
                        cache.put(request, response.clone());
                    }
                    return response;
                } catch {
                    return new Response('', { status: 503 });
                }
            })
        );
        return;
    }

    // HTML pages - Stale-While-Revalidate strategy
    event.respondWith(
        caches.open(CACHE_NAME).then(async (cache) => {
            const cachedResponse = await cache.match(request);

            // Fetch fresh version in background
            const fetchPromise = fetch(request)
                .then((response) => {
                    if (response.ok) {
                        cache.put(request, response.clone());
                    }
                    return response;
                })
                .catch(() => null);

            // If we have a cached version, return it immediately
            if (cachedResponse) {
                // Still fetch in background to update cache
                fetchPromise.catch(() => { });
                return cachedResponse;
            }

            // No cache, wait for network
            try {
                const response = await fetchPromise;
                if (response) return response;
            } catch {
                // Network failed, fall through to offline page
            }

            // Serve offline page for navigation requests
            if (request.mode === 'navigate') {
                const isEnglish = url.pathname.startsWith('/en');
                const offlinePage = isEnglish ? '/offline-en.html' : '/offline-ar.html';
                const offlineResponse = await cache.match(offlinePage);
                if (offlineResponse) return offlineResponse;
            }

            // Return a simple offline response for other requests
            return new Response('Offline', {
                status: 503,
                statusText: 'Service Unavailable',
            });
        })
    );
});

// Listen for messages from the client
self.addEventListener('message', (event) => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }

    // Allow manual cache refresh
    if (event.data === 'refreshCache') {
        caches.delete(CACHE_NAME).then(() => {
            console.log('[SW] Cache cleared, will refresh on next load');
        });
    }
});

// Periodic cache cleanup (optional - cleanup old/unused entries)
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'cache-cleanup') {
        event.waitUntil(cleanupOldCache());
    }
});

async function cleanupOldCache() {
    const cache = await caches.open(CACHE_NAME);
    const keys = await cache.keys();

    // Keep cache reasonable - max 100 entries
    if (keys.length > 100) {
        const toDelete = keys.slice(100);
        await Promise.all(toDelete.map((key) => cache.delete(key)));
        console.log('[SW] Cleaned up', toDelete.length, 'cache entries');
    }
}

// Push Notification Event
self.addEventListener('push', (event) => {
    if (!event.data) {
        console.log('Push event but no data');
        return;
    }

    try {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: data.icon || '/images/icon-192.png',
            badge: '/images/icon-192.png',
            vibrate: [100, 50, 100],
            data: {
                url: data.url || '/',
            },
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    } catch (err) {
        console.error('Error handling push event:', err);
    }
});

// Notification Click Event
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const urlToOpen = event.notification.data?.url || '/';

    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then((windowClients) => {
            // Check if there is already a window open with this URL
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, open a new window
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});

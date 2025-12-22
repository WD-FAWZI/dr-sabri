const CACHE_NAME = 'dr-sabri-stc-v1';

// Assets to cache for offline use
const STATIC_ASSETS = [
    '/offline-ar.html',
    '/offline-en.html',
    '/images/stc-logo.jpg',
    '/manifest.json',
];

// Pages to cache when visited
const DYNAMIC_PAGES = [
    '/',
    '/ar',
    '/en',
    '/ar/about',
    '/en/about',
    '/ar/contact',
    '/en/contact',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Caching static assets');
            return cache.addAll(STATIC_ASSETS);
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
                    .filter((name) => name !== CACHE_NAME)
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

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Only handle GET requests
    if (request.method !== 'GET') return;

    // Skip non-http(s) requests
    if (!url.protocol.startsWith('http')) return;

    // Skip API requests and external resources
    if (url.pathname.startsWith('/api') || url.origin !== location.origin) return;

    event.respondWith(
        fetch(request)
            .then((response) => {
                // Clone the response for caching
                const responseClone = response.clone();

                // Cache successful responses for dynamic pages
                if (response.ok && DYNAMIC_PAGES.some((page) => url.pathname === page || url.pathname.endsWith(page))) {
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                }

                return response;
            })
            .catch(() => {
                // Try to serve from cache
                return caches.match(request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    // Serve offline page for navigation requests
                    if (request.mode === 'navigate') {
                        // Detect language from URL or use Arabic as default
                        const isEnglish = url.pathname.startsWith('/en');
                        const offlinePage = isEnglish ? '/offline-en.html' : '/offline-ar.html';
                        return caches.match(offlinePage);
                    }

                    // Return a simple offline response for other requests
                    return new Response('Offline', {
                        status: 503,
                        statusText: 'Service Unavailable',
                    });
                });
            })
    );
});

// Listen for messages from the client
self.addEventListener('message', (event) => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});

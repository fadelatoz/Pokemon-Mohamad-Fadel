importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.3.0/workbox-sw.js');

// Precache static assets
// workbox.precaching.precacheAndRoute([
//   // Add paths to your static assets here
//   '/',
//   '/homePage',
//   '/my-projects'
// ]);

// Cache external resources using a cache-first strategy
workbox.routing.registerRoute(
  ({url}) => url.origin,
  new workbox.strategies.CacheFirst({
    cacheName: 'workbox-all-cache'
  })
);


// Cache other assets using a network-first strategy
workbox.routing.registerRoute(
  ({url}) => url.pathname.startsWith('/api/'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'api-cache'
  })
);

// Cache images using a cache-first strategy
workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache'
  })
);

// Cache CSS and JavaScript files using a stale-while-revalidate strategy
workbox.routing.registerRoute(
  ({request}) => request.destination === 'script' || request.destination === 'style',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'css-js-cache'
  })
);

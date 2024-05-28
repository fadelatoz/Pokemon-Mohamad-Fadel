const withPWA = require('next-pwa')({
  dest: 'public',
  skipWaiting: true,
  // swSrc: 'service-worker.js'
});

module.exports = withPWA({
  // Your Next.js config options
  reactStrictMode: true, // Enable React strict mode for improved error handling
  swcMinify: true,      // Enable SWC minification for improved performance
  // reactRemoveProperties: process.env.NODE_ENV === 'production',
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['assets.pokemon.com'],
  },
});

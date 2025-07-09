const { i18n } = require('./next-i18next.config');

export default {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['i.pravatar.cc', 'images.unsplash.com', 'cdn.shopify.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
        pathname: '/s/files/**'
      }
    ]
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/fr/:collection+',  // Use + for one or more segments
  //       destination: '/fr/:collection*', // Match destination pattern
  //     }
  //   ]
  // },
  experimental: {},
};
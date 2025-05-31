const { i18n } = require('./next-i18next.config');

export default {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['i.pravatar.cc'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      }
    ]
  },
  i18n,
  experimental: {
  },
};

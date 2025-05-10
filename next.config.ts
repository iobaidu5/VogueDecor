// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push({
      '@neondatabase/serverless': 'commonjs @neondatabase/serverless',
      'ws': 'commonjs ws'
    });
    return config;
  },
  // Keep your existing image config
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      }
    ]
  }
};

export default nextConfig;
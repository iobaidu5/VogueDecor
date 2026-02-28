import { MetadataRoute } from 'next';

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production') {
    return 'https://www.voguedecor.com';
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return 'http://localhost:3000';
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/_next/static/', '/images/', '/assets/'],
        disallow: [
          '/api/',
          '/_next/',
          '/cart',
          '/checkout',
          '/account',
          '/login',
          '/register',
          '/search',
          '/?',
          '/add-to-cart',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

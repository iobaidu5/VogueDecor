import { getBaseUrl } from 'lib/site-url';
import { MetadataRoute } from 'next';

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

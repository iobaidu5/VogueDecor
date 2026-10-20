import { getCollections, getPages, getProducts, getBlogs } from 'lib/shopify';
import { getBlogArticlesByHandleForSitemap } from 'lib/shopify/sitemap';
import { validateEnvironmentVariables } from 'lib/utils';
import { MetadataRoute } from 'next';
import { getBlogArticlesByHandle } from 'screens/blogs';

type Route = {
  url: string;
  lastModified: string;
};

import { getBaseUrl } from 'lib/site-url';

const baseUrl = getBaseUrl();

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  validateEnvironmentVariables();

  const routesMap = [''].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString()
  }));

  const collectionsPromise = getCollections().then((collections) =>
    collections.map((collection) => ({
      url: `${baseUrl}${collection.path}`,
      lastModified: collection.updatedAt
    }))
  );

  const productsPromise = getProducts({}).then((products) =>
    products.map((product) => ({
      url: `${baseUrl}/product/${product.handle}`,
      lastModified: product.updatedAt
    }))
  );

  const pagesPromise = getPages().then((pages) =>
    pages.map((page) => ({
      url: `${baseUrl}/${page.handle}`,
      lastModified: page.updatedAt
    }))
  );


  const blogs = await getBlogs();

  const articles = (
    await Promise.all(
      blogs.map((blog) => getBlogArticlesByHandleForSitemap(blog.handle))
    )
  ).flat();
  
  const blogsRoutes = articles.map((article) => ({
    url: `${baseUrl}${article.url}`,
    lastModified: article.publishedAt ?? new Date().toISOString(),
  }));
  


  let fetchedRoutes: Route[] = [];

  try {
    fetchedRoutes = (await Promise.all([collectionsPromise, productsPromise, pagesPromise])).flat();
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }

  const spanishCollections = await collectionsPromise;

  const spanishRoutes: Route[] = [
    {
      url: `${baseUrl}/es`,
      lastModified: new Date().toISOString(),
    },
    ...spanishCollections.map((collection) => ({
      url: `${baseUrl}/es${collection.url.slice(baseUrl.length)}`,
      lastModified: collection.lastModified,
    })),
  ];

  const localizedProducts = (await productsPromise).flatMap((product) =>
    ['fr', 'es'].map((locale) => ({
      url: `${baseUrl}/${locale}${product.url.slice(baseUrl.length)}`,
      lastModified: product.lastModified,
    })),
  );

  return [...routesMap, ...fetchedRoutes, ...spanishRoutes, ...localizedProducts, ...blogsRoutes];
}

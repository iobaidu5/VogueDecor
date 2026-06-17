import { getBaseUrl } from '../site-url';
import type { Product } from '../shopify/types';

type SchemaOffer = {
  '@type': 'Offer';
  url: string;
  priceCurrency: string;
  price: string;
  availability: string;
  itemCondition: string;
  sku?: string;
};

export function buildProductSchema(product: Product) {
  const baseUrl = getBaseUrl();
  const productUrl = `${baseUrl}/product/${product.handle}`;
  const images = product.images.map((img) => img.url).filter(Boolean);

  const minPrice = product.priceRange.minVariantPrice.amount;
  const maxPrice = product.priceRange.maxVariantPrice.amount;
  const currency = product.priceRange.maxVariantPrice.currencyCode;

  const availability = product.availableForSale
    ? 'https://schema.org/InStock'
    : 'https://schema.org/OutOfStock';

  const offers =
    minPrice !== maxPrice
      ? {
          '@type': 'AggregateOffer' as const,
          url: productUrl,
          priceCurrency: currency,
          lowPrice: minPrice,
          highPrice: maxPrice,
          offerCount: product.variants.length,
          availability,
          itemCondition: 'https://schema.org/NewCondition',
        }
      : ({
          '@type': 'Offer',
          url: productUrl,
          priceCurrency: currency,
          price: maxPrice,
          availability,
          itemCondition: 'https://schema.org/NewCondition',
          sku: product.variants[0]?.sku,
        } satisfies SchemaOffer);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.seo.title || product.title,
    description: product.seo.description || product.description,
    image: images.length > 0 ? images : undefined,
    sku: product.variants[0]?.sku,
    brand: {
      '@type': 'Brand',
      name: 'Vogue Decor',
    },
    url: productUrl,
    offers,
  };
}

export function buildProductBreadcrumbSchema(
  product: Product,
  collectionHandle?: string,
) {
  const baseUrl = getBaseUrl();
  const collection = collectionHandle ?? product.collections[0]?.handle;

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: baseUrl,
    },
  ];

  if (collection) {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: product.collections[0]?.title ?? collection,
      item: `${baseUrl}/${collection}`,
    });
  }

  items.push({
    '@type': 'ListItem',
    position: items.length + 1,
    name: product.title,
    item: `${baseUrl}/product/${product.handle}`,
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

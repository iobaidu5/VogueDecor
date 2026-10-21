import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';

export async function getCollectionPageProducts(collection: string): Promise<Product[]> {
  try {
    return await getCollectionProducts(
      collection === 'new-arrivals'
        ? { collection, sortKey: 'CREATED_AT', reverse: true }
        : { collection },
    );
  } catch (error) {
    console.error(`Unable to load collection "${collection}":`, error);
    return [];
  }
}

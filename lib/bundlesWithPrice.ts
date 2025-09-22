// lib/bundlesWithPrice.ts
import { getProductsByIds } from "lib/shopify/product";

export async function getBundleWithPrice(bundle: any) {
  let totalPrice = 0;

  if (bundle.items?.length) {
    const productIds = bundle.items.map((item: any) => item.productId);
    const products = await getProductsByIds(productIds);

    const safeProducts = products.map((p: any) => ({
      id: p.id,
      title: p.title,
      price: parseFloat(p.priceRange.minVariantPrice.amount),
    }));

    totalPrice = safeProducts.reduce((sum, p) => sum + p.price, 0);
  }

  return {
    ...bundle,
    totalPrice,
  };
}

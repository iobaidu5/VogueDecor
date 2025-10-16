// lib/bundlesWithPrice.ts
import { getProductsByIds } from "lib/shopify/product";

export async function getBundleWithPrice(bundle: any) {
  let totalPrice = 0;

  if (bundle.items?.length) {
    const productIds = bundle.items.map((item: any) => item.productId);
    const products = await getProductsByIds(productIds);

    // Map product info safely
    const safeProducts = products.map((p: any) => ({
      id: p.id,
      title: p.title,
      price: parseFloat(p.priceRange.minVariantPrice.amount),
    }));

    // Calculate total based on quantity
    totalPrice = bundle.items.reduce((sum: number, item: any) => {
      const product = safeProducts.find((p) => p.id === item.productId);
      if (product) {
        return sum + product.price * (item.quantity || 1);
      }
      return sum;
    }, 0);
  }

  return {
    ...bundle,
    totalPrice,
  };
}

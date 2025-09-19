import BundleDetailClient from "components/BundleDetailClient";
import { getBundleBySlug } from "lib/bundles";
import { getProductsByIds } from "lib/shopify/product";

export default async function BundleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const bundle = await getBundleBySlug(slug);

  if (!bundle) {
    return (
      <div className="p-6 text-center text-gray-500">Bundle not found.</div>
    );
  }

  let totalPrice = 0;
  let discountApplied = false;
  let discountedPrice = 0;

  let safeProducts: { id: string; title: string; price: number }[] = [];

  if (bundle.items?.length) {
    const productIds = bundle.items.map((item: any) => item.productId);
    const products = await getProductsByIds(productIds);

    safeProducts = products.map((p: any) => ({
      id: p.id,
      title: p.title,
      price: parseFloat(p.priceRange.minVariantPrice.amount),
    }));

    totalPrice = safeProducts.reduce((sum, product) => sum + product.price, 0);

    if (safeProducts.length >= 2) {
      discountApplied = true;
      discountedPrice = totalPrice * 0.93;
    }
  }

  return (
    <BundleDetailClient
      bundle={{
        id: bundle._id?.toString?.() ?? bundle.id,
        title: bundle.title,
        description: bundle.description,
        imageUrl: bundle.imageUrl,
        items: bundle.items ?? [],
        slug: bundle.slug ?? ""
      }}
      totalPrice={totalPrice}
      discountApplied={discountApplied}
      discountedPrice={discountedPrice}
    />
  );
  
}

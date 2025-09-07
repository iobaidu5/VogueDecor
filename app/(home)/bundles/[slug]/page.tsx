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

  if (bundle.items?.length) {
    const productIds = bundle.items.map((item: any) => item.productId);
    const products = await getProductsByIds(productIds);

    totalPrice = products.reduce((sum: number, product: any) => {
      return sum + parseFloat(product.priceRange.minVariantPrice.amount);
    }, 0);

    if (products.length >= 3) {
      discountApplied = true;
      discountedPrice = totalPrice * 0.95;
    }
  }

  return (
    <BundleDetailClient
      bundle={bundle}
      totalPrice={totalPrice}
      discountApplied={discountApplied}
      discountedPrice={discountedPrice}
    />
  );
}

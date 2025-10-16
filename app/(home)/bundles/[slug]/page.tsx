"use client";

import BundleDetailClient from "components/BundleDetailClient";
import { getBundleBySlug, listBundles } from "lib/bundles";
import { getBundleWithPrice } from "lib/bundlesWithPrice";
import { getProductsByIds } from "lib/shopify/product";
import { useSearchParams } from 'next/navigation';

export default async function BundleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const bundle = await getBundleBySlug(slug);
  const bundles = await listBundles();
  console.log("111111 -> ", bundle)
  console.log("bundles -> ", bundles)
  const bundlesWithPrice = await Promise.all(bundles.map(getBundleWithPrice));
  const searchParams = useSearchParams();
  var totalPrice = searchParams.get('totalPrice') ?? "0";

  console.log("bundlesWithPrice -> ", bundlesWithPrice)

  if (!bundle) {
    return (
      <div className="p-6 text-center text-gray-500">Bundle not found.</div>
    );
  }

  // let totalPrice = 0;
  // let discountApplied = false;
  // let discountedPrice = 0;

  // let safeProducts: { id: string; title: string; price: number }[] = [];

  // if (bundle.items?.length) {
  //   const productIds = bundle.items.map((item: any) => item.productId);
  //   const products = await getProductsByIds(productIds);

  //   safeProducts = products.map((p: any) => ({
  //     id: p.id,
  //     title: p.title,
  //     price: parseFloat(p.priceRange.minVariantPrice.amount),
  //   }));

  //   totalPrice = safeProducts.reduce((sum, product) => sum + product.price, 0);

  //   if (safeProducts.length >= 2) {
  //     discountApplied = true;
  //     discountedPrice = totalPrice * 0.93;
  //   }
  //}

  return (
    <div className="px-4 py-16 xs:py-20 md:px-10 lg:px-40">
    <BundleDetailClient
      bundle={{
        id: bundle._id?.toString?.() ?? bundle.id,
        title: bundle.title,
        description: bundle.description,
        imageUrl: bundle.imageUrl,
        items: bundle.items ?? [],
        slug: bundle.slug ?? "",
      }}
      totalPrice={totalPrice}
      // discountApplied={discountApplied}
      // discountedPrice={discountedPrice}
      allBundles={bundlesWithPrice}
    />
    </div>
  );
  
}

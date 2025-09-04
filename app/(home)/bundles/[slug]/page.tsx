import { getBundleBySlug } from "lib/bundles";
import Image from "next/image";
import BundleCard from "components/BundleCard";
import { AddToCart } from "components/cart/add-to-cart";
import { ProductProvider } from "components/product/product-context";
import CartModal from "components/cart/modal";
import { getProductsByIds } from "lib/shopify/product";
import DiscountForm from "components/DiscountForm";


export default async function BundleDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bundle = await getBundleBySlug(slug);

  if (!bundle)
    return (
      <div className="p-6 text-center text-gray-500">
        Bundle not found.
      </div>
    );

  // Calculate total price of all products in the bundle
  let totalPrice = 0;
  if (bundle.items?.length) {
    const productIds = bundle.items.map((item: any) => item.productId);
    const products = await getProductsByIds(productIds);
    
    totalPrice = products.reduce((sum: number, product: any) => {
      return sum + parseFloat(product.priceRange.minVariantPrice.amount);
    }, 0);
  }

  const displayPrice = bundle.bundlePrice || totalPrice;

  return (
    <ProductProvider>
      <main className="container mx-auto p-6 grid gap-10 md:grid-cols-2">
        {/* Left side: Image */}
        <div className="flex justify-center">
          {bundle.imageUrl ? (
            <Image
              src={bundle.imageUrl}
              alt={bundle.title}
              width={500}
              height={500}
              className="rounded-2xl object-cover shadow-md"
            />
          ) : (
            <div className="w-full h-80 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
              No image available
            </div>
          )}
        </div>

        {/* Right side: Bundle Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold">{bundle.title}</h1>
            {bundle.description && (
              <p className="mt-2 text-gray-600">{bundle.description}</p>
            )}
          </div>

          {/* Price display */}
          <div className="space-y-2">
            {(
              <div className="text-3xl font-semibold text-green-600">
                ${totalPrice.toFixed(2)}
              </div>
            )}
          </div>

          {/* Discount code input */}
          {bundle.discountCode && (
            <DiscountForm 
              bundleDiscountCode={bundle.discountCode} 
              originalPrice={displayPrice}
              bundlePrice={totalPrice}
            />
          )}

          <div>
            <ul className="space-y-3">
              <BundleCard bundle={bundle} />
            </ul>
          </div>

          <div className="flex justify-end md:w-1/3">
            <CartModal />
          </div>
        </div>
      </main>
    </ProductProvider>
  );
}
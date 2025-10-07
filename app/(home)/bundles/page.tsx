// app/bundles/page.tsx
import { listBundles } from 'lib/bundles';
import { getBundleWithPrice } from "lib/bundlesWithPrice";
import AllBundleCard from 'components/AllBundleCard';

export default async function BundlesPage() {
  const bundles = await listBundles();
  const bundlesWithPrice = await Promise.all(bundles.map(getBundleWithPrice));

  return (
    <section className="container mx-auto w-100 p-6">
      {bundles.length === 0 ? (
        <p className="py-3 text-center text-lg">No bundles found</p>
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col space-y-1 pt-5 mt-2">
            <p className="text-[23px] font-medium capitalize text-gray-700">
              Bundles
            </p>
            <p className="text-xs md:text-sm lg991:text-medium text-gray-700">
              <span className="capitalize text-gray-500">
                Discover Vogue Decor’s chic bundles for timeless elegance
              </span>
            </p>
          </div>

          {/* Grid */}
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {bundlesWithPrice.map((b: any) => (
              <AllBundleCard key={b.id} bundle={b} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

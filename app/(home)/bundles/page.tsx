import { listBundles } from 'lib/bundles';
import Link from 'next/link';

export default async function BundlesPage() {
  const bundles = await listBundles();

  return (
    <section className="container mx-auto w-100 p-6">
      {bundles.length === 0 ? (
        <p className="py-3 text-center text-lg">
          No bundles found
        </p>
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
            {bundles.map((b: any) => (
              <Link
                key={b.id}
                href={`/bundles/${b.slug}`}
                className="rounded-2xl border p-4 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                {b.imageUrl && (
                  <img
                    src={b.imageUrl}
                    alt={b.title}
                    className="rounded-md mb-3 w-full h-50 object-cover"
                  />
                )}
                <h2 className="text-lg font-medium text-gray-700">{b.title}</h2>
                {b.description && (
                  <p className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-2">
                    {b.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

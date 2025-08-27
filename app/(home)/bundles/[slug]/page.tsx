import { getBundleBySlug } from "lib/bundles";
import Image from "next/image";
import BundleCard from "components/BundleCard";

export default async function BundleDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;


  console.log("slug -> ", slug)

  const bundle = await getBundleBySlug(slug);

  console.log("bundle -> ", bundle)

  if (!bundle)
    return (
      <div className="p-6 text-center text-gray-500">
        Bundle not found.
      </div>
    );

  return (
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

        {bundle.bundlePrice && (
          <div className="text-3xl font-semibold text-green-600">
            ${bundle.bundlePrice.toString()}
          </div>
        )}

        <div>
          <ul className="space-y-3">
            <BundleCard bundle={bundle} />
          </ul>
        </div>

        {/* ✅ Client Component button */}
        {/* <AddBundleButton slug={bundle.slug} /> */}
      </div>
    </main>
  );
}

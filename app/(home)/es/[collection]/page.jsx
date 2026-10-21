import CategoryPageClient from 'components/category-page-client';
import { metaInfoEs } from 'lib/meta-es';
import { getBaseUrl } from 'lib/site-url';
import { getCollectionPageProducts } from 'lib/collection-page-products';

export async function generateMetadata({ params }) {
  const { collection } = await params;
  const meta = metaInfoEs[collection] ?? metaInfoEs.home;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${getBaseUrl()}/es/${collection}`,
    },
  };
}

export default async function SpanishCategoryPage({ params }) {
  const { collection } = await params;
  const products = await getCollectionPageProducts(collection);

  return (
    <div className="mx-auto flex flex-col gap-8 pb-4 text-black xs:px-[15px] xs:py-[0px] md:flex-row md:px-[60px] md:py-[0px] dark:text-white">
      <CategoryPageClient collection={collection} initialProducts={products} />
    </div>
  );
}

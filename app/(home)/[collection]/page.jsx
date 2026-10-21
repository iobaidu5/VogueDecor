import CategoryPageClient from 'components/category-page-client';
import { metaInfo } from "lib/meta";
import { getBaseUrl } from 'lib/site-url';
import { getCollectionPageProducts } from 'lib/collection-page-products';

// generateMetadata must await params
export async function generateMetadata({ params }) {
  // Await the params promise
  const { collection } = await params;
  const meta = metaInfo[collection] ?? metaInfo.home;
  const baseUrl = getBaseUrl();

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${baseUrl}/${collection}`,
    },
  };
}

// Page component must also await params
export default async function CategoryPage({ params }) {
  // Await the params promise
  const { collection } = await params;
  const products = await getCollectionPageProducts(collection);
  
  return (
    <div className='mx-auto flex flex-col gap-8 pb-4 text-black xs:px-[15px] xs:py-[0px] md:flex-row md:px-[100px] md:px-[60px] md:py-[0px] dark:text-white'>
      <CategoryPageClient collection={collection} initialProducts={products} />
    </div>
  )
}

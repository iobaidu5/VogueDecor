import CategoryPageClient from 'components/category-page-client';
import { metaInfo } from 'lib/meta';
import { getBaseUrl } from 'lib/site-url';

export async function generateMetadata({ params }) {
  const { collection } = await params;
  const meta = metaInfo[collection] ?? metaInfo.home;
  const baseUrl = getBaseUrl();

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${baseUrl}/fr/${collection}`,
    },
  };
}

export default async function CategoryPage({ params }) {
  try {
    // Await the params promise
    const { collection } = await params;
    return (
      <div className='mx-auto flex flex-col gap-8 pb-4 text-black xs:px-[15px] xs:py-[0px] md:flex-row md:px-[100px] md:px-[60px] md:py-[0px] dark:text-white'>
        <CategoryPageClient collection={collection} />
      </div>
    );
  } catch (error) {
    console.error('Error getting params:', error);
    return (
      <div className='mx-auto flex flex-col gap-8 pb-4 text-black xs:px-[15px] xs:py-[0px] md:flex-row md:px-[100px] md:px-[60px] md:py-[0px] dark:text-white'>
        <p>Error loading collection</p>
      </div>
    );
  }
}
import CategoryPageClient from 'components/category-page-client';

export default async function CategoryPage({ params }) {
  // const collection = params.collection;
  const { collection } = params;
  return (
    <div className='mx-auto flex flex-col gap-8 pb-4 text-black xs:px-[15px] xs:py-[0px] md:flex-row md:px-[100px] md:px-[60px] md:py-[0px] dark:text-white'>
      <CategoryPageClient collection={collection} />
    </div>
  );
}
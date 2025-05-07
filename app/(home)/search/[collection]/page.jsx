import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getCollectionProducts } from 'lib/shopify';
import BreadCrumb from 'components/breadCrum/index';

export default async function CategoryPage(props) {
  // Await the dynamic params promise to get the actual object.
  const paramsData = await props.params;
  // Await searchParams if it's a promise.
  const searchParamsData =
    props.searchParams instanceof Promise ? await props.searchParams : props.searchParams;

  // Now safely access the properties.
  const sort = (searchParamsData || {}).sort;
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getCollectionProducts({
    collection: paramsData.collection,
    sortKey,
    reverse
  });

  return (
    <>
      <section className="container mx-auto w-100">
        {products.length === 0 ? (
          <p className="py-3 text-center text-lg">No products found in this collection</p>
        ) : (
          <>
            {paramsData?.collection ? <BreadCrumb currentPage={paramsData?.collection} /> : null}
            <div className="flex items-start justify-between pt-5 mt-2">
              <div className="flex flex-col space-y-1">
                <p className="text-[23px] font-medium uppercase text-gray-700">
                  {paramsData?.collection}
                </p>
                <p className="text-gray-700">
                  Discover Vogue Decor's chic {paramsData?.collection} for timeless elegance
                </p>
              </div>
            </div>

            <div className=''>
              <ProductGridItems products={products} />
            </div>
          </>
        )}
      </section>
    </>
  );
}

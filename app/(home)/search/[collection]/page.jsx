import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getCollectionProducts } from 'lib/shopify';

export default async function CategoryPage(props) {
  // Await the dynamic params promise to get the actual object.
  const paramsData = await props.params;
  // Await searchParams if it's a promise.
  const searchParamsData =
    props.searchParams instanceof Promise
      ? await props.searchParams
      : props.searchParams;
      
  // Now safely access the properties.
  const sort = (searchParamsData || {}).sort;
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getCollectionProducts({
    collection: paramsData.collection,
    sortKey,
    reverse,
  });

  return (
    <>
      <section className="">
        {products.length === 0 ? (
          <p className="py-3 text-center text-lg">
            No products found in this collection
          </p>
        ) : (
          <div>
            <ProductGridItems products={products} />
          </div>
        )}
      </section>
    </>
  );
}

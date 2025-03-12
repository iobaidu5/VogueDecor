import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getCollectionProducts } from 'lib/shopify';

export default async function CategoryPage(props: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Await the dynamic parameters individually
  const params = await props.params;
  const searchParams = await props.searchParams;

  // Now it’s safe to access properties
  const sort = (searchParams as { [key: string]: string })?.sort;
  const { sortKey, reverse } =
    sorting?.find((item) => item?.slug === sort) || defaultSort;

  const products = await getCollectionProducts({
    collection: params.collection,
    sortKey,
    reverse
  });

  return (
    <>
      <section className="">
        {products.length === 0 ? (
          <p className="py-3 text-center text-lg">{`No products found in this collection`}</p>
        ) : (
          // <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          //   <ProductGridItems products={products} />
          // </Grid>
          <div>
            <ProductGridItems products={products} />
          </div>
        )}
      </section>
    </>
  );
}

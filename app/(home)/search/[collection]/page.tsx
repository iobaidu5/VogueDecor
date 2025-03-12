import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getCollectionProducts } from 'lib/shopify';

interface CategoryPageProps {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function CategoryPage(props: CategoryPageProps) {
  // Await the entire props object before destructuring its properties.
  const { params, searchParams } = await props;

  // Now it’s safe to access properties
  const sort = (searchParams || {}).sort as string | undefined;
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getCollectionProducts({
    collection: params.collection,
    sortKey,
    reverse,
  });

  return (
    <>
      <section className="">
        {products.length === 0 ? (
          <p className="py-3 text-center text-lg">
            {`No products found in this collection`}
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

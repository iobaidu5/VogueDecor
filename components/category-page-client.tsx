"use client";
import { useState, useEffect } from 'react';
import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { getCollectionProducts } from 'lib/shopify';
import BreadCrumb from 'components/breadCrum/index';
import FilterDropdown from 'components/filter-dropdown';
import { Collection } from 'lib/shopify/types';


type CategoryPageClientProps = {
  collection: Collection;
};

export default function CategoryPageClient({ collection }: CategoryPageClientProps) {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const fetched = await getCollectionProducts({ collection }: { collection: any });
      setAllProducts(fetched);
      setProducts(fetched);
      setLoading(false);
    }
    fetchData();
  }, [collection]);

  useEffect(() => {
    let sorted = [...allProducts];
    switch (filter) {
      case 'az':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'price-asc':
        sorted.sort(
          (a, b) =>
            parseFloat(a.priceRange.maxVariantPrice.amount) -
            parseFloat(b.priceRange.maxVariantPrice.amount)
        );
        break;
      case 'price-desc':
        sorted.sort(
          (a, b) =>
            parseFloat(b.priceRange.maxVariantPrice.amount) -
            parseFloat(a.priceRange.maxVariantPrice.amount)
        );
        break;
      case 'availability':
        sorted.sort((a, b) =>
          a.availableForSale === b.availableForSale
            ? 0
            : a.availableForSale
            ? -1
            : 1
        );
        break;
      default:
        // Default sorting by title groups when no filter is selected
        sorted.sort((a, b) => {
          const groupA = a.title.split(' - ')[0];
          const groupB = b.title.split(' - ')[0];
          if (groupA < groupB) return -1;
          if (groupA > groupB) return 1;
          return a.title.localeCompare(b.title);
        });
        break;
    }
    setProducts(sorted);
  }, [filter, allProducts]);

  if (loading) return <p className="py-3 text-center">Loading...</p>;

  return (
    <section className="container mx-auto w-100">
      {products.length === 0 ? (
        <p className="py-3 text-center text-lg">
          No products found in this collection
        </p>
      ) : (
        <>
          <BreadCrumb currentPage={collection} />
          <div className="flex items-start justify-between pt-5 mt-2">
            <div className="flex flex-col space-y-1">
              <p className="text-[23px] font-medium uppercase text-gray-700">
                {collection}
              </p>
              <p className="text-gray-700">
                Discover Vogue Decor's chic {collection} for timeless elegance
              </p>
            </div>
            <FilterDropdown selected={filter} onFilter={setFilter} />
          </div>
          <div className="mt-4">
            <ProductGridItems products={products} />
          </div>
        </>
      )}
    </section>
  );
}
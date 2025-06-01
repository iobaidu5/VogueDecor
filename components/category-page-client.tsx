'use client';

import { useState, useEffect } from 'react';
import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { getCollectionProducts } from 'lib/shopify';
import BreadCrumb from 'components/breadCrum/index';
import FilterDropdown from 'components/filter-dropdown';
import type { Collection, Product } from 'lib/shopify/types';
import i18n from '../lib/i18nClient';
import { useTranslation } from 'react-i18next';
import ArticleRenderer from "components/ArticleRenderer"
import { barstools, barstoolsFr, chairs, chairsFr, tabletops, tabletopsFr, tablebases, tablebasesFr, outdoor, outdoorFr, sale, saleFr } from "../old-site-text/index";
import { useParams } from 'next/navigation';

type CategoryPageClientProps = {
  collection: any;
};


export default function CategoryPageClient({ collection }: CategoryPageClientProps) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('');
  const [showContent, setShowContent] = useState(false);
  const { t, ready } = useTranslation('common');
  const { i18n } = useTranslation();
  var content: any = [];


  const params = useParams();
  const collection2: any = params.collection;

  if (collection2 === "chairs" && i18n.language === 'en') {
    content = chairs;
  } else if (collection2 === "barstools" && i18n.language === 'en') {
    content = barstools
  } else if (collection2 === "table-tops" && i18n.language === 'en') {
    content = tabletops
  } else if (collection2 === "table-bases" && i18n.language === 'en') {
    content = tablebases
  } else if (collection2 === "outdoor-furniture" && i18n.language === 'en') {
    content = outdoor
  } else if (collection2 === "sale" && i18n.language === 'en') {
    content = sale
  } else if (collection2 === "chairs" && i18n.language === 'fr') {
    content = chairsFr;
  } else if (collection2 === "barstools" && i18n.language === 'fr') {
    content = barstoolsFr
  } else if (collection2 === "table-tops" && i18n.language === 'fr') {
    content = tabletopsFr
  } else if (collection2 === "table-bases" && i18n.language === 'fr') {
    content = tablebasesFr
  } else if (collection2 === "outdoor-furniture" && i18n.language === 'fr') {
    content = outdoorFr
  } else if (collection2 === "sale" && i18n.language === 'fr') {
    content = saleFr
  } else {
    content = []
  }

  <i></i>

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const fetched = await getCollectionProducts({ collection });
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
        sorted.sort((a, b) => {
          const groupA = a.title?.split(' - ')[0] ?? '';
          const groupB = b.title?.split(' - ')[0] ?? '';
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
              <p className="text-[23px] font-medium capitalize text-gray-700">
                {collection &&
                  t(
                    `footer.${collection
                      .split('-')
                      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}`
                  )}
              </p>
              <p className="text-sm lg991:text-medium text-gray-700">

                <span className="capitalize text-gray-500">
                  {t("Discover Vogue Decor's chic") + ' ' +
                    t(
                      `footer.${collection
                        .split('-')
                        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}`
                    ) + ' ' +
                    t("for timeless elegance")}
                </span>
              </p>
            </div>
            <FilterDropdown selected={filter} onFilter={setFilter} />
          </div>
          <div className="mt-4">
            <ProductGridItems products={products} collection={collection2} />
          </div>

          <div className='mb-4'>
            <h3 className="w-full text-xs lg:text-sm md:text-base lg:font-medium text-black">
              <span className='uppercase'>{t(`menu.${collection2}`)} {t(`byBrand`)}</span><br />
              <span>{t(`about`)} <span className='capitalize'>{t(`menu.${collection2}`)}</span></span>
            </h3>

            <div
              className={`transition-all duration-1000 ease-in-out overflow-hidden ${showContent ? 'max-h-[full] opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}
            >
              <ArticleRenderer content={content} />
            </div>

            <button
              className="font-poppins font-medium mt-3 text-sm text-black hover:underline"
              onClick={() => setShowContent(!showContent)}
            >
              {showContent ? t('toggle.readLess') : t('toggle.readMore')}
            </button>
          </div>
        </>
      )}
    </section>
  );
}
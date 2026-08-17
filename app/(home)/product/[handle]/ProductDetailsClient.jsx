"use client";

import i18n from '../../../../lib/i18nClient';
import { useTranslation } from 'react-i18next';
import { productName } from 'lib/product-name';
import { AddToCart } from 'components/cart/add-to-cart';
import Quantity from 'components/product/quantity';
import Price from 'components/price';
import Accordion from 'components/accordian';
import parse from 'html-react-parser';
import { splitProductDescription } from 'lib/product-details-html';
import Image from 'next/image';
import Econolease from "media/png/econolease.jpeg"
import { AddToWishlist } from 'components/add-to-wishlist';
import { Suspense } from 'react';
import { Gallery } from 'components/product/gallery';
import { VariantSelector } from 'components/product/variant-selector';
import Prose from 'components/prose';
import { BsHeart } from 'react-icons/bs';
import { GridTileImage } from 'components/grid/tile';
import Link from 'next/link';
import SingleBreadCrumb from './SingleBreadCrumb';
import { useSearchParams } from 'next/navigation';
import { useCollection } from 'lib/CollectionContext';

export default function ProductDetailsClient({ product }) {
  const { t, ready } = useTranslation('common');
  const searchParams = useSearchParams();
  const { collection } = useCollection()
  // const collection = searchParams.get('collection') || '...';

  // const extractFeatures = (htmlString) => {
  //   const marker = '<strong>Materials:<br></strong>' || '<strong>Materials:<br>';
  //   const index = htmlString.indexOf(marker);
  //   if (index === -1) return '';

  //   let sliced = htmlString.slice(index);

  //   // Add <br> after the first "Materials:" only
  //   sliced = sliced.replace(marker, `${marker}`);

  //   // Add <br> before all subsequent <strong> tags (except the first one)
  //   sliced = sliced.replace(/(<strong>(?!Materials:))/g, '<br>$1');

  //   sliced = sliced.replace(/\s*style="[^"]*"/g, '');


  //   return sliced;
  // };

  const { descriptionHtml, detailsHtml } = splitProductDescription(
    product?.descriptionHtml || '',
    product?.description || '',
  );

  const descriptionContent = parse(descriptionHtml);
  const detailsContent = parse(detailsHtml);

  return (
    <>
      <SingleBreadCrumb title={product?.title} collection={collection} />
      <div className="flex flex-col gap-4 rounded-lg bg-white lg:flex-row lg:items-start lg:gap-12">
        <div className="w-full lg:w-8/12">
          <Suspense
            fallback={<div className="relative aspect-square h-full w-full overflow-hidden" />}
          >
            <Gallery
              images={product?.images?.slice(0, 5)?.map((image) => ({
                src: image.url,
                altText: image.altText
              }))}
            />
          </Suspense>
        </div>

        <div className="flex w-full flex-col items-start lg:w-4/12">
          <Suspense fallback={null}>
            <div className="mb-4 w-full pb-4">
              <h1 className="font-medium xs:text-xl md:text-2xl overflow-hidden text-clip sm:whitespace-normal md:whitespace-normal">
                {productName(t, product.title)}
              </h1>

              <h5 className="font-normal xs:text-[15px] md:text-[15px] text-[#818181]">#{product?.variants[0]?.sku}</h5>
              <div className="mt-2 inline-block rounded-full text-lg text-gray-400">
                <Price
                  amount={Number(product?.variants[0]?.compareAtPrice?.amount)}
                  currencyCode={product?.priceRange?.maxVariantPrice?.currencyCode}
                  className='text-xl font-small md:text-xl mt-5 text-[#000] overflow-hidden flex items-center gap-2'
                  sale={product?.priceRange.maxVariantPrice?.amount}
                  saleCurreny={product?.variants[0]?.compareAtPrice?.currencyCode}
                />

              </div>
              {collection === "clearance" && (
              <p className="px-3 py-1 whitespace-nowrap mt-4 text-sm w-auto text-center lg:w-[80%] font-semibold text-gray-700 bg-[#ffed00] rounded-full animate-[pump_1.6s_ease-in-out_infinite]">
                
                {t(`Clearance: Final Sale`)}
              </p>
              )}


            </div>
            <div className="flex flex-col flex-wrap items-start gap-4">

              <div className="flex justify-center items-center gap-4">
                <Quantity item={product} />
                <div className="flex items-center space-x-3">
                  {/* Quantity badge */}

                  {collection === "clearance" && (
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium shadow-sm ${(product?.variants[0]?.quantityAvailable ?? 0) > 0
                        ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                        : "bg-red-50 text-red-700 ring-1 ring-red-200"
                        }`}
                    >
                      {product?.variants[0]?.quantityAvailable ?? "N/A"}
                    </span>
                  )}

                  {/* Availability text */}
                  <p
                    className={`text-sm font-medium ${product?.availableForSale
                      ? "text-green-700"
                      : "text-red-700"
                      }`}
                  >
                    {product?.availableForSale ? "IN STOCK" : "OUT OF STOCK"}
                  </p>
                </div>

              </div>

              <div className="flex flex-nowrap items-start gap-4">
                <AddToCart product={product} />
                <AddToWishlist product={product} />
              </div>
            </div>

            <div className="w-full space-y-4 xs:mt-4 md:mt-8">
              <div className="border-b border-black/80">
                <Accordion
                  title={t("DESCRIPTION")}
                  content={descriptionContent}
                  contentClassName="product-description-content"
                  defaultOpen
                />
              </div>
              <div className="border-b border-black/80">
                <Accordion
                  title={t("DETAILS")}
                  content={detailsContent}
                  contentClassName="product-details-content"
                  defaultOpen
                />
              </div>
              {/* <div className="border-b border-black/80">
                <Accordion
                  title={t("AVAILABILITY")}
                  content={product?.availableForSale ? 'In-Stock' : 'Out of Stock'}
                />
              </div> */}
            </div>
            <div className="mt-6 flex justify-center sm:justify-start items-center gap-4 sm:flex-row sm:items-center">
              {/* <Link href="/voguedecor-calculator" className="text-[#7DA6DD] underline">
                {t(`payMonthlyWith`)}
              </Link> */}

              <Link
                href={{
                  pathname: "/financing",
                  query: { amount: product?.priceRange.maxVariantPrice?.amount ? product?.priceRange.maxVariantPrice?.amount : Number(product?.variants[0]?.compareAtPrice?.amount) },
                }}
                className="text-[#7DA6DD] underline"
              >
                {t(`payMonthlyWith`)}
              </Link>
              <Image src={Econolease} alt="Econolease" width={120} height={40} />
            </div>

            <VariantSelector options={product.options} variants={product.variants} />
          </Suspense>
        </div>
      </div>
    </>
  );
}


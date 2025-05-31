"use client";

import i18n from '../lib/i18nClient';
import { useTranslation } from 'react-i18next';
import { AddToCart } from 'components/cart/add-to-cart';
import Quantity from 'components/product/quantity';
import Price from 'components/price';
import Accordion from 'components/accordian';
import parse from 'html-react-parser';
import Image from 'next/image';
import SilverChef from 'media/png/silverChef.png';
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

export default function ProductDetailsClient({ product }) {
  const { t, ready } = useTranslation('common');
  const searchParams = useSearchParams();
  const collection = searchParams.get('collection') || '...';

  const extractFeatures = (htmlString) => {
    const marker = '<strong>Features:</strong>';
    const index = htmlString.indexOf(marker);
    if (index === -1) return '';

    let sliced = htmlString.slice(index);

    // Add <br> after the first "Features:" only
    sliced = sliced.replace(marker, `${marker}`);

    // Add <br> before all subsequent <strong> tags (except the first one)
    sliced = sliced.replace(/(<strong>(?!Features:))/g, '<br>$1');

    return sliced;
  };

  function extractBeforeFeatures(text) {
    const splitText = text?.split('Features:');
    return splitText[0]?.trim();
  }

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
                {t(`products.${product.title}`)}
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
            </div>
            <div className="flex flex-col flex-wrap items-start gap-4">
              <Quantity />
              <div className="flex flex-nowrap items-start gap-4">
                <AddToCart product={product} />
                <AddToWishlist product={product} />
              </div>
            </div>

            <div className="w-full space-y-4 xs:mt-4 md:mt-8">
              <div className="border-b border-black/80">
                <Accordion
                  title={t("DESCRIPTION")}
                  content={extractBeforeFeatures(product?.description)}
                />
              </div>
              <div className="border-b border-black/80">
                <Accordion
                  title={t("DETAILS")}
                  content={parse(extractFeatures(product?.descriptionHtml))}
                />
              </div>
              <div className="border-b border-black/80">
                <Accordion
                  title={t("AVAILABILITY")}
                  content={product?.availableForSale ? 'In-Stock' : 'Out of Stock'}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-center sm:justify-start items-center gap-4 sm:flex-row sm:items-center">
              <Link href="/voguedecor-calculator" className="text-[#7DA6DD] underline">
                {t(`payMonthlyWith`)}
              </Link>
              <Image src={SilverChef} alt="SilverChef" width={120} height={40} />
            </div>

            <VariantSelector options={product.options} variants={product.variants} />
          </Suspense>
        </div>
      </div>
    </>
  );
}


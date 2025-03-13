import ProductType from 'screens/productType';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getProduct, getProductRecommendations } from 'lib/shopify';
import { ProductProvider } from 'components/product/product-context';
// import { Image } from 'lib/shopify/types';
import { Gallery } from 'components/product/gallery';
import { VariantSelector } from 'components/product/variant-selector';
import Price from 'components/price';
import Prose from 'components/prose';
import { AddToCart } from 'components/cart/add-to-cart';
import Quantity from 'components/product/quantity';
import Image from 'next/image';
import { BsHeart } from 'react-icons/bs';
import Accordion from 'components/accordian';
import SilverChef from 'media/png/silverChef.png';
import parse from 'html-react-parser';
import { GridTileImage } from 'components/grid/tile';
import CartModal from 'components/cart/modal';
import Slider from 'components/slider';

export async function generateMetadata(props) {
  const params = await props.params;
  const handle = params.handle;
  const product = await getProduct(handle);
  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage(props) {
  const params = await props.params;
  const handle = params.handle;
  const product = await getProduct(handle);
  if (!product) return notFound();

  const extractFeatures = (htmlString) => {
    const parts = htmlString.split(
      '<span style="color: #333333;"><strong>Features:</strong></span>'
    );
    return parts?.length > 1 ? parts[1] : '';
  };

  function extractBeforeFeatures(text) {
    const splitText = text?.split('Features:');
    return splitText[0]?.trim();
  }

  return (
    <ProductProvider>
      <div className="px-2 py-10 xs:py-14 md:px-10 lg:px-20">
        <div className="flex flex-col gap-8 rounded-lg bg-white p-6 md:p-12 lg:flex-row lg:items-start">
          {/* Left Section - Images */}
          <div className="w-full lg:w-2/3">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={product?.images?.slice(0, 5)?.map((image) => ({
                  src: image.url,
                  altText: image.altText
                }))}
              />
            </Suspense>
          </div>

          {/* Right Section - Product Details */}
          <div className="flex w-full flex-col items-start lg:w-1/3">
            <Suspense fallback={null}>
              <div className="mb-4 w-full pb-4">
                <h1 className="font-medium xs:text-xl md:text-4xl">{product?.title}</h1>
                <div className="mt-2 inline-block rounded-full px-4 py-2 text-lg text-gray-400">
                  <Price
                    amount={product?.priceRange.maxVariantPrice?.amount}
                    currencyCode={product?.priceRange?.maxVariantPrice?.currencyCode}
                  />
                </div>
              </div>

              {/* Add to Cart & Quantity */}
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Quantity />
                <AddToCart product={product} />
                <div className="rounded-md bg-gray-200 p-2">
                  <BsHeart size={24} />
                </div>
              </div>

              {/* Accordions */}
              <div className="space-y-4 xs:mt-3 md:mt-6">
                <div className="border-y">
                  <Accordion
                    title="DESCRIPTION"
                    content={extractBeforeFeatures(product?.description)}
                  />
                </div>
                <div className="border-b">
                  <Accordion
                    title="DETAILS"
                    content={parse(extractFeatures(product?.descriptionHtml || ''))}
                  />
                </div>
                <div className="border-b">
                  <Accordion
                    title="AVAILABILITY"
                    content={product?.availableForSale ? 'In-Stock' : 'Out of Stock'}
                  />
                </div>
              </div>

              {/* Monthly Payment Option */}
              <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <a href="/" className="text-[#7DA6DD] underline">
                  Pay Monthly With
                </a>
                <Image src={SilverChef} alt="SilverChef" width={120} height={40} />
              </div>

              <VariantSelector options={product.options} variants={product.variants} />
            </Suspense>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-8">
          <RelatedProducts id={product.id} />
        </div>
      </div>

      {/* Floating Cart Modal (visible on larger screens) */}
      <div className="hidden justify-end md:flex md:w-1/3">
        <CartModal />
      </div>
    </ProductProvider>
  );
}

async function RelatedProducts({ id }) {
  const relatedProducts = await getProductRecommendations(id);
  if (!relatedProducts) return null;
  return <Slider data={relatedProducts} />;
}

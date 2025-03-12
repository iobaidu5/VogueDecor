import ProductType from 'screens/productType';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { Metadata } from 'next';
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
import addtocartIcon from 'media/svg/addToCardIcon.svg';

export async function generateMetadata({
  params
}: {
  params: any;
}): Promise<Metadata> {
  await Promise.resolve();
  const handle = await params.handle
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

export default async function ProductPage({ params }: { params: any; }) {
  const handle = await params.handle
  const product = await getProduct(handle);
  if (!product) return notFound();

  const extractFeatures = (htmlString: any) => {
    const parts = htmlString.split(
      '<span style="color: #333333;"><strong>Features:</strong></span>'
    );
    return parts.length > 1 ? parts[1] : '';
  };

  function extractBeforeFeatures(text: any) {
    const splitText = text.split('Features:');
    return splitText[0].trim();
  }

  return (
    <ProductProvider>
      <div className="px-4 py-20 md:px-10 lg:px-20">
        <div className="flex flex-col gap-8 rounded-lg bg-white p-6 md:p-12 lg:flex-row lg:items-start">
          {/* Left Section - Images */}
          <div className="w-full lg:w-2/3">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={product?.images?.slice(0, 5)?.map((image: any) => ({
                  src: image.url,
                  altText: image.altText
                }))}
              />
            </Suspense>
          </div>

          {/* Right Section - Product Details */}
          <div className="flex w-full flex-col items-start lg:w-1/3">
            <Suspense fallback={null}>
              <div className="mb-6 w-full pb-6">
                <h1 className="text-3xl font-medium md:text-4xl">{product.title}</h1>
                <div className="mt-2 inline-block rounded-full px-4 py-2 text-lg text-gray-400">
                  <Price
                    amount={product.priceRange.maxVariantPrice.amount}
                    currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                    // sale="104"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Quantity />
                {/* <button className="text-md flex items-center justify-center bg-black px-10 py-[8px] text-white">
                  Add to Cart
                </button> */}
                <AddToCart product={product} />
                <div className="bg-gray-200 p-2">
                  <BsHeart size={24} />
                </div>
              </div>
              <div className="mt-6 space-y-4">
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
              <div className="mt-6 flex items-center gap-12">
                <p>
                  <a href="/" className="text-[#7DA6DD] underline">
                    Pay Monthly With
                  </a>
                </p>
                <Image src={SilverChef} alt="SilverChef" />
              </div>

              <VariantSelector options={product.options} variants={product.variants} />
              {/* 
              {product.descriptionHtml && (
                <Prose
                  className="leading-light mb-6 text-sm dark:text-white/[60%]"
                  html={product.descriptionHtml}
                />
              )} */}
            </Suspense>
          </div>
        </div>
        <RelatedPRoducts id={product.id} />
      </div>
      <div className="flex justify-end md:w-1/3">
        <CartModal />
      </div>
    </ProductProvider>
  );
}

async function RelatedPRoducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-medium">We think you may also like</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts?.map((data: any) => (
          <li
            key={data.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${data.handle}`}
              prefetch={true}
            >
              <div className="relative flex w-full cursor-pointer flex-col overflow-hidden bg-white">
                {/* Image Section */}
                <div className="relative h-[450px] w-full bg-[#E8E8E8]">
                  {/* Primary Image */}
                  <Image
                    src={data?.featuredImage?.url ? data?.featuredImage?.url : data?.images[0]?.url}
                    alt={data?.title}
                    layout="fill"
                    objectFit="contain"
                    quality={100}
                    className={`} absolute transition-opacity duration-500`}
                  />
                  {/* Secondary Image */}
                </div>

                {/* Content Section */}
                <div className="flex items-center justify-between space-y-3 p-4">
                  {/* Title and Price */}
                  <div className="flex flex-col space-y-1">
                    <p className="text-md font-medium uppercase text-gray-900">{data?.title}</p>
                    <p className="text-lg font-medium">
                      ${data?.priceRange?.maxVariantPrice?.amount}
                    </p>
                  </div>

                  <Image src={addtocartIcon} alt="addtocart" />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// app/(home)/product/[handle]/page.jsx

import CartModal from 'components/cart/modal';
import { GridTileImage } from 'components/grid/tile';
import { Gallery } from 'components/product/gallery';
import { ProductProvider } from 'components/product/product-context';
import { ProductDescription } from 'components/product/product-description';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct, getProductRecommendations } from 'lib/shopify';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// Fixed generateMetadata
export async function generateMetadata(props) {
  // Destructure after async context
  const handle = await props.params.handle
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
    openGraph: url && {
      images: [{
        url,
        width,
        height,
        alt: alt || product.title
      }]
    }
  };
}

// Fixed ProductPage
export default async function ProductPage(props) {
  // Destructure after async context
  const handle = await props.params.handle
  const product = await getProduct(handle);
  
  if (!product) return notFound();

  return (
    <ProductProvider>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense fallback={<div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />}>
              <Gallery
                images={product.images.slice(0, 5).map((image) => ({
                  src: image.url,
                  altText: image.altText || product.title
                }))}
              />
            </Suspense>
          </div>
          
          <div className="basis-full lg:basis-2/6">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>
        
        <RelatedProducts id={product.id} />
      </div>

      <div className="flex justify-end md:w-1/3">
        <CartModal />
      </div>
    </ProductProvider>
  );
}

// Fixed Image component implementation example
function FixedImageComponent() {
  return (
    <div className="relative h-64 w-64">
      <Image
        src="/your-image-source.jpg"
        alt="Proper description"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
    </div>
  );
}

// Fixed RelatedProducts component
async function RelatedProducts({ id }) {
  const relatedProducts = await getProductRecommendations(id);
  if (!relatedProducts?.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link href={`/product/${product.handle}`} className="relative h-full w-full block">
              <GridTileImage
                alt={product.title}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
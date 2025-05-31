import ProductType from 'screens/productType';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduct, getProductRecommendations } from 'lib/shopify';
import { ProductProvider } from 'components/product/product-context';
// import { Image } from 'lib/shopify/types';
import CartModal from 'components/cart/modal';
import Slider from 'components/slider';
import ProductDetailsClient from "./ProductDetailsClient"

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


  return (
    <ProductProvider>
      <div className="px-4 py-16 xs:py-20 md:px-10 lg:px-40">
      <ProductDetailsClient product={product} />
        <div className="mt-8">
          <RelatedProducts id={product.id} />
        </div>
      </div>
      <div className="justify-end md:flex md:w-1/3">
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
import { notFound } from 'next/navigation';
import { getProduct, getProductRecommendations } from 'lib/shopify';
import { ProductProvider } from 'components/product/product-context';
import Slider from 'components/slider';
import ProductDetailsClient from 'app/(home)/product/[handle]/ProductDetailsClient';
import { getBaseUrl } from 'lib/site-url';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';

export async function generateMetadata(props) {
  const params = await props.params;
  const product = await getProduct(params.handle);
  if (!product) return notFound();

  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    alternates: {
      canonical: `${getBaseUrl()}/es/product/${params.handle}`,
    },
    robots: {
      index: indexable,
      follow: indexable,
    },
  };
}

export default async function SpanishProductPage(props) {
  const params = await props.params;
  const product = await getProduct(params.handle);
  if (!product) return notFound();

  const relatedProducts = await getProductRecommendations(product.id);

  return (
    <ProductProvider>
      <div className="px-4 py-16 xs:py-20 md:px-10 lg:px-40">
        <ProductDetailsClient product={product} />
        {relatedProducts?.length ? (
          <div className="mt-8">
            <Slider data={relatedProducts} />
          </div>
        ) : null}
      </div>
    </ProductProvider>
  );
}

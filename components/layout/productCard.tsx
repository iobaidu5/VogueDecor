'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AddToCartHover } from 'components/cart/add-to-cart-hover';
import { ProductProvider } from 'components/product/product-context';
import { useCurrency } from 'components/currency/currencyContext';
import i18n from '../../lib/i18nClient';
import { useTranslation } from 'react-i18next';
import { useCollection } from 'lib/CollectionContext';

export function ProductCard({ product, collection }: { product: any, collection?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { t, ready } = useTranslation('common');
  const { currency, rate } = useCurrency();
  const { setCollection } = useCollection()

  const numericAmount = product?.variants[0]?.compareAtPrice?.amount
    ? parseFloat(product?.variants[0]?.compareAtPrice?.amount) * rate
    : 0;
  const numericSale = parseFloat(product?.priceRange?.maxVariantPrice?.amount) * rate;

  const formattedPrice = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'narrowSymbol',
  }).format(numericAmount);


  // const numericAmount = parseFloat(amount) * rate;
  // const numericSale = sale ? parseFloat(sale) * rate : 0;

  // const formattedPrice = new Intl.NumberFormat(undefined, {
  //   style: 'currency',
  //   currency: currency,
  //   currencyDisplay: 'narrowSymbol'
  // }).format(numericAmount);

  // const formattedSalePrice = new Intl.NumberFormat(undefined, {
  //   style: 'currency',
  //   currency: currency,
  //   currencyDisplay: 'narrowSymbol',
  // }).format(numericSale);

  const formattedSalePrice = numericSale
    ? new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency,
      currencyDisplay: 'narrowSymbol',
    }).format(numericSale)
    : null;

  return (
    <ProductProvider>
      <div className="w-full">
        <div
          className="group relative w-full flex flex-col overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Square Container */}
          <div
            className="relative w-full aspect-square bg-white cursor-pointer"
            // onClick={() => {
            //   const url = `/product/${product.handle}${collection ? `?collection=${encodeURIComponent(collection)}` : ''}`;
            //   router.push(url);
            // }}
            onClick={() => {
              setCollection(collection ?? null)
              router.push(`/product/${product.handle}`)
            }}
          >
            {/* First Image */}
            <Image
              src={product?.images?.[0]?.url}
              alt={product?.title}
              fill
              className={`object-contain lg:object-cover transition-opacity duration-700 ease-in-out ${isHovered ? 'opacity-0' : 'opacity-100'}`}
            />

            {/* Second Image (on hover) */}
            {product.images?.[1] && (
              <Image
                src={product?.images?.[1]?.url}
                alt={product?.title}
                fill
                className={`object-cover absolute top-0 left-0 transition-opacity duration-700 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              />
            )}

            {/* Add to Cart Button */}
            <div
              className={`absolute bottom-0 left-0 right-0 z-10 mx-auto transition-all duration-500 ease-in-out ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} flex items-center justify-center`}
            >
              <AddToCartHover product={product} />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-2 p-3 items-start md:items-center text-left lg:text-center md:items-start md:text-left">
            <p className="w-full text-xs lg:text-sm md:text-base  lg:font-medium text-black">
              {/* {product.title} */}
              {t(`products.${product.title}`)}
            </p>
            <div className="flex items-start md:items-center justify-start md:justify-start space-x-2">
              <p
                className={`text-sm text-left lg:text-center font-medium text-[#878787] ${formattedPrice && formattedPrice !== '$0.00' ? 'line-through' : ''}`}
              >
                {formattedPrice === "$0.00" ? formattedSalePrice : formattedPrice || ''}
              </p>
              {formattedSalePrice && formattedPrice !== '$0.00' && (
                <p className="text-sm text-left lg:text-center font-medium text-red-700">
                  {formattedSalePrice}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProductProvider>

  );
}

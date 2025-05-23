'use client';
import Image from 'next/image';
import heartIcon from 'media/svg/heart.svg';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AddToCartSimple } from 'components/cart/add-to-cart-simple';
import { ProductProvider } from 'components/product/product-context';
import { AddToCartHover } from 'components/cart/add-to-cart-hover';
import { useCurrency } from 'components/currency/currencyContext';

export function ProductCard({ product }: { product: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { currency, rate } = useCurrency();

  const numericAmount = parseFloat(product?.priceRange?.maxVariantPrice?.amount) * rate;
  const numericSale = product?.variants[0]?.compareAtPrice?.amount ? parseFloat(product?.variants[0]?.compareAtPrice?.amount) * rate : 0;


  const formattedPrice = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'narrowSymbol'
  }).format(numericAmount);


  const formattedSalePrice = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'narrowSymbol'
  }).format(numericSale);


  return (
    <ProductProvider>
      <div className="relative inline-block h-full w-full">
        <div
          className="relative flex w-full flex-col overflow-hidden xs:h-[350px] lg:h-[550px] group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container */}
          <div
            className="relative flex size-full cursor-pointer items-center justify-center"
            onClick={() => router.push(`/product/${product.handle}`)}
          >
            <div className="relative h-full w-full">
              {/* First Image */}
              <Image
                src={product?.images?.[0]?.url}
                alt={product?.title}
                width={380}
                height={460}
                className={`absolute left-0 top-0 h-full w-full object-contain transition-opacity duration-1000 ease-in-out ${isHovered ? 'opacity-0' : 'opacity-100'
                  }`}
              />

              {/* Second Image (on hover) */}
              {product.images?.[1] && (
                <Image
                  src={product?.images?.[1]?.url}
                  alt={product?.title}
                  width={380}
                  height={460}
                  className={`absolute left-0 top-0 h-full w-full object-contain transition-opacity duration-1000 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                />
              )}

              {/* Add to Cart Snackbar Button */}
              <div
                className={`absolute bottom-0 left-0 right-0 z-10 mx-auto transition-all duration-500 ease-in-out ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} flex items-center justify-center px-0`}
              >
                <AddToCartHover product={product} />
              </div>
            </div>
          </div>

        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-2 mt-2 ml-2 items-center text-center md:items-start md:text-left">
          <p className="w-full flex-1 break-words font-medium text-black xs:text-[14px] md:text-[17px]">
            {product.title}
          </p>
          <div className="flex items-center justify-center space-x-2 md:justify-start">
            <p
              className={`max-w-[80px] text-[17px] font-medium text-[#878787] ${formattedSalePrice && formattedSalePrice !== '$0.00' ? 'line-through' : ''
                }`}
            >
              {formattedPrice || ''}
            </p>
            {formattedSalePrice && formattedSalePrice !== '$0.00' && (
              <p className="max-w-[80px] text-[17px] font-medium text-red-700">
                {formattedSalePrice}
              </p>
            )}
          </div>
        </div>

      </div>

    </ProductProvider>
  );
}

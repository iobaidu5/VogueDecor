'use client';
import Image from 'next/image';
import heartIcon from 'media/svg/heart.svg';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AddToCartSimple } from 'components/cart/add-to-cart-simple';
import { ProductProvider } from 'components/product/product-context';
import { AddToCartHover } from 'components/cart/add-to-cart-hover';

export function ProductCard({ product }: { product: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <ProductProvider>
      <div className="relative inline-block h-full w-full">
        <div
          className="relative flex w-full flex-col overflow-hidden xs:h-[450px] lg:h-[570px] group"
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
            </div>
            {/* Add to Cart Snackbar Button */}
            <div
              className={`absolute bottom-9 left-0 z-10 w-full transform transition-all duration-500 ease-in-out ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                } flex items-center justify-center px-0`}
            >
              <AddToCartHover product={product} />
            </div>
          </div>


          {/* Spacer to make room for snackbar */}

        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-2 -mt-4">
          <p className="w-full flex-1 break-words font-medium text-black xs:text-[14px] md:text-[17px]">
            {product.title}
          </p>
          <p className="w-full max-w-[80px] text-[17px] font-medium text-[#878787]">
            {product?.priceRange?.maxVariantPrice?.amount || ''}
          </p>
        </div>
      </div>

    </ProductProvider>
  );
}

'use client';
import Image from 'next/image';
import heartIcon from 'media/svg/heart.svg';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function ProductCard({ product }: { product: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <div className="relative inline-block h-full w-full shadow-lg">
      <div
        className="relative flex w-full flex-col overflow-hidden xs:h-[450px] lg:h-[570px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image src={heartIcon} alt="heartIcon" className="absolute right-5 top-4" />

        <div
          className="relative flex cursor-pointer items-center justify-center xs:h-[350px] lg:h-[460px]"
          onClick={() => router.push(`/product/${product.handle}`)}
        >
          {/* Image Container */}
          <div className="relative h-full w-full">
            {/* First Image (Default) */}
            <Image
              src={product?.images?.[0]?.url}
              alt={product?.title}
              width={380}
              height={460}
              className={`absolute left-0 top-0 h-full w-full object-contain transition-opacity duration-1000 ease-in-out ${
                isHovered ? 'opacity-0' : 'opacity-100'
              }`}
            />

            {product.images?.[1] && (
              <Image
                src={product?.images?.[1]?.url}
                alt={product?.title}
                width={380}
                height={460}
                className={`absolute left-0 top-0 h-full w-full object-contain transition-opacity duration-1000 ease-in-out ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
          </div>
        </div>

        <div className="relative flex flex-col items-center bg-white pb-3 pt-2">
          <button
            className={`absolute -top-10 h-9 w-32 rounded-full bg-white text-[15px] font-medium capitalize text-black shadow-lg transition-all duration-700 ease-in-out ${
              isHovered ? 'translate-y-4 opacity-100' : 'translate-y-20 opacity-0'
            } hover:bg-orange-400 hover:text-white`}
          >
            ADD TO CART
          </button>

          {/* Product Title and Price */}
          <p className="mt-6 w-full break-words px-2 text-center font-medium text-black xs:text-[14px] md:text-[17px]">
            {product.title}
          </p>

          <p className="text-[17px] font-medium text-[#878787]">
            {product?.priceRange?.maxVariantPrice?.amount || ''}
          </p>
        </div>
      </div>
    </div>
  );
}

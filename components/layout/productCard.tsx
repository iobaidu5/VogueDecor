'use client';
import Image from 'next/image';
import Link from 'next/link';
import heartIcon from 'media/svg/heart.svg';
import { useState } from 'react';

export function ProductCard({ product }: { product: any }) {
  const [currentImage, setCurrentImage] = useState(product?.images?.[0]?.url);

  return (
    <Link
      className="relative inline-block h-full w-full shadow-lg"
      href={`/product/${product.handle}`}
      prefetch={true}
    >
      <div
        className="relative flex w-full flex-col xs:h-[450px] lg:h-[550px]"
        onMouseEnter={() => product.images?.[1] && setCurrentImage(product.images[1].url)}
        onMouseLeave={() => setCurrentImage(product.images?.[0]?.url)}
      >
        <button className="absolute right-14 top-3 z-50 h-8 w-28 rounded-full border border-black text-[12px] text-black hover:bg-black hover:text-white">
          View
        </button>
        <Image src={heartIcon} alt="heartIcon" className="absolute right-5 top-4" />
        {/* Image Section */}
        <div className="flex items-center justify-center xs:h-[350] lg:h-[460px]">
          <Image
            src={currentImage}
            alt={product?.title}
            width={380}
            height={460}
            className="h-full object-contain transition-opacity duration-300 ease-in-out"
          />
        </div>
        <div className="mt-2 flex h-[55px] flex-col space-y-1 bg-white pl-4">
          <p className="text-[17px] font-medium text-black">{product.title}</p>
          <p className="text-[17px] font-medium text-[#878787]">
            {product?.priceRange?.maxVariantPrice?.amount || ''}
          </p>
        </div>
      </div>
    </Link>
  );
}

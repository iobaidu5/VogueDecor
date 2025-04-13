import Image from 'next/image';
import { useState } from 'react';
import addtocartIcon from 'media/svg/addToCardIcon.svg';
import CartModal from 'components/cart/modal';
import { AddToCartSimple } from 'components/cart/add-to-cart-simple';
import { AddToCart } from 'components/cart/add-to-cart';
import Link from 'next/link';

const ProductCard = ({ data }: any) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link
      href={`product/${data.handle}`}
      key={data.handle}
      className="relative flex flex-col bg-white shadow-md"
    >
      <div
        className="relative flex w-full cursor-pointer flex-col overflow-hidden bg-white"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {/* Image Section */}
        <div className="relative w-full bg-[#E8E8E8] xs:h-[400px] md:h-[600px]">
          {/* Primary Image */}
          <Image
            src={data?.images[0]?.url}
            alt={data?.title}
            layout="fill"
            objectFit="contain"
            quality={100}
            className={`absolute transition-opacity duration-1000 ${
              isHover ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {/* Secondary Image */}
          <Image
            src={data?.images[1]?.url}
            alt={data?.title}
            layout="fill"
            objectFit="contain"
            quality={100}
            className={`absolute transition-opacity duration-1000 ${
              isHover ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Content Section */}
        <div className="flex items-center justify-between space-y-3 p-4">
          {/* Title and Price */}
          <div className="flex flex-col space-y-1">
            <p className="font-medium uppercase text-gray-900 xs:text-sm md:text-lg">
              {data?.title}
            </p>
            <p className="text-lg font-medium">${data?.priceRange?.maxVariantPrice?.amount}</p>
          </div>
          <AddToCartSimple product={data} icon={true} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

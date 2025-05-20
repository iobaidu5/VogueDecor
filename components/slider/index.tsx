'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import addtocartIcon from 'media/svg/addToCardIcon.svg';
import { useCurrency } from 'components/currency/currencyContext';

const Slider = ({ data }: { data: Array<Record<string, any>> }) => {
  const sliderRef = useRef<HTMLUListElement>(null);
  const [visibleItems, setVisibleItems] = useState(2);

  // Handle responsive item count
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth >= 1024) {
        setVisibleItems(4);
      } else if (window.innerWidth >= 768) {
        setVisibleItems(3);
      } else if (window.innerWidth >= 640) {
        setVisibleItems(2);
      } else if (window.innerWidth >= 475) {
        setVisibleItems(2);
      } else {
        setVisibleItems(2);
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  // Scroll Function
  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth / visibleItems;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };


  const { currency, rate } = useCurrency();

  return (
    <div className="relative xs:py-4 md:py-8">
      <h2 className="xs:text-md mb-4 font-medium md:text-2xl">We think you may also like</h2>
      <div className="relative">
        {/* Slider Container */}
        <div className="relative">
          {/* Left Button */}
          <button
            className="absolute left-4 top-[40%] z-10 flex items-center justify-center rounded-full bg-white p-2 shadow-md xs:left-6 xs:size-10 md:size-12"
            onClick={() => scrollSlider('left')}
          >
            <FaChevronLeft size={24} />
          </button>

          <ul
            ref={sliderRef}
            className="no-scrollbar flex w-full gap-4 overflow-x-auto scroll-smooth pt-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {data?.map((item) => {
              const numericAmount = parseFloat(item?.priceRange?.maxVariantPrice?.amount) * rate;

              const numericSale = item?.variants?.[0]?.compareAtPrice?.amount
                ? parseFloat(item.variants[0].compareAtPrice.amount) * rate
                : 0;

              const formattedPrice = new Intl.NumberFormat(undefined, {
                style: 'currency',
                currency: currency,
                currencyDisplay: 'narrowSymbol'
              }).format(numericAmount);

              const formattedSalePrice = numericSale
                ? new Intl.NumberFormat(undefined, {
                  style: 'currency',
                  currency: currency,
                  currencyDisplay: 'narrowSymbol'
                }).format(numericSale)
                : null;

              return (
                <li
                  key={item.handle}
                  className="w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
                >
                  <Link
                    className="relative h-full w-full"
                    href={`/product/${item.handle}`}
                    prefetch={true}
                  >
                    <div className="relative flex w-full cursor-pointer flex-col overflow-hidden">
                      {/* Image Section */}
                      <div className="relative w-full xs:h-[300px] md:h-[300px]">
                        <Image
                          src={
                            item?.featuredImage?.url
                              ? item.featuredImage.url
                              : item?.images?.[0]?.url
                          }
                          alt={item?.title}
                          layout="fill"
                          objectFit="contain"
                          quality={100}
                          className="absolute transition-opacity duration-500"
                        />
                      </div>

                      {/* Content Section */}
                      <div className="flex items-center justify-between space-y-3 p-4">
                        <div className="flex flex-col space-y-1">
                          <p className="md:text-md font-medium uppercase text-gray-900 xs:text-sm">
                            {item?.title}
                          </p>
                          <div className="flex items-center space-x-2">
                            <p
                              className={`text-[15px] font-medium text-[#878787] ${formattedSalePrice ? 'line-through' : ''
                                }`}
                            >
                              {formattedPrice}
                            </p>
                            {formattedSalePrice && (
                              <p className="text-[15px] font-medium text-red-700">
                                {formattedSalePrice}
                              </p>
                            )}
                          </div>
                        </div>
                        {/* <Image src={addtocartIcon} alt="addtocart" /> */}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>


          {/* Right Button */}
          <button
            className="absolute right-4 top-[40%] z-10 flex items-center justify-center rounded-full bg-white p-2 shadow-md xs:right-6 xs:size-10 md:size-12"
            onClick={() => scrollSlider('right')}
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;

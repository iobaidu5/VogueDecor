'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import addtocartIcon from 'media/svg/addToCardIcon.svg';

const Slider = ({ data }: { data: Array<Record<string, any>> }) => {
  const sliderRef = useRef<HTMLUListElement>(null);
  const [visibleItems, setVisibleItems] = useState(1);

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
        setVisibleItems(1);
      } else {
        setVisibleItems(1);
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

  return (
    <div className="relative py-8">
      <h2 className="mb-4 text-2xl font-medium">We think you may also like</h2>
      <div className="relative">
        {/* Slider Container */}
        <div className="relative flex items-center">
          {/* Left Button */}
          <button
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white p-2 shadow-md sm:left-6"
            onClick={() => scrollSlider('left')}
          >
            <FaChevronLeft size={24} />
          </button>

          <ul
            ref={sliderRef}
            className="no-scrollbar flex w-full gap-4 overflow-x-auto scroll-smooth pt-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {data?.map((item) => (
              <li
                key={item.handle}
                className="w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
              >
                <Link
                  className="relative h-full w-full"
                  href={`/product/${item.handle}`}
                  prefetch={true}
                >
                  <div className="relative flex w-full cursor-pointer flex-col overflow-hidden bg-white">
                    {/* Image Section */}
                    <div className="xs:h-[300px] relative w-full bg-[#E8E8E8] md:h-[500px]">
                      <Image
                        src={
                          item?.featuredImage?.url ? item.featuredImage.url : item?.images[0]?.url
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
                        <p className="text-md font-medium uppercase text-gray-900">{item?.title}</p>
                        <p className="text-lg font-medium">
                          ${item?.priceRange?.maxVariantPrice?.amount}
                        </p>
                      </div>
                      <Image src={addtocartIcon} alt="addtocart" />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Button */}
          <button
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white p-2 shadow-md sm:right-6"
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

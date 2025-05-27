'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { ChevronRight, ChevronLeft } from 'lucide-react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import chairImage from 'media/home-categories/Sofia-Chair_red_1.png';
import barstoolImage from 'media/png/barstool-new.png';
import tableImage from 'media/home-categories/Table Tops Category.png';
import boothImage from 'media/home-categories/Tables Bases Category.png';

const categories = [
  {
    title: 'Chairs',
    image: chairImage,
    href: '/search/chairs',
  },
  {
    title: 'Barstools',
    image: barstoolImage,
    href: '/search/barstools',
  },
  {
    title: 'Tables Tops',
    image: tableImage,
    href: '/search/table-tops',
  },
  {
    title: 'Tables Bases',
    image: boothImage,
    href: '/search/table-bases',
  },
];

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute -right-4 top-1/2 z-50 -translate-y-1/2 cursor-pointer text-black hover:text-gray-600"
      onClick={onClick}
    >
      <ChevronRight size={32} />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute -left-4 top-1/2 z-50 -translate-y-1/2 cursor-pointer text-black hover:text-gray-600"
      onClick={onClick}
    >
      <ChevronLeft size={32} />
    </div>
  );
};

const HomeCategories = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const CategoryCard = ({ category }: { category: typeof categories[0] }) => (
    <Link
      key={category.title}
      href={category.href}
      className="flex flex-col"
    >
      <div className="relative w-full aspect-[4/4] lg:aspect-[3/4] bg-white">
        <Image
          src={category.image}
          alt={category.title}
          fill
          className="object-contain lg:object-cover"
        />
      </div>

      <p className="overflow-hidden text-left text-ellipsis whitespace-nowrap text-[20px] font-medium mt-4">
        {category.title}
      </p>
    </Link>
  );

  return (
    <div className="pt-[70px]">
      {isMobile ? (
        <Slider {...sliderSettings}>
          {categories.map((category) => (
            <div key={category.title} className="px-2">
              <CategoryCard category={category} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeCategories;
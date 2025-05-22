'use client';

import Image from 'next/image';
import Link from 'next/link';
import chairImage from 'media/home-categories/Sofia-Chair_red_1.png';
import barstoolImage from 'media/home-categories/STELLA-BS-2.png';
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
    image: boothImage,
    href: '/search/table-tops',
  },
  {
    title: 'Tables Bases',
    image: tableImage,
    href: '/search/table-bases',
  },
];

const HomeCategories = () => {
  return (
    <div className="pt-[14px]">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="flex flex-col items-center"
          >
            <div className="relative w-full h-[480px] md:h-[480px] bg-white">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="max-h-full object-contain"
              />
            </div>
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-medium">
              {category.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;

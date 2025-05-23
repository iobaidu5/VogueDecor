'use client';

import Image from 'next/image';
import Link from 'next/link';
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

const HomeCategories = () => {
  return (
    <div className="pt-[30px]">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="flex flex-col"
          >
            <div className="relative w-full h-[480px] md:h-[480px] bg-white">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="max-h-[500px] object-cover"
              />
            </div>
            <p className="overflow-hidden text-left text-ellipsis whitespace-nowrap text-[20px] font-medium mt-4">
              {category.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;

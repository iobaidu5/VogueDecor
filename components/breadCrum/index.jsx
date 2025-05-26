import Link from 'next/link';
import React from 'react';

const BreadCrumb = ({ currentPage }) => {
  return (
    <div className="flex w-full items-center space-x-2 text-[12px] mt-20">
      <Link href="/" className="text-gray-500 hover:underline">
        Home
      </Link>
      <span className="text-gray-500 hover:underline"> / </span>
      <span className="capitalize text-gray-500">
        {currentPage &&
          currentPage
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
      </span>
    </div>
  );
};

export default BreadCrumb;

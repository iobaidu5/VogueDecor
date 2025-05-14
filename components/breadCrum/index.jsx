import Link from 'next/link';
import React from 'react';

const BreadCrumb = ({ currentPage }) => {
  return (
    <div className="flex w-full items-center space-x-2 text-[15px] mt-3">
      <Link href="/" className="text-gray-500 hover:underline">
        Home
      </Link>
      <span className="text-gray-500 hover:underline"> / </span>
      <span className="font-[500] capitalize text-gray-500">{currentPage}</span>
    </div>
  );
};

export default BreadCrumb;

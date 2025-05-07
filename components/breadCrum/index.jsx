import Link from 'next/link';
import React from 'react';

const BreadCrumb = ({ currentPage }) => {
  return (
    <div className="flex w-full items-center space-x-2 text-[15px] mt-3">
      <Link href="/" className="text-black hover:underline">
        Home
      </Link>
      <span className="text-black hover:underline"> / </span>
      <span className="font-[500] capitalize text-black">{currentPage}</span>
    </div>
  );
};

export default BreadCrumb;

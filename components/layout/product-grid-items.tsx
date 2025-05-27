'use client';

import { useEffect, useState } from 'react';
import { Product } from 'lib/shopify/types';
import { ProductCard } from './productCard';
import CartModal from 'components/cart/modal';

const ITEMS_PER_PAGE = 15;

export default function ProductGridItems({ products, collection }: { products: Product[], collection: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]); // Trigger scroll when currentPage changes
  

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageChange = (page: any) => {
    console.log("handlePageChange occr")
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className="my-[30px] grid grid-cols-2 justify-center gap-6 gap-y-6 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} collection={collection} />
        ))}
      </div>


      {/* Pagination Controls */}
      {/* <div className="flex justify-center items-center space-x-4 mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div> */}

      <div className="flex justify-center items-center space-x-2 my-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`
        px-4 py-2 rounded-md font-semibold
        ${currentPage === page
                ? 'bg-black text-white cursor-default'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
      `}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}
      </div>

      <div className="flex justify-end md:w-1/3">
        <CartModal />
      </div>
    </div>
  );
}

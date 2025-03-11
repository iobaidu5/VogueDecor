'use client';
import { useEffect, useRef, useState } from 'react';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import ProductCard from './Card';
import nextIcon from 'media/svg/nexticon.svg'; // Verify this path is correct
import { getCollectionProducts } from 'lib/shopify';
import { ProductProvider } from 'components/product/product-context';
import CartModal from 'components/cart/modal';
import FilterList from 'components/layout/search/filter';
import { sorting } from 'lib/constants';

const productsPerPage: number = 12;

export default function ProductPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [currentProducts, setCurrentProducts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const fetchedProducts = await getCollectionProducts({ collection: 'best-seller' });
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Update pagination
  useEffect(() => {
    if (products.length > 0) {
      const total = Math.ceil(products.length / productsPerPage);
      setTotalPages(total);

      const startIndex = (currentPage - 1) * productsPerPage;
      const slicedProducts = products.slice(startIndex, startIndex + productsPerPage);
      setCurrentProducts(slicedProducts);
    }
  }, [currentPage, products]);

  // Dropdown handlers
  const handleToggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    // Add sorting logic here
  };

  // Click outside handler
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Pagination calculations
  const visiblePages = 5;
  const startPage = Math.max(
    1,
    Math.min(currentPage - Math.floor(visiblePages / 2), totalPages - visiblePages + 1)
  );
  const endPage = Math.min(startPage + visiblePages - 1, totalPages);

  return (
    <ProductProvider>
    <div className="xs:px-[15px] md:px-[50px] xl:px-[100px]">
      <div className="mb-10 flex items-center justify-end space-x-4">
        <div className="relative inline-block text-left">
          <button
            ref={buttonRef}
            className="flex items-center rounded-md border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-100"
            onClick={handleToggleDropdown}
          >
            <Squares2X2Icon className="mr-2 h-5 w-5" />
            {selectedOption || 'Sort'}
          </button>

          {isDropdownOpen && (
            // <div
            //   ref={dropdownRef}
            //   className="absolute right-0 z-10 mt-2 w-48 rounded-md border border-gray-300 bg-white shadow-lg"
            // >
            //   <ul className="py-1">
            //     {[
            //       'Price Low to High',
            //       'Price High to Low',
            //       'Alphabetical A-Z',
            //       'Alphabetical Z-A'
            //     ].map((option) => (
            //       <li
            //         key={option}
            //         className="cursor-pointer px-4 py-2 text-gray-600 hover:bg-gray-100"
            //         onClick={() => handleSelectOption(option)}
            //       >
            //         {option}
            //       </li>
            //     ))}
            //   </ul>
            // </div>
            <div ref={dropdownRef} className="absolute right-0 z-10 mt-2 w-48 rounded-md border border-gray-300 bg-white shadow-lg">
            <FilterList list={sorting} title="" />
          </div> 
          )}
        </div>
      </div>

      <div className="flex">
        <main className="flex-1 bg-white">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#D9222A]"></div>
              <p className="mt-2 text-gray-600">Loading products...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {currentProducts.map((product) => (
                    <ProductCard key={product.id} data={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-end space-x-1">
                  <button
                    className={`rounded-md px-2 ${currentPage === 1 ? 'cursor-not-allowed text-gray-400' : 'text-[#8F8F8F] hover:text-[#D9222A]'}`}
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </button>

                  {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(
                    (page) => (
                      <button
                        key={page}
                        className={`rounded-md px-2 ${currentPage === page ? 'font-bold text-[#D9222A]' : 'text-[#8F8F8F] hover:text-[#D9222A]'}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    className={`rounded-md px-2 ${currentPage === totalPages ? 'cursor-not-allowed text-gray-400' : 'text-[#8F8F8F] hover:text-[#D9222A]'}`}
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    {nextIcon?.src ? (
                      <Image
                        src={nextIcon.src}
                        alt="next icon"
                        width={16}
                        height={16}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-[#8F8F8F]">&gt;</span>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
      <div className="flex justify-end md:w-1/3">
        <CartModal />
      </div>
    </div>
    </ProductProvider>
  );
}

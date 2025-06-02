'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Pagination from 'components/pagination';

interface Article {
  id: number;
  title: string;
  description: string;
  desktopImage: {
    src: string;
    alt: string;
  };
  mobileImage: {
    src: string;
    alt: string;
  };
}

interface ArticleListProps {
  data: Article[];
}

export default function Component({ data }: ArticleListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="mx-auto md:mx-[60px]">
      <div className="px-6 py-[100px] md:px-4 lg:py-[130px]">
        <h3 className="mb-4 text-[18px] font-medium md:text-[28px]">Tutorials</h3>

        {/* Desktop Layout */}
        <div className="hidden gap-x-8 gap-y-12 md:grid md:grid-cols-2">
          {paginatedData.map((article) => (
            <Link
              href={`/blogs/${article.id}`}
              key={article.id}
              className="cursor-pointer space-y-4"
            >
              <div className="relative">
                <Image
                  src={article.desktopImage.src || '/placeholder.svg'}
                  alt={article.desktopImage.alt}
                  width={764}
                  height={553}
                  className="h-auto w-full"
                  priority={article.id <= 2}
                />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-medium leading-tight text-gray-900">
                  {article.title}
                </h2>
                <p className="text-sm leading-relaxed text-gray-700">{article.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="flex flex-col gap-5 md:hidden">
          {paginatedData.map((article) => (
            <Link
              href={`/blogs/${article.id}`}
              key={`mobile-${article.id}`}
              className="cursor-pointer space-y-4"
            >
              <div className="relative">
                <Image
                  src={article.mobileImage.src || '/placeholder.svg'}
                  alt={article.mobileImage.alt}
                  width={396}
                  height={295}
                  className="h-auto w-full"
                  priority={article.id <= 2}
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-[15px] font-medium leading-tight text-gray-900">
                  {article.title}
                </h2>
                <p className="text-[13px] leading-relaxed text-gray-700">{article.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center">
          <Pagination
            currentPage={currentPage}
            totalItems={data?.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
'use client';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Pagination from 'components/pagination';
import { getBlogArticlesQuery } from "../../lib/shopify/queries/blogs";
import { shopifyFetch } from 'lib/shopify';
import { BlogArticle, ShopifyBlogOperation } from 'lib/shopify/types';
import { useTranslation } from 'react-i18next';
const BlogSlider = dynamic(() => import('./BlogSlider'), { ssr: false });



export async function getBlogs(handle: string): Promise<BlogArticle[]> {
  const res = await shopifyFetch<ShopifyBlogOperation>({
    query: getBlogArticlesQuery,
    variables: { handle },
    cache: 'no-cache',
  });

  const blog = res.body?.data.blog;

  if (!blog) return [];

  return blog.articles.edges.map(({ node }) => ({
    title: node.title,
    path: `/blog/${encodeURIComponent(node.title.toLowerCase().replace(/\s+/g, '-'))}`,
    images: node.image?.originalSrc ? [node.image.originalSrc] : [],
    excerpt: node.excerpt,
    publishedAt: node.publishedAt,
  }));
}

export default function Component() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await getBlogs('restaurant-furniture');
      console.log("Fetched articles", data);
      setArticles(data);
    };
    fetchBlogs();
  }, []);

  const paginatedData = articles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const { t, ready } = useTranslation('common');

  return (
    <div className="mx-auto md:mx-[60px]">
      <div className="px-6 py-[100px] md:px-4 lg:py-[130px]">
        <h3 className="mb-4 text-[18px] font-medium md:text-[28px]">{t(`Blogs`)}</h3>

        {/* Desktop Layout */}
        <div className="hidden gap-x-8 gap-y-12 md:grid md:grid-cols-2">
          {paginatedData.map((article, index) => (
            <Link
              href={article.path}
              key={article.path}
              className="cursor-pointer space-y-4"
            >
              <div className="relative">
              <BlogSlider
                  images={article.images.length > 0 ? article.images : ['/placeholder.svg']}
                  height={295} 
                  priority={index <= 2}
                />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-medium leading-tight text-gray-900">
                  {article.title}
                </h2>
                <p className="text-sm leading-relaxed text-gray-700">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="flex flex-col gap-5 md:hidden">
          {paginatedData.map((article, index) => (
            <Link
              href={article.path}
              key={`mobile-${article.path}`}
              className="cursor-pointer space-y-4"
            >
              <div className="relative">
                <BlogSlider
                  images={article.images.length > 0 ? article.images : ['/placeholder.svg']}
                  height={295} 
                  priority={index <= 2}
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-[15px] font-medium leading-tight text-gray-900">
                  {article.title}
                </h2>
                <p className="text-[13px] leading-relaxed text-gray-700">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center mt-8">
          <Pagination
            currentPage={currentPage}
            totalItems={articles.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
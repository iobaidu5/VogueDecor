import { notFound } from 'next/navigation';
import { shopifyFetch } from 'lib/shopify';
import { getAllBlogsQuery, getBlogArticlesQuery } from '../../../lib/shopify/queries/blogs';
import { BlogArticle } from 'lib/shopify/types';
import Image from 'next/image';
import { format } from 'date-fns';
import React from 'react';


// // ✅ Use Next.js's type
// interface PageProps {
//   params: {
//     slug: string;
//   };
// }

function slugify(title) {
  return title.toLowerCase().replace(/\s+/g, '-');
}

export async function generateMetadata({ params }) {
  return {
    title: decodeURIComponent(params.slug.replace(/-/g, ' ')),
  };
}

export default async function BlogArticlePage({ params }) {
  // your commented code here is fine

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="prose max-w-none prose-lg text-gray-800">
        {/* content goes here */}
      </div>
    </div>
  );
}

// import { notFound } from 'next/navigation';
// import { shopifyFetch } from 'lib/shopify';
// import { getAllBlogsQuery, getBlogArticlesQuery } from '../../../lib/shopify/queries/blogs';
// import { BlogArticle } from 'lib/shopify/types';
// import Image from 'next/image';
// import { format } from 'date-fns';
// import React from 'react';

// interface Props {
//   params: {
//     slug: string;
//   };
// }

// function slugify(title: string) {
//   return title.toLowerCase().replace(/\s+/g, '-');
// }

// export async function generateMetadata({ params }: Props) {
//   return {
//     title: decodeURIComponent(params.slug.replace(/-/g, ' ')),
//   };
// }

// export default async function BlogArticlePage({ params }: Props) {
//   const slug = params.slug;
//   const allHandles = await getAllBlogsQuery();

//   let matchedArticle: BlogArticle | null = null;

//   for (const handle of allHandles) {
//     const articles = await getBlogArticlesQuery(handle);

//     const article = articles.find((a) =>
//       slugify(a.title) === decodeURIComponent(slug)
//     );

//     if (article) {
//       matchedArticle = article;
//       break;
//     }
//   }

//   if (!matchedArticle) return notFound();

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-12">
//       <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">{matchedArticle.title}</h1>

//       <p className="text-gray-500 text-sm mb-6">
//         Published on {format(new Date(matchedArticle.publishedAt), 'MMMM d, yyyy')}
//       </p>

//       {matchedArticle.images.length > 0 && (
//         <div className="mb-6">
//           <Image
//             src={matchedArticle.images[0]}
//             alt={matchedArticle.title}
//             width={1200}
//             height={600}
//             className="w-full rounded-lg object-cover"
//           />
//         </div>
//       )}

//       <div className="prose max-w-none prose-lg text-gray-800">
//         {/* Display excerpt if body HTML is not available */}
//         {matchedArticle.excerpt ? (
//           <p>{matchedArticle.excerpt}</p>
//         ) : (
//           <p>No excerpt available for this article.</p>
//         )}
//       </div>
//     </div>
//   );
// }

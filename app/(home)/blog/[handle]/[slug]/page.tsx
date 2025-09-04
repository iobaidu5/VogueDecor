// // app/(home)/blog/[handle]/[slug]/page.tsx
// import { notFound } from 'next/navigation';
// import { type Metadata } from 'next';
// import { shopifyFetch } from 'lib/shopify';
// import { getBlogArticlesQuery } from '../../../../../lib/shopify/queries/blogs';
// import { format } from 'date-fns';
// import Image from 'next/image';
// import { cache } from 'react';


// type BlogArticlesResponse = {
//   data?: {
//     blog: {
//       title: string;
//       url: string;
//       articles: {
//         edges: {
//           node: {
//             id: string;
//             title: string;
//             url: string;
//             excerpt: string;
//             contentHtml: string;
//             publishedAt: string;
//             image: {
//               originalSrc: string;
//               altText: string | null;
//             } | null;
//           };
//         }[];
//       };
//     } | null;
//   };
//   errors?: { message: string }[];
// };


// const getArticle = cache(async (handle: string, slug: string) => {
//   try {
//     console.log(`Fetching articles for blog handle: ${handle}`);

//     const res = await shopifyFetch<BlogArticlesResponse>({
//       query: getBlogArticlesQuery,
//       variables: { handle },
//       cache: 'no-cache',
//     });

//     if (res.body?.errors) {
//       console.error('GraphQL Errors:', res.body.errors);
//       return null;
//     }

//     const blog = res.body?.data?.blog;
//     console.log("blog data --- ", blog)
//     if (!blog) {
//       console.error(`Blog with handle "${handle}" not found`);
//       return null;
//     }

//     console.log(`Found blog: ${blog.title} with ${blog.articles.edges.length} articles`);

//     // Find matching article by slug
//     const matchedArticle = blog.articles.edges.find((edge: any) => {
//       const articleSlug = edge.node.title
//         .toLowerCase()
//         .replace(/\s+/g, '-')
//         .replace(/[^a-z0-9-]/g, '');

//       console.log(`Comparing: "${articleSlug}" === "${slug}"`);
//       return articleSlug === slug;
//     });

//     if (!matchedArticle) {
//       console.error(`Article with slug "${slug}" not found in blog "${handle}"`);
//       console.log('Available articles:', blog.articles.edges.map((e: any) => e.node.title));
//       return null;
//     }

//     console.log(`Found article: ${matchedArticle.node.title}`);
//     return matchedArticle.node;
//   } catch (error) {
//     console.error('Error fetching article:', error);
//     return null;
//   }
// });

// export async function generateMetadata({ 
//   params 
// }: { 
//   params: { handle: string; slug: string } 
// }): Promise<Metadata> {
//   const { handle, slug } = params;
//   const article = await getArticle(handle, slug);

//   return {
//     title: article?.title || 'Blog Post',
//     description: article?.excerpt || 'Read this interesting blog post',
//     openGraph: {
//       title: article?.title || 'Blog Post',
//       description: article?.excerpt || 'Read this interesting blog post',
//       images: article?.image?.originalSrc ? [{ url: article.image.originalSrc }] : [],
//     },
//   };
// }

// export default async function BlogPage({ 
//   params 
// }: { 
//   params: { handle: string; slug: string } 
// }) {
//   const { handle, slug } = params;
//   console.log(`Requested article: handle=${handle}, slug=${slug}`);

//   const article = await getArticle(handle, slug);

//   if (!article) {
//     console.log('Article not found - returning 404');
//     return notFound();
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-12">
//       <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
//       <p className="text-gray-500 mb-6">
//         {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
//       </p>

//       {article.image?.originalSrc && (
//         <div className="mb-6 relative w-full h-[400px]">
//           <Image
//             src={article.image.originalSrc}
//             alt={article.image.altText || article.title}
//             fill
//             sizes="(max-width: 768px) 100vw, 70vw"
//             className="rounded object-cover"
//             priority
//             unoptimized
//           />
//         </div>
//       )}

//       <div
//         className="prose prose-lg max-w-none"
//         dangerouslySetInnerHTML={{ __html: article.contentHtml }}
//       />
//     </div>
//   );
// }


// app/(home)/blog/[handle]/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import { shopifyFetch } from 'lib/shopify';
import { getBlogArticlesQuery } from '../../../../../lib/shopify/queries/blogs';
import { format } from 'date-fns';
import Image from 'next/image';
import { cache } from 'react';

type BlogArticlesResponse = {
  data?: {
    blog: {
      title: string;
      url: string;
      articles: {
        edges: {
          node: {
            id: string;
            title: string;
            handle: string; // ✅ include article handle
            url: string;
            excerpt: string;
            contentHtml: string;
            publishedAt: string;
            image: {
              originalSrc: string;
              altText: string | null;
            } | null;
          };
        }[];
      };
    } | null;
  };
  errors?: { message: string }[];
};

const getArticle = cache(async (handle: string, slug: string) => {
  try {
    console.log(`Fetching articles for blog handle: ${handle}`);

    const res = await shopifyFetch<BlogArticlesResponse>({
      query: getBlogArticlesQuery,
      variables: { handle },
      cache: 'no-cache',
    });

    if (res.body?.errors) {
      console.error('GraphQL Errors:', res.body.errors);
      return null;
    }

    const blog = res.body?.data?.blog;
    if (!blog) {
      console.error(`Blog with handle "${handle}" not found`);
      return null;
    }

    console.log(`Found blog: ${blog.title} with ${blog.articles.edges.length} articles`);

    // ✅ match by Shopify's article handle instead of slugifying title
    const matchedArticle = blog.articles.edges.find(
      (edge: any) => edge.node.handle === slug
    );

    if (!matchedArticle) {
      console.error(`Article with handle "${slug}" not found in blog "${handle}"`);
      return null;
    }

    console.log(`Found article: ${matchedArticle.node.title}`);
    return matchedArticle.node;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
});

export async function generateMetadata({
  params,
}: {
  params: { handle: string; slug: string };
}): Promise<Metadata> {
  const { handle, slug } = params;
  const article = await getArticle(handle, slug);

  return {
    title: article?.title || 'Blog Post',
    description: article?.excerpt || 'Read this interesting blog post',
    openGraph: {
      title: article?.title || 'Blog Post',
      description: article?.excerpt || 'Read this interesting blog post',
      images: article?.image?.originalSrc
        ? [{ url: article.image.originalSrc }]
        : [],
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: { handle: string; slug: string };
}) {
  const { handle, slug } = params;
  console.log(`Requested article: handle=${handle}, slug=${slug}`);

  const article = await getArticle(handle, slug);

  if (!article) {
    console.log('Article not found - returning 404');
    return notFound();
  }


  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight mb-4 leading-snug">
        {article.title}
      </h1>

      <p className="text-sm text-gray-500 mb-8">
        {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
      </p>

      {article.image?.originalSrc && (
        <div className="mb-10 relative w-full h-[450px] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={article.image.originalSrc}
            alt={article.image.altText || article.title}
            fill
            sizes="(max-width: 768px) 100vw, 70vw"
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      )}
      <article
        className="
    prose prose-lg lg:prose-xl max-w-none 
    font-sans leading-relaxed text-justify

    /* Headings */
    prose-headings:font-semibold 
    prose-headings:tracking-tight 
    prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-3xl prose-h2:text-gray-800
    prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-2xl prose-h3:text-gray-700

    /* Paragraphs */
    prose-p:mb-6 prose-p:text-gray-800 prose-p:leading-loose

    /* Lists */
    prose-li:marker:text-gray-500 prose-li:mb-2 prose-ol:list-decimal prose-ul:list-disc prose-ul:pl-6 prose-ol:pl-6

    /* Links */
    prose-a:text-blue-600 hover:prose-a:underline

    /* Images */
    prose-img:rounded-xl prose-img:shadow-md prose-img:mx-auto prose-img:my-6

    /* Strong text */
    prose-strong:text-gray-900 prose-strong:font-semibold

    /* Blockquote */
    prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
  "
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />


    </div>
  );
}


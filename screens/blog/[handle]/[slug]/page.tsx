// app/blog/[handle]/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { shopifyFetch } from 'lib/shopify';
import { getBlogArticlesQuery } from '../../../../lib/shopify/queries/blogs';
import { format } from 'date-fns';
import Image from 'next/image';
import { cache } from 'react';

interface PageProps {
  params: { handle: string; slug: string };
}

const getArticle = cache(async (handle: string, slug: string) => {
  try {
    handle = "new-affordable-restaurant-furniture-a-smart-choice-for-budget-conscious-owner"
    const res = await shopifyFetch({
      query: getBlogArticlesQuery,
      variables: { handle },
      cache: 'no-cache',
    });

    const blog = res.body?.data?.blog;
    if (!blog) {
      console.error(`Blog with handle "${handle}" not found`);
      return null;
    }

    // Find matching article by slug
    const matchedArticle = blog.articles.edges.find((edge: any) => {
      // Create slug from title
      const articleSlug = edge.node.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      
      console.log(`Comparing: ${articleSlug} === ${slug}`);
      return articleSlug === slug;
    });

    if (!matchedArticle) {
      console.error(`Article with slug "${slug}" not found in blog "${handle}"`);
      console.log('Available articles:', blog.articles.edges.map((e: any) => e.node.title));
      return null;
    }

    return matchedArticle.node;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle, slug } = params;
  const article = await getArticle(handle, slug);

  return {
    title: article?.title || 'Blog Post',
    description: article?.excerpt || 'Read this interesting blog post',
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { handle, slug } = params;
  const article = await getArticle(handle, slug);

  if (!article) {
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 mb-6">
        {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
      </p>
      
      {article.image?.originalSrc && (
        <div className="mb-6 relative w-full h-[400px]">
          <Image
            src={article.image.originalSrc}
            alt={article.image.altText || article.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded object-cover"
            priority
          />
        </div>
      )}
      
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />
    </div>
  );
}
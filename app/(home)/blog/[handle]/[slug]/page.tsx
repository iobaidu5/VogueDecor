// app/(home)/blog/[handle]/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import { shopifyFetch } from 'lib/shopify';
import { getBlogArticlesQuery } from '../../../../../lib/shopify/queries/blogs';
import { format } from 'date-fns';
import Image from 'next/image';
import { unstable_cache } from 'next/cache';

interface BlogArticleNode {
  id: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  publishedAt: string;
  image: {
    originalSrc: string;
    altText: string | null;
  } | null;
}

interface BlogArticlesResponse {
  data?: {
    blog: {
      title: string;
      articles: {
        edges: {
          node: BlogArticleNode;
        }[];
      };
    } | null;
  };
  errors?: { message: string }[];
}

// Use a type instead of interface for props
type PageParams = {
  handle: string;
  slug: string;
};

const getArticle = unstable_cache(async (handle: string, slug: string) => {
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

    // Find matching article by slug
    const matchedArticle = blog.articles.edges.find((edge) => {
      const articleSlug = edge.node.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

      console.log(`Comparing: "${articleSlug}" === "${slug}"`);
      return articleSlug === slug;
    });

    if (!matchedArticle) {
      console.error(`Article with slug "${slug}" not found in blog "${handle}"`);
      console.log('Available articles:', blog.articles.edges.map(e => e.node.title));
      return null;
    }

    console.log(`Found article: ${matchedArticle.node.title}`);
    return matchedArticle.node;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
});

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { handle, slug } = params;
  const article = await getArticle(handle, slug);

  return {
    title: article?.title || 'Blog Post',
    description: article?.excerpt || 'Read this interesting blog post',
    openGraph: {
      title: article?.title || 'Blog Post',
      description: article?.excerpt || 'Read this interesting blog post',
      images: article?.image?.originalSrc ? [{ url: article.image.originalSrc }] : [],
    },
  };
}

export default async function BlogPage({ params }: { params: PageParams }) {
  const { handle, slug } = params;
  console.log(`Requested article: handle=${handle}, slug=${slug}`);

  const article = await getArticle(handle, slug);

  if (!article) {
    console.log('Article not found - returning 404');
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
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
            sizes="(max-width: 768px) 100vw, 70vw"
            className="rounded object-cover"
            priority
            unoptimized
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
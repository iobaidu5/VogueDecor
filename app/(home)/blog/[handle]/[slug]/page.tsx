// app/(home)/blog/[handle]/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { type Metadata } from 'next'
import { shopifyFetch } from 'lib/shopify'
import { getBlogArticlesQuery } from '../../../../../lib/shopify/queries/blogs'
import { format } from 'date-fns'
import Image from 'next/image'
import { cache } from 'react'
import Script from 'next/script'

type BlogArticlesResponse = {
  data?: {
    blog: {
      title: string
      url: string
      articles: {
        edges: {
          node: {
            id: string
            title: string
            handle: string
            url: string
            excerpt: string
            contentHtml: string
            publishedAt: string
            image: {
              originalSrc: string
              altText: string | null
            } | null
          }
        }[]
      }
    } | null
  }
  errors?: { message: string }[]
}

const getArticle = cache(async (handle: string, slug: string) => {
  const res = await shopifyFetch<BlogArticlesResponse>({
    query: getBlogArticlesQuery,
    variables: { handle },
    cache: 'no-cache',
  })

  const blog = res.body?.data?.blog
  if (!blog) return null

  return blog.articles.edges.find(edge => edge.node.handle === slug)?.node || null
})

import { getBaseUrl } from 'lib/site-url'

export async function generateMetadata({ params }: { params: Promise<{ handle: string; slug: string }> }): Promise<Metadata> {
  // Await the params promise first
  const { handle, slug } = await params
  const article = await getArticle(handle, slug)
  const baseUrl = getBaseUrl()
  
  return {
    title: article?.title || 'Blog Post',
    description: article?.excerpt || 'Read this interesting blog post',
    alternates: {
      canonical: `${baseUrl}/blog/${handle}/${slug}`,
    },
    openGraph: {
      title: article?.title || 'Blog Post',
      description: article?.excerpt || 'Read this interesting blog post',
      images: article?.image?.originalSrc ? [{ url: article.image.originalSrc }] : [],
    },
  }
}

export default async function BlogPage({ params }: { params: Promise<{ handle: string; slug: string }> }) {
  // Await the params promise first
  const { handle, slug } = await params
  const article = await getArticle(handle, slug)

  if (!article) return notFound()

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${article.handle}`,
    },
    headline: article.title,
    description: article.excerpt,
    image: [article.image?.originalSrc || `${process.env.NEXT_PUBLIC_SITE_URL}/default-image.jpg`],
    author: {
      '@type': 'Person',
      name: article.author || 'Vogue Decor',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vogue Decor',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    articleSection: 'Restaurant Furniture Blog',
    keywords:
      article.tags?.join(', ') ||
      'restaurant furniture, restaurant chairs, tables, barstools, booths, interior design',
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Blog JSON-LD */}
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

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
          prose-headings:font-semibold 
          prose-headings:tracking-tight 
          prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-4xl prose-h2:text-gray-900 prose-h2:border-b prose-h2:border-gray-200
          prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-2xl prose-h3:text-blue-700
          prose-p:mb-6 prose-p:text-gray-800 prose-p:leading-loose
          prose-li:marker:text-gray-500 prose-li:mb-2 prose-ol:list-decimal prose-ul:list-disc prose-ul:pl-6 prose-ol:pl-6
          prose-a:text-blue-600 hover:prose-a:underline
          prose-img:rounded-xl prose-img:shadow-md prose-img:mx-auto prose-img:my-6
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
        "
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />
    </div>
  )
}
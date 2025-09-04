import { shopifyFetch } from 'lib/shopify';


const getBlogArticlesQuerySiteMap = `
  query BlogArticles($handle: String!) {
    blog(handle: $handle) {
      articles(first: 100, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            id
            handle
            title
            publishedAt
          }
        }
      }
    }
  }
`;

export async function getBlogArticlesByHandleForSitemap(handle: string) {
  const res = await shopifyFetch<{ data: any }>({
    query: getBlogArticlesQuerySiteMap,
    variables: { handle },
    cache: "no-cache",
  });

  const blog = res.body?.data?.blog;
  if (!blog) return [];

  return blog.articles.edges.map(({ node }: any) => {
    // URL structure for sitemap
    return {
      url: `/blog/${handle}/${node.handle}`,
      lastModified: node.publishedAt ?? new Date().toISOString(),
    };
  });
}

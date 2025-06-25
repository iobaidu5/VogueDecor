// lib/queries/blogs.ts
export const getBlogArticlesQuery = /* GraphQL */ `
  query getBlogArticles($handle: String!, $limit: Int = 10) {
    blog(handle: $handle) {
      title
      articles(first: $limit) {
        edges {
          node {
            id
            title
            excerpt
            contentHtml
            publishedAt
            image {
              originalSrc
              altText
            }
          }
        }
      }
    }
  }
`;

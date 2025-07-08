// Query to get all blog handles
// export const getAllBlogsQuery = /* GraphQL */ `
//   query getAllBlogs {
//     blogs(first: 10) {
//       edges {
//         node {
//           handle
//           title
//         }
//       }
//     }
//   }
// `;

// Query to get articles for one blog by handle
// export const getBlogArticlesQuery = /* GraphQL */ `
//   query getBlogArticles($handle: String!, $limit: Int = 10) {
//     blog(handle: $handle) {
//       title
//       articles(first: $limit) {
//         edges {
//           node {
//             id
//             title
//             excerpt
//             contentHtml
//             publishedAt
//             image {
//               originalSrc
//               altText
//             }
//           }
//         }
//       }
//     }
//   }
// `;


// Get all blog handles
export const getAllBlogsQuery = /* GraphQL */ `
  query getAllBlogs {
    blogs(first: 10) {
      edges {
        node {
          handle
          title
        }
      }
    }
  }
`;

// Get articles for one blog by handle
// queries/blogs.ts
export const getBlogArticlesQuery = /* GraphQL */ `
  query getBlogArticles($handle: String!, $limit: Int = 10) {
    blog(handle: $handle) {
      title
      articles(first: $limit) {
        edges {
          node {
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


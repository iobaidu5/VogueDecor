import imageFragment from "./image";
import seoFragment from "./seo";

// export const productFragment = /* GraphQl */ `
//     fragment product on Product {
//     id
//     handle
//     availableForSale
//     title
//     description
//     descriptionHtml
//     options {
//       id
//       name
//       values
//     }
//     priceRange {
//       maxVariantPrice {
//         amount
//         currencyCode
//       }
//       minVariantPrice {
//         amount
//         currencyCode
//       }
//     }
//     variants(first: 250) {
//       edges {
//         node {
//           id
//           title
//           sku
//           availableForSale
//           selectedOptions {
//             name
//             value
//           }
//           price {
//             amount
//             currencyCode
//           }
//           compareAtPrice {
//             amount
//             currencyCode
//           }
//         }
//       }
//     }
//     featuredImage {
//       ...image
//     }
//     images(first: 20) {
//       edges {
//         node {
//           ...image
//         }
//       }
//     }
//     seo {
//       ...seo
//     }
//     tags
//     updatedAt
//     }
//     ${imageFragment}
//     ${seoFragment}
// `;


export const productFragment = /* GraphQL */ `
  fragment product on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          sku
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt
    # Add collections field
    collections(first: 10) {
      edges {
        node {
          title
          handle
        }
      }
    }
  }
  ${imageFragment}
  ${seoFragment}
`;
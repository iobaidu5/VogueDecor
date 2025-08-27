// // lib/shopify/queries/bundles.ts

// export const getBundleProductQuery = `
// query getBundleProduct($handle: String!) {
//   productByHandle(handle: $handle) {
//     id
//     title
//     descriptionHtml
//     featuredImage {
//       url
//       altText
//     }
//     metafields(
//       identifiers: [
//         { namespace: "bundle", key: "products" }
//         { namespace: "bundle", key: "discount" }
//       ]
//     ) {
//       namespace
//       key
//       value
//       type
//     }
//   }
// }
// `;

// export const getProductsByIdsQuery = `
// query getProductsByIds($ids: [ID!]!) {
//   nodes(ids: $ids) {
//     ... on Product {
//       id
//       title
//       handle
//       featuredImage { url altText }
//       variants(first: 10) {
//         edges {
//           node {
//             id
//             title
//             price { amount currencyCode }
//           }
//         }
//       }
//     }
//   }
// }
// `;

// export const getBundleProductQuery = `
// query getBundleProduct($handle: String!) {
//   productByHandle(handle: $handle) {
//     id
//     title
//     descriptionHtml
//     featuredImage {
//       url
//       altText
//     }
//     bundleItems: metafield(namespace: "bundler", key: "products") {
//       value
//       type
//     }
//   }
// }
// `;

// export const getProductsByIdsQuery = `
// query getProductsByIds($ids: [ID!]!) {
//   nodes(ids: $ids) {
//     ... on Product {
//       id
//       title
//       featuredImage {
//         url
//         altText
//       }
//     }
//   }
// }
// `;


// # lib/shopify/queries/bundle.ts
export const getBundleProductQuery = `
query getBundleProduct($handle: String!) {
  productByHandle(handle: $handle) {
    id
    title
    descriptionHtml
    featuredImage { url altText }
    priceRange {
      minVariantPrice { amount }
      maxVariantPrice { amount }
    }
    metafield(namespace: "native_bundles", key: "bundle_json") {
      value
    }
  }
}
`;

export const getProductsByIdsQuery = `
query getProductsByIds($ids: [ID!]!) {
  nodes(ids: $ids) {
    ... on Product {
      id
      title
      handle
      featuredImage { url altText }
      priceRange {
        minVariantPrice { amount }
      }
    }
  }
}
`;
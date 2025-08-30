export async function getProductsByIds(ids: string[]) {
  // Ensure IDs are in Shopify GID format
  const formattedIds = ids.map((id) => {
    if (id.startsWith("gid://")) return id; // already correct
    return `gid://shopify/Product/${id}`;   // convert numeric/string ID
  });

  // const query = `
  //   query getProductsByIds($ids: [ID!]!) {
  //     nodes(ids: $ids) {
  //       ... on Product {
  //         id
  //         title
  //         handle
  //         featuredImage { url altText }
  //         priceRange {
  //           minVariantPrice { amount }
  //         }
  //       }
  //     }
  //   }
  // `;

  const query = `
  query getProductsByIds($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
        handle
        featuredImage { url altText }
        priceRange {
          minVariantPrice { amount currencyCode }
        }
        availableForSale
        variants(first: 10) {
          nodes {
            id
            title
            availableForSale
            selectedOptions { name value }
            priceV2 { amount currencyCode }
          }
        }
      }
    }
  }
`;


  const domain = process.env.SHOPIFY_STORE_DOMAIN!;
  const token = process.env.SHOPIFY_STOREFRONT_API_TOKEN!;
  const version = process.env.SHOPIFY_API_VERSION || "2023-07";

  console.log("Fetching products from Shopify with IDs:", formattedIds);

  const res = await fetch(
    `https://${domain}/api/${version}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query, variables: { ids: formattedIds } }),
    }
  );

  let json: any;
  try {
    json = await res.json();
  } catch (e) {
    console.error("Failed to parse Shopify response as JSON");
    throw new Error("Invalid response from Shopify API");
  }

  console.log("Shopify response:", JSON.stringify(json, null, 2));

  if (!res.ok || json.errors) {
    console.error("Shopify API Error:", json.errors || json);
    throw new Error("Failed to fetch products from Shopify");
  }

  return json.data?.nodes || [];
}

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
        },
        body: JSON.stringify({
          query: `
            {
              products(first: 250) {
                edges {
                  node {
                    id
                    title
                    variants(first: 5) {
                      edges {
                        node {
                          id
                          title
                          price {
                            amount
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
        }),
      }
    );

    const data = await res.json();

    // Debugging: log if something goes wrong
    if (data.errors) {
      console.error("Shopify API errors:", data.errors);
      return NextResponse.json(
        { error: "Shopify API error", details: data.errors },
        { status: 500 }
      );
    }

    if (!data.data || !data.data.products) {
      console.error("Unexpected Shopify response:", JSON.stringify(data, null, 2));
      return NextResponse.json(
        { error: "Unexpected Shopify response", details: data },
        { status: 500 }
      );
    }

    const products = data.data.products.edges.map((e: any) => ({
      id: e.node.id,
      title: e.node.title,
      variants: e.node.variants.edges.map((v: any) => ({
        id: v.node.id,
        title: v.node.title,
        price: v.node.price.amount,
      })),
    }));

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Shopify fetch failed:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

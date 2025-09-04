// app/api/check-discount/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { discountCode } = await request.json();

    // Validate input
    if (!discountCode) {
      return NextResponse.json(
        { message: 'Discount code is required' },
        { status: 400 }
      );
    }

    // Check if discount code is valid using Shopify API
    const response = await fetch(process.env.SHOPIFY_STORE_DOMAIN + '/api/2023-07/graphql.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query: `
          query discountNode($query: String!) {
            discountNodes(first: 1, query: $query) {
              edges {
                node {
                  id
                  discount {
                    ... on DiscountCodeApp {
                      code
                      status
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          query: `code:${discountCode}`,
        },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      return NextResponse.json(
        { message: data.errors[0].message },
        { status: 400 }
      );
    }

    const discountNode = data.data.discountNodes.edges[0]?.node;
    
    if (!discountNode || discountNode.discount.status !== 'ACTIVE') {
      return NextResponse.json({
        valid: false,
        message: 'Invalid discount code',
      });
    }

    return NextResponse.json({
      valid: true,
      discount: discountNode.discount,
    });
  } catch (error) {
    console.error('Error checking discount:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
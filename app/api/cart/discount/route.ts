// app/api/cart/discount/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { cartId, discountCode } = await request.json();

    // Validate input
    if (!cartId || !discountCode) {
      return NextResponse.json(
        { message: 'Cart ID and discount code are required' },
        { status: 400 }
      );
    }

    // Apply discount to cart using Shopify Storefront API
    const response = await fetch(process.env.SHOPIFY_STORE_DOMAIN + '/api/2023-07/graphql.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query: `
          mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]) {
            cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
              cart {
                id
                discountCodes {
                  code
                  applicable
                }
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                  totalTaxAmount {
                    amount
                    currencyCode
                  }
                  totalDutyAmount {
                    amount
                    currencyCode
                  }
                }
              }
              userErrors {
                field
                message
              }
            }
          }
        `,
        variables: {
          cartId,
          discountCodes: [discountCode],
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

    if (data.data.cartDiscountCodesUpdate.userErrors.length > 0) {
      return NextResponse.json(
        { message: data.data.cartDiscountCodesUpdate.userErrors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      cart: data.data.cartDiscountCodesUpdate.cart,
    });
  } catch (error) {
    console.error('Error applying discount to cart:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
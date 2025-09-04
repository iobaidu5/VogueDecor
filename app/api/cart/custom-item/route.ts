// app/api/cart/custom-item/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { cartId, title, price, quantity } = await request.json();

    // Validate input
    if (!cartId || !title || !price || !quantity) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Add custom line item to cart using Shopify API
    const response = await fetch(process.env.SHOPIFY_STORE_DOMAIN + '/api/2023-07/graphql.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query: `
          mutation cartCustomItemAdd($cartId: ID!, $customItems: [CartCustomItemInput!]!) {
            cartCustomItemAdd(cartId: $cartId, customItems: $customItems) {
              cart {
                id
                lines(first: 100) {
                  edges {
                    node {
                      id
                      quantity
                      merchandise {
                        ... on ProductVariant {
                          id
                          title
                          product {
                            title
                          }
                        }
                      }
                      cost {
                        totalAmount {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                }
                cost {
                  totalAmount {
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
          customItems: [
            {
              title,
              price: {
                amount: price,
                currencyCode: 'USD', // Adjust based on your currency
              },
              quantity,
            },
          ],
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

    if (data.data.cartCustomItemAdd.userErrors.length > 0) {
      return NextResponse.json(
        { message: data.data.cartCustomItemAdd.userErrors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      cart: data.data.cartCustomItemAdd.cart,
    });
  } catch (error) {
    console.error('Error adding custom item to cart:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
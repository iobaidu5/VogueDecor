import { sfFetch } from './shopify/storefront';

export async function createCart() {
  const q = `mutation { cartCreate { cart { id checkoutUrl totalQuantity } userErrors { message } } }`;
  const d = await sfFetch<{ cartCreate: { cart: any } }>(q);
  return d.cartCreate.cart;
}

export async function addLines(cartId: string, lines: { merchandiseId: string; quantity: number }[]) {
  const q = `
    mutation AddLines($cartId:ID!, $lines:[CartLineInput!]!) {
      cartLinesAdd(cartId:$cartId, lines:$lines) {
        cart { id totalQuantity checkoutUrl }
        userErrors { field message }
      }
    }
  `;
  return await sfFetch(q, { cartId, lines });
}

export async function applyDiscountCodes(cartId: string, codes: string[]) {
  const q = `
    mutation ApplyCodes($cartId:ID!, $codes:[String!]!) {
      cartDiscountCodesUpdate(cartId:$cartId, discountCodes:$codes) {
        cart { id discountCodes { code applicable } }
        userErrors { field message }
      }
    }
  `;
  return await sfFetch(q, { cartId, codes });
}

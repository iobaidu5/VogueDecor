export async function sfFetch<T = any>(query: string, variables?: Record<string, any>) {
  const domain = process.env.SHOPIFY_STORE_DOMAIN!;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
  const version = process.env.SHOPIFY_API_VERSION || '2023-07';

  const res = await fetch(`https://${domain}/api/${version}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });

  const json = await res.json();
  if (json.errors) {
    console.error('Shopify Storefront API errors:', json.errors);
    throw new Error('Storefront API error: ' + JSON.stringify(json.errors));
  }
  return json.data as T;
}

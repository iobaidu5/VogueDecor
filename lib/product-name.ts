export function productName(t: any, title: string | undefined | null): string {
  if (!title) return '';
  const products = t('products', { returnObjects: true });
  if (products && typeof products === 'object') {
    const match = (products as Record<string, string>)[title];
    if (typeof match === 'string') return match;
  }
  return title;
}

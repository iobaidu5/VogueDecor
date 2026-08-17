// Product titles are used verbatim as translation keys. Titles containing "."
// (e.g. "KRIS 2.0 - Chair", "31.5″ Round") break t(`products.${title}`)
// because i18next treats "." as a key separator, so we look the title up in
// the products map directly and fall back to the untranslated title.
export function productName(t: any, title: string | undefined | null): string {
  if (!title) return '';
  const products = t('products', { returnObjects: true });
  if (products && typeof products === 'object') {
    const match = (products as Record<string, string>)[title];
    if (typeof match === 'string') return match;
  }
  return title;
}

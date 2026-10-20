import i18n from './i18nClient';

const spanishProductTerms: Array<[string, string]> = [
  ['Barstool', 'Taburete de bar'],
  ['barstool', 'taburete de bar'],
  ['Chair', 'Silla'],
  ['chair', 'silla'],
  ['Table Top', 'Cubierta de mesa'],
  ['Table top', 'Cubierta de mesa'],
  ['table top', 'cubierta de mesa'],
  ['Table Base', 'Base de mesa'],
  ['table base', 'base de mesa'],
  ['BOOTH', 'CABINA'],
  ['Booth', 'Cabina'],
  ['Loveseat', 'Sofá de dos plazas'],
  ['Final Sale', 'Venta final'],
  ['stainless steel', 'acero inoxidable'],
  ['black steel', 'acero negro'],
  ['Tempered Porcelain', 'porcelana templada'],
  ['HPL Laminated', 'laminado HPL'],
  ['forest green', 'verde bosque'],
  ['light maple', 'arce claro'],
  ['dark walnut', 'nogal oscuro'],
  ['walnut', 'nogal'],
  ['cognac', 'coñac'],
  ['caramel', 'caramelo'],
  ['mustard', 'mostaza'],
  ['charcoal', 'carbón'],
  ['black', 'negro'],
  ['white', 'blanco'],
  ['brown', 'marrón'],
  ['grey', 'gris'],
  ['red', 'rojo'],
  ['green', 'verde'],
  ['blue', 'azul'],
  ['yellow', 'amarillo'],
  ['pink', 'rosa'],
  ['turquoise', 'turquesa'],
  ['cream', 'crema'],
  ['tan', 'beige'],
];

function spanishProductName(title: string): string {
  return spanishProductTerms.reduce(
    (value, [source, translation]) => value.replaceAll(source, translation),
    title,
  );
}

// Product titles are used verbatim as translation keys. Titles containing "."
// (e.g. "KRIS 2.0 - Chair", "31.5″ Round") break t(`products.${title}`)
// because i18next treats "." as a key separator, so we look the title up in
// the products map directly and fall back to the untranslated title.
export function productName(t: any, title: string | undefined | null): string {
  if (!title) return '';
  const products = t('products', { returnObjects: true });
  if (products && typeof products === 'object') {
    const match = (products as Record<string, string>)[title];
    if (typeof match === 'string') return i18n.language === 'es' ? spanishProductName(match) : match;
  }
  return i18n.language === 'es' ? spanishProductName(title) : title;
}

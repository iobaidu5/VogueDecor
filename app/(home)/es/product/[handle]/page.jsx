import ProductPage, { generateMetadata as productMetadata } from '../../../product/[handle]/page';

export function generateMetadata(props) {
  return productMetadata({ ...props, locale: 'es' });
}

export default function SpanishProductPage(props) {
  return ProductPage({ ...props, locale: 'es' });
}

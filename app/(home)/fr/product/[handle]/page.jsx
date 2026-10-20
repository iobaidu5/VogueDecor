import ProductPage, { generateMetadata as productMetadata } from '../../../product/[handle]/page';

export function generateMetadata(props) {
  return productMetadata({ ...props, locale: 'fr' });
}

export default function FrenchProductPage(props) {
  return ProductPage({ ...props, locale: 'fr' });
}

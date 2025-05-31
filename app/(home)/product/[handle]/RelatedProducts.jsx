import { getProductRecommendations } from 'lib/shopify';
import Slider from 'components/slider';

export default async function RelatedProducts({ id }) {
  const relatedProducts = await getProductRecommendations(id);
  if (!relatedProducts) return null;
  return <Slider data={relatedProducts} />;
}

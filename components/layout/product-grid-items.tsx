import { Product } from 'lib/shopify/types';
import { ProductCard } from './productCard';

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <div className="my-[30px] grid grid-cols-1 justify-center gap-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      {products?.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}

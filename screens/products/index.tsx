import { ProductProvider } from 'components/product/product-context';
import Explore from './components/Explore';
import ProductPage from './components/productdata';

const MyProducts = () => {
  return (
    <div className="py-[70px]">
      <Explore />
      <ProductPage />
    </div>
  );
};

export default MyProducts;

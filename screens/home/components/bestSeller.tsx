import Link from 'next/link';
import { getCollectionProducts } from 'lib/shopify';
import ProductCard from './productCard';

const BestSeller = async () => {
  const bestSellerItems = await getCollectionProducts({
    collection: 'best-seller'
  });

  return (
    <div className="xs:pt-6 md:pt-12">
      <div className="flex flex-col items-center justify-center pt-10">
        <p className="text-[14px] text-[#878787]">Discover best of the best</p>
        <p className="font-medium xs:text-[25px] md:text-[40px]">Best Sellers</p>
        <div className="h-[2px] w-[130px] bg-[#878787]" />
      </div>
      <ProductCard data={bestSellerItems} />
      <Link href="/products">
        <div className="border-1 mx-auto mt-8 flex w-[200px] cursor-pointer justify-center rounded-full border border-solid bg-transparent px-4 py-2 font-medium transition duration-150 ease-in-out hover:scale-105">
          <p>View</p>
        </div>
      </Link>
    </div>
  );
};

export default BestSeller;

import Link from 'next/link';
import ProductCard from './productCard';
import { getCollectionProducts } from 'lib/shopify';

const DiscoverMore = async () => {
  const newItems = await getCollectionProducts({
    collection: 'new'
  });
  return (
    <div className="xs:pt-4 md:pt-12">
      <div className="flex flex-col items-center justify-center pt-10">
        <p className="text-[14px] text-[#878787]">Elevate your space with us</p>
        <p className="xs:text-[25px] font-medium md:text-[40px]">Discover</p>
        <div className="h-[2px] w-[130px] bg-[#878787]" />
      </div>
      <ProductCard data={newItems} isDiscover />
      <Link href="/products">
        <div className="border-1 mx-auto mt-8 flex w-[200px] cursor-pointer justify-center rounded-full border border-solid bg-transparent px-4 py-2 font-medium">
          <p>View All Categories</p>
        </div>
      </Link>
    </div>
  );
};

export default DiscoverMore;

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductSlider from './productSlider';
import { getCollectionProducts } from 'lib/shopify';
import '../../../lib/i18nClient'
import { useTranslation } from 'react-i18next';

const BestSeller = () => {
  const [bestSellerItems, setBestSellerItems] = useState<any[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const { t, ready } = useTranslation('common');

  useEffect(() => {
    // Fetch best seller items
    async function fetchBestSellers() {
      try {
        const products = await getCollectionProducts({ collection: 'best-seller' });
        setBestSellerItems(products);
      } catch (err) {
        console.error('Failed to fetch best sellers', err);
      }
    }

    // Fetch wishlist ids
    async function fetchWishlist() {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('/api/wishlist', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const ids = res.data.map((item: any) => item.productId);
        setWishlistIds(ids);
      } catch (err) {
        console.error('Failed to fetch wishlist', err);
      }
    }

    fetchBestSellers();
    fetchWishlist();
  }, []);

  return (
    <div className="xs:pt-6 md:pt-6">
      <div className="flex flex-col items-center justify-center pt-10">
        <p className="text-[14px] text-[#878787]">{t('discoverBest')}</p>
        <p className="font-medium xs:text-[25px] md:text-[40px]">{t('bestSellers')}</p>
        {/* <div className="h-[2px] w-[130px] bg-[#878787]" /> */}
      </div>

      <ProductSlider data={bestSellerItems} wishlistIds={wishlistIds} />

      {/* <Link href="/products">
        <div className="border-1 mx-auto mt-12 flex w-[200px] cursor-pointer justify-center rounded-full border border-solid bg-transparent px-4 py-2 font-medium transition duration-150 ease-in-out hover:scale-105">
          <p>View</p>
        </div>
      </Link> */}
    </div>
  );
};

export default BestSeller;

'use client';

import Image from 'next/image';
import banner1 from 'media/small-banner/Chairs banner no txt.png';
import banner2 from 'media/small-banner/Outdoor banner no txt.png';
import Link from 'next/link';
import '../../../lib/i18nClient'
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const HomeBanners = () => {
  const { t, ready } = useTranslation('common');

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  return (
<div className="container mx-auto px-0 py-8 mt-20">
  <div className="grid grid-cols-1 md:grid-cols-2 -gap-20 sm:gap-6">
    {/* Banner 1 */}
    <div className="relative aspect-[1/1] md:aspect-auto md:h-[500px] w-full">
      <Image
        src={banner1}
        alt="Banner 1"
        fill
        className="object-contain sm:object-cover rounded-lg"
        priority
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-black text-2xl sm:text-4xl font-semibold">
          {t('comfort')}<br />{t('comfort2')}
        </h2>
        <div className="mt-6">
          <Link
            href="/search/chairs"
            className="bg-black text-white px-4 py-2 text-xs sm:text-sm rounded hover:bg-gray-900 transition duration-300"
          >
            {t('shopChairs')}
          </Link>
        </div>
      </div>
    </div>

    {/* Banner 2 */}
    <div className="relative aspect-[1/1] md:aspect-auto md:h-[500px] w-full">
      <Image
        src={banner2}
        alt="Banner 2"
        fill
        className="h-auto object-contain sm:object-cover rounded-lg"
        priority
      />
      <div className="absolute top-20 sm:top-10 sm:inset-0 flex flex-col items-center justify-start text-center px-4">
        <h2 className="text-black text-2xl sm:text-4xl font-semibold">
          {t('outdoorCollection')}
        </h2>
        <p className="text-black mb-4">{t('defineOutdoorStyle')}</p>
        <div>
          <Link
            href="/search/outdoor-furniture"
            className="bg-black text-white px-4 py-2 text-xs sm:text-sm rounded hover:bg-gray-900 transition duration-300"
          >
            {t('shopOutdoor')}
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>


  );
};

export default HomeBanners;

'use client';

import Image from 'next/image';
import banner1 from 'media/small-banner/Chairs banner no txt.png';
import banner2 from 'media/small-banner/Outdoor banner no txt.png';
import Link from 'next/link';
import '../../../lib/i18nClient'
import { useTranslation } from 'react-i18next';

const HomeBanners = () => {
  const { t, ready } = useTranslation('common');
  return (
    <div className="container mx-auto px-0 md:px-0 py-8 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Banner 1 */}
        <div className="relative h-[400px] md:h-[500px] w-full">
          <Image
            src={banner1}
            alt="Banner 1"
            fill
            className="object-cover md:object-cover rounded-lg"
            priority
          />
          <div className="absolute inset-0 mt-0 sm:-mt-12 flex items-center justify-center rounded-lg">
            <h2 className="text-black text-center text-2xl sm:text-4xl font-semibold">
            {t('comfort')}<br></br>{t('comfort2')}
            </h2>
            <div className="absolute bottom-[31%] left-1/2 transform -translate-x-1/2">
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
        <div className="relative h-[400px] md:h-[500px] w-full">
          <Image
            src={banner2}
            alt="Banner 2"
            fill
            className="object-cover md:object-cover rounded-lg"
            priority
          />
          <div className="absolute top-12 sm:top inset-0 mt-4 rounded-lg">
            <h2 className="text-black text-center text-2xl sm:text-4xl font-semibold">
            {t('outdoorCollection')}
            </h2>
            <p className="text-black mb-4 text-center">{t('defineOutdoorStyle')}</p>

            <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2">
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

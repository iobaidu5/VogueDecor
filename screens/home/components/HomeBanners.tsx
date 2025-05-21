'use client';

import Image from 'next/image';
import banner1 from 'media/png/banner.png';
import banner2 from 'media/png/banner.png';

const HomeBanners = () => {
  return (
    <div className="container mx-auto px-4 md:px-4 py-8 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Banner 1 */}
        <div className="relative h-[250px] md:h-[400px] w-full">
          <Image
            src={banner1}
            alt="Banner 1"
            fill
            className="object-cover rounded-lg"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
            <h2 className="text-white text-center text-xl md:text-3xl font-semibold">
              Sale Small Banner
            </h2>
          </div>
        </div>

        {/* Banner 2 */}
        <div className="relative h-[250px] md:h-[400px] w-full">
          <Image
            src={banner2}
            alt="Banner 2"
            fill
            className="object-cover rounded-lg"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
            <h2 className="text-white text-center text-xl md:text-3xl font-semibold">
              New Arrivals Banner
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanners;

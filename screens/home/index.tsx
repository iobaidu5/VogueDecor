'use client';

import ForwardLink from 'components/forwardlink/forwardLink';
import mainImage from 'media/png/mainImage.png';
// import hero from 'media/png/main-banner.png';
import hero from 'media/home-banner/Main Banner without button.png';
import heroFr from 'media/home-banner/Main Banner without button fr.png';
import heroMobile from 'media/png/Mobile banner with button.png';
import heroMobileFr from 'media/home-banner/Mobile banner without button fr.png';
import mainText from 'media/png/mainText.png';
import Image from 'next/image';
import BestSeller from './components/bestSeller';
import Community from './components/community';
import DiscoverMore from './components/Discover';
import Upgrade from './components/upgrade';
import WhyChooseUs from './components/whyChooseUs';
import { ProductProvider } from 'components/product/product-context';
import CartModal from 'components/cart/modal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HomeCategories from './components/homeCategories';
import HomeBanners from './components/HomeBanners';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function MainPage() {
  const { t } = useTranslation("common");
  const { i18n } = useTranslation();
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
    <>
      <div className="w-full overflow-x-hidden">
        <section className={isMobile ? "relative w-full h-auto" : "relative w-full h-screen overflow-hidden"}>
          <Image
           src={
            i18n.language === 'fr'
              ? isMobile
                ? heroMobileFr
                : heroFr
              : isMobile
                ? heroMobile
                : hero
          }          
            alt="Banner"
            fill={isMobile ? false : true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            className={isMobile ? "object-contain mt-12 h-auto" : "object-cover"}
            priority
          />
          <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2">
            <Link
              href="/"
              className="bg-black text-white px-6 py-3 text-lg rounded hover:bg-gray-900 transition duration-300"
            >
               {t('shopOutdoor')}
            </Link>
          </div>
        </section>
      </div>
      <main className="w-full px-[15px] md:px-[100px] md:pt-4">
        {/* <div>
          <DiscoverMore />
        </div> */}

        <div>
          <BestSeller />
        </div>

        <div>
          <HomeBanners />
        </div>

        <div>
          <HomeCategories />
        </div>


        <div>
          <WhyChooseUs />
        </div>
      </main>
      <div className="pb-12 xs:pt-[30px] lg:pt-[30px]">
        <Upgrade />
      </div>

      <div>
        <Community />
      </div>

      <div className="flex justify-end md:w-1/3">
        <CartModal />
      </div>
    </>
  );
}

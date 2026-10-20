'use client';

import heroWebBanner from 'media/home-banner/update/mobile/desktop.png';
import heroMobileBanner from 'media/home-banner/update/desktop/mobile.png';
import Image from 'next/image';
import BestSeller from './components/bestSeller';
import Community from './components/community';
import Upgrade from './components/upgrade';
import WhyChooseUs from './components/whyChooseUs';
import HomeCategories from './components/homeCategories';
import HomeBanners from './components/HomeBanners';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { toSiteLocale, withSpanishPath } from '../../lib/locale-path';

export default function MainPage() {
  const { t, i18n } = useTranslation('common');

  const bannerLink = withSpanishPath('/new-arrivals', toSiteLocale(i18n.language));

  // Positions and sizes are scaled from the designer's text versions of the banners
  const heroText = (variant: 'web' | 'mobile') => (
    <div
      className={
        variant === 'web'
          ? 'absolute left-[4.4%] top-[15%] text-black'
          : 'absolute left-[8%] top-[13%] max-w-[60%] text-black'
      }
    >
      <h2
        className={`font-semibold leading-tight ${
          variant === 'web' ? 'text-[3.1vw]' : 'text-[clamp(26px,5.8vw,75px)]'
        }`}
      >
        {t('heroNewTitle')}
      </h2>
      <p
        className={`mt-[0.6em] leading-snug ${
          variant === 'web' ? 'max-w-[34vw] text-[1.45vw]' : 'text-[clamp(15px,2.6vw,34px)]'
        }`}
      >
        {t('announcementLine1')}
        <br />
        {t('announcementLine2')}
      </p>
      <span
        className={`mt-[0.9em] inline-block font-medium underline underline-offset-2 ${
          variant === 'web' ? 'text-[1.2vw]' : 'text-[clamp(14px,2.2vw,28px)]'
        } cursor-pointer transition-all duration-200 ease-out hover:-translate-y-0.5 hover:text-neutral-600 hover:tracking-wide`}
      >
        {t('announcementShopNow')}
      </span>
    </div>
  );

  return (
    <>
      <div className="w-full overflow-x-hidden">
        <section className="relative w-full h-auto overflow-hidden max-[1200px]:md:mt-12">
          <div className="relative w-full overflow-hidden">
            <Link
              href={bannerLink}
              className="relative block w-full cursor-pointer min-[1201px]:hidden"
            >
              <Image
                src={heroMobileBanner}
                alt=""
                width={heroMobileBanner.width}
                height={heroMobileBanner.height}
                className="block h-auto w-full max-w-full"
                sizes="100vw"
                priority
              />
              {heroText('mobile')}
            </Link>
            <Link
              href={bannerLink}
              className="relative hidden w-full cursor-pointer min-[1201px]:block"
            >
              <Image
                src={heroWebBanner}
                alt=""
                width={heroWebBanner.width}
                height={heroWebBanner.height}
                className="block h-auto w-full max-w-full"
                sizes="100vw"
                priority
              />
              {heroText('web')}
            </Link>
          </div>
        </section>
      </div>

      <main className="w-full px-[15px] md:px-[100px] md:pt-4">
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
    </>
  );
}

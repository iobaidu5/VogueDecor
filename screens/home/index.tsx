'use client';

import summerBannerWebEn from 'media/eid/Summer Banner (ENG).png';
import summerBannerWebFr from 'media/eid/Summer Banner (FR).png';
import summerBannerMobileEn from 'media/eid/Summer Banner mobile (ENG).png';
import summerBannerMobileFr from 'media/eid/Summer Banner mobile (FR).png';
import Image from 'next/image';
import BestSeller from './components/bestSeller';
import Community from './components/community';
import Upgrade from './components/upgrade';
import WhyChooseUs from './components/whyChooseUs';
import HomeCategories from './components/homeCategories';
import HomeBanners from './components/HomeBanners';
import { SaleBar } from 'components/SaleBar';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function MainPage() {
  const { t, i18n } = useTranslation('common');

  const isFr = i18n.language === 'fr';
  const mobileBanner = isFr ? summerBannerMobileFr : summerBannerMobileEn;
  const webBanner = isFr ? summerBannerWebFr : summerBannerWebEn;
  const bannerLink = '/outdoor-furniture';

  return (
    <>
      <SaleBar />
      <div className="w-full overflow-x-hidden">
        <section className="relative w-full h-auto overflow-hidden max-[1200px]:md:mt-12">
          <div className="relative w-full overflow-hidden">
            <Link
              href={bannerLink}
              className="relative block w-full cursor-pointer min-[1201px]:hidden"
              aria-label={t('shopOutdoor')}
            >
              <Image
                key={`hero-mobile-${i18n.language}`}
                src={mobileBanner}
                alt={t('outdoorCollection')}
                width={mobileBanner.width}
                height={mobileBanner.height}
                className="block h-auto w-full max-w-full"
                sizes="100vw"
                priority
              />
            </Link>
            <Link
              href={bannerLink}
              className="relative hidden w-full cursor-pointer min-[1201px]:block"
              aria-label={t('shopOutdoor')}
            >
              <Image
                key={`hero-web-${i18n.language}`}
                src={webBanner}
                alt={t('outdoorCollection')}
                width={webBanner.width}
                height={webBanner.height}
                className="block h-auto w-full max-w-full"
                sizes="100vw"
                priority
              />
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

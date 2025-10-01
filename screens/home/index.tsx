'use client';

import ForwardLink from 'components/forwardlink/forwardLink';
import mainImage from 'media/png/mainImage.png';
// import hero from 'media/png/main-banner.png';
import hero from 'media/home-banner/Main Banner without button.png';
import heroFr from 'media/home-banner/Main Banner without button fr.png';
import heroMobile from 'media/home-banner/Mobile banner without button.png';
import heroMobileFr from 'media/home-banner/Mobile banner without button fr.png';


import newBanner1 from 'media/home-banner/new/1.png';
import newBanner2 from 'media/home-banner/new/2.png';
import newBanner3 from 'media/home-banner/new/3.png';
import combineBanner from 'media/home-banner/new/combine.png';


import newBanner1Mobile from 'media/home-banner/new/1-mobile.png';
import newBanner2Mobile from 'media/home-banner/new/2-mobile.png';
import newBanner3Mobile from 'media/home-banner/new/3-mobile.png';


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
import { useEffect, useRef, useState } from 'react';
import i18n from '../../lib/i18nClient';
import { useTranslation } from 'react-i18next';
import { SaleBar } from 'components/SaleBar';
import Slider from 'react-slick';

export default function MainPage() {
  const { t, i18n } = useTranslation("common");
  // const {  } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 700,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   arrows: false,

  //   responsive: [
  //     {
  //       breakpoint: 990, 
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         centerMode: false,
  //       },
  //     },
  //   ],
  // };


  const bannerPairsDesktop = [
    [
      {
        image: newBanner3,
        title: "bannerThreeTitle",
        description: "bannerThreeDesc",
        buttonText: "shopnow",
        link: "/new-arrivals",
      },
      {
        image: combineBanner,
        title: "bannerOneTitle",
        description: "bannerOneDesc",
        title2: "bannerTwoTitle",
        description2: "bannerTwoDesc",
        buttonText: "shopnow",
        link: "/new-arrivals",
      },
    ],
  ];


  // Mobile banners (single)
  const bannerMobile = [
    {
      image: newBanner3Mobile,
      title: 'bannerThreeTitle',
      description: 'bannerThreeDesc',
      buttonText: 'shopnow',
      link: '/new-arrivals',
    },
    {
      image: newBanner1Mobile,
      title: 'bannerOneTitle',
      description: 'bannerOneDesc',
      buttonText: 'shopnow',
      link: '/new-arrivals',
    },
    {
      image: newBanner2Mobile,
      title: 'bannerTwoTitle',
      description: 'bannerTwoDesc',
      buttonText: 'shopnow',
      link: '/new-arrivals',
    },
  ];


  const totalSlides = isMobile ? bannerMobile.length : bannerPairsDesktop.length;

  const settings = {
    dots: false,
    arrows: false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    beforeChange: (_, next) => setActiveSlide(next),
  };

  const goToSlide = (index) => {
    if (sliderRef.current && typeof sliderRef.current.slickGoTo === 'function') {
      sliderRef.current.slickGoTo(index);
    }
  };


  return (
    <>
      <div className="w-full overflow-x-hidden">
        {/* <section className={isMobile ? "mt-12 relative w-full h-auto" : "relative w-full h-screen overflow-hidden"}>
          <div className='relative z-[10]'>
            <SaleBar />
          </div>
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
            className={isMobile ? "object-contain h-auto" : "object-cover"}
            priority
          />
          <div className="absolute bottom-[60%] md:bottom-[5%] left-1/2 transform -translate-x-1/2">
            <Link
              href="/outdoor-furniture"
              className="bg-black text-white px-4 md:px-6 py-3 text-sm md:text-md rounded hover:bg-gray-900 transition duration-300"
            >
              {t('shopOutdoor')}
            </Link>
          </div>
        </section> */}

<section
  className={
    isMobile
      ? "mt-12 relative w-full h-auto"
      : "relative w-full overflow-hidden"
  }
>
  <div className="relative z-[10]">
    <SaleBar />
  </div>

  <Slider ref={sliderRef} {...settings}>
    {(isMobile ? bannerMobile : bannerPairsDesktop.flat()).map(
      (banner, index) => (
        <div key={index} className="relative w-full">
          <div
            className={`relative w-full flex items-center justify-center ${
              isMobile ? "max-h-[500px] aspect-[3/5]" : "aspect-[1920/1024]"
            }`}
          >
            <Image
              src={banner.image}
              alt={`Banner ${index}`}
              fill
              className="object-cover"
              priority
            />

            {/* Overlay content */}
            {banner.title2 && banner.description2 && !isMobile ? (
              <>
                {/* Left block (20% from left) */}
                <div className="absolute top-[10%] left-[10%] text-center text-black max-w-lg">
                  <h2 className="font-medium text-[28px] md:text-[34px]">
                    {t(`${banner.title}`)}
                  </h2>
                  <p className="text-[12px] md:text-[16px]">
                    {t(`${banner.description}`)}
                  </p>
                  <Link
                    href={banner.link}
                    className="mt-3 inline-block text-black border-b-2 border-black text-sm md:text-base font-medium hover:text-gray-700 transition duration-300"
                  >
                    {t(`${banner.buttonText}`)}
                  </Link>
                </div>

                {/* Right block (20% from right) */}
                <div className="absolute top-[10%] right-[15%] text-center text-black max-w-lg">
                  <h2 className="font-medium text-[28px] md:text-[34px]">
                    {t(`${banner.title2}`)}
                  </h2>
                  <p className="text-[12px] md:text-[16px]">
                    {t(`${banner.description2}`)}
                  </p>
                  <Link
                    href={banner.link}
                    className="mt-3 inline-block text-black border-b-2 border-black text-sm md:text-base font-medium hover:text-gray-700 transition duration-300"
                  >
                    {t(`${banner.buttonText}`)}
                  </Link>
                </div>
              </>
            ) : (
              // Normal banners
              <div
                className={`absolute ${
                  isMobile ? "top-[15%]" : "top-[10%]"
                } left-1/2 -translate-x-1/2 text-center text-white px-4 ${
                  isMobile ? "max-w-2xl" : "max-w-4xl"
                } w-full`}
              >
                <h2
                  className={`font-medium ${
                    isMobile
                      ? "text-[20px] md:text-[28px]"
                      : "xs:text-[24px] md:text-[36px]"
                  } text-black`}
                >
                  {t(`${banner.title}`)}
                </h2>
                <p
                  className={`${
                    isMobile
                      ? "text-[12px] md:text-[16px]"
                      : "text-[12px] md:text-[16px]"
                  } text-black`}
                >
                  {t(`${banner.description}`)}
                </p>
                <span className="py-2 block"></span>
                <Link
                  href={banner.link}
                  className="text-black border-b-2 border-black text-xs md:text-sm font-medium hover:text-gray-700 transition duration-300"
                >
                  {t(`${banner.buttonText}`)}
                </Link>
              </div>
            )}
          </div>

          {/* Custom slide indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToSlide(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goToSlide(i);
                  }
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-[3px] w-8 rounded-full transition-all duration-200 focus:outline-none ${
                  activeSlide === i ? "bg-white" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      )
    )}
  </Slider>
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

      {/* <div className="flex justify-end md:w-1/3">
        <CartModal />
      </div> */}
    </>
  );
}

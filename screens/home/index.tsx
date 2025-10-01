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
import { useEffect, useState } from 'react';
import i18n from '../../lib/i18nClient';
import { useTranslation } from 'react-i18next';
import { SaleBar } from 'components/SaleBar';
import Slider from 'react-slick';

export default function MainPage() {
  const { t, i18n } = useTranslation("common");
  // const {  } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

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
        image: newBanner1,
        title: "bannerOneTitle",
        description: "bannerOneDesc",
        buttonText: "shopnow",
        link: "/new-arrivals",
      },
      {
        image: newBanner2,
        title: "bannerTwoTitle",
        description: "bannerTwoDesc",
        buttonText: "shopnow",
        link: "/new-arrivals",
      },
    ],
    [
      {
        image: newBanner2,
        title: "bannerTwoTitle",
        description: "bannerTwoDesc",
        buttonText: "shopnow",
        link: "/new-arrivals",
      },
      {
        image: newBanner3,
        title: "bannerThreeTitle",
        description: "bannerThreeDesc",
        buttonText: "shopnow",
        link: "/new-arrivals",
      },
    ],
    [
      {
        image: newBanner3,
        title: "bannerThreeTitle",
        description: "bannerThreeDesc",
        buttonText: "shopnow",
        link: "/new-arrivals",
      },
      {
        image: newBanner1,
        title: "bannerOneTitle",
        description: "bannerOneDesc",
        buttonText: "shopnow",
        link: "/new-arrivals",
      },
    ],
  ];


  // Mobile banners (single)
  const bannerMobile = [
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
    {
      image: newBanner3Mobile,
      title: 'bannerThreeTitle',
      description: 'bannerThreeDesc',
      buttonText: 'shopnow',
      link: '/new-arrivals',
    },
  ];


  const totalSlides = isMobile ? bannerMobile.length : bannerPairsDesktop.length;

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
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
              ? 'mt-12 relative w-full h-auto'
              : 'relative w-full overflow-hidden'
          }
        >
          <div className="relative z-[10]">
            <SaleBar />
          </div>

          <Slider {...settings}>
            {isMobile
              ? bannerMobile.map((banner, index) => (
                <div key={index} className="relative w-full">
                  <div className="relative w-full max-h-[500px] aspect-[4/5] flex items-center justify-center">
                    <Image
                      src={banner.image}
                      alt={`Mobile Banner ${index}`}
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Overlay bottom center */}
                    <div className="absolute top-[15%] left-1/2 -translate-x-1/2 text-center text-white px-4 w-full max-w-2xl">
                      <h2 className="font-medium text-[20px] md:text-[28px] text-black">
                        {t(`${banner.title}`)}
                      </h2>
                      <p className="font-medium text-[16px] md:text-[20px] text-black">
                        {t(`${banner.description}`)}
                      </p>
                      <span className="py-2"></span>
                      <Link
                        href={banner.link}
                        className="text-black border-b-2 border-black text-xs md:text-sm font-medium hover:text-gray-700 transition duration-300"
                      >
                        {t(`${banner.buttonText}`)}
                      </Link>
                    </div>
                    {/* Custom slide indicators inside slider */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                      {bannerMobile.map((_, i) => (
                        <span
                          key={i}
                          className={`w-3 h-3 rounded-full ${activeSlide === i ? 'bg-black' : 'bg-gray-400'
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))
              : bannerPairsDesktop.map((pair, index) => (
                <div key={index} className="relative w-full">
                  <div className="flex justify-center gap-2 px-4">
                    {pair.map((banner, idx) => (
                      <div
                        key={idx}
                        className="relative w-1/2 aspect-[1920/1024] flex items-center justify-center"
                      >
                        <Image
                          src={banner.image}
                          alt={`Banner ${index}-${idx}`}
                          fill
                          className="object-contain"
                          priority
                        />
                        {/* Overlay bottom center */}
                        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 text-center text-white px-4 w-full max-w-4xl">
                          <h2 className="font-medium xs:text-[24px] md:text-[36px] text-black">
                            {t(`${banner.title}`)}
                          </h2>
                          <p className="font-medium xs:text-[20px] md:text-[24px] text-black">
                            {t(`${banner.description}`)}
                          </p>
                          <span className="py-4"></span>
                          <Link
                            href={banner.link}
                            className="text-black border-b-2 border-black text-xs md:text-sm px-0 py-0 font-medium hover:text-gray-700 transition duration-300"
                          >
                            {t(`${banner.buttonText}`)}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Custom slide indicators for desktop */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  goToSlide(i);
                }
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-[3px] w-8 rounded-full transition-all duration-200 focus:outline-none ${
                activeSlide === i ? 'bg-white' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
                </div>
              ))}
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

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
import saleBanner from 'media/home-banner/new/Early Black Friday with text.png';
import combineBanner from 'media/home-banner/new/combine.png';
import saleBannerFr from 'media/home-banner/new/Early Black Friday french with text.png';


import newBanner1Mobile from 'media/home-banner/new/1-mobile.png';
import newBanner2Mobile from 'media/home-banner/new/2-mobile.png';
import newBanner3Mobile from 'media/home-banner/new/3-mobile.png';

import saleBannerEnMob from 'media/home-banner/new/blackfridayengmob.png';
import saleBannerFrMob from 'media/home-banner/new/blackfridaymobfr.png';



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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from 'next/navigation';

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
        image: i18n.language === 'fr' ? saleBannerFr : saleBanner,
        title: "",
        description: "",
        buttonText: "",
        link: "/sale",
      },
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
      image: i18n.language === 'fr' ? saleBannerFrMob : saleBannerEnMob,
      title: "",
      description: "",
      buttonText: "",
      link: "/sale",
    },
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

  const goPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const goNext = () => {
    sliderRef.current?.slickNext();
  };

  const router = useRouter();


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
      {/* <div className="relative z-[10]">
        <SaleBar />
      </div> */}

<Slider ref={sliderRef} {...settings}>
      {(isMobile ? bannerMobile : bannerPairsDesktop.flat()).map(
        (banner, index) => (
          <div
            key={index}
            className="relative w-full"
            onClick={() => {
              if (index === 0) router.push("/sale");
            }}
            style={{ cursor: index === 0 ? "pointer" : "default" }}
          >
            <div
              className={`relative w-full flex items-center justify-center ${
                isMobile
                  ? "max-h-[500px] aspect-[3/5]"
                  : "aspect-[1920/900] max-h-[900px]"
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
                      onClick={(e) => e.stopPropagation()}
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
                      onClick={(e) => e.stopPropagation()}
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
                    onClick={(e) => e.stopPropagation()}
                  >
                    {t(`${banner.buttonText}`)}
                  </Link>
                </div>
              )}
            </div>

            {/* Custom slide indicators */}
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToSlide(i);
                  }}
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

            {/* Left Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute top-1/2 left-4 -translate-y-1/2 z-50 bg-white/10 hover:bg-white rounded-full p-1 shadow-md"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4 text-black" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute top-1/2 right-4 -translate-y-1/2 z-50 bg-white/10 hover:bg-white rounded-full p-1 shadow-md"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4 text-black" />
            </button>
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

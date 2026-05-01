'use client';

import ForwardLink from 'components/forwardlink/forwardLink';
import webBannerEngNoText from 'media/rebrancreative/Web Banner Eng no text.png';
import webBannerFrNoText from 'media/rebrancreative/Web Banner FR no text.png';
import mobileBannerEngNoText from 'media/rebrancreative/Mobile Banner Eng no text.png';




import mainText from 'media/png/mainText.png';
import Image, { type StaticImageData } from 'next/image';
import BestSeller from './components/bestSeller';
import Community from './components/community';
import DiscoverMore from './components/Discover';
import Upgrade from './components/upgrade';
import WhyChooseUs from './components/whyChooseUs';
import { ProductProvider } from 'components/product/product-context';
import CartModal from 'components/cart/modal';
import HomeCategories from './components/homeCategories';
import HomeBanners from './components/HomeBanners';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import i18n from '../../lib/i18nClient';
import { useTranslation } from 'react-i18next';
import { SaleBar } from 'components/SaleBar';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from 'next/navigation';

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
        image: i18n.language === 'fr' ? webBannerFrNoText : webBannerEngNoText,
        title: "springBannerTitle",
        description: "springBannerDesc",
        buttonText: "shopnow",
        link: "/new-arrivals",
      },
    ],
  ];

  // Mobile banners (single)
  const bannerMobile = [
    {
      image: mobileBannerEngNoText,
      title: 'springBannerTitle',
      description: 'springBannerDesc',
      buttonText: 'shopnow',
      link: '/new-arrivals',
    },
  ];


  const router = useRouter();

  const banners = isMobile ? bannerMobile : bannerPairsDesktop.flat();
  const totalSlides = banners.length;

  const goPrev = () => setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  const goNext = () => setActiveSlide((prev) => (prev + 1) % totalSlides);
  const goToSlide = (i: number) => setActiveSlide(i);

  // Auto-advance only when there is more than 1 slide
  useEffect(() => {
    if (totalSlides <= 1) return;
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSlides]);


  return (
    <>
      <div className="w-full overflow-x-hidden">

<section
      className={
        isMobile
          ? "md:mt-12 relative w-full h-auto overflow-hidden"
          : "relative w-full overflow-hidden"
      }
    >
    {/* Custom carousel — no react-slick, no CSS dependency issues */}
    <div className="relative w-full overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`w-full transition-opacity duration-700 ${
            index === activeSlide ? "block opacity-100" : "hidden opacity-0"
          }`}
        >
          <div className="relative w-full">
            {isMobile ? (
              <Image
                src={banner.image as StaticImageData}
                alt={`Banner ${index + 1}`}
                width={(banner.image as StaticImageData).width}
                height={(banner.image as StaticImageData).height}
                className="block h-auto w-full max-w-full"
                sizes="100vw"
                priority={index === 0}
              />
            ) : (
              <div className="relative aspect-[1920/900] max-h-[900px] w-full">
                <Image
                  src={banner.image}
                  alt={`Banner ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                />
              </div>
            )}

            {/* Overlay */}
            <div
              className={`absolute ${
                isMobile ? "top-[15%]" : "top-[10%]"
              } left-1/2 -translate-x-1/2 text-center px-4 w-full ${
                isMobile ? "max-w-2xl" : "max-w-4xl"
              }`}
            >
              <h2
                className={`font-medium text-black ${
                  isMobile
                    ? "text-[20px] md:text-[28px]"
                    : "text-[24px] md:text-[36px]"
                }`}
              >
                {t(banner.title)}
              </h2>
              <p
                className={`mt-2 text-black ${
                  isMobile
                    ? "mx-auto max-w-[265px] text-[12px] leading-snug line-clamp-2 text-center"
                    : "text-[12px] md:text-[16px]"
                }`}
              >
                {t(banner.description)}
              </p>
              <span className="py-2 block" />
              <Link
                href={banner.link}
                className="text-black border-b-2 border-black text-xs md:text-sm font-medium hover:text-gray-700 transition duration-300"
              >
                {t(banner.buttonText)}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Dots — only show when more than 1 slide */}
      {totalSlides > 1 && (
        <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-[3px] w-8 rounded-full transition-all duration-200 focus:outline-none ${
                activeSlide === i ? "bg-white" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      {/* Arrows — only show when more than 1 slide */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-1 shadow-md hover:bg-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4 text-black" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-1 shadow-md hover:bg-white"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4 text-black" />
          </button>
        </>
      )}
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

      {/* <div className="flex justify-end md:w-1/3">
        <CartModal />
      </div> */}
    </>
  );
}

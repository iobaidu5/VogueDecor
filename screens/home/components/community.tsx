'use client';

import frame1 from 'media/instagram/Instagram (2).png';
import frame2 from 'media/instagram/Instagram.png';
import frame3 from 'media/instagram/Instagram (3).png';
import frame4 from 'media/instagram/Instagram (4).png';
import frame5 from 'media/instagram/Instagram (6).png';
import Image from 'next/image';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../../../lib/i18nClient'
import { useTranslation } from 'react-i18next';


const frames: any = [
  {
    image: frame5,
    alt: 'fram5'
  },
  {
    image: frame1,
    alt: 'fram1'
  },
  {
    image: frame2,
    alt: 'fram2'
  },
  {
    image: frame3,
    alt: 'fram3'
  },
  {
    image: frame4,
    alt: 'fram4'
  },
];


const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute -right-8 top-1/2 z-50 -translate-y-1/2 cursor-pointer text-black hover:text-gray-600"
      onClick={onClick}
    >
      <ChevronRight size={32} />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute -left-8 top-1/2 z-45 -translate-y-1/2 cursor-pointer text-black hover:text-gray-600"
      onClick={onClick}
    >
      <ChevronLeft size={32} />
    </div>
  );
};


const Community = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const { t, ready } = useTranslation('common');

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024); // less than lg breakpoint
    };

    // initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    margin: 0,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 1200, // screens < 1200px
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992, // screens < 992px
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // screens < 768px
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 600, // screens < 768px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="xs:px-[50px] xs:pb-[50px] md:pb-[100px] lg:px-[70px]">
      <p className="py-1 font-medium xs:text-[22px] md:text-[40px]">{t('joinCommunity')}</p>
      <a
        href="https://www.instagram.com/voguedecorr/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#878787] xs:text-[15px] md:text-[18px]"
      >
        @voguedecorr
      </a>

      {/* Slider on small and medium, grid on large */}
        <Slider {...sliderSettings} className="mt-8">
          {frames.map((frame: any) => (
            <div
              key={frame.alt}
              className="w-full bg-white h-full"
            >
              <Image className="h-full w-full mx-2" src={frame.image} alt={frame.alt} />
            </div>
          ))}
        </Slider>

    </div>
  );
};

export default Community;
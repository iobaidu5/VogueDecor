'use client';

import frame1 from 'media/png/frame1.png';
import frame2 from 'media/png/frame2.png';
import frame3 from 'media/png/frame3.png';
import frame4 from 'media/png/frame4.png';
import Image from 'next/image';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const frames: any = [
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
  }
];


const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute -right-6 top-1/2 z-50 -translate-y-1/2 cursor-pointer text-black hover:text-gray-600"
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
      className="absolute -left-6 top-1/2 z-45 -translate-y-1/2 cursor-pointer text-black hover:text-gray-600"
      onClick={onClick}
    >
      <ChevronLeft size={32} />
    </div>
  );
};


const Community = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

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
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="xs:px-[50px] xs:pb-[50px] md:pb-[100px] lg:px-[70px]">
      <p className="py-1 font-medium xs:text-[22px] md:text-[40px]">Join the Vogue Community</p>
      <a
        href="https://www.instagram.com/voguedecorr/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#878787] xs:text-[15px] md:text-[18px]"
      >
        @voguedecorr
      </a>

      {/* Slider on small and medium, grid on large */}
      {isMobileOrTablet ? (
        <Slider {...sliderSettings} className="mt-8">
          {frames.map((frame: any) => (
            <div
              key={frame.alt}
              className="flex w-full items-center justify-center overflow-hidden bg-gray-200 h-60"
            >
              <Image className="h-full w-full object-cover" src={frame.image} alt={frame.alt} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="mt-8 grid grid-cols-4 gap-3">
          {frames.map((frame: any) => (
            <div
              key={frame.alt}
              className="col-span-1 flex w-full items-center justify-center overflow-hidden bg-gray-200 h-96"
            >
              <Image className="h-full w-full object-cover" src={frame.image} alt={frame.alt} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;
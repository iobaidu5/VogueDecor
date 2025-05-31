'use client';

import { GridTileImage } from 'components/grid/tile';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';


interface GalleryProps {
  images: { src: string; altText: string }[];
}


const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute -right-10 top-1/2 z-1000 -translate-y-1/2 cursor-pointer text-black hover:text-gray-600"
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
      className="absolute -left-10 top-1/2 z-1005 -translate-y-1/2 cursor-pointer text-black hover:text-gray-600"
      onClick={onClick}
    >
      <ChevronLeft size={32} />
    </div>
  );
};

export function Gallery({ images }: GalleryProps) {
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();
  const imageIndex = state.image ? parseInt(state.image, 10) : 0;

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current!;
    const image = imageRef.current!;

    const rect = container.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const percentX = (offsetX / rect.width) * 100;
    const percentY = (offsetY / rect.height) * 100;

    image.style.transformOrigin = `${percentX}% ${percentY}%`;
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transformOrigin = 'center center';
    }
  };

  // const sliderSettings = {
  //   dots: true,
  //   arrows: false,
  //   infinite: true,
  //   speed: 300,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   nextArrow: <NextArrow />,
  //   prevArrow: <PrevArrow />,
  //   customPaging: () => (
  //     <div className="w-2.5 h-2.5 bg-gray-400 rounded-full mx-1" />
  //   ),
  //   appendDots: (dots: any) => (
  //     <div className="flex justify-center mt-3">{dots}</div>
  //   ),
  // };

  const sliderSettings = {
    dots: true,
    arrows: false,
    nextArrow: isMobile ? <NextArrow /> : undefined,
    prevArrow: isMobile ? <PrevArrow /> : undefined,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: () => (
      <div className="w-2.5 h-2.5 bg-gray-400 rounded-full mx-1" />
    ),
    appendDots: (dots: any) => (
      <div className="flex justify-center mt-3">{dots}</div>
    ),
  };
  

  return (
    <form className="mt-6 sm:mt-10 md:mt-0 relative">
      {isMobile ? (
        <div className="w-full relative">
          <Slider {...sliderSettings}>
            {images.map((img, idx) => (
              <div key={img.src} className="relative aspect-square">
                <Image
                  className="h-full w-full object-contain"
                  fill
                  alt={img.altText}
                  src={img.src}
                  priority={idx === 0}
                  sizes="100vw"
                />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-start gap-4">
          {images.length > 1 && (
            <ul
              className="
                hidden md:flex 
                md:flex-col 
                gap-2 
                overflow-auto 
                md:max-h-[600px] 
                md:w-[100px] 
                px-2
              "
            >
              {images.map((img, idx) => {
                const isActive = idx === imageIndex;
                console.log("img.src img.src ", img.src)
                return (
                  <li key={img.src} className="flex-shrink-0">
                    <button
                      type="button"
                      onMouseEnter={() => {
                        const newState = updateImage(idx.toString());
                        updateURL(newState);
                      }}
                      onClick={() => {
                        const newState = updateImage(idx.toString());
                        updateURL(newState);
                      }}
                      aria-label={`Select image ${idx + 1}`}
                      className={`
                        block 
                        w-[80px] 
                        h-[80px] 
                        p-1 
                        rounded 
                        transition-shadow 
                        ${isActive ? 'ring-2 ring-black' : 'ring-0'} 
                      `}
                    >
                      <GridTileImage
                        alt={img.altText}
                        src={img.src}
                        width={80}
                        height={80}
                        active={isActive}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <div
            className="
              relative 
              w-full 
              aspect-square 
              max-w-full 
              overflow-hidden 
              image-bg 
              touch-none
            "
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={containerRef}
          >
            {images[imageIndex] && (
              <Image
                ref={imageRef}
                className="
                  h-full 
                  w-full 
                  object-contain 
                  transition-transform 
                  duration-300 
                  ease-in-out 
                  hover:scale-[2.5] 
                  md:cursor-zoom-in
                  cursor-default
                "
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                alt={images[imageIndex].altText}
                src={images[imageIndex].src}
                priority
              />
            )}
          </div>
        </div>
      )}
    </form>
  );
}

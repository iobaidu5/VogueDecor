'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type BlogSliderProps = {
  images: string[];
  height?: number;
  priority?: boolean;
};

const BlogSlider = ({ images, height = 700, priority = false }: BlogSliderProps) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        centeredSlides={true}
        loop={images.length > 1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        breakpoints={{
          640: {
            slidesPerView: images.length > 1 ? 1.5 : 1,
            centeredSlides: images.length > 1,
          },
          1024: {
            slidesPerView: images.length > 2 ? 2.5 : images.length,
            centeredSlides: images.length > 1,
          },
          1280: {
            slidesPerView: images.length > 3 ? 3.5 : images.length,
            centeredSlides: images.length > 1,
          },
        }}
        className="blog-swiper"
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <div 
              className="relative rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl"
              style={{ height: `${height}px` }}
            >
              <Image
                src={src}
                alt={`blog-image-${idx}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority={priority}
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 && (
        <>
          <div
            ref={prevRef}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-2 opacity-0 shadow-lg transition-all duration-300 hover:bg-white group-hover:opacity-100"
          >
            <ChevronLeft size={32} className="text-black" />
          </div>
          <div
            ref={nextRef}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-2 opacity-0 shadow-lg transition-all duration-300 hover:bg-white group-hover:opacity-100"
          >
            <ChevronRight size={32} className="text-black" />
          </div>
        </>
      )}

      <style jsx global>{`
        .blog-swiper .swiper-pagination {
          position: relative;
          bottom: 0;
          margin-top: 20px;
        }
        .blog-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(0, 0, 0, 0.3);
          opacity: 1;
        }
        .blog-swiper .swiper-pagination-bullet-active {
          background: #000;
          transform: scale(1.2);
        }
        .blog-swiper .swiper-slide {
          transition: transform 0.4s ease, opacity 0.4s ease;
        }
        .blog-swiper .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.6;
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
};

export default BlogSlider;
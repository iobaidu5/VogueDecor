'use client';

import Slider from 'react-slick';
import Image from 'next/image';

type BlogSliderProps = {
  images: string[];
  height?: number;
  priority?: boolean;
};

const BlogSlider = ({ images, height = 300, priority = false }: BlogSliderProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      {images.map((src, idx) => (
        <div
          key={idx}
          className="relative w-full"
          style={{ height: `${height}px` }}
        >
          <Image
            src={src}
            alt={`blog-image-${idx}`}
            layout="fill"
            objectFit="cover"
            className="rounded"
            priority={priority}
          />
        </div>
      ))}
    </Slider>
  );
};

export default BlogSlider;

'use client';

import { GridTileImage } from 'components/grid/tile';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import Image from 'next/image';
import { useRef } from 'react';

interface GalleryProps {
  images: { src: string; altText: string }[];
}

export function Gallery({ images }: GalleryProps) {
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();
  const imageIndex = state.image ? parseInt(state.image, 10) : 0;

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

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

  return (
    <form className="mt-6 sm:mt-10 md:mt-0">
      <div className="flex flex-col md:flex-row items-start gap-4">
        {/* Thumbnails */}
        {images.length > 1 && (
          <ul
            className="
              flex 
              md:flex-col 
              flex-row 
              md:items-center 
              items-start 
              gap-2 
              overflow-auto 
              md:max-h-[600px] 
              md:w-[100px] 
              w-full
              px-2
            "
          >
            {images.map((img, idx) => {
              const isActive = idx === imageIndex;
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
                      ${isActive ? 'ring-2 ring-primary' : 'ring-0'} 
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

        {/* Main Image */}
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
    </form>
  );
}

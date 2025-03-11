'use client';

import { GridTileImage } from 'components/grid/tile';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import Image from 'next/image';
import { useRef, useState } from 'react';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();
  const imageIndex = state.image ? parseInt(state.image) : 0;

  const [magnifierStyle, setMagnifierStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;

    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setMagnifierStyle({
      backgroundPosition: `${x}% ${y}%`,
      opacity: 1,
      visibility: 'visible'
    });
  };

  const handleMouseLeave = () => {
    setMagnifierStyle({
      opacity: 0,
      visibility: 'hidden'
    });
  };

  return (
    <form className="xs:mt-10 md:mt-0">
      <div
        className="relative aspect-square h-full max-h-[300px] w-full overflow-hidden border border-neutral-200 sm:max-h-[400px] md:max-h-[500px]"
        ref={imgRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {images[imageIndex] && (
          <>
            <Image
              className={`h-full w-full object-contain transition-opacity duration-200`}
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              alt={images[imageIndex]?.altText as string}
              src={images[imageIndex]?.src as string}
              priority={true}
            />

            {/* Magnifier Effect - Adjust for small screens */}
            <div
              className="absolute inset-0 cursor-zoom-in bg-cover bg-no-repeat transition-opacity duration-200 ease-in-out"
              style={{
                ...magnifierStyle,
                backgroundImage: `url(${images[imageIndex]?.src})`,
                backgroundSize: window.innerWidth < 768 ? '100%' : '70%' // Adjust zoom level for small screens
              }}
            ></div>
          </>
        )}
      </div>

      {images?.length > 1 ? (
        <ul className="my-4 flex items-center gap-2 overflow-x-auto py-1 lg:mb-0">
          {images?.map((image, index) => {
            const isActive = index === imageIndex;

            return (
              <li
                key={image.src}
                className="min-w-[60px] flex-shrink-0 sm:min-w-[70px] md:min-w-[80px]"
              >
                <button
                  formAction={() => {
                    const newState = updateImage(index.toString());
                    updateURL(newState);
                  }}
                  aria-label="Select product image"
                  className="h-full w-full"
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </form>
  );
}

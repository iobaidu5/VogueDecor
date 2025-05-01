'use client';

import { GridTileImage } from 'components/grid/tile';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import Image from 'next/image';
import { useRef } from 'react';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();
  const imageIndex = state.image ? parseInt(state.image) : 0;

  const containerRef: any = useRef(null);
  const imageRef: any = useRef(null);

  const handleMouseMove = (e: any) => {
    const container = containerRef.current;
    const image = imageRef.current;

    const rect = container.getBoundingClientRect();

    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const percentX = (offsetX / rect.width) * 100;
    const percentY = (offsetY / rect.height) * 100;

    image.style.transformOrigin = `${percentX}% ${percentY}%`;
  };

  const handleMouseLeave = () => {
    const image = imageRef.current;
    image.style.transformOrigin = 'center center';
  };

  return (
<form className="xs:mt-10 md:mt-0">
  <div className="flex items-start gap-4">
    {/* Vertical Slider on the Left */}
    {images?.length > 1 && (
      <ul className="flex flex-col items-center gap-2 overflow-y-auto max-h-[600px]">
        {images.map((image, index) => {
          const isActive = index === imageIndex;

          return (
            <li key={image.src} className="flex-shrink-0">
              <button
                formAction={() => {
                  const newState = updateImage(index.toString());
                  updateURL(newState);
                }}
                aria-label="Select product image"
                className="block w-[100%] h-[120px] my-1"
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
    )}

    {/* Main Image Display */}
    <div
      className="relative w-full max-w-[1024px] max-h-[1024px] aspect-square overflow-hidden image-bg"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      {images[imageIndex] && (
        <Image
          ref={imageRef}
          className="h-full w-full cursor-zoom-in object-contain transition-transform duration-300 ease-in-out hover:scale-[2.5]"
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          alt={images[imageIndex]?.altText as string}
          src={images[imageIndex]?.src as string}
          priority={true}
        />
      )}
    </div>
  </div>
</form>

  );
}

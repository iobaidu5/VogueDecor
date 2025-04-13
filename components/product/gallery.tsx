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
      <div
        className="relative aspect-square h-full max-h-[300px] w-full overflow-hidden border border-neutral-200 sm:max-h-[400px] md:max-h-[500px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
      >
        {images[imageIndex] && (
          <>
            <Image
              ref={imageRef}
              className={`h-full w-full cursor-zoom-in object-contain transition-transform duration-300 ease-in-out hover:scale-[2.5]`}
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              alt={images[imageIndex]?.altText as string}
              src={images[imageIndex]?.src as string}
              priority={true}
            />
          </>
        )}
      </div>

      {images?.length > 1 ? (
        <ul className="my-4 flex items-center gap-2 overflow-x-auto py-1 lg:mb-0">
          {images?.map((image, index) => {
            const isActive = index === imageIndex;

            return (
              <li key={image.src} className="flex-shrink-0 xs:min-w-[40px] md:min-w-[80px]">
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

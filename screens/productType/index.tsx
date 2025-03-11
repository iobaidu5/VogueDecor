import { Gallery } from 'components/product/gallery';
import chairImage from 'media/png/chair.png';
import heartIcon from 'media/svg/heart.svg';
import Image from 'next/image';
import { Suspense } from 'react';
import { Product } from 'lib/shopify/types';
import { Image as Img } from "lib/shopify/types";

export default function Product({ product }: { product: Product }) {

  return (
    <div className="flex flex-wrap justify-center gap-6 pt-[40px]">
        <div key={product.id} className="relative flex h-[459px] w-80 flex-col bg-white">
          <button className="border-1 absolute right-12 top-3 z-50 h-8 w-28 rounded-full border border-solid text-[12px]">
            Add to Cart
          </button>
          <Image src={heartIcon} alt="heartIcon" className="absolute right-5 top-4" />
          {/* Image Section */}
          <div className="flex h-[404px] items-center justify-center bg-[#F5F5F5]">
            {/* <Image
              src={chairImage}
              alt={item.title}
              width={380}
              height={404}
              className="h-[347px] object-contain"
            /> */}

            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={product.images.slice(0, 5).map((image: Img) => ({
                  src: image.url,
                  altText: image.altText,
                }))}
              />
            </Suspense>
          </div>

          {/* Title Section */}
          <div className="mt-2 flex h-[55px] flex-col space-y-1 bg-white pl-4">
            <p className="text-[15px] font-medium">{product.title}</p>
            <p className="text-[15px] font-medium text-[#878787]">{product.priceRange.maxVariantPrice.amount}</p>
          </div>
        </div>
    </div>
  );
};

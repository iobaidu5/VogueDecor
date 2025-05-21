'use client';

import { AddToCartSimple } from 'components/cart/add-to-cart-simple';
import CartModal from 'components/cart/modal';
import { useCurrency } from 'components/currency/currencyContext';
import { ProductProvider } from 'components/product/product-context';
import { ProductForCart } from 'lib/shopify/types';
import chairImage from 'media/png/chair.png';
import heart from 'media/svg/heart.svg';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type Option = {
  id: string;
  name: string;
  values: string[];
};

type Price = {
  amount: string;
  currencyCode: string;
};

type PriceRange = {
  maxVariantPrice: Price;
  minVariantPrice: Price;
};

type ImageType = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
  price: Price;
  compareAtPrice?: Price;
};

type Product = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: Option[];
  priceRange: PriceRange;
  featuredImage: ImageType;
  seo: { description: string | null; title: string | null };
  tags: string[];
  updatedAt: string;
  images: ImageType[];
  variants: Variant[];
};

type ProductSliderProps = {
  data: Product[] | any;
  isDiscover?: boolean;
};



const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute -right-10 top-1/2 z-50 -translate-y-1/2 cursor-pointer text-black hover:text-gray-600"
      onClick={onClick}
    >
      <ChevronRight size={48} />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute -left-10 top-1/2 z-50 -translate-y-1/2 cursor-pointer text-black hover:text-gray-600"
      onClick={onClick}
    >
      <ChevronLeft size={48} />
    </div>
  );
};

const ProductSlider: React.FC<ProductSliderProps> = ({ data, isDiscover = false }) => {
  const { currency, rate } = useCurrency();

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 }
      }
    ],
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="custom-dots">{dots}</ul>
      </div>
    )
  };

  return (
    <div className="pt-[40px]">
      <Slider {...settings}>
        {data?.slice(0, 6)?.map((item: any) => {
          const productForCart: ProductForCart = {
            ...item,
            featuredImage: {
              ...item.featuredImage,
              altText: item.featuredImage?.altText ?? ''
            },
            images: item.images.map((img: any) => ({
              ...img,
              altText: img.altText ?? ''
            })),
            variants: item.variants,
            seo: {
              ...item.seo,
              title: item.seo?.title ?? '',
              description: item.seo?.description ?? ''
            }
          };

          const numericAmount = parseFloat(item?.priceRange.minVariantPrice?.amount) * rate;
          const numericSale = item?.variants?.[0]?.compareAtPrice?.amount
            ? parseFloat(item.variants[0].compareAtPrice.amount) * rate
            : 0;

          const formattedPrice = new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currency,
            currencyDisplay: 'narrowSymbol'
          }).format(numericAmount);

          const formattedSalePrice = numericSale
            ? new Intl.NumberFormat(undefined, {
                style: 'currency',
                currency: currency,
                currencyDisplay: 'narrowSymbol'
              }).format(numericSale)
            : null;

          return (
            <div key={item.handle} className="px-3">
              <ProductProvider>
                <Link href={`/product/${item.handle}`} className="relative flex flex-col">
                  {/* Image with Overlay Actions */}
                  <div className="relative flex h-[300px] items-center justify-center md:h-[460px] bg-white rounded-lg overflow-hidden">
                    <img
                      src={item.featuredImage?.url || chairImage}
                      alt={item.featuredImage?.altText || item?.title}
                      className="max-h-full object-contain"
                    />

                    {/* Heart Icon */}
                    {!isDiscover && (
                      <Image
                        src={heart}
                        alt="heartIcon"
                        width={24}
                        height={24}
                        className="absolute right-10 top-4 z-50"
                      />
                    )}

                    {/* Add to Cart / View Button */}
                    {/* {isDiscover ? (
                      <button className="absolute right-5 top-12 z-50 h-8 w-28 rounded-full border border-black text-[12px] hover:bg-black hover:text-white">
                        View
                      </button>
                    ) : (
                      <div className="absolute right-5 top-12 z-50">
                        <AddToCartSimple product={productForCart} icon={true} />
                      </div>
                    )} */}
                  </div>

                  {/* Title & Price */}
                  <div className="flex flex-col justify-center space-y-1 bg-white px-4 py-3">
                    <p
                      className="overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-medium"
                      title={item?.title}
                    >
                      {item?.title}
                    </p>
                    <div className="flex items-center space-x-2">
                      <p
                        className={`text-[15px] font-medium text-[#878787] ${
                          formattedSalePrice ? 'line-through' : ''
                        }`}
                      >
                        {formattedPrice}
                      </p>
                      {formattedSalePrice && (
                        <p className="text-[15px] font-medium text-red-700">
                          {formattedSalePrice}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </ProductProvider>
            </div>
          );
        })}
      </Slider>

      {/* Custom Dot Styling */}
      <style jsx>{`
        .custom-dots {
          display: flex !important;
          justify-content: center;
          gap: 12px;
          padding-top: 20px;
        }

        .custom-dots li button:before {
          font-size: 14px !important;
          color: #000 !important;
        }

        .custom-dots li.slick-active button:before {
          color: #000 !important;
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default ProductSlider;
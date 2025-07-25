'use client';

import { AddToCartSimple } from 'components/cart/add-to-cart-simple';
import CartModal from 'components/cart/modal';
import { useCurrency } from 'components/currency/currencyContext';
import { ProductProvider } from 'components/product/product-context';
import { ProductForCart } from 'lib/shopify/types';
import chairImage from 'media/png/chair.png';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AddToWishlist from 'components/AddToWishlist';

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
  wishlistIds?: string[];
};



const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute -right-4 lg:-right-6 top-20 lg:top-1/2 z-45 -translate-y-1/2 cursor-pointer text-black hover:text-gray-600"
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
      className="absolute -left-4 lg:-left-6 top-20 lg:top-1/2 z-45 -translate-y-1/2 cursor-pointer text-black hover:text-gray-600"
      onClick={onClick}
    >
      <ChevronLeft size={32} />
    </div>
  );
};

const ProductSlider: React.FC<ProductSliderProps> = ({ data, isDiscover = false, wishlistIds }) => {
  const { currency, rate } = useCurrency();

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 2 }
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
        {data?.slice(0, 20)?.map((item: any) => {
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

          // const numericAmount = parseFloat(item?.priceRange.minVariantPrice?.amount) * rate;
          // const numericSale = item?.variants?.[0]?.compareAtPrice?.amount
          //   ? parseFloat(item.variants[0].compareAtPrice.amount) * rate
          //   : 0;

          // const numericAmount = parseFloat(item?.priceRange.minVariantPrice?.amount) * rate;
          // const numericSale = item?.variants?.[0]?.compareAtPrice?.amount
          // ? parseFloat(item.variants[0].compareAtPrice.amount) * rate
          // : 0;

          // const formattedPrice = new Intl.NumberFormat(undefined, {
          //   style: 'currency',
          //   currency: currency,
          //   currencyDisplay: 'narrowSymbol'
          // }).format(numericAmount);

          const numericAmount = item?.variants[0]?.compareAtPrice?.amount
            ? parseFloat(item?.variants[0]?.compareAtPrice?.amount) * rate
            : 0;
          const numericSale = parseFloat(item?.priceRange?.maxVariantPrice?.amount) * rate;

          const formattedPrice = new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currency,
            currencyDisplay: 'narrowSymbol',
          }).format(numericAmount);

          const formattedSalePrice = new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currency,
            currencyDisplay: 'narrowSymbol',
          }).format(numericSale);


          const isWishlisted = wishlistIds?.includes(item.id);

          return (
            <div key={item.handle} className="px-3">
              <ProductProvider>
                <Link href={`/product/${item.handle}`} className="relative flex flex-col">
                  <div className="relative h-[100%] md:h-[100%] bg-white rounded-lg overflow-hidden">
                    <img
                      src={item.featuredImage?.url || chairImage}
                      alt={item.featuredImage?.altText || item?.title}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute top-3 right-3 z-50">
                      {!isDiscover && <AddToWishlist productId={item.id} isWishlisted={isWishlisted} />}
                    </div>
                  </div>

                  {/* Title & Price */}
                  <div className="flex flex-col justify-center space-y-1 bg-white px-4 py-3">
                    <p
                      className="overflow-hidden text-ellipsis text-black whitespace-nowrap text-[15px] font-medium"
                      title={item?.title}
                    >
                      {item?.title}
                    </p>
                    <div className="flex items-center space-x-2">
                      <p
                        className={`text-sm text-left lg:text-center font-medium text-[#878787] ${formattedPrice && formattedPrice !== '$0.00' ? 'line-through' : ''}`}
                      >
                        {formattedPrice === "$0.00" ? formattedSalePrice : formattedPrice || ''}
                      </p>
                      {formattedSalePrice && formattedPrice !== '$0.00' && (
                        <p className="text-[15px] font-medium text-red-700">
                          {formattedSalePrice}
                        </p>
                      )}
                    </div>
                    {/* <div className="flex items-center space-x-2">
                      <p
                        className={`text-[15px] font-medium text-[#878787] ${formattedSalePrice ? 'line-through' : ''
                          }`}
                      >
                        {formattedPrice}
                      </p>
                      {formattedSalePrice && (
                        <p className="text-[15px] font-medium text-red-700">
                          {formattedSalePrice}
                        </p>
                      )}
                    </div> */}
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
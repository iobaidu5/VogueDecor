'use client';

import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { useCurrency } from 'components/currency/currencyContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RelatedHeader from 'app/product/RelatedHeader';
import { useTranslation } from 'react-i18next';

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-0 md:-right-8 top-1/2 z-50 -translate-y-1/2 cursor-pointer text-black hover:text-gray-600"
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
      className="absolute left-0 md:-left-8 top-1/2 z-45 -translate-y-1/2 cursor-pointer text-black hover:text-gray-600"
      onClick={onClick}
    >
      <ChevronLeft size={32} />
    </div>
  );
};

const ProductSlider = ({ data }: { data: Array<Record<string, any>> }) => {
  const { currency, rate } = useCurrency();
  const { t, ready } = useTranslation('common');

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 5 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 475,
        settings: { slidesToShow: 1 }
      },
      {
        breakpoint: 0,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="relative xs:py-4 md:py-8">
     
     <RelatedHeader />
      <div className="relative">
        <Slider {...settings}>
          {data?.map((item) => {
            const numericAmount = parseFloat(item?.priceRange?.maxVariantPrice?.amount) * rate;

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
              <div
                key={item.handle}
                className="w-full flex-none px-2 min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
              >
                <Link
                  className="relative h-full w-full"
                  href={`/product/${item.handle}`}
                  prefetch={true}
                >
                  <div className="relative flex w-full cursor-pointer flex-col overflow-hidden">
                    <div className="relative w-full xs:h-[300px] md:h-[300px]">
                      <Image
                        src={
                          item?.featuredImage?.url
                            ? item.featuredImage.url
                            : item?.images?.[0]?.url
                        }
                        alt={item?.title}
                        layout="fill"
                        objectFit="contain"
                        quality={100}
                        className="absolute transition-opacity duration-500"
                      />
                    </div>
                    <div className="flex items-center justify-between space-y-3 px-12 py-4 md:p-4">
                      <div className="flex flex-col space-y-1">
                        <p className="md:text-md font-medium uppercase text-gray-900 xs:text-sm">
                          {t(`products.${item?.title}`)}
                        </p>
                        <div className="flex items-center space-x-2">
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
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSlider;

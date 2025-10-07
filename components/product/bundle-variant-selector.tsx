'use client';

import Slider from 'react-slick';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type Bundle = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  imageUrl?: string;
  bundlePrice?: string | number | null;
  discountCode?: string | null;
  items?: any[];
};

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
      className="absolute left-0 md:-left-8 top-1/2 z-50 -translate-y-1/2 cursor-pointer text-black hover:text-gray-600"
      onClick={onClick}
    >
      <ChevronLeft size={32} />
    </div>
  );
};

export function BundleVariantSelector({
  bundles,
  currentBundle
}: {
  bundles: Bundle[];
  currentBundle: Bundle;
}) {
  const router = useRouter();
  const { t, ready } = useTranslation('common');
  if (!bundles?.length || bundles.length === 1) return null;

  const handleBundleChange = (bundleSlug: string) => {
    router.push(`/bundles/${bundleSlug}`);
  };

  const formatPrice = (price: string | number | null | undefined): string => {
    if (price === null || price === undefined) return 'N/A';
    const num = Number(price);
    if (isNaN(num)) return 'N/A';
    if (num === 0) return 'Custom';
    return `$${num.toFixed(2)}`;
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 475,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="relative xs:py-4 md:py-8">
      <h3 className="mb-4 text-2xl font-medium">
        {t('Available Bundles')}
      </h3>

      <div className="relative">
        <Slider {...settings}>
          {bundles.map((bundle) => {
            const isActive = currentBundle.id === bundle.id;
            const price = formatPrice(bundle.bundlePrice);
            const discount = bundle.discountCode && bundle.discountCode.trim() !== '';

            return (
              <div
                key={bundle.id}
                className="w-full flex-none px-2 h-[500] min-[475px]:w-1/2 sm:w-1/3 md:w-1/4"
              >
                <div
                  onClick={() => handleBundleChange(bundle.slug)}
                  className={`relative flex flex-col cursor-pointer overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-md
                  }`}
                >
                  <div className="relative w-full xs:h-[350px] md:h-[350px]">
                    {bundle.imageUrl ? (
                      <Image
                        src={
                          bundle.imageUrl.startsWith('data:')
                            ? bundle.imageUrl
                            : `data:image/png;base64,${bundle.imageUrl}`
                        }
                        alt={bundle.title}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400 text-sm">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center justify-between px-4 py-3 text-center">
                    <p className="text-sm font-medium uppercase truncate max-w-[160px]">
                      {bundle.title}
                    </p>

                    <p className="mt-1 text-green-700 font-semibold text-sm">
                      {price}
                    </p>

                    {discount && (
                      <p className="mt-1 text-xs font-medium text-red-600">
                        {bundle.discountCode}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

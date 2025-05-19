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

type ProductCardProps = {
  data: Product[] | any;
  isDiscover?: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({ data, isDiscover = false }) => {

  const { currency, rate } = useCurrency();


  return (
    <>
<div className="grid grid-cols-1 gap-12 pt-[40px] sm:grid-cols-2 lg:grid-cols-3">
  {data?.slice(0, 6)?.map((item: any) => {
    const productForCart: ProductForCart = {
      ...item,
      featuredImage: {
        ...item.featuredImage,
        altText: item.featuredImage?.altText ?? '',
      },
      images: item.images.map((img: any) => ({
        ...img,
        altText: img.altText ?? '',
      })),
      variants: item.variants,
      seo: {
        ...item.seo,
        title: item.seo?.title ?? '',
        description: item.seo?.description ?? '',
      },
    };

    const numericAmount = parseFloat(item?.priceRange.minVariantPrice?.amount) * rate;

    const numericSale =
      item?.variants?.[0]?.compareAtPrice?.amount
        ? parseFloat(item.variants[0].compareAtPrice.amount) * rate
        : 0;

    const formattedPrice = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency,
      currencyDisplay: 'narrowSymbol',
    }).format(numericAmount);

    const formattedSalePrice = numericSale
      ? new Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: currency,
          currencyDisplay: 'narrowSymbol',
        }).format(numericSale)
      : null;

    return (
      <div key={item.handle}>
        <ProductProvider>
          <Link
            href={`/product/${item.handle}`}
            className="relative flex flex-col"
          >
            {/* Add to Cart Button */}
            {isDiscover ? (
              <button className="absolute right-8 top-3 z-50 h-8 w-28 rounded-full border border-black text-[12px] hover:bg-black hover:text-white">
                View
              </button>
            ) : (
              <AddToCartSimple product={productForCart} icon={true} />
            )}

            {/* Favorite Icon */}
            {!isDiscover && (
              <Image
                src={heart}
                alt="heartIcon"
                width={20}
                height={20}
                className="absolute right-5 top-4 z-50"
              />
            )}

            {/* Image Section */}
            <div className="flex h-[300px] items-center justify-center md:h-[460px]">
              <img
                src={item.featuredImage?.url || chairImage}
                alt={item.featuredImage?.altText || item?.title}
                className="max-h-full object-contain"
              />
            </div>

            {/* Title & Price Section */}
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
</div>

    </>
  );
};

export default ProductCard;

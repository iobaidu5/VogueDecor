import { AddToCart } from 'components/cart/add-to-cart';
import { AddToCartSimple } from 'components/cart/add-to-cart-simple';
import CartModal from 'components/cart/modal';
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
  return (
    <div className="grid grid-cols-1 gap-6 pt-[40px] sm:grid-cols-2 lg:grid-cols-3">
      {data?.slice(0, 6)?.map((item: any, index: any) => {
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

        return (
          <div key={index}>
            <ProductProvider>
              <Link
                href={`product/${item.handle}`}
                key={item.handle}
                className="relative flex flex-col bg-white shadow-md"
              >
                {/* Add to Cart Button */}
                {isDiscover ? (
                  <button className="absolute right-8 top-3 z-50 h-8 w-28 rounded-full border border-black text-[12px] hover:bg-black hover:text-white">
                    View
                  </button>
                ) : (
                  <AddToCartSimple product={productForCart} />
                )}
                {/* Favorite Icon */}
                {!isDiscover ? (
                  <Image
                    src={heart}
                    alt="heartIcon"
                    width={20}
                    height={20}
                    className="absolute right-5 top-4"
                  />
                ) : null}
                {/* Image Section */}
                <div className="flex items-center justify-center xs:h-[300px] md:h-[500px]">
                  <Image
                    src={item.featuredImage?.url || chairImage}
                    alt={item.featuredImage?.altText || item.title}
                    width={300}
                    height={400}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Title Section */}
                <div className="flex flex-col justify-center space-y-1 bg-white px-4 py-3">
                  <p className="text-[15px] font-medium">{item.title}</p>
                  <p className="text-[15px] font-medium text-[#878787]">
                    {item.priceRange.minVariantPrice.amount}{' '}
                    {item.priceRange.minVariantPrice.currencyCode}
                  </p>
                </div>
              </Link>
            </ProductProvider>
          </div>
        );
      })}

      <div className="flex justify-end md:w-1/3">
        <CartModal />
      </div>
    </div>
  );
};

export default ProductCard;

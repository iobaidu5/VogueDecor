'use client';

import { HeartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useProduct } from 'components/product/product-context';
import { Product, ProductVariant } from 'lib/shopify/types';

function SubmitWishlistButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const buttonClasses =
    'relative flex w-50 items-center justify-center rounded-half bg-white p-2 tracking-wide text-black border border-black';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <></>
      // <button disabled className={clsx(buttonClasses, disabledClasses)}>
      //   Out Of Stock
      // </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          {/* <HeartIcon className="h-5" /> */}
        </div>
        Add To Wishlist!!!
      </button>
    );
  }

  return (
    <button
      aria-label="Add to wishlist"
      className="text-sm md:text-md lg:text-base flex items-center justify-center bg-white w-100 px-5 py-[8px] text-black border border-black h-18"
    >
      {/* <div className="absolute left-0 ml-4">
        <HeartIcon className="h-5" />
      </div> */}
      Add To Wishlist
    </button>
  );
}

export function AddToWishlist({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { state } = useProduct();

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every((option) => option.value === state[option.name.toLowerCase()])
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const finalVariant = variants.find((variant) => variant.id === selectedVariantId)!;

  return (
    <form
      action={async () => {
        console.log('Add to wishlist:', finalVariant, product);
        // Here you can trigger your wishlist logic
      }}
    >
      <SubmitWishlistButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} />
    </form>
  );
}

'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import { useProduct } from 'components/product/product-context';
import { Product, ProductForCart, ProductVariant } from 'lib/shopify/types';
import { useActionState } from 'react';
import { useCart } from './cart-context';
import addtocartIcon from 'media/svg/addToCardIcon.svg';
import Image from 'next/image';

function SubmitButton({
  availableForSale,
  selectedVariantId,
  handleClick,
  icon
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  handleClick: any;
  icon?: boolean;
}) {
  const buttonClasses =
    // "absolute right-14 top-3 z-50 h-8 w-28 rounded-full border border-black text-[12px] hover:bg-black hover:text-white";
    'absolute right-12  top-3 h-8 w-32 rounded-full border border-red-400 bg-red-500 text-white text-xs font-semibold flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
        onClick={handleClick}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart!!!
      </button>
    );
  }

  return icon ? (
    <button aria-label="Add to cart" onClick={(e) => e.stopPropagation()}>
      <Image src={addtocartIcon} alt="addtocart" />
    </button>
  ) : (
    <button
      aria-label="Add to cart"
      onClick={(e) => e.stopPropagation()} // stops the event from bubbling up
      className="absolute right-14 top-3 h-8 w-28 rounded-full border border-black text-[12px] hover:bg-black hover:text-white"
    >
      Add To Cart
    </button>
  );
}

export function AddToCartSimple({ product, icon }: { product: ProductForCart; icon?: boolean }) {
  const { variants, availableForSale, featuredImage } = product;

  // Guaranteed to be a string
  const imageAltText = featuredImage.altText;

  const { addCartItem } = useCart();
  const { state } = useProduct();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every((option) => option.value === state[option.name.toLowerCase()])
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find((variant) => variant.id === selectedVariantId)!;

  const handleClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      action={async () => {
        addCartItem(finalVariant, product);
        await actionWithVariant();
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        handleClick={handleClick}
        icon={icon}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}

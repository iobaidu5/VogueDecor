
'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import { useProduct } from 'components/product/product-context';
import { Product, ProductVariant } from 'lib/shopify/types';
import { useActionState } from 'react';
import { useCart } from './cart-context';
import i18n from '../../lib/i18nClient';
import { useTranslation } from 'react-i18next';


function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const { t, ready } = useTranslation('common');
  const buttonClasses =
    'w-full rounded-md bg-gray-200 py-3 text-sm font-semibold uppercase text-black transition-colors duration-300 hover:bg-red hover:text-white';
  const disabledClasses = 'bg-red cursor-not-allowed bg-red-400 text-white';
  console.log(selectedVariantId);

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
       {t("outOfStock")}
      </button>
    );
  }

  console.log(selectedVariantId);
  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        {t("addToCart")}
      </button>
    );
  }

  return (

    <button aria-label="Add to cart" className="w-full rounded-md bg-gray-200 py-3 text-sm font-semibold uppercase text-black transition-colors duration-300 hover:bg-black hover:text-white">
      {t("addToCart")}
    </button>
  );
}

export function AddToCartHover({ product }: { product: Product }) {
  const { variants, availableForSale } = product;

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

  console.log("add to cart clicked -> ", product)

  return (
    <form
    onClick={(e) => e.stopPropagation()}
      action={async () => {
        addCartItem(finalVariant, product);
        await actionWithVariant();
      }}
      className='w-full'
    >
      <SubmitButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}


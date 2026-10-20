'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { queueAdd } from 'components/cart/pending-cart-writes';
import { useProduct } from 'components/product/product-context';
import { Product, ProductVariant } from 'lib/shopify/types';
import { useState } from 'react';
import { useCart } from './cart-context';
import { useTranslation } from 'react-i18next';

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const { t } = useTranslation('common');
  const buttonClasses =
    'relative flex w-50 items-center justify-center rounded-half bg-red-600 p-2 tracking-wide text-white';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

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
        aria-label={t('productPage.selectOption')}
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
    <button
      aria-label={t('addToCart')}
      className="text-sm md:text-md lg:text-base flex items-center justify-center bg-black w-100 px-5 py-[9px] text-white h-18"
    >
      {/* <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div> */}
       {t("addToCart")}
    </button>
  );
}

export function AddToCart({ product}: { product: Product }) {
  const { variants, availableForSale } = product;

  const { addCartItem } = useCart();
  const { state } = useProduct();
  const [message, setMessage] = useState<string | undefined>();

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every((option) => option.value === state[option.name.toLowerCase()])
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const finalVariant = variants.find((variant) => variant.id === selectedVariantId)!;

  return (
    <form
      action={async () => {
        if (!selectedVariantId) return;
        addCartItem(finalVariant, product);
        const result = await queueAdd(selectedVariantId);
        if (result) setMessage(result);
      }}
    >
      <SubmitButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}

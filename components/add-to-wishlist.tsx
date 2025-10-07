// 'use client';

// import { HeartIcon } from '@heroicons/react/24/outline';
// import clsx from 'clsx';
// import { useProduct } from 'components/product/product-context';
// import { Product, ProductVariant } from 'lib/shopify/types';
// import i18n from '../lib/i18nClient';
// import { useTranslation } from 'react-i18next';

// function SubmitWishlistButton({
//   availableForSale,
//   selectedVariantId
// }: {
//   availableForSale: boolean;
//   selectedVariantId: string | undefined;
// }) {
//   const { t, ready } = useTranslation('common');
//   const buttonClasses =
//     'relative flex w-50 items-center justify-center rounded-half bg-white p-2 tracking-wide text-black border border-black';
//   const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

//   if (!availableForSale) {
//     return (
//       <></>
//       // <button disabled className={clsx(buttonClasses, disabledClasses)}>
//       //   Out Of Stock
//       // </button>
//     );
//   }

//   if (!selectedVariantId) {
//     return (
//       <button
//         aria-label="Please select an option"
//         disabled
//         className={clsx(buttonClasses, disabledClasses)}
//       >
//         <div className="absolute left-0 ml-4">
//           {/* <HeartIcon className="h-5" /> */}
//         </div>
//         {t("addToWishlist")}
//       </button>
//     );
//   }

//   return (
//     <button
//       aria-label="Add to wishlist"
//       className="text-sm md:text-md lg:text-base flex items-center justify-center bg-white w-100 px-5 py-[8px] text-black border border-black h-18"
//     >
//       {/* <div className="absolute left-0 ml-4">
//         <HeartIcon className="h-5" />
//       </div> */}
//      {t("addToWishlist")}
//     </button>
//   );
// }

// export function AddToWishlist({ product }: { product: Product }) {
//   const { variants, availableForSale } = product;
//   const { state } = useProduct();

//   const variant = variants.find((variant: ProductVariant) =>
//     variant.selectedOptions.every((option) => option.value === state[option.name.toLowerCase()])
//   );
//   const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
//   const selectedVariantId = variant?.id || defaultVariantId;
//   const finalVariant = variants.find((variant) => variant.id === selectedVariantId)!;

//   return (
//     <form
//       action={async () => {
//         console.log('Add to wishlist:', finalVariant, product);
//         // Here you can trigger your wishlist logic
//       }}
//     >
//       <SubmitWishlistButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} />
//     </form>
//   );
// }



'use client';

import { HeartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useProduct } from 'components/product/product-context';
import { Product, ProductVariant } from 'lib/shopify/types';
import i18n from '../lib/i18nClient';
import { useTranslation } from 'react-i18next';

function SubmitWishlistButton({
  availableForSale,
  selectedVariantId,
  isMultipleProducts = false
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  isMultipleProducts?: boolean;
}) {
  const { t, ready } = useTranslation('common');
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

  if (!selectedVariantId && !isMultipleProducts) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          {/* <HeartIcon className="h-5" /> */}
        </div>
        {t("addToWishlist")}
      </button>
    );
  }

  return (
    <button
      aria-label={isMultipleProducts ? "Add bundle to wishlist" : "Add to wishlist"}
      className="text-sm md:text-md lg:text-base flex items-center justify-center bg-white w-100 px-5 py-[8px] text-black border border-black h-18"
    >
      {/* <div className="absolute left-0 ml-4">
        <HeartIcon className="h-5" />
      </div> */}
     {isMultipleProducts ? t("addToWishlist") : t("addToWishlist")}
    </button>
  );
}

// Type for single product or array of products
type ProductInput = Product | Product[];

export function AddToWishlist({ product }: { product: ProductInput }) {
  const { t } = useTranslation('common');
  const isArray = Array.isArray(product);
  const products = isArray ? product : [product];
  
  // For single product, we can use the product context
  const { state: productState } = useProduct();

  // Function to get the selected variant for a single product
  const getSelectedVariant = (prod: Product) => {
    const { variants } = prod;
    const variant = variants.find((variant: ProductVariant) =>
      variant.selectedOptions.every((option) => option.value === productState[option.name.toLowerCase()])
    );
    const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
    return variant?.id || defaultVariantId;
  };

  // For single product, use the existing logic
  if (!isArray) {
    const selectedVariantId = getSelectedVariant(product);
    const finalVariant = product.variants.find((variant) => variant.id === selectedVariantId)!;

    return (
      <form
        action={async () => {
          console.log('Add to wishlist:', finalVariant, product);
          // Here you can trigger your wishlist logic for single product
        }}
      >
        <SubmitWishlistButton 
          availableForSale={product.availableForSale} 
          selectedVariantId={selectedVariantId} 
        />
      </form>
    );
  }

  // For multiple products (bundle)
  const allAvailable = products.every(prod => prod.availableForSale);
  const hasVariants = products.every(prod => prod.variants.length > 0);
  
  // For bundles, we'll use the first variant of each product
  const selectedVariants = products.map(prod => ({
    product: prod,
    variant: prod.variants[0] // Use first variant as default for bundles
  }));

  return (
    <form
      action={async () => {
        console.log('Add bundle to wishlist:', selectedVariants, products);
        // Here you can trigger your wishlist logic for multiple products
        // You might want to add all products in the bundle to the wishlist
      }}
    >
      <SubmitWishlistButton 
        availableForSale={allAvailable} 
        selectedVariantId={hasVariants ? "bundle" : undefined} 
        isMultipleProducts={true}
      />
    </form>
  );
}
'use client';

import { addItem } from 'components/cart/actions';
import { Product, ProductVariant } from 'lib/shopify/types';
import { useCart } from './cart-context';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

function SubmitButton({ loading }: { loading: boolean }) {
  const { t } = useTranslation('common');
  return (
    <button
      type="submit"
      disabled={loading}
      className={`text-sm md:text-md lg:text-base flex items-center justify-center bg-black w-100 px-5 py-[9px] text-white h-18 rounded ${
        loading ? 'opacity-60 cursor-not-allowed' : ''
      }`}
    >
      {loading ? t('adding') : t('addBundleToCart')}
    </button>
  );
}

export function AddToCartBundles({ products }: { products: Product[] }) {
  const { addCartItem } = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Add all products to cart sequentially
      for (const product of products) {
        // Get the first variant
        const variant = product.variants?.nodes?.[0];
        
        if (!variant) {
          console.error('No variant found for product:', product.title);
          continue;
        }

        // Ensure the variant has the proper price structure
        const variantWithPrice = {
          ...variant,
          price: {
            amount: variant.priceV2?.amount || product.priceRange.minVariantPrice.amount,
            currencyCode: variant.priceV2?.currencyCode || product.priceRange.minVariantPrice.currencyCode
          }
        };

        // Add to local cart context with the properly formatted variant
        addCartItem(variantWithPrice, product);
        
        // Call server action to add to cart
        await addItem(null, variant.id);
      }
      
      setMessage('Bundle added to cart successfully');
    } catch (error) {
      console.error('Error adding bundle to cart:', error);
      setMessage('Error adding bundle to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <SubmitButton loading={loading} />
      {message && (
        <p aria-live="polite" className="mt-2 text-sm" role="status">
          {message}
        </p>
      )}
    </form>
  );
}





// 'use client';

// import { addItem } from 'components/cart/actions';
// import { Product, ProductVariant } from 'lib/shopify/types';
// import { useCart } from './cart-context';
// import { useTranslation } from 'react-i18next';
// import { useState } from 'react';

// function SubmitButton({ loading }: { loading: boolean }) {
//   const { t } = useTranslation('common');
//   return (
//     <button
//       type="submit"
//       disabled={loading}
//       className={`text-sm md:text-md lg:text-base flex items-center justify-center bg-black w-100 px-5 py-[9px] text-white h-18 rounded ${
//         loading ? 'opacity-60 cursor-not-allowed' : ''
//       }`}
//     >
//       {loading ? t('adding') : t('addToCart')}
//     </button>
//   );
// }

// interface AddToCartBundlesProps {
//   products: Product[];
//   bundlePrice: {
//     amount: string;
//     currencyCode: string;
//   };
//   bundleId: string;
// }

// export function AddToCartBundles({ products, bundlePrice, bundleId }: AddToCartBundlesProps) {
//   const { addCartItem } = useCart();
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);

//     try {
//       // Add all products to cart with their actual prices
//       for (const product of products) {
//         const variant = product.variants?.nodes?.[0];
        
//         if (!variant) {
//           console.error('No variant found for product:', product.title);
//           continue;
//         }

//         // Add to local cart context
//         addCartItem(variant, product);
        
//         // Call server action to add to cart
//         await addItem(null, variant.id);
//       }
      
//       // Store bundle information in localStorage for client-side price adjustment
//       const bundleInfo = {
//         id: bundleId,
//         price: bundlePrice.amount,
//         currency: bundlePrice.currencyCode,
//         productIds: products.map(p => p.id),
//         createdAt: Date.now()
//       };
      
//       // Get existing bundles or initialize empty array
//       const existingBundles = JSON.parse(localStorage.getItem('cartBundles') || '[]');
      
//       // Add new bundle
//       existingBundles.push(bundleInfo);
      
//       // Save back to localStorage
//       localStorage.setItem('cartBundles', JSON.stringify(existingBundles));
      
//       setMessage('Bundle added to cart successfully');
//     } catch (error) {
//       console.error('Error adding bundle to cart:', error);
//       setMessage('Error adding bundle to cart');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <SubmitButton loading={loading} />
//       {message && (
//         <p aria-live="polite" className="mt-2 text-sm" role="status">
//           {message}
//         </p>
//       )}
//     </form>
//   );
// }
// components/bundle/cart/add-to-cart-bundles.tsx
'use client';

import { addItem } from 'components/cart/actions';
import { Product, ProductVariant } from 'lib/shopify/types';
import { useCart } from './cart-context';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface ProductWithQuantity {
  product: Product;
  quantity: number;
  variantId: string;
}

function SubmitButton({ loading }: { loading: boolean }) {
  const { t } = useTranslation('common');
  return (
    <button
      type="submit"
      disabled={loading}
      className={`text-sm md:text-md lg:text-base flex items-center justify-center bg-black w-100 px-5 py-[9px] text-white h-18 ${
        loading ? 'opacity-60 cursor-not-allowed' : ''
      }`}
    >
      {loading ? t('adding') : t('addToCart')}
    </button>
  );
}

export function AddToCartBundles({ productsWithQuantity }: { productsWithQuantity: ProductWithQuantity[] }) {
  const { addCartItem } = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Add all products to cart with their respective quantities
      for (const item of productsWithQuantity) {
        const { product, quantity, variantId } = item;
        
        // Find the specific variant from the product
        const variant = product.variants?.nodes?.find((v: ProductVariant) => v.id === variantId);
        
        if (!variant) {
          console.error('Variant not found for product:', product.title, 'variantId:', variantId);
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

        // Add to local cart context with quantity
        // Note: You might need to update your cart context to handle quantities
        for (let i = 0; i < quantity; i++) {
          addCartItem(variantWithPrice, product);
        }
        
        // Call server action to add to cart with quantity
        // If your addItem function doesn't support quantity, you'll need to call it multiple times
        // or update it to accept a quantity parameter
        for (let i = 0; i < quantity; i++) {
          await addItem(null, variant.id);
        }
      }
      
      // setMessage('Bundle added to cart successfully');
    } catch (error) {
      console.error('Error adding bundle to cart:', error);
      setMessage('Error adding bundle to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-auto'>
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
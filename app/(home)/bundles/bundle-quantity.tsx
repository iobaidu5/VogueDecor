// components/bundle/bundle-quantity.tsx
'use client';

import { useState, useEffect } from 'react';

import { updateItemQuantity } from 'components/cart/actions';
import { useCart } from 'components/cart/cart-context';

type BundleItem = {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  titleSnap: string;
  priceSnap: number;
};

type BundleQuantityProps = {
  bundleItems: BundleItem[];
  products: any[];
};

const BundleQuantity = ({ bundleItems, products }: BundleQuantityProps) => {
  const { cart, updateCartItem } = useCart();
  const [bundleQuantity, setBundleQuantity] = useState(1);
  const [isPending, setIsPending] = useState(false);

  // Find cart lines for all bundle items
  const getBundleCartLines = () => {
    if (!cart?.lines) return [];
    
    return bundleItems.map(bundleItem => {
      const cartLine = cart.lines.find(line => 
        line.merchandise.id === bundleItem.variantId
      );
      return { bundleItem, cartLine };
    });
  };

  const bundleCartLines = getBundleCartLines();

  // Initialize bundle quantity from cart
  useEffect(() => {
    if (bundleCartLines.length > 0) {
      // Find the first item that exists in cart and calculate bundle quantity
      const firstItemWithCart = bundleCartLines.find(item => item.cartLine);
      if (firstItemWithCart) {
        const cartQuantity = firstItemWithCart.cartLine!.quantity;
        const bundleBaseQuantity = firstItemWithCart.bundleItem.quantity;
        const calculatedBundleQuantity = Math.floor(cartQuantity / bundleBaseQuantity);
        setBundleQuantity(calculatedBundleQuantity || 1);
      }
    }
  }, [cart?.lines]);

  const updateBundleQuantity = async (newQuantity: number) => {
    if (isPending || newQuantity < 1) return;
    
    setIsPending(true);
    setBundleQuantity(newQuantity);

    try {
      // Update each product in the bundle
      const updatePromises = bundleItems.map(async (bundleItem) => {
        const product = products.find(p => p.id === bundleItem.productId);
        if (!product) return;

        const finalVariantId = bundleItem.variantId || product.variants[0]?.id;
        if (!finalVariantId) return;

        // Find existing cart line for this variant
        const existingLine = cart?.lines.find(line => 
          line.merchandise.id === finalVariantId
        );

        // Calculate new quantity for this item (bundle item quantity * bundle quantity)
        const itemNewQuantity = bundleItem.quantity * newQuantity;

        // Optimistic update to cart context
        if (existingLine?.id) {
          updateCartItem(existingLine.id, itemNewQuantity);
        }

        // Update cart via API
        await updateItemQuantity(null, {
          lineId: existingLine?.id || undefined,
          merchandiseId: finalVariantId,
          quantity: itemNewQuantity,
          preventCartOpen: true
        });
      });

      await Promise.all(updatePromises);
    } catch (error) {
      console.error('Failed to update bundle quantity:', error);
      // Revert on error
      const bundleCartLines = getBundleCartLines();
      const firstItemWithCart = bundleCartLines.find(item => item.cartLine);
      if (firstItemWithCart) {
        const cartQuantity = firstItemWithCart.cartLine!.quantity;
        const bundleBaseQuantity = firstItemWithCart.bundleItem.quantity;
        const calculatedBundleQuantity = Math.floor(cartQuantity / bundleBaseQuantity);
        setBundleQuantity(calculatedBundleQuantity || 1);
      }
    } finally {
      setIsPending(false);
    }
  };

  const handleIncrement = () => updateBundleQuantity(bundleQuantity + 1);
  const handleDecrement = () => updateBundleQuantity(bundleQuantity - 1);

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center justify-center border border-gray-300 rounded-md">
        <button
          className="flex h-8 w-8 items-center justify-center text-xl text-gray-500 disabled:opacity-50"
          onClick={handleDecrement}
          disabled={bundleQuantity <= 1 || isPending}
        >
          -
        </button>
        
        <span className="w-10 text-center text-2xl text-gray-500">
          {isPending ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"></div>
            </div>
          ) : (
            bundleQuantity
          )}
        </span>
        
        <button
          className="flex h-8 w-8 items-center justify-center text-xl text-gray-500 disabled:opacity-50"
          onClick={handleIncrement}
          disabled={isPending}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default BundleQuantity;
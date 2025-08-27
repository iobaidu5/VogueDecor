// components/BundleAddToCart.tsx
'use client';

import { addToCart } from 'lib/shopify';
import { useState } from 'react';

export default function BundleAddToCart({ bundleItems }: { 
  bundleItems: { variantId: string; quantity: number }[]
}) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await Promise.all(bundleItems.map(item => 
        addToCart(item.variantId, item.quantity)
      ));
      alert('Bundle added to cart!');
    } catch (error) {
      console.error('Failed to add bundle to cart', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-70"
    >
      {isAdding ? 'Adding...' : 'Add Bundle to Cart'}
    </button>
  );
}
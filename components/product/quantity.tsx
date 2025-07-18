'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../../components/cart/cart-context';
import { updateItemQuantity } from 'components/cart/actions';

type Product = {
  id: string;
  title: string;
  variants: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
  }[];
};

type QuantityProps = {
  item: Product;
};

const Quantity = ({ item }: QuantityProps) => {
  const { cart, updateCartItem } = useCart();
  const merchandiseId = item.variants?.[0]?.id;
  
  // Fixed: Use 'lines' instead of 'items'
  const cartLine = cart?.lines?.find(line => 
    line.merchandise.id === merchandiseId
  );
  
  // Initialize from cart if available
  const [quantity, setQuantity] = useState(cartLine?.quantity || 1);
  const [isPending, setIsPending] = useState(false);

  // Sync with cart updates
  useEffect(() => {
    if (cartLine) {
      setQuantity(cartLine.quantity);
    }
  }, [cartLine?.quantity]);

  const handleQuantityChange = async (newQty: any) => {
    if (isPending) return;
    if (!merchandiseId || newQty < 1) return;
    
    setIsPending(true);
    // Immediately update UI for instant feedback
    setQuantity(newQty);
    
    // Optimistic update to cart context
    if (cartLine?.id) {
      updateCartItem(cartLine.id, newQty);
    }

    try {
      await updateItemQuantity(null, {
        lineId: cartLine?.id || undefined, // Use undefined instead of empty string
        merchandiseId,
        quantity: newQty,
        preventCartOpen: true
      });
    } catch (error) {
      // Revert on error
      setQuantity(cartLine?.quantity || 1);
      console.error('Failed to update quantity:', error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex items-center justify-center border border-gray-300">
      <button
        className="flex h-10 w-10 items-center justify-center text-xl text-gray-500 disabled:opacity-50"
        onClick={() => handleQuantityChange(quantity - 1)}
        disabled={quantity <= 1 || isPending}
      >
        -
      </button>
      <span className="w-10 text-center text-2xl text-gray-500">
        {quantity}
      </span>
      <button
        className="flex h-10 w-10 items-center justify-center text-xl text-gray-500 disabled:opacity-50"
        onClick={() => handleQuantityChange(quantity + 1)}
        disabled={isPending}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;



      {/* <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
        <EditItemQuantityButton
          item={item}
          type="minus"
          optimisticUpdate={updateCartItem}
        />
        <p className="w-6 text-center">
          <span className="w-full text-sm">{item.quantity}</span>
        </p>
        <EditItemQuantityButton
          item={item}
          type="plus"
          optimisticUpdate={updateCartItem}
        />
      </div> */}
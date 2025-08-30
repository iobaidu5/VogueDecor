// hooks/useBundlePricing.ts
import { useEffect } from 'react';
import { useCart } from 'components/cart/cart-context';

export function useBundlePricing() {
  const { cart } = useCart();
  
  // Check if updateCart is available, if not we'll use a different approach
  const hasUpdateCart = 'updateCart' in useCart();

  useEffect(() => {
    if (!cart) return;

    // Get bundle information from localStorage
    const bundles = JSON.parse(localStorage.getItem('cartBundles') || '[]');
    
    // Check if any bundles are in the cart
    const bundleItems = cart.lines.filter(item => 
      bundles.some(bundle => bundle.productIds.includes(item.merchandise.product.id))
    );

    if (bundleItems.length === 0) return;

    // Calculate the total of all non-bundle items
    let nonBundleTotal = 0;
    cart.lines.forEach(item => {
      if (!bundles.some(bundle => bundle.productIds.includes(item.merchandise.product.id))) {
        nonBundleTotal += parseFloat(item.cost.totalAmount.amount);
      }
    });

    // Add the bundle prices
    let bundleTotal = 0;
    const processedBundles = new Set();
    
    bundles.forEach((bundle: any) => {
      if (!processedBundles.has(bundle.id)) {
        bundleTotal += parseFloat(bundle.price);
        processedBundles.add(bundle.id);
      }
    });

    // Update the cart total if needed
    const currentTotal = parseFloat(cart.cost.totalAmount.amount);
    const expectedTotal = nonBundleTotal + bundleTotal;
    
    if (Math.abs(currentTotal - expectedTotal) > 0.01) {
      // Create a modified cart with the correct total
      const modifiedCart = {
        ...cart,
        cost: {
          ...cart.cost,
          totalAmount: {
            amount: expectedTotal.toFixed(2),
            currencyCode: cart.cost.totalAmount.currencyCode
          },
          subtotalAmount: {
            amount: expectedTotal.toFixed(2),
            currencyCode: cart.cost.totalAmount.currencyCode
          }
        }
      };
      
      // Update the cart if updateCart is available
      if (hasUpdateCart) {
        // @ts-ignore - We've checked that updateCart exists
        useCart().updateCart(modifiedCart);
      } else {
        // Fallback: Update localStorage with the modified cart
        localStorage.setItem('modifiedCart', JSON.stringify(modifiedCart));
      }
    }
  }, [cart, hasUpdateCart]);
}
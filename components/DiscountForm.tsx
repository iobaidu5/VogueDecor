// components/DiscountForm.tsx
"use client";

import { useState } from "react";
import { applyDiscountToCart } from "lib/shopify";

export default function DiscountForm({ 
  bundleDiscountCode, 
  originalPrice 
}: { 
  bundleDiscountCode: string | null;
  originalPrice: number;
}) {
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(originalPrice);

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      setError("Please enter a discount code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Check if the discount code matches the bundle's discount code
      if (discountCode.trim() === bundleDiscountCode) {
        // Apply 10% discount locally
        const discountAmount = originalPrice * 0.1;
        const newPrice = originalPrice - discountAmount;
        
        setDiscountedPrice(newPrice);
        setAppliedDiscount(true);
        
        // Apply discount to cart in Shopify
        await applyDiscountToCart(discountCode);
      } else {
        setError("Invalid discount code");
      }
    } catch (err: any) {
      setError(err.message || "Failed to apply discount");
      console.error("Discount application error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter discount code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={appliedDiscount || loading}
        />
        <button
          onClick={handleApplyDiscount}
          disabled={appliedDiscount || loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Applying..." : "Apply"}
        </button>
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      {appliedDiscount && (
        <div className="text-green-600">
          <p>Discount applied successfully! 10% off</p>
          <p className="text-lg font-semibold">
            New price: ${discountedPrice.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}
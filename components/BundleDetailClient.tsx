"use client";

import Image from "next/image";
import BundleCard from "components/BundleCard";
import { ProductProvider } from "components/product/product-context";
import CartModal from "components/cart/modal";
import { motion } from "framer-motion";

export default function BundleDetailClient({
  bundle,
  totalPrice,
  discountApplied,
  discountedPrice,
}: {
  bundle: any;
  totalPrice: number;
  discountApplied: boolean;
  discountedPrice: number;
}) {
  return (
    <ProductProvider>
      <main className="container mx-auto p-6 grid gap-10 md:grid-cols-2">
      <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4 }}
  className="relative w-full h-screen"
>
  {bundle.imageUrl ? (
    <Image
      src={bundle.imageUrl}
      alt={bundle.title}
      fill
      priority
      className="object-cover"
    />
  ) : (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center text-gray-400">
      No image available
    </div>
  )}
</motion.div>

        <div
          className="space-y-6"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              {bundle.title}
            </h1>
            {bundle.description && (
              <p className="mt-2 text-gray-600 leading-relaxed">
                {bundle.description}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-3xl font-semibold text-green-600">
              ${totalPrice.toFixed(2)}
            </div>

            {discountApplied && (
              <div
                className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm"
              >
                <p className="text-green-700 font-medium">
                  🎉 You got a 5% discount!
                </p>
                <p className="text-gray-700">
                  New price (tax excluded) ≈ {" "}
                  <span className="font-semibold text-green-700">
                    ${discountedPrice.toFixed(2)}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Use discount code{" "}
                  <span className="px-2 py-0.5 bg-green-100 border border-green-300 rounded-md font-mono">
                    BUNDLE
                  </span>{" "}
                  at checkout.
                </p>
              </div>
            )}
          </div>

          <div>
            <ul className="space-y-3">
              <BundleCard bundle={bundle} />
            </ul>
          </div>


          {/* <div className="flex justify-end md:w-1/3">
            <div>
              <CartModal />
            </div>
          </div> */}
        </div>
      </main>
    </ProductProvider>
  );
}

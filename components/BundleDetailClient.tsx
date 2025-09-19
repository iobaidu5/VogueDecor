"use client";

import Image from "next/image";
import BundleCard from "components/BundleCard";
import { ProductProvider } from "components/product/product-context";
import CartModal from "components/cart/modal";
import { motion } from "framer-motion";
import SingleBreadCrumb from "app/(home)/product/[handle]/SingleBreadCrumb";
import { Suspense } from "react";
import Accordion from "./accordian";
import { useTranslation } from 'react-i18next';

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

  const { t, ready } = useTranslation('common');
  return (
    <ProductProvider>
      <div className="px-4 py-5 xs:py-20 md:px-10 lg:px-40">
        <SingleBreadCrumb title={bundle?.title} collection={"Bundles"} />
        <main className="container mx-auto p-6 grid gap-10 md:grid-cols-2">
          {/* Left Side - Image / Gallery */}
          <div className="w-full lg:w-12/12">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full w-full overflow-hidden bg-gray-100" />
              }
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-square h-full w-full overflow-hidden rounded-lg shadow-sm"
              >
                {bundle?.imageUrl ? (
                  <Image
                    src={bundle.imageUrl}
                    alt={bundle.title}
                    fill
                    priority
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    No image available
                  </div>
                )}
              </motion.div>
            </Suspense>
          </div>

          <div
            className="space-y-2"
          >
            <div>
              <h1 className="font-medium xs:text-xl md:text-2xl text-gray-900">
                {bundle?.title}
              </h1>
              {bundle?.slug && (
                <h5 className="font-normal text-sm text-gray-500">
                  #{bundle?.slug}
                </h5>
              )}

              <div className="space-y-2 my-3">
                <div className="text-3xl font-medium md:text-xl mt-5 text-[#000] overflow-hidden flex items-center gap-2">
                  ${totalPrice.toFixed(2)}
                </div>

                {discountApplied && (
                  <div
                    className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm"
                  >
                    <p className="text-green-700 font-medium">
                      🎉 You got a 7% discount!
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
            </div>

            <div className="w-full space-y-4 xs:mt-4 md:mt-8">
              <div className="border-b border-black/80">
                <Accordion
                  title={t("DESCRIPTION")}
                  content={bundle.description}
                />
              </div>
            </div>


            <div className="pt-5">
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
      </div>
    </ProductProvider>
  );
}

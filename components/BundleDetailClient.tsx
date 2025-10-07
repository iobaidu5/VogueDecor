// components/bundle/bundle-detail-client.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SingleBreadCrumb from "app/(home)/product/[handle]/SingleBreadCrumb";
import Accordion from "./accordian";
import BundleCard from "components/BundleCard";
import { ProductProvider } from "components/product/product-context";
import { Gallery } from 'components/product/gallery';
import BundleQuantity from "app/(home)/bundles/bundle-quantity";
import Image from 'next/image';
import Down from 'media/svg/arrow-down.svg';
import Up from 'media/svg/arrow-up.svg';
import { AddToCartBundles } from "./cart/add-to-cart-bundles";
import { AddToWishlist } from 'components/add-to-wishlist';
import Link from "next/link";
import Econolease from "media/png/econolease.jpeg"
import { BundleVariantSelector } from "./product/bundle-variant-selector";

export default function BundleDetailClient({
  bundle,
  totalPrice,
  allBundles = []
}: {
  bundle: any;
  totalPrice: number;
  allBundles?: any[];
}) {
  const { t } = useTranslation("common");
  const [products, setProducts] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const toggleAccordion = (): void => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    async function load() {
      if (!bundle.items?.length) {
        setIsLoadingProducts(false);
        return;
      }

      try {
        const ids = bundle.items.map((i: any) => i.productId);

        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids }),
        });

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoadingProducts(false);
      }
    }

    load();
  }, [bundle.items]);

  // Build gallery images list
  const galleryImages = [
    ...(bundle?.imageUrl
      ? [
        {
          src: bundle.imageUrl,
          altText: bundle?.title || "Bundle image",
        },
      ]
      : []),
    ...products
      .map((p) => ({
        src: p.featuredImage?.url,
        altText: p.featuredImage?.altText || p.title || "Product image",
      }))
      .filter((img) => img.src) // remove nulls
      .slice(0, 4), // limit to 4 product images
  ];

  return (
    <ProductProvider>
      <div className="px-4 py-5 xs:py-20 md:px-10 lg:px-40">
        <SingleBreadCrumb title={bundle?.title} collection={"Bundles"} />
        <main className="container mx-auto p-6 grid gap-10 md:grid-cols-2">
          {/* Left Side - Gallery */}
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
                {galleryImages.length > 0 ? (
                  <Gallery images={galleryImages} />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    No images available
                  </div>
                )}
              </motion.div>
            </Suspense>
          </div>

          {/* Right Side - Bundle Info */}
          <div className="space-y-4">
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
              </div>
            </div>

            {/* Bundle Quantity Component */}
            {!isLoadingProducts && (
              <BundleQuantity
                bundleItems={bundle.items}
                products={products}
              />
            )}

            <div className="flex flex-nowrap items-start gap-4 mt-8 mb-8">
              {!isLoadingProducts && (
                <>
                  <AddToCartBundles products={products} />
                  <AddToWishlist product={products} />
                </>
              )}
            </div>

            <div className="w-full space-y-4 xs:mt-4 md:mt-8">
              <div className="border-b border-black/80">
                <Accordion title={t("DESCRIPTION")} content={bundle.description} />
              </div>
            </div>

            <div className="w-full space-y-4 xs:mt-4 md:mt-8">
              <div className="border-b border-black/80">
                <div className="overflow-hidden rounded-lg last:mb-0 xs:mb-2 md:mb-4">
                  <button
                    className="flex w-full cursor-pointer items-center justify-between border-none bg-white py-1.5"
                    onClick={toggleAccordion}
                  >
                    <h5 className="font-poppins xs:text-[13px] md:text-[13px] font-small capitalize text-black">
                      Included Products
                    </h5>
                    <Image src={isOpen ? Up : Down} alt="icons" width={20} height={20} />
                  </button>
                  <motion.div
                    className="overflow-hidden bg-white"
                    initial={{ height: 0 }}
                    animate={{ height: isOpen ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`py-3 font-poppins xs:text-[13px] md:text-[13px]`}
                    >
                      <BundleCard bundle={bundle} />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center sm:justify-start items-center gap-4 sm:flex-row sm:items-center">
              <Link href="/voguedecor-calculator" className="text-[#7DA6DD] underline">
                {t(`payMonthlyWith`)}
              </Link>
              <Image src={Econolease} alt="Econolease" width={120} height={40} />
            </div>

            {/* Bundle Variant Selector - uses allBundles passed from server */}
          </div>
        </main>
        {allBundles && allBundles.length > 1 && (
              <BundleVariantSelector 
                bundles={allBundles} 
                currentBundle={bundle} 
              />
            )}
      </div>
    </ProductProvider>
  );
}
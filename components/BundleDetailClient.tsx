"use client";

import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SingleBreadCrumb from "app/(home)/product/[handle]/SingleBreadCrumb";
import Accordion from "./accordian";
import BundleCard from "components/BundleCard";
import { ProductProvider } from "components/product/product-context";
import { Gallery } from 'components/product/gallery';

export default function BundleDetailClient({
  bundle,
  totalPrice,
}: {
  bundle: any;
  totalPrice: number;
}) {
  const { t } = useTranslation("common");
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      if (!bundle.items?.length) return;

      const ids = bundle.items.map((i: any) => i.productId);

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });

      const data = await res.json();
      setProducts(data);
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
          <div className="space-y-2">
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

            <div className="w-full space-y-4 xs:mt-4 md:mt-8">
              <div className="border-b border-black/80">
                <Accordion title={t("DESCRIPTION")} content={bundle.description} />
              </div>
            </div>

            <div className="pt-5">
              <ul className="space-y-3">
                <BundleCard bundle={bundle} />
              </ul>
            </div>
          </div>
        </main>
      </div>
    </ProductProvider>
  );
}

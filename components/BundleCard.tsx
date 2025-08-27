// components/BundleCard.tsx
"use client";

import { useEffect, useState } from "react";

export default function BundleCard({ bundle }: { bundle: any }) {
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

  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-lg">Included Products</h2>
      <ul className="space-y-3">
        {products.map((p) => (
          <li
            key={p.id}
            className="flex items-center gap-4 border rounded-lg p-3 bg-gray-50"
          >
            <img
              src={p.featuredImage?.url}
              alt={p.title}
              className="w-16 h-16 rounded object-cover"
            />
            <div>
              <p className="font-medium">{p.title}</p>
              <p className="text-sm text-gray-600">
                {p.priceRange.minVariantPrice.amount}{" "}
                {p.priceRange.minVariantPrice.currencyCode}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

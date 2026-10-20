// components/BundleCard.tsx
"use client";

import Link from 'components/product/localized-link';
import { useTranslation } from 'react-i18next';
import { productName } from 'lib/product-name';

export default function BundleCard({
  bundle,
  productsWithQuantity,
}: {
  bundle: any;
  productsWithQuantity: any;
}) {
  const { t } = useTranslation('common');
  const productsWithQty = productsWithQuantity.map((item: any) => ({
    ...item.product,
    quantity: item.quantity,
  }));

  return (
    <div className="space-y-3">
      <ul className="space-y-3">
        {productsWithQty.map((p) => (
          <Link
            key={p.id}
            className="relative h-full w-full"
            href={`/product/${p.handle}`}
            prefetch={true}
          >
            <li className="flex items-center gap-4 border rounded-lg p-3 bg-gray-50">
              <img
                src={p.featuredImage?.url}
                alt={p.title}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{productName(t, p.title)}</p>
                <p className="text-sm text-gray-600">
                  {p.priceRange.minVariantPrice.amount}{" "}
                  {p.priceRange.minVariantPrice.currencyCode}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">
                  {t('bundlePage.quantity')}: {p.quantity}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

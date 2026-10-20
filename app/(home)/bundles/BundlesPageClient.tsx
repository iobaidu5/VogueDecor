// app/bundles/BundlesPageClient.tsx
'use client';

import { useState, useMemo } from 'react';
import AllBundleCard from 'components/AllBundleCard';
import FilterDropdown from 'components/filter-dropdown';
import { useTranslation } from 'react-i18next';
import { bundleName } from 'lib/bundle-name';

interface BundleItem {
  id: string;
  bundleId: string;
  productId: string;
  variantId: string;
  titleSnap: string;
  priceSnap: string;
  quantity: number;
}

interface Bundle {
  id: string;
  slug: string;
  title: string;
  description: string;
  bundlePrice: number | null;
  discountCode: string | null;
  createdAt: string;
  updatedAt: string;
  items: BundleItem[];
  totalPrice: number;
}

interface BundlesPageClientProps {
  initialBundles: Bundle[] | null | undefined;
}

export default function BundlesPageClient({ initialBundles }: BundlesPageClientProps) {
  const { t, i18n } = useTranslation('common');
  const [filter, setFilter] = useState<string>('');
  
  // Ensure initialBundles is always an array
  const safeBundles = Array.isArray(initialBundles) ? initialBundles : [];
  
  const sortedBundles = useMemo(() => {
    let sorted = [...safeBundles];

    switch (filter) {
      case 'az':
        sorted.sort((a, b) => bundleName(t, a.title).localeCompare(bundleName(t, b.title), i18n.language));
        break;
      case 'za':
        sorted.sort((a, b) => bundleName(t, b.title).localeCompare(bundleName(t, a.title), i18n.language));
        break;
      case 'price-asc':
        sorted.sort((a, b) => (a.totalPrice || 0) - (b.totalPrice || 0));
        break;
      case 'price-desc':
        sorted.sort((a, b) => (b.totalPrice || 0) - (a.totalPrice || 0));
        break;
      default:
        sorted.sort((a, b) => bundleName(t, a.title).localeCompare(bundleName(t, b.title), i18n.language));
        break;
    }
    
    return sorted;
  }, [filter, i18n.language, safeBundles, t]);

  return (
    <section className="container mx-auto w-100 p-6">
      {safeBundles.length === 0 ? (
        <p className="py-3 text-center text-lg">{t('bundlePage.empty')}</p>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-start justify-between pt-5 mt-2">
            <div className="flex flex-col space-y-1">
              <p className="text-[23px] font-medium capitalize text-gray-700">
                {t('bundlePage.title')}
              </p>
              <p className="text-xs md:text-sm lg991:text-medium text-gray-700">
                <span className="capitalize text-gray-500">
                  {t('bundlePage.subtitle')}
                </span>
              </p>
            </div>
            {/* Filter Dropdown */}
            <div className="flex flex-col justify-center items-end gap-[10px] md:flex-row mr-5">
              <FilterDropdown selected={filter} onFilter={setFilter} />
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3">
            {sortedBundles.map((bundle: Bundle) => (
              <AllBundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

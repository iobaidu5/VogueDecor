"use client";

import { CollectionSnippet } from 'lib/shopify/types';
import { useTranslation } from 'react-i18next';

type CollectionDropdownProps = {
  selected: string;
  onCollectionChange: (value: string) => void;
  collections: CollectionSnippet[];
};

export default function CollectionDropdown({
  selected,
  onCollectionChange,
  collections
}: CollectionDropdownProps) {
  const { t } = useTranslation('common');

  return (
    <div className="relative inline-block ml-4">
      <select
        value={selected}
        onChange={(e) => onCollectionChange(e.target.value)}
        className="block text-black appearance-none w-auto md:w-full bg-white border border-gray-200 hover:border-gray-300 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">{t('allCollections') || 'All Collections'}</option>
        {collections
          .filter(c => c.handle !== 'new-arrivals' && c.handle !== 'sale' && c.handle !== 'all')
          .map(collection => (
            <option key={collection.handle} value={collection.handle}>
              {collection.title}
            </option>
          ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.516 7.548l4.484 4.481 4.484-4.481L16 9l-6 6-6-6z" />
        </svg>
      </div>
    </div>
  );
}
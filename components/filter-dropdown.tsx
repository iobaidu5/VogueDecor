"use client";

import i18n from '../lib/i18nClient';
import { useTranslation } from 'react-i18next';

type FilterDropdownProps = {
  selected: string;
  onFilter: (value: string) => void;
};

export default function FilterDropdown({ selected, onFilter }: FilterDropdownProps) {
  const { t, ready } = useTranslation('common');

  return (
    <div className="relative inline-block">
      <select
        value={selected}
        onChange={(e) => onFilter(e.target.value)}
        className="block text-black appearance-none w-full bg-white border border-gray-200 hover:border-gray-300 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="" disabled>{t('sortBy')}</option>
        <option value="az">{t('sortOptions.az')}</option>
        <option value="za">{t('sortOptions.za')}</option>
        <option value="availability">{t('sortOptions.availability')}</option>
        <option value="price-asc">{t('sortOptions.price-asc')}</option>
        <option value="price-desc">{t('sortOptions.price-desc')}</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.516 7.548l4.484 4.481 4.484-4.481L16 9l-6 6-6-6z" />
        </svg>
      </div>
    </div>
  );
}
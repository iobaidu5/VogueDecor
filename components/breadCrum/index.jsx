import Link from 'next/link';
import React from 'react';
import i18n from '../../lib/i18nClient';
import { useTranslation } from 'react-i18next';

const BreadCrumb = ({ currentPage }) => {
  const { t, ready } = useTranslation('common');
  return (
    <div className="flex w-full items-center space-x-2 text-[12px] mt-14">
      <Link href="/" className="text-gray-500 hover:underline">
        {t(`home`)}
      </Link>
      <span className="text-gray-500 hover:underline"> / </span>
      <span className="capitalize text-gray-500">
        {currentPage &&
          t(
            `footer.${currentPage
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}`
          )}
      </span>

    </div>
  );
};

export default BreadCrumb;

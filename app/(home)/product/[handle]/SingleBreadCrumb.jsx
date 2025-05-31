"use client";

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

const SingleBreadCrumb = ({title, collection}) => {
  const { t, ready } = useTranslation('common');
  const router = useRouter();
  return (
    <div className="flex w-full items-center space-x-2 text-[12px] mb-4 lg:mb-20">
    <Link href="/" className="text-gray-500 hover:underline">
    {t(`home`)}
    </Link>
    <span className="text-gray-500 hover:underline"> / </span>
    <span
      className="capitalize text-gray-500 cursor-pointer"
      onClick={() => router.push(`/search/${encodeURIComponent(collection)}`)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          router.push(`/search/${encodeURIComponent(collection)}`);
        }
      }}
    >
      {collection}
    </span>
    <span className="text-gray-500 hover:underline"> / </span>
    <span className="capitalize text-gray-500">{t(`products.${title}`)}</span>
  </div>
  )
}

export default SingleBreadCrumb
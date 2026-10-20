"use client";

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { productName } from 'lib/product-name';
import { usePathname, useRouter } from 'next/navigation';
import { localeFromPathname, withLocalePath } from '../../../../lib/locale-path';

const SingleBreadCrumb = ({title, collection}) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  return (
    <div className="flex w-full items-center space-x-2 text-[12px] mb-4 lg:mb-20">
    <Link href={withLocalePath('/', locale)} className="text-gray-500 hover:underline">
    {t(`home`)}
    </Link>
    {collection && <>
    <span className="text-gray-500 hover:underline"> / </span>
    <span
      className="capitalize text-gray-500 cursor-pointer"
      onClick={() => router.push(withLocalePath(`/${encodeURIComponent(collection)}`, locale))}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          router.push(withLocalePath(`/${encodeURIComponent(collection)}`, locale));
        }
      }}
    >
      {t(`menu.${collection}`, { defaultValue: collection })}
    </span>
    </>}
    <span className="text-gray-500 hover:underline"> / </span>
    <span className="capitalize text-gray-500">{productName(t, title)}</span>
  </div>
  )
}

export default SingleBreadCrumb

'use client';

import React from 'react';
import '../lib/i18nClient';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export function SaleBar() {
  const { t, ready } = useTranslation('common');

  if (!ready) {
    return (
      <div className="w-full bg-[#fff27d] py-3 text-center text-xs text-black lg991:text-sm">Loading…</div>
    );
  }

  return (
    <div className="w-full bg-[#fff27d] py-3 text-center text-xs text-black lg991:text-sm">
      <p>
        {t('announcementSaleIntro')}
        <span className="font-semibold">{t('announcementSaleDiscount')}</span>
        {t('announcementSaleMid')}
        <Link href="/outdoor-furniture">
          <span className="underline text-black">{t('announcementShopNow')}</span>
        </Link>
      </p>
    </div>
  );
}

'use client';

import React from 'react';
import '../lib/i18nClient'
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export function SaleBar() {
  const { t, ready } = useTranslation('common');

  if (!ready) {
    return <div>Loading translations...</div>;
  }

  return (
    <>
      <div className="w-full bg-[#ff914d] text-white text-center py-3 text-xs lg991:text-sm p-relative z100000">
      <p>{t('sale')} <Link href="/sale"><span className="underline">{t('shopnow')}</span></Link></p>
      </div>
    </>
  );
}

'use client';

import React from 'react';
import '../lib/i18nClient'
import { useTranslation } from 'react-i18next';

export function SaleBar() {
  const { t, ready } = useTranslation('common');

  if (!ready) {
    return <div>Loading translations...</div>;
  }

  return (
    <>
      <div className="w-full bg-[#8a8173] text-white text-center py-3 text-xs lg991:text-sm p-relative z100000">
        {/* <span className="block sm:inline">{'Free Shipping to Canada on all orders over $2999. '}</span>
  <span className="block sm:inline">{'Conditions apply.'}</span> */}
        <p>{t('sale')}</p>
      </div>
    </>
  );
}

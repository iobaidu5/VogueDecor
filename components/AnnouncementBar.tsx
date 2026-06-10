'use client';

import React from 'react';
import '../lib/i18nClient';
import { useTranslation } from 'react-i18next';

export function AnnouncementBar() {
  const { t, ready } = useTranslation('common');

  if (!ready) {
    return (
      <div className="w-full bg-[#545454] py-3 text-center text-xs text-white lg991:text-sm">Loading…</div>
    );
  }

  return (
    <div className="w-full bg-[#545454] py-3 text-center text-xs text-white lg991:text-sm">
      <p>{t('welcomeLine1')}</p>
      <p>{t('welcomeLine2')}</p>
    </div>
  );
}

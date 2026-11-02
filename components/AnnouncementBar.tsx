'use client';

import Link from 'next/link';
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
      <div className="mx-auto flex max-w-full flex-wrap items-center justify-center gap-x-2 px-3">
        <p>{t('welcomeLine1')}</p>
        <span aria-hidden="true">|</span>
        <Link
          href="/shipping-and-return-policy"
          className="underline underline-offset-2 hover:no-underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#545454]"
        >
          {t('checkEligibility')}
        </Link>
      </div>
    </div>
  );
}

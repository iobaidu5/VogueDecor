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

  const text = t('welcome');

  return (
    <div className="w-full overflow-hidden bg-[#545454] py-3 text-xs text-white lg991:text-sm">
      <p className="hidden text-center motion-reduce:block">{text}</p>

      <div className="motion-reduce:hidden">
        <div className="flex w-max max-w-none animate-announcement-marquee items-center [animation-timing-function:linear]">
          <span className="inline-block shrink-0 whitespace-nowrap px-10">{text}</span>
          <span className="inline-block shrink-0 whitespace-nowrap px-10" aria-hidden="true">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
}

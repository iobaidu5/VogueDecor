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
  /** HTML collapses normal spaces — use NBSP + em space so gaps stay wide. */
  const nbsp = '\u00A0';
  const emSp = '\u2003'; /* em space, wider than a normal space */
  const betweenRepeats = `${nbsp.repeat(10)}${emSp} · ${emSp}${nbsp.repeat(10)}`;
  const repeatedLine = Array.from({ length: 12 }, () => text).join(betweenRepeats);

  return (
    <div className="w-full overflow-hidden bg-[#545454] py-3 text-xs text-white lg991:text-sm">
      <p className="hidden text-center motion-reduce:block">{text}</p>

      <div className="motion-reduce:hidden">
        <div className="flex w-max max-w-none animate-announcement-marquee items-center [animation-timing-function:linear]">
          <span className="inline-block shrink-0 whitespace-pre px-6">{repeatedLine}</span>
          <span className="inline-block shrink-0 whitespace-pre px-6" aria-hidden="true">
            {repeatedLine}
          </span>
        </div>
      </div>
    </div>
  );
}

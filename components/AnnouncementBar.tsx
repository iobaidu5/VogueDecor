'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import '../lib/i18nClient';
import { useTranslation } from 'react-i18next';

const HOLD_MS = 3000;
const FADE_MS = 700;

export function AnnouncementBar() {
  const { t, ready } = useTranslation('common');
  const [activeLine, setActiveLine] = useState<'line1' | 'line2'>('line1');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const schedule = (fn: () => void, ms: number) => {
      timeouts.push(
        setTimeout(() => {
          if (!cancelled) fn();
        }, ms),
      );
    };

    const cycle = () => {
      schedule(() => {
        setVisible(false);

        schedule(() => {
          setActiveLine((prev) => (prev === 'line1' ? 'line2' : 'line1'));

          schedule(() => {
            setVisible(true);
            schedule(cycle, HOLD_MS + FADE_MS);
          }, 50);
        }, FADE_MS);
      }, HOLD_MS);
    };

    cycle();

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  if (!ready) {
    return (
      <div className="w-full bg-[#545454] py-3 text-center text-xs text-white lg991:text-sm">Loading…</div>
    );
  }

  const text = activeLine === 'line1' ? t('welcomeLine1') : t('welcomeLine2');

  return (
    <div className="w-full bg-[#545454] py-3 text-center text-xs text-white lg991:text-sm">
      <div className="mx-auto flex max-w-full flex-wrap items-center justify-center gap-x-2 px-3">
        <p
          className="transition-opacity duration-700 ease-in-out motion-reduce:transition-none"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {text}
        </p>
        {activeLine === 'line1' && (
          <>
            <span aria-hidden="true">|</span>
            <Link
              href="/shipping-and-return-policy"
              className="underline underline-offset-2 hover:no-underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#545454]"
            >
              {t('checkEligibility')}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

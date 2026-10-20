'use client';

import i18n from '../lib/i18nClient';
import { usePathname } from 'next/navigation';
import { I18nextProvider } from 'react-i18next';
import { useMemo, type ReactNode } from 'react';
import { localeFromPathname } from '../lib/locale-path';

function syncLanguage(pathname: string): string {
  const lng = localeFromPathname(pathname);
  if (i18n.language !== lng) {
    i18n.changeLanguage(lng);
  }
  return lng;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  useMemo(() => syncLanguage(pathname), [pathname]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';
import { localeFromPathname, withLocalePath } from 'lib/locale-path';

export default function ProductLink({ href, ...props }: ComponentProps<typeof Link>) {
  const locale = localeFromPathname(usePathname());
  const localizedHref = typeof href === 'string' && href.startsWith('/product/')
    ? withLocalePath(href, locale)
    : href;
  return <Link {...props} href={localizedHref} />;
}

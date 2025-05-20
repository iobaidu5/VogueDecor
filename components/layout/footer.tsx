'use client';

import Link from 'next/link';
import FooterMenu from 'components/layout/footer-menu';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import { Suspense } from 'react';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `‑${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
  const menu = await getMenu('next-js-frontend-footer-menu');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      {/* Top Section */}
      <div className="mx-auto w-full max-w-7xl border-t border-neutral-200 px-6 py-10 dark:border-neutral-700">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 text-black dark:text-white"
            >
              <LogoSquare size="sm" />
              <span className="uppercase font-semibold">{SITE_NAME}</span>
            </Link>
          </div>

          {/* Menu */}
          <Suspense
            fallback={
              <div className="flex w-full max-w-xs flex-col gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className={skeleton} />
                ))}
              </div>
            }
          >
            <div className="w-full md:flex-1">
              <FooterMenu menu={menu} />
            </div>
          </Suspense>

          {/* Deploy Button */}
          <div className="flex justify-center md:justify-end w-full md:w-auto">
            <a
              href="https://vercel.com/templates/next.js/nextjs-commerce"
              aria-label="Deploy on Vercel"
              className="flex items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-xs font-medium text-black transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-black dark:text-white dark:hover:bg-neutral-900"
            >
              <span className="leading-none text-lg">▲</span>
              <span>Deploy</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-neutral-200 py-6 dark:border-neutral-700">
        <div className="mx-auto flex flex-col items-center gap-2 px-4 md:flex-row md:justify-between md:gap-0 md:px-0 max-w-7xl">
          <p className="text-center md:text-left">
            &copy; {copyrightDate}{' '}
            <span className="font-medium">{copyrightName}</span>
            {!copyrightName.endsWith('.') && '.'} All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/vercel/commerce"
              className="hover:underline"
            >
              View the source
            </Link>
            <span className="hidden md:inline-block">|</span>
            <Link
              href="https://vercel.com"
              className="font-medium text-black dark:text-white hover:underline"
            >
              Created by ▲ Vercel
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

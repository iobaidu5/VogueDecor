'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

import CurrencySwitcher from 'components/currency/CurrencySwitcher';
import LanguageSwitcher from 'components/LanguageSwitcher';
import logo from 'media/png/Adobe Express - file.png';
import { localeFromPathname, withLocalePath, withSpanishPath } from '../../lib/locale-path';

const Drawer = ({ menu, open = false, onClose }) => {
  const { t } = useTranslation('common');
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);

  const closeMenu = () => onClose?.();

  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        onClick={closeMenu}
        className={`fixed inset-0 z-[9998] bg-black/45 backdrop-blur-[1px] transition-opacity duration-300 lg991:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!open}
        inert={!open}
        className={`fixed left-0 top-0 z-[9999] flex h-dvh w-[min(88vw,360px)] flex-col bg-white text-black shadow-[20px_0_60px_rgba(0,0,0,0.16)] transition-transform duration-300 ease-out lg991:hidden ${
          open ? 'translate-x-0' : 'pointer-events-none -translate-x-full'
        }`}
      >
        <div className="flex h-[74px] shrink-0 items-center justify-between border-b border-neutral-200 px-5">
          <Link href={withLocalePath('/', locale)} onClick={closeMenu} aria-label="Vogue Decor home">
            <Image src={logo} alt="Vogue Decor" className="h-auto w-[108px]" priority />
          </Link>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-black"
          >
            <IoIosCloseCircleOutline size={29} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-5">
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {menu?.map((item) => {
              let cleanPath = item.path;
              try {
                cleanPath = new URL(item.path).pathname;
              } catch {
                cleanPath = item.path;
              }
              const href = withLocalePath(cleanPath, locale);

              return (
                <Link
                  key={item.path}
                  href={href}
                  onClick={closeMenu}
                  className={`flex min-h-12 items-center justify-between py-3 text-[13px] font-medium uppercase tracking-[0.04em] transition-colors hover:text-neutral-500 ${
                    item.title === 'Sale' ? 'text-[#7d0709]' : 'text-black'
                  }`}
                >
                  <span>{t(`menu.${item.title}`)}</span>
                  <span aria-hidden="true" className="text-base font-light text-neutral-400">
                    ›
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <Link
              href={withSpanishPath('/clearance', locale)}
              onClick={closeMenu}
              className="flex min-h-11 items-center justify-center bg-[#ffed00] px-3 text-center text-[11px] font-semibold uppercase tracking-[0.04em] text-black transition-opacity hover:opacity-80"
            >
              {t('menu.Clearance')}
            </Link>
            <Link
              href={withLocalePath('/bundles', locale)}
              onClick={closeMenu}
              className="flex min-h-11 items-center justify-center border border-neutral-300 px-3 text-center text-[11px] font-semibold uppercase tracking-[0.04em] text-black transition-colors hover:border-black"
            >
              {t('menu.Bundles')}
            </Link>
            <Link
              href={withLocalePath('/financing', locale)}
              onClick={closeMenu}
              className="col-span-2 flex min-h-11 items-center justify-center border border-neutral-300 px-3 text-center text-[11px] font-semibold uppercase tracking-[0.04em] text-black transition-colors hover:border-black"
            >
              {t('menu.Financing')}
            </Link>
          </div>

          <div className="mt-7 border-t border-neutral-200 pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-neutral-500">{t('myAccount')}</p>
            <Link
              href="/login"
              onClick={closeMenu}
              className="mt-3 inline-flex text-[12px] font-semibold uppercase tracking-[0.04em] text-black underline underline-offset-4"
            >
              {t('loginSignup')}
            </Link>
          </div>
        </nav>

        <div className="flex shrink-0 items-center justify-between border-t border-neutral-200 bg-neutral-50 px-5 py-4">
          <LanguageSwitcher />
          <CurrencySwitcher />
        </div>
      </aside>
    </>
  );
};

export default Drawer;

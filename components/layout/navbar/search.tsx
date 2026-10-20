'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Form from 'next/form';
import { usePathname, useSearchParams } from 'next/navigation';
import i18n from 'lib/i18nClient';
import { useTranslation } from 'react-i18next';
import { localeFromPathname, withSpanishPath } from 'lib/locale-path';

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const { t } = useTranslation('common');
  const placeholder = i18n.language === 'es' ? t('spanish.searchProducts') : 'Search for products...';

  return (
    <Form action={withSpanishPath('/search', locale)} className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        key={searchParams?.get('q')}
        type="text"
        name="q"
        placeholder={placeholder}
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        className="text-md w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </Form>
  );
}

export function SearchSkeleton() {
  const { t } = useTranslation('common');
  const placeholder = i18n.language === 'es' ? t('spanish.searchProducts') : 'Search for products...';

  return (
    <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        placeholder={placeholder}
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}

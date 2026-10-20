'use client';

import { createUrl } from "../lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from 'react-i18next';
import { localeFromPathname, withSpanishPath } from '../lib/locale-path';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const { t } = useTranslation('common');

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const searchInput = form.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (searchInput.value) {
      newParams.set("q", searchInput.value);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl(withSpanishPath('/search', locale), newParams));
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-full relative">
      <input
        key={searchParams?.get("q")}
        type="text"
        name="search"
        placeholder={t('search')}
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className="w-full rounded-lg bg-white px-4 py-2 text-black placeholder:text-black md:text-sm dark:bg-transparent dark:text-black dark:placeholder:text-black"
      />
    </form>
  );
}

export function SearchSkeleton() {
  const { t } = useTranslation('common');

  return (
    <form className="w-full max-w-full relative z-[1000]">
      <input
        type="text"
        placeholder={t('search')}
        className="w-full rounded-lg bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
    </form>
  );
}

'use client';

import { ECONOLEASE_APPLY_URL } from 'lib/econolease';
import '../lib/i18nClient';
import { useTranslation } from 'react-i18next';

export default function EconoLeaseFinanceEmbed() {
  const { t } = useTranslation('common');

  return (
    <section className="mx-auto flex min-h-[520px] max-w-4xl items-center px-6 py-16">
      <div className="w-full rounded-2xl bg-neutral-50 px-6 py-12 text-center shadow-sm md:px-14">
        <h1 className="text-3xl font-medium text-neutral-900 md:text-4xl">
          {t('financingPage.title')}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-600">
          {t('financingPage.description')}
        </p>
        <a
          href={ECONOLEASE_APPLY_URL}
          className="mt-8 inline-flex rounded-full bg-black px-8 py-3 font-medium text-white transition-colors hover:bg-neutral-700"
        >
          {t('financingPage.button')}
        </a>
        <p className="mt-4 text-sm text-neutral-500">{t('financingPage.disclaimer')}</p>
      </div>
    </section>
  );
}

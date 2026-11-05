'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import LegalDocument from './LegalDocument';
import { LegalPolicyKey, LegalPolicySet } from './types';

const copy = {
  en: {
    home: 'Home',
    page: 'Policies',
    tabs: { terms: 'Terms & Conditions', privacy: 'Privacy Policy', shipping: 'Shipping Policy', returns: 'Return & Refund Policy' },
  },
  fr: {
    home: 'Accueil',
    page: 'Politiques',
    tabs: { terms: 'Conditions générales', privacy: 'Politique de confidentialité', shipping: 'Politique d’expédition', returns: 'Politique de retour et de remboursement' },
  },
  es: {
    home: 'Inicio',
    page: 'Políticas',
    tabs: { terms: 'Términos y condiciones', privacy: 'Política de privacidad', shipping: 'Política de envíos', returns: 'Política de devoluciones y reembolsos' },
  },
} as const;

const policyKeys: LegalPolicyKey[] = ['terms', 'privacy', 'shipping', 'returns'];

export default function LegalPoliciesPage({
  locale,
  policies,
}: {
  locale: keyof typeof copy;
  policies: LegalPolicySet;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const requestedTab = searchParams.get('tab') as LegalPolicyKey | null;
  const activeTab = requestedTab && policyKeys.includes(requestedTab) ? requestedTab : 'terms';
  const labels = copy[locale];
  const homeHref = locale === 'en' ? '/' : `/${locale}`;

  return (
    <div className="min-h-screen bg-white px-4 pb-16 pt-10 text-[#111111] sm:px-6 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1120px]">
        <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-2 text-[10px] uppercase tracking-[0.04em] text-neutral-500 sm:text-[11px]">
          <Link href={homeHref} className="hover:text-black hover:underline">
            {labels.home}
          </Link>
          <span aria-hidden="true">/</span>
          <span>{labels.page}</span>
        </nav>

        <div
          role="tablist"
          aria-label={labels.page}
          className="mb-8 flex gap-x-6 gap-y-2 overflow-x-auto border-b border-neutral-300 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {policyKeys.map((key) => {
            const active = key === activeTab;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => router.push(`${pathname}?tab=${key}`)}
                className={`shrink-0 border-b-2 px-0.5 pb-2 text-[10px] font-semibold uppercase tracking-[0.04em] transition-colors sm:text-[11px] ${
                  active ? 'border-black text-black' : 'border-transparent text-neutral-500 hover:text-black'
                }`}
              >
                {labels.tabs[key]}
              </button>
            );
          })}
        </div>

        <LegalDocument policy={policies[activeTab]} />
      </div>
    </div>
  );
}

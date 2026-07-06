'use client';

import { buildEconoLeaseEmbedUrl, type EconoLeaseFinanceMode } from 'lib/econolease';
import { useMemo } from 'react';
import '../lib/i18nClient';
import { useTranslation } from 'react-i18next';

type EconoLeaseFinanceEmbedProps = {
  amount?: string | null;
  mode?: EconoLeaseFinanceMode;
};

export default function EconoLeaseFinanceEmbed({
  amount,
  mode = 'all',
}: EconoLeaseFinanceEmbedProps) {
  const { i18n } = useTranslation('common');

  const embedUrl = useMemo(
    () =>
      buildEconoLeaseEmbedUrl({
        locale: i18n.language,
        mode,
        amount,
      }),
    [amount, i18n.language, mode],
  );

  return (
    <iframe
      id="efs_object"
      title="EconoLease equipment financing"
      src={embedUrl}
      className="min-h-[700px] w-full border-0"
      style={{ width: '100%', minHeight: '700px', border: 'none' }}
      loading="lazy"
    />
  );
}

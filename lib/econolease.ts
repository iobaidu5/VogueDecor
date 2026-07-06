export const ECONOLEASE_APPLY_URL =
  'https://go.econolease.com/vogue-decor-toronto/apply';

export const ECONOLEASE_EMBED_BASE_URL =
  'https://apps.econolease.com/calculator/efscalculator';

export type EconoLeaseFinanceMode = 'all' | 'rent-try-buy';

type BuildEconoLeaseEmbedUrlOptions = {
  locale?: string;
  mode?: EconoLeaseFinanceMode;
  amount?: string | number | null;
  applyUrl?: string;
  brandColor?: string;
};

function normalizeLocale(locale?: string): 'en-ca' | 'fr-ca' {
  return locale?.startsWith('fr') ? 'fr-ca' : 'en-ca';
}

export function buildEconoLeaseEmbedUrl({
  locale = 'en',
  mode = 'all',
  amount,
  applyUrl = ECONOLEASE_APPLY_URL,
  brandColor = '05E5C8',
}: BuildEconoLeaseEmbedUrlOptions = {}): string {
  const params = new URLSearchParams({
    lang: normalizeLocale(locale),
    lease: 'true',
    rental: 'true',
    apply: 'true',
    'apply-link': applyUrl,
    color: brandColor.replace('#', ''),
    init: mode === 'rent-try-buy' ? 'rental' : 'lease',
  });

  if (mode === 'all') {
    params.set('loan', 'true');
  }

  if (amount != null && amount !== '') {
    params.set('amount', String(amount));
  }

  return `${ECONOLEASE_EMBED_BASE_URL}?${params.toString()}`;
}

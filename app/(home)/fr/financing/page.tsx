import EconoLeaseFinanceEmbed from 'components/EconoLeaseFinanceEmbed';
import { getBaseUrl } from 'lib/site-url';

export const metadata = {
  title: 'Financement | Vogue Decor',
  description:
    'Découvrez les options de financement EconoLease flexibles pour le mobilier de restaurant Vogue Decor, incluant Location-Essai-Achat et location.',
  alternates: {
    canonical: `${getBaseUrl()}/fr/financing`,
  },
};

type FinancingPageProps = {
  searchParams: Promise<{ amount?: string; mode?: string }>;
};

export default async function FrenchFinancingPage({ searchParams }: FinancingPageProps) {
  const params = await searchParams;
  const amount = params.amount ?? null;
  const mode = params.mode === 'rent-try-buy' ? 'rent-try-buy' : 'all';

  return <EconoLeaseFinanceEmbed amount={amount} mode={mode} />;
}

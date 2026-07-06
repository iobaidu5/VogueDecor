import EconoLeaseFinanceEmbed from 'components/EconoLeaseFinanceEmbed';
import { getBaseUrl } from 'lib/site-url';

export const metadata = {
  title: 'Financing | Vogue Decor',
  description:
    'Explore flexible EconoLease financing options for Vogue Decor restaurant furniture, including Rent-Try-Buy and lease solutions.',
  alternates: {
    canonical: `${getBaseUrl()}/financing`,
  },
};

type FinancingPageProps = {
  searchParams: Promise<{ amount?: string; mode?: string }>;
};

export default async function FinancingPage({ searchParams }: FinancingPageProps) {
  const params = await searchParams;
  const amount = params.amount ?? null;
  const mode = params.mode === 'rent-try-buy' ? 'rent-try-buy' : 'all';

  return <EconoLeaseFinanceEmbed amount={amount} mode={mode} />;
}

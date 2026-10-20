import EconoLeaseFinanceEmbed from 'components/EconoLeaseFinanceEmbed';
import { getBaseUrl } from 'lib/site-url';

export const metadata = {
  title: 'Financiamiento | Vogue Decor',
  description:
    'Descubre las opciones flexibles de financiamiento de EconoLease para el mobiliario de tu restaurante, incluido el programa de alquiler con opción de compra.',
  alternates: {
    canonical: `${getBaseUrl()}/es/financing`,
  },
};

type FinancingPageProps = {
  searchParams: Promise<{ amount?: string; mode?: string }>;
};

export default async function SpanishFinancingPage({ searchParams }: FinancingPageProps) {
  const params = await searchParams;
  const amount = params.amount ?? null;
  const mode = params.mode === 'rent-try-buy' ? 'rent-try-buy' : 'all';

  return <EconoLeaseFinanceEmbed amount={amount} mode={mode} />;
}

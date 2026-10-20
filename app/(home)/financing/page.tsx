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

export default function FinancingPage() {
  return <EconoLeaseFinanceEmbed />;
}

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

export default function FrenchFinancingPage() {
  return <EconoLeaseFinanceEmbed />;
}

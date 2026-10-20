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

export default function SpanishFinancingPage() {
  return <EconoLeaseFinanceEmbed />;
}

import { getBaseUrl } from 'lib/site-url';

export const metadata = {
  title: 'Términos, privacidad y envíos | Vogue Decor',
  description: 'Consulta los términos de servicio, la política de privacidad y la política de envíos y devoluciones de Vogue Decor.',
  alternates: {
    canonical: `${getBaseUrl()}/es/terms-and-conditions`,
  },
};

export default function SpanishTermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

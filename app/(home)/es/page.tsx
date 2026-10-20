import CookieConsent from 'components/CookieConsent';
import MainPage from 'screens/home';
import { getBaseUrl } from 'lib/site-url';

export const metadata = {
  title: 'Vogue Decor – Sillas, mesas y mobiliario para restaurantes',
  description:
    'Descubre sillas, mesas, taburetes de bar y bases de mesa para restaurantes. Vogue Decor ofrece mobiliario comercial de calidad en Canadá y Estados Unidos.',
  alternates: {
    canonical: `${getBaseUrl()}/es`,
  },
};

export default function SpanishHome() {
  return (
    <>
      <MainPage />
      <CookieConsent />
    </>
  );
}

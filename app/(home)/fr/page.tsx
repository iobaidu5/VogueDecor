import CookieConsent from 'components/CookieConsent';
import MainPage from 'screens/home';
import { getBaseUrl } from 'lib/site-url';

export const metadata = {
  title: "Vogue Decor – Restaurant Chairs, Tables & Furniture",
  description: 'Shop restaurant chairs, tables, barstools & table bases. Vogue Decor delivers premium restaurant furniture across the USA & Canada.',
  alternates: {
    canonical: `${getBaseUrl()}/fr`,
  },
};

export default async function FrenchHome() {

  return (
    <>
      <MainPage />
      <CookieConsent />
    </>
  );
}

import CookieConsent from 'components/CookieConsent';
import { ProductProvider } from 'components/product/product-context';
import MainPage from 'screens/home/index';
export const metadata = {
  title: "Vogue Decor – Restaurant Chairs, Tables & Furniture",
  description: 'Shop restaurant chairs, tables, barstools & table bases. Vogue Decor delivers premium restaurant furniture across the USA & Canada.',
  openGraph: {
    type: 'website'
  },
  icons: {
    icon: './favicon.ico',
  },
};

export default function HomePage() {
  return <>
      <MainPage />
      <CookieConsent />
  </>;
}

import CookieConsent from 'components/CookieConsent';
import { ProductProvider } from 'components/product/product-context';
import MainPage from 'screens/home/index';
export const metadata = {
  description: 'High-performance ecommerce store',
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

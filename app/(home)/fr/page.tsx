import CookieConsent from 'components/CookieConsent';
import MainPage from 'screens/home';


export default async function FrenchHome() {

  return (
    <>
      <MainPage />
      <CookieConsent />
    </>
  );
}

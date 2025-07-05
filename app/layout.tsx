// app/[locale]/layout.tsx

import { Poppins } from 'next/font/google'
import { CartProvider } from 'components/cart/cart-context'
import { cookies } from 'next/headers'
import { getCart } from 'lib/shopify'
import { ReactNode } from 'react'
import './globals.css'
import { CurrencyProvider } from 'components/currency/currencyContext'
import CookieConsent from 'components/CookieConsent'
import EmailSubscriptionModal from 'components/EmailSubscriptionModal'
import { Toaster } from 'sonner'
import ChatbaseScript from 'components/ChatbaseScript'
import Script from 'next/script'
import { CollectionProvider } from 'lib/CollectionContext'
import GoogleTagManager from 'components/GoogleTag'

export const metadata = {
  description: 'High-performance ecommerce store',
  openGraph: {
    type: 'website'
  },
  icons: {
    icon: './favicon.ico',
  },
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { locale: string }
}) {
  const cartId = (await cookies()).get('cartId')?.value
  const cart = getCart(cartId)

  return (
    <html lang={params.locale} className={poppins.variable}>
      <head>
        <meta name="google-site-verification" content="3_4p_Iwcpg350S4xRemSlkguA-eA5_v8XkW8DF9Ebqw" />
        <link rel="icon" href="//favicon.ico" sizes="any" />

        <Script id="gtm" strategy="beforeInteractive">
          {`
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-PNZ7MNJM');
          `}
        </Script>


        <Script
          id="google-translate"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                {
                  pageLanguage: 'en',
                  includedLanguages: 'en,fr',
                  autoDisplay: false
                },
                'google_translate_element'
              );
            }
            window.googleTranslateElementInit = googleTranslateElementInit;
          `}
        </Script>
      </head>

      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PNZ7MNJM"
            height={0}
            width={0}
            style={{ display: 'none', visibility: 'hidden' }}
            title="GTM"
          />
        </noscript>
        <div id="google_translate_element" style={{ display: 'none' }} />


        <ChatbaseScript />
        <CartProvider cartPromise={cart}>
          <CurrencyProvider>
            <EmailSubscriptionModal />
            <CollectionProvider>
              <main>{children}</main>
            </CollectionProvider>
            <CookieConsent />
            <Toaster position="top-right" richColors />
          </CurrencyProvider>
        </CartProvider>
      </body>
    </html>
  )
}

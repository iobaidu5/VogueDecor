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
      <link rel="icon" href="//favicon.ico" sizes="any" />
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
        {/* ✅ Hidden div for Google Translate to attach */}
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

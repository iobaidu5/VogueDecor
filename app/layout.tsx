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
// import { Providers } from 'components/Providers';
import ChatbaseScript from 'components/ChatbaseScript'

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

  // let messages
  // try {
  //   messages = (await import(`../messages/${params.locale}.json`)).default
  // } catch {
  //   messages = (await import(`../messages/en.json`)).default
  // }

  return (
    <html lang="en" className={poppins.variable}>
      <body>
        {/* <Providers locale={params.locale} messages={messages}> */}
        <ChatbaseScript />
          <CartProvider cartPromise={cart}>
            <CurrencyProvider>
            <EmailSubscriptionModal />
              <main>{children}</main>
              <CookieConsent />
              <Toaster position="top-right" richColors />
            </CurrencyProvider>
          </CartProvider>
        {/* </Providers> */}
      </body>
    </html>
  )
}

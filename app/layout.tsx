// app/layout.tsx
import { Poppins } from 'next/font/google'
import { CartProvider } from 'components/cart/cart-context'
import { cookies } from 'next/headers'
import { getCart } from 'lib/shopify'
import { ReactNode } from 'react'
import './globals.css'

// ✅ Just declare poppins – do NOT export it
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cartId = (await cookies()).get('cartId')?.value
  const cart = getCart(cartId)

  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <CartProvider cartPromise={cart}>
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  )
}

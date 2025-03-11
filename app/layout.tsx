import { Poppins } from 'next/font/google';
import { CartProvider } from 'components/cart/cart-context';
import { cookies } from 'next/headers';
import { getCart } from 'lib/shopify';
import { ReactNode } from 'react';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'] // Adjust as necessary
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cartId = (await cookies()).get('cartId')?.value;
  const cart = getCart(cartId);
  return (
    <html lang="en">
      <body className={poppins.className}>
        <CartProvider cartPromise={cart}>
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}

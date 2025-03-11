import Footer from 'components/footer';
import Header from 'components/Header/index';
import { ReactNode } from 'react';

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="absolute top-0 z-10 w-full">
        <Header />
      </div>
      <main>{children}</main>
      <div className="">
        <Footer />
      </div>
    </>
  );
}

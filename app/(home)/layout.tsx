import { AnnouncementBar } from 'components/AnnouncementBar';
import { SaleBar } from 'components/SaleBar';
import Footer from 'components/footer';
import HeaderWrapper from 'components/Header/HeaderWrapper';
import { ReactNode, Suspense } from 'react';
import '../../lib/i18n';

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="">
        <Suspense fallback={<div>Loading translations...</div>}>
          <SaleBar />
          {/* <AnnouncementBar /> */}
        </Suspense>
        <HeaderWrapper />
      </div>
      <main>{children}</main>
      <div className="">
        <Footer />
      </div>
    </>
  );
}

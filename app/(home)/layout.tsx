import { AnnouncementBar } from 'components/AnnouncementBar';
import Footer from 'components/footer';
import HeaderWrapper from 'components/Header/HeaderWrapper';
import { ReactNode } from 'react';

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="">
        <AnnouncementBar />
        <HeaderWrapper />
      </div>
      <main>{children}</main>
      <div className="">
        <Footer />
      </div>
    </>
  );
}

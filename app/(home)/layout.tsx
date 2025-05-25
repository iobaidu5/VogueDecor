import { AnnouncementBar } from 'components/AnnouncementBar';
import Footer from 'components/footer';
import HeaderWrapper from 'components/Header/HeaderWrapper';
import { ReactNode } from 'react';

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="absolute top-0 z-10 w-full">
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

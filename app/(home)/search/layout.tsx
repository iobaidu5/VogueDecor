import Footer from 'components/layout/footer';
import Collections from 'components/layout/search/collections';
import FilterList from 'components/layout/search/filter';
import { sorting } from 'lib/constants';
import ChildrenWrapper from './children-wrapper';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mx-auto flex flex-col gap-8 pb-4 text-black xs:px-[15px] xs:py-[0px] md:flex-row md:px-[100px] md:px-[60px] md:py-[0px] dark:text-white">
        {/* <div className="order-first w-full flex-none md:max-w-[125px]">
          <Collections />
        </div> */}
        <div className="order-last min-h-screen w-full md:order-none">
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </div>
        {/* <div className="order-none flex-none md:order-last md:w-[125px]">
          <FilterList list={sorting} title="Sort by" />
        </div> */}
      </div>
      {/* <Footer /> */}
    </>
  );
}

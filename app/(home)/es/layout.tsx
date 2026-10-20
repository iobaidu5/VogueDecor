import ChildrenWrapper from './children-wrapper';

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex flex-col gap-8 pb-4 text-black xs:py-[0px] md:flex-row md:py-[0px] dark:text-white">
      <div className="order-last min-h-screen w-full md:order-none">
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </div>
    </div>
  );
}

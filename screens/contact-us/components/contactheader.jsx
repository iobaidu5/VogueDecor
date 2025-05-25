import Link from 'next/link';

const ContactHeader = () => {
  return (
    <div className="mb-6 flex flex-col gap-3">
      <div className="flex w-full items-center space-x-2 text-[12px] mt-20">
        <Link href="/" className="text-gray-500 hover:underline">
          Home
        </Link>
        <span className="text-gray-500 hover:underline"> / </span>
        <span className="capitalize text-gray-500">Contact Us</span>
      </div>

      <h2 className="text-[28px] font-medium lg:text-[53px] mt-4 lg:mt-0">Contact us.</h2>

      <div className="flex mt-0 lg:mt-0 flex-col gap-2 text-[14px] font-medium xl:text-[16px]">
        <p>Have a question?</p>

        <div className="w-full">
          <p className="block sm:inline">{'We’re here to help. Fill out the form below and we’ll'}</p>
          <p className="block sm:inline">{'get back to you shortly.'}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;
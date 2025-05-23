import Link from 'next/link';

const ContactHeader = () => {
  return (
    <div className="mb-6 flex flex-col gap-3">
    <div className="flex w-full items-center space-x-2 text-[15px] mt-20">
      <Link href="/" className="text-gray-500 hover:underline">
        Home
      </Link>
      <span className="text-gray-500 hover:underline"> / </span>
      <span className="capitalize text-gray-500">Contact Us</span>
    </div>

      <h2 className="text-[28px] font-medium lg:text-[53px]">Contact us.</h2>

      <div className="flex flex-col gap-2 text-[14px] font-medium xl:text-[16px]">
        <p>Have a question?</p>
        <p>We’re here to help. Fill out the form below and we’ll get back to you shortly.</p>
      </div>
    </div>
  );
};

export default ContactHeader;
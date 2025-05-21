
import Link from 'next/link';

const ContactHeader = () => {
  return (
    <div className="mb-6 flex flex-col gap-3">
      <div className="flex min-w-fit max-w-[170px] items-center space-x-2 rounded-[90px] border p-[14px] px-[25px] text-[12px]">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span>{'>'}</span>
        <span className="font-[500]">Contact us</span>
      </div>

      <h2 className="text-[53px] font-medium">Contact us.</h2>

      <div className="flex flex-col gap-2 text-[16px] font-medium">
        <p>Have a question?</p>
        <p>We’re here to help. Fill out the form below and we’ll get back to you shortly.</p>
      </div>
    </div>
  );
};

export default ContactHeader;

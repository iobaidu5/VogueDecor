import logo from 'media/png/whiteLogo.png';
import fb from 'media/svg/fb.svg';
import insta from 'media/svg/insta.svg';
import pintrist from 'media/svg/pintrist.svg';
import Image from 'next/image';
import Link from 'next/link';

const furniture: object = [
  'Furniture',
  'Chairs',
  'Barstools',
  'Outdoor-furniture',
  'Table-Bases',
  'Booth'
];
const quikLinks: object = ['Quick Links', 'Home', 'About', 'Products'];
const locations: object = ['Locations', 'Montreal'];

const Footer = () => {
  return (
    <>
      <div className="bg-black px-[20px] py-3 xs:mx-0 md:mx-[50px] lg:hidden">
        <StayUpdated />
      </div>
      <div className="mx-0 flex h-[385px] flex-col bg-black text-white xs:px-[20px] xs:pt-[30px] sm:mx-0 md:mx-[50px] md:px-[50px] md:pt-[98px] lg:mx-[70px] lg:px-[60px] xl:px-[70px]">
        <div className="flex xs:justify-start xs:space-x-2 md:justify-around md:space-x-0">
          <Logo />
          <FooterLinks links={furniture} />
          <FooterLinks links={quikLinks} isQuick />
          <FooterLinks links={locations} />
          <Connects />
          <div className="hidden lg:block">
            <StayUpdated />
          </div>
        </div>

        <div className="mt-[55px] h-[1px] w-full bg-white" />
        <div className="flex flex-col items-center justify-between gap-4 py-4 md:flex-row">
          {/* Left Section */}
          <div className="flex flex-col items-center space-y-2 text-[12px] text-white md:flex-row md:space-x-4 md:space-y-0">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms and Conditions
            </Link>
            <p className="hover:underline">Shipping and Return Policy</p>
          </div>

          {/* Right Section */}
          <p className="text-center text-[12px] text-white md:text-right">
            © {new Date().getFullYear()} VOGUE DECOR. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;

const Logo = () => {
  return (
    <div className="hidden sm:block">
      <Image src={logo} alt="logo" className="sm:w-[120px] xl:w-auto" />
      <div className="mt-[17px] flex flex-col space-y-2">
        <p className="text-sm">+1 (888) 880 8232</p>
        <p className="text-sm">Info@voguedecor.com</p>
      </div>
    </div>
  );
};

const FooterLinks = ({ links }: any) => {
  return (
    <div className="flex flex-col space-y-2">
      {links.map((link: string, index: number) =>
        index === 0 ? (
          <p key={link} className="xs:text-[14px] md:text-[16px]">
            {link}
          </p>
        ) : (
          <Link key={link} href={`/search/${link.toLowerCase()}`} className="text-[13px]">
            {link}
          </Link>
        )
      )}
    </div>
  );
};

const Connects = () => {
  return (
    <div className="flex flex-col space-y-2">
      <p className="xs:text-[14px] md:text-[16px]">Connects</p>
      <div className="flex items-center space-x-2">
        <Image src={insta} alt="insta" />
        <Image src={fb} alt="fb" />
        <Image src={pintrist} alt="pintrest" />
      </div>
    </div>
  );
};

const StayUpdated = () => {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-2 xs:mt-2 md:max-w-md">
      <p className="text-center text-lg font-medium md:text-left">Stay Updated</p>
      <div className="flex items-center overflow-hidden rounded-md border border-gray-400">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full min-w-0 flex-1 bg-transparent px-4 py-2 outline-none"
        />
        <button className="whitespace-nowrap bg-white px-4 py-2 font-medium text-black">
          Subscribe
        </button>
      </div>
      <p className="mt-3 text-center text-sm text-gray-500 md:text-left">
        Stay updated! Subscribe to our newsletter for exclusive offers,{' '}
        <br className="hidden md:block" /> latest trends, and design inspiration.
      </p>
    </div>
  );
};

import { getMenu } from 'lib/shopify';
import logo from 'media/png/logo.png';
import searchIcon from 'media/svg/searchIcon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoIosCloseCircleOutline } from 'react-icons/io';

function SignupButton() {
  return (
    <Link href="/signup" className="hidden md:block">
      <button className="flex items-center justify-center rounded-[3px] bg-[#D9222A] text-white xs:h-[32px] xs:w-[80px] md:h-[38px] md:w-[95px]">
        Sign up
      </button>
    </Link>
  );
}

const Header = async () => {
  const menu = await getMenu('main-menu');

  return (
    <nav className="relative flex h-[85px] w-full items-center justify-between px-6 md:px-[40px] lg:px-[70px]">
      {/* Logo */}
      <Link href="/">
        <Image src={logo} alt="logo" className="xs:w-[100px] md:w-[120px] lg:w-[140px]" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden items-center space-x-8 lg:flex">
        {menu?.map((item) => (
          <Link
            key={item?.path}
            href={item?.path}
            prefetch={true}
            className="cursor-pointer text-[14px] capitalize text-black hover:scale-110"
          >
            {item?.title}
          </Link>
        ))}
      </div>

      {/* Right Section (Languages, Search, Signup) */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <p>EN</p>
          <div className="h-5 w-px bg-[#A0A0A0]" />
          <p>FR</p>
        </div>
        <Image src={searchIcon} alt="search" className="hidden h-5 w-5 cursor-pointer md:block" />
        <SignupButton />
      </div>

      {/* Mobile Menu Button */}
      <input type="checkbox" id="menu-toggle" className="peer hidden" />
      <label htmlFor="menu-toggle" className="cursor-pointer xs:mr-8 sm:mr-5 md:mr-0 lg:hidden">
        <RxHamburgerMenu size={24} />
      </label>

      {/* Mobile Drawer with Backdrop */}
      <div className="fixed inset-0 z-[40] hidden bg-black/50 peer-checked:block">
        <div className="fixed left-0 top-0 z-[9990] h-full w-[250px] bg-gray-100 p-6 shadow-lg">
          <label htmlFor="menu-toggle" className="absolute right-4 top-4 cursor-pointer">
            <IoIosCloseCircleOutline size={30} color="red" />
          </label>

          {/* Mobile Menu Links */}
          <div className="mt-10 flex flex-col space-y-4">
            {menu?.map((item) => (
              <Link
                key={item?.path}
                href={item?.path}
                className="text-[18px] font-medium text-black"
              >
                {item?.title}
              </Link>
            ))}
            <Link href="/signup" className="text-[16px] font-medium text-red-500">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Clickable Background to Close */}
        <label htmlFor="menu-toggle" className="absolute inset-0" />
      </div>
    </nav>
  );
};

export default Header;

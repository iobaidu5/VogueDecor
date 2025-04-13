import { getMenu } from 'lib/shopify';
import logo from 'media/png/logo.png';
import searchIcon from 'media/svg/searchIcon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import Drawer from 'components/drawer/index';

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

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <p>EN</p>
          <div className="h-5 w-px bg-[#A0A0A0]" />
          <p>FR</p>
        </div>
        <Image src={searchIcon} alt="search" className="hidden h-5 w-5 cursor-pointer md:block" />
        <SignupButton />
      </div>

      <Drawer menu={menu} />
    </nav>
  );
};

export default Header;

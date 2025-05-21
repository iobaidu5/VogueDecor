import { getMenu } from 'lib/shopify';
import logo from 'media/png/logo.png';
import searchIcon from 'media/svg/searchIcon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import Drawer from 'components/drawer/index';
import CurrencySwitcher from 'components/currency/CurrencySwitcher';
import UserMenu from 'components/UserMenu';

function SignupButton() {
  return (
    <Link href="/signup" className="hidden md:block">
      <button className="flex items-center justify-center rounded-md bg-black text-white xs:h-[36px] xs:w-[90px] md:h-[42px] md:w-[110px] font-medium tracking-wide transition-all duration-300 hover:bg-orange-600 hover:scale-105">
        Sign up
      </button>
    </Link>
  );
}

const Header = async () => {
  const menu = await getMenu('main-menu');

  return (
    <nav className="flex flex-col w-full px-6 md:px-[40px] lg:px-[70px]">
      {/* Top Row */}
      <div className="relative flex items-center justify-between pt-4">
        {/* Left: Currency Switcher */}
        <div className="flex items-center">
        <div className="h-5 w-px bg-[#A0A0A0] mr-1" />
            <p> FR</p>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              className="xs:w-[100px] md:w-[120px] lg:w-[140px] my-14"
            />
          </Link>
        </div>

        {/* Right: Search, UserMenu, Language Selector */}
        <div className="flex items-center space-x-4 mt-4">
          <Image
            src={searchIcon}
            alt="search"
            className="hidden h-5 w-5 cursor-pointer md:block hover:text-gray-500"
          />
          <UserMenu />
          <div className="flex items-center">
            <CurrencySwitcher />
          </div>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="mt-4 hidden items-center justify-center space-x-8 lg:flex">
        {menu?.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            prefetch={true}
            className={`
              cursor-pointer text-[14px] font-small capitalize hover:scale-110
              ${item.title === "Sale" ? "text-red-500" : "text-black"}
            `}
          >
            {item.title}
          </Link>
        ))}
      </div>

      {/* Drawer for mobile */}
      <Drawer menu={menu} />
    </nav>
  );
};

export default Header;
'use client';

import logo from 'media/png/logo-new.png';
import searchIcon from 'media/svg/searchIcon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import Drawer from 'components/drawer/index';
import CurrencySwitcher from 'components/currency/CurrencySwitcher';
import UserMenu from 'components/UserMenu';
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignupButton() {
  return (
    <Link href="/signup" className="hidden md:block">
      <button className="flex items-center justify-center rounded-md bg-black text-white xs:h-[36px] xs:w-[90px] md:h-[42px] md:w-[110px] font-medium tracking-wide transition-all duration-300 hover:bg-orange-600 hover:scale-105">
        Sign up
      </button>
    </Link>
  );
}

const Header = ({ menu }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      const formattedLink = searchText.toLowerCase().replace(/\s+/g, "-");
      router.push(`/search/${formattedLink}`);
      setSearchText("");
      setShowSearch(false);
    }
  };

  return (
    <nav className="flex flex-col w-full px-6 md:px-[40px] lg:px-[70px]">
      {/* Top Row */}
      <div className="relative flex items-center justify-between pt-4">
        <div className="hidden lg991:flex items-center">
          <p>FR</p>
          <div className="h-5 w-px bg-[#A0A0A0] ml-2" />
          <CurrencySwitcher />
        </div>

        <div className="absolute left-1/2  -translate-x-1/2">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              className="lg991:my-14 mt-8 w-[100px] md:w-[120px] lg:w-[140px]"
            />
          </Link>
        </div>

        {/* Search + User */}
        <div className="hidden lg991:flex items-center space-x-4 mt-4">
          <div className="relative">
            <Image
              src={searchIcon}
              alt="search"
              onClick={() => setShowSearch((prev) => !prev)}
              className="h-5 w-5 cursor-pointer md:block hover:text-gray-500"
            />

{showSearch && (
  <form
    onSubmit={handleSearchSubmit}
    className="absolute top-10 right-0 bg-white border border-gray-300 shadow-xl rounded-lg flex items-center px-3 py-2 z-50 w-64"
  >
    <input
      type="text"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      placeholder="Search..."
      className="flex-grow px-3 py-1 text-sm text-gray-800 placeholder-gray-400 border-none focus:outline-none"
    />
    <button
      type="submit"
      className="ml-2 px-4 py-1.5 text-sm font-semibold text-white bg-black rounded-md hover:bg-gray-800 transition duration-200"
    >
      Go
    </button>
  </form>
)}

          </div>
          <UserMenu />
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="mt-8 hidden items-center justify-center space-x-14 lg:flex">
        {menu?.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            prefetch={true}
            className={`
              cursor-pointer text-[14px] font-small capitalize hover:scale-110
              ${item.title === 'Sale' ? 'text-red-500' : 'text-black'}
            `}
          >
            {item.title}
          </Link>
        ))}
      </div>

      <Drawer menu={menu} />
    </nav>
  );
};

export default Header;

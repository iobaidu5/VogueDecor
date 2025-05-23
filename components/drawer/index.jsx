'use client';

import { useState } from 'react';

import { RxHamburgerMenu } from 'react-icons/rx';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Link from 'next/link';
import CurrencySwitcher from 'components/currency/CurrencySwitcher';
import Image from 'next/image';
import searchIcon from 'media/svg/searchIcon.svg';

const Drawer = ({ menu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const handleNavigation = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Menu Icon */}
      <button
        onClick={toggleDrawer}
        className="cursor-pointer xs:mr-12 md:mr-6 lg:hidden"
        aria-label="Open menu"
      >
        <RxHamburgerMenu size={22} />
      </button>

      {/* Drawer Overlay */}
      {isOpen && <div className="fixed inset-0 z-50 bg-black/50" onClick={toggleDrawer} />}

      {/* Drawer Menu */}
      <div
        className={`fixed left-0 top-0 z-50 flex h-full w-60 flex-col justify-between bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top part with close button and navigation links */}
        <div>
          {/* Close Button */}
          <button
            className="absolute right-4 top-4 cursor-pointer"
            onClick={toggleDrawer}
            aria-label="Close menu"
          >
            <IoIosCloseCircleOutline size={30} color="red" />
          </button>

          {/* Navigation Links */}
          <nav className="mt-10 flex flex-col space-y-4 p-4">
            {menu?.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-left text-lg font-medium text-gray-800 hover:text-gray-500"
                onClick={() => handleNavigation(item.path)}
              >
                {item.title}
              </Link>
            ))}

            {/* Sign Up Link */}
            <button
              className="text-left text-lg font-medium text-red-500"
              onClick={() => handleNavigation('/login')}
            >
              Login
            </button>
          </nav>
        </div>

        {/* Bottom fixed section */}
        <div className="flex items-center justify-between border-t border-gray-200 p-4">
          <p className="text-lg font-medium">FR</p>
          <div className="flex items-center space-x-3">
            <CurrencySwitcher />

            <Image
              src={searchIcon}
              alt="search"
              className="h-5 w-5 cursor-pointer hover:text-gray-500"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Drawer;

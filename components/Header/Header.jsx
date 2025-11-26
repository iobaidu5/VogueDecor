'use client';

import logo from 'media/png/Adobe Express - file.png';
import searchIcon from 'media/svg/searchIcon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import Drawer from 'components/drawer/index';
import CurrencySwitcher from 'components/currency/CurrencySwitcher';
import UserMenu from 'components/UserMenu';
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Search from 'components/Search';
import LanguageSwitcher from 'components/LanguageSwitcher';
import i18n from '../../lib/i18nClient';
import { useTranslation } from 'react-i18next';
import GoogleTranslateScript from 'components/GoogleTranslateScript';

// import your CartModal (contains the dialog and logic)
import CartModal from 'components/cart/modal';

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
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { t, ready } = useTranslation('common');
  var currentLang = i18n.language;
  const pathname = usePathname();


  console.log("menu 0 ", menu)

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      const formattedLink = searchText.toLowerCase().replace(/\s+/g, "-");
      router.push(`/${formattedLink}`);
      setSearchText("");
      setShowSearch(false);
    }
  };

  useEffect(() => {
    currentLang = pathname.startsWith('/fr') ? "fr" : "en";
    i18n.changeLanguage(currentLang);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 990);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // run initially

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`z-[999] w-full px-6 md:px-[40px] lg:px-[70px] transition-all duration-300 ${isSticky
        ? `fixed top-0 bg-white shadow-md py-0 ${isMobile ? "h-14" : ""}`
        : "relative bg-transparent"
        }`}
    >
      {/* Top Row */}
      <div className={`relative flex items-center justify-between  ${isSticky ? "pt-2" : "pt-4"}`}>
        <div className="hidden lg991:flex items-center">
          <LanguageSwitcher />
          <GoogleTranslateScript />
          <div className="h-5 w-px bg-[#A0A0A0] ml-2" />
          <CurrencySwitcher />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <Link
            href={pathname.startsWith("/fr") ? "/fr" : `/`}
            passHref
            legacyBehavior
          >
            <Image
              src={logo}
              alt="logo"
              className="lg991:my-14 -mb-6 md:mb-0 mt-4 md:mt-4 md:mt-8 w-[100px] md:w-[120px] lg:w-[140px] cursor-pointer"
            />
          </Link>
        </div>

        <div className="absolute z50 right-10 md:right-8 top-2 md:top-0 lg:relative md:flex items-center space-x-4 mt-4">
          <div className="relative">
            <Image
              src={searchIcon}
              alt="search"
              onClick={() => setShowSearch((prev) => !prev)}
              className="h-5 w-5 cursor-pointer hover:text-gray-500 z-20 relative"
            />

            <div
              className={`absolute top-14 z-50000000 xl:top-12 right-0 lg:-left-40 bg-white border-b border-b-black rounded shadow-lg w-72 p-1 transform transition-all duration-300 ease-in-out ${showSearch ? 'opacity-100 z-50 scale-100 visible' : 'opacity-0 scale-95 invisible'
                }`}
            >
              <Search />
            </div>
          </div>

          {/* User Menu */}
          <div className='hidden lg991:flex'><UserMenu /></div>

          {/* Cart Icon + Modal */}
          <CartModal />
        </div>
      </div>

      {/* Navigation menu */}
      <div className="my-8 hidden items-center justify-center space-x-14 lg:flex">
  {!ready ? (
    <div>Loading translations...</div>
  ) : (
    menu?.map((item) => {
      // Extract clean internal path
      let cleanPath = item.path;

      try {
        const url = new URL(item.path);
        cleanPath = url.pathname; // e.g. "/chairs"
      } catch (e) {
        // item.path was already a relative path, no change needed
      }

      // Apply language prefix
      const finalHref =
        currentLang === "fr"
          ? cleanPath.startsWith("/fr") ? cleanPath : `/fr${cleanPath}`
          : cleanPath;

      return (
        <Link
          key={item.path}
          href={finalHref}
          prefetch={true}
          className={`
            cursor-pointer text-[14px] font-small capitalize hover:scale-110
            ${item.title === "Sale" ? "text-[#cbcf67]" : "text-black"}
          `}
        >
          {t(`menu.${item.title}`)}
        </Link>
      );
    })
  )}

  <Link
    key="clearance"
    href="/clearance"
    prefetch={true}
    className={`
      cursor-pointer text-[14px] capitalize hover:scale-110 
      text-grey-500 bg-[#ffed00] px-3 py-1 rounded-full transition-transform duration-200
    `}
  >
    {t(`menu.Clearance`)}
  </Link>

  <Link
    key="bundles"
    href="/bundles"
    prefetch={true}
    className={`
      cursor-pointer text-[14px] font-small capitalize hover:scale-110 text-gray-500'
    `}
  >
    {t(`menu.Bundles`)}
  </Link>
</div>


      <Drawer menu={menu} />
    </nav>
  );
};

export default Header;

'use client';

import logo from 'media/png/Adobe Express - file.png';
import searchIcon from 'media/svg/searchIcon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FiPhone } from 'react-icons/fi';
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
  const [drawerOpen, setDrawerOpen] = useState(false);
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
        ? "fixed top-0 left-0 right-0 bg-white shadow-md py-0"
        : "relative bg-transparent"
        }`}
    >
      {/* Top section: single row on all screen sizes */}
      <div className={`relative flex min-h-14 items-center justify-between ${isSticky ? "pt-2" : "pt-2"}`}>
        {/* Hamburger - mobile only */}
        <button
            onClick={() => setDrawerOpen(true)}
            className="absolute left-0 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center lg991:hidden"
            aria-label="Open menu"
          >
            <RxHamburgerMenu size={22} />
          </button>

          {/* Desktop: left section (language, currency, Call Now) */}
          <div className="hidden lg991:flex items-center gap-1 -ml-2 [&_button]:text-sm [&_button]:py-1 [&_button]:px-1.5 [&_select]:text-sm [&_select]:py-1 [&_select]:px-1.5">
            <LanguageSwitcher />
            <GoogleTranslateScript />
            <div className="h-3.5 w-px bg-[#A0A0A0] shrink-0" />
            <CurrencySwitcher />
            <div className="h-3.5 w-px bg-[#A0A0A0] shrink-0" />
            <a
              href="tel:+18888808232"
              className="flex items-center justify-center rounded-md bg-black text-white h-6 px-2 text-sm font-medium tracking-wide transition-all duration-300 hover:bg-orange-600 hover:scale-105 whitespace-nowrap shrink-0"
            >
              Call Now
            </a>
          </div>

        {/* Center logo - on small screens: slightly bigger, shifted left */}
        <div className="absolute left-[38%] top-1/2 -translate-x-1/2 -translate-y-1/2 min-[440px]:left-1/2">
          <Link
            href={pathname.startsWith("/fr") ? "/fr" : `/`}
            passHref
            legacyBehavior
          >
            <Image
              src={logo}
              alt="logo"
              className="block w-[80px] min-[440px]:w-[80px] sm:w-[80px] md:w-[120px] lg:w-[140px] cursor-pointer"
            />
          </Link>
        </div>

        {/* Right section: phone icon (mobile), search, cart */}
        <div className="absolute right-0 top-1/2 z-50 -translate-y-1/2 lg991:relative lg991:top-auto lg991:translate-y-0 flex items-center gap-1.5 sm:gap-2 lg991:gap-4 [&_.cart-icon]:!relative [&_.cart-icon]:!top-auto [&_.cart-icon]:!right-auto">
          {/* Phone icon on mobile (desktop has Call Now in left section) */}
          <a
            href="tel:+18888808232"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white transition-all duration-300 hover:bg-orange-600 hover:scale-105 lg991:hidden"
            aria-label="Call Now"
          >
            <FiPhone size={18} />
          </a>
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
            <button
              type="button"
              onClick={() => setShowSearch((prev) => !prev)}
              className="flex h-full w-full items-center justify-center rounded-full transition-colors hover:bg-gray-100"
              aria-label="Search"
            >
              <Image
                src={searchIcon}
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 cursor-pointer text-gray-600"
              />
            </button>
            <div
              className={`absolute top-full right-0 mt-2 xl:right-auto xl:left-1/2 xl:-translate-x-1/2 z-[99999] bg-white border-b border-b-black rounded shadow-lg w-72 p-1 transform transition-all duration-300 ease-in-out ${showSearch ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible pointer-events-none'
                }`}
            >
              <Search />
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden lg991:flex h-10 shrink-0 items-center">
            <UserMenu />
          </div>

          {/* Cart Icon + Modal */}
          <div className="flex h-10 min-w-10 shrink-0 items-center justify-center">
            <CartModal />
          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <div className="my-2 hidden items-center justify-center space-x-14 lg:flex">
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
            ${item.title === "Sale" ? "text-[#7d0709]" : "text-black"}
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


      <Drawer menu={menu} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </nav>
  );
};

export default Header;

'use client';

import logo from 'media/png/whiteLogo.png';
import fb from 'media/svg/fb.svg';
import insta from 'media/svg/insta.svg';
import pintrist from 'media/svg/pintrist.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from "lucide-react";
import i18n from '../../lib/i18nClient';
import { useTranslation } from 'react-i18next';
import { toast, Toaster } from 'sonner';
import axios from 'axios';

const furniture = ['Furniture.', 'Chairs', 'Barstools', 'Table Tops', 'Table Bases', 'Outdoor Furniture'];
const quikLinks = ['Vogue Decor.', 'Home', 'Contact Us'];
const locations = ['Locations.', 'Montreal', 'Toronto'];
const policy = ['Policy.', 'Privacy Policy.', 'Terms and Conditions', ' Shipping and Return Policy', 'Blogs'];


interface FooterLinksProps {
  links: string[];
  isQuick?: boolean;
}

const Footer = () => {
  return (
    <>
      {/* StayUpdated for small screens */}
      <div className="bg-black px-[20px] py-3 xs:mx-0 md:mx-[50px] lg:hidden">
        <StayUpdated />
      </div>

      {/* Main Footer */}
      <div className="flex flex-col bg-black text-white xs:px-[20px] xs:pt-[30px] md:px-[50px] md:pt-[98px] lg:px-[60px] xl:px-[70px]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12">
          {/* Logo */}
          <div className="lg:col-span-2">
            <Logo />
          </div>

          {/* Footer Links & Connects */}
          <div className="flex flex-col gap-y-6 sm:flex-col md:flex-col lg:flex-row lg:justify-between lg:gap-6 lg:col-span-6">
            <div className="w-full lg:min-w-[120px]"><FooterLinks links={furniture} /></div>
            <div className="w-full lg:min-w-[120px]"><FooterLinks links={quikLinks} isQuick /></div>
            <div className="w-full lg:min-w-[120px]"><FooterLinks links={locations} /></div>
            <div className="block lg:hidden w-full lg:min-w-[120px]"><FooterLinks links={policy} /></div>
            <div className="w-full lg:min-w-[120px] w-full f-left"><Connects /></div>
          </div>


          {/* Stay Updated (Large Screens) */}
          <div className="hidden lg:block lg:col-span-4 -mt-1">
            <StayUpdated />
          </div>
        </div>

        {/* Divider */}

        <div className="hidden lg:block mt-[55px] h-[1px] w-full bg-[#a6a6a6]" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 py-4 md:flex-row">
          <div className="hidden lg:flex flex-col items-center space-y-2 text-[12px] text-white md:flex-row md:space-x-4 md:space-y-0">
            <Link href="/privacy" className="hover:underline text-[#a6a6a6]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline text-[#a6a6a6]">
              Terms and Conditions
            </Link>
            <Link href="/shipping-return-policy" className="hover:underline text-[#a6a6a6]">
              Shipping and Return Policy
            </Link>
            <Link href="/blogs" className="hover:underline text-[#a6a6a6]">
              Blogs
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-center text-[12px] text-[#a6a6a6] md:text-right uppercase">
            © {new Date().getFullYear()} VOGUE DECOR. ALL rights reserved.
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
       <Link href={"tel:+1 (888) 880 8232"}><p className="text-sm">+1 (888) 880 8232</p></Link>
       <Link href={"mailto:info@voguedecor.com"}><p className="text-sm">Info@voguedecor.com</p></Link>
      </div>
    </div>
  );
};

const FooterLinks = ({ links, isQuick = false }: FooterLinksProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFAQ = () => setIsOpen((prev) => !prev);
  const { t, ready } = useTranslation('common');

  return (
    <div className="w-full">
      {/* Mobile: FAQ style */}
      <div className="block lg:hidden border-b border-gray-300 pb-2">
        <button
          onClick={toggleFAQ}
          className="w-full flex items-center justify-between font-semibold text-left xs:text-[14px] md:text-[16px]"
        >
          <span>{links[0]}</span>
          <ChevronDown
            className={`w-4 h-4 transform transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-96" : "max-h-0"
            }`}
        >
          <div className="flex flex-col ml-2 mt-1 space-y-2">
            {links.slice(1).map((link, index) => {
              const isContact = link === "Contact Us";
              const isCity = link === "Montreal" || link === "Toronto";
              const isHome = link === "Home";

              const href = isContact
                ? "/contact-us"
                : isCity
                  ? "/contact-us#location"
                  : isHome
                    ? "/"
                    : `/${link.toLowerCase().replace(/\s+/g, '-')}`;

              return (
                <Link key={`footer-link-${index}`} href={href} className="text-[13px] hover:underline">
                  {t(`footer.${link}`)}
                </Link>
              );
            })}
          </div>


        </div>
      </div>

      {/* Desktop: Inline style */}
      <div className="hidden lg:flex lg:flex-col lg:space-y-2">
        {links.map((link, index) => {
          const isHeading = index === 0;
          const isContact = link === "Contact Us";
          const isCity = link === "Montreal" || link === "Toronto";
          const isHome = link === "Home";

          const href = isContact
            ? "/contact-us"
            : isCity
              ? "/contact-us#location"
              : isHome
                ? "/"
                : `/${link.toLowerCase().replace(/\s+/g, '-')}`;

          return isHeading ? (
            <p key={`heading-${index}`} className="xs:text-[14px] md:text-[16px] font-semibold">
              {t(`footer.${link}`)}
            </p>
          ) : (
            <Link key={`link-${index}`} href={href} className="text-[13px] hover:underline">
              {t(`footer.${link}`)}
            </Link>
          );
        })}
      </div>

    </div>
  );
};

const Connects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleConnect = () => setIsOpen((prev) => !prev);

  return (
    <div className="w-full f-left">
      {/* Mobile/Tablet: Accordion style */}
      <div className="block lg:hidden border-b border-gray-300 pb-2">
        <button
          onClick={toggleConnect}
          className="w-full flex items-center justify-between font-semibold text-left xs:text-[14px] md:text-[16px]"
        >
          <span>Connect.</span>
          <ChevronDown
            className={`w-4 h-4 transform transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''
              }`}
          />
        </button>

        <div
          className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-40' : 'max-h-0'
            }`}
        >
          <div className="flex items-center space-x-2 ml-2 mt-2">
            <Link href="https://www.facebook.com/VogueDecorFurniture/" target="_blank">
              <Image src={fb} alt="fb" />
            </Link>
            <Link href="https://www.instagram.com/voguedecorr/" target="_blank">
              <Image src={insta} alt="insta" />
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop: Inline style */}
      <div className="hidden lg:flex lg:flex-col lg:space-y-2">
        <p className="xs:text-[14px] md:text-[16px] font-semibold">Connect.</p>
        <div className="flex items-center space-x-2">
          <Link href="https://www.facebook.com/VogueDecorFurniture/" target="_blank">
            <Image src={fb} alt="fb" />
          </Link>
          <Link href="https://www.instagram.com/voguedecorr/" target="_blank">
            <Image src={insta} alt="insta" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const StayUpdated = () => {
  const { t, ready } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [loading, IsLoading] = useState(false);

  const subscribe = async (e: any) => {
    e.preventDefault();

    try {
      IsLoading(true)
      const res = await axios.post('/api/subscribe', { email });
      toast.success(res.data.message);
      IsLoading(false)
    } catch (error: any) {
      IsLoading(false)
      console.error('Subscription error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Subscription failed');
    }
  };


  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-2 md:max-w-md pt-10 lg991:pt-0">
      <p className="text-lg font-medium text-white">{t(`stayUpdated`)}</p>
      <form onSubmit={subscribe}>
        <div className="flex items-center overflow-hidden rounded-md border border-gray-400">
          <input
            type="email"
            placeholder={t('enterEmail')}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full min-w-0 flex-1 bg-transparent px-4 py-2 text-white placeholder:text-gray-300 outline-none"
          />
          <button
            type="submit"
            className="flex items-center justify-center whitespace-nowrap bg-white px-4 py-2 font-medium text-black"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="h-5 w-5 animate-spin text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : (
              t('subscribe')
            )}
          </button>

        </div>
      </form>
      <p className="mt-3 text-center text-xs lg:991text-sm text-white md:text-left">
        {t(`description1`)}{' '}
        <br className="" />{t(`description2`)}
      </p>
    </div>
  );
};

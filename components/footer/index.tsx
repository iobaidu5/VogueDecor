'use client';

import logo from 'media/png/whiteLogo.png';
import fb from 'media/svg/fb.svg';
import insta from 'media/svg/insta.svg';
import pintrist from 'media/svg/pintrist.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from "lucide-react";

const furniture = ['Furniture.', 'Chairs', 'Barstools', 'Table Tops', 'Table Bases', 'Outdoor Furniture'];
const quikLinks = ['Vogue Decor.', 'Home', 'Contact Us'];
const locations = ['Locations.', 'Montreal', 'Toronto'];
const policy = ['Policy.','Privacy Policy.', 'Terms and Conditions', ' Shipping and Return Policy'];


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
            <div className="w-full lg:min-w-[120px]"><FooterLinks links={policy} /></div>
            <div className="w-full lg:min-w-[120px]"><Connects /></div>
          </div>


          {/* Stay Updated (Large Screens) */}
          <div className="hidden lg:block lg:col-span-4 -mt-1">
            <StayUpdated />
          </div>
        </div>

        {/* Divider */}

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 py-4 md:flex-row">
          {/* <div className="flex flex-col items-center space-y-2 text-[12px] text-white md:flex-row md:space-x-4 md:space-y-0">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms and Conditions
            </Link>
            <Link href="/shipping-return-policy" className="hover:underline">
              Shipping and Return Policy
            </Link>
            <Link href="/contact-us" className="hover:underline">
              Contact Us
            </Link>
          </div> */}

          {/* Copyright */}
          <p className="text-center text-[12px] text-white md:text-right uppercase">
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
        <p className="text-sm">+1 (888) 880 8232</p>
        <p className="text-sm">Info@voguedecor.com</p>
      </div>
    </div>
  );
};

const FooterLinks = ({ links, isQuick = false }: FooterLinksProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFAQ = () => setIsOpen((prev) => !prev);

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
          className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="flex flex-col ml-2 mt-1 space-y-2">
            {links.slice(1).map((link) => (
              <Link
                key={link}
                href={`/search/${link.toLowerCase()}`}
                className="text-[13px] hover:underline"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: Inline style */}
      <div className="hidden lg:flex lg:flex-col lg:space-y-2">
        {links.map((link, index) =>
          index === 0 ? (
            <p key={link} className="xs:text-[14px] md:text-[16px] font-semibold">
              {link}
            </p>
          ) : (
            <Link
              key={link}
              href={`/search/${link.toLowerCase()}`}
              className="text-[13px] hover:underline"
            >
              {link}
            </Link>
          )
        )}
      </div>
    </div>
  );
};

const Connects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleConnect = () => setIsOpen((prev) => !prev);

  return (
    <div className="w-full">
      {/* Mobile/Tablet: Accordion style */}
      <div className="block lg:hidden border-b border-gray-300 pb-2">
        <button
          onClick={toggleConnect}
          className="w-full flex items-center justify-between font-semibold text-left xs:text-[14px] md:text-[16px]"
        >
          <span>Connect.</span>
          <ChevronDown
            className={`w-4 h-4 transform transition-transform duration-300 ease-in-out ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        <div
          className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-40' : 'max-h-0'
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
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-2 md:max-w-md pt-10 lg991:pt-0">
      <p className="text-lg font-medium text-white">Stay Updated</p>
      <div className="flex items-center overflow-hidden rounded-md border border-gray-400">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full min-w-0 flex-1 bg-transparent px-4 py-2 text-white placeholder:text-gray-300 outline-none"
        />
        <button className="whitespace-nowrap bg-white px-4 py-2 font-medium text-black">
          Subscribe
        </button>
      </div>
      <p className="mt-3 text-center text-xs lg:991text-sm text-white md:text-left">
        Stay updated! Subscribe to our newsletter{' '}
        <br className="" />for exclusive offers, latest trends, and design inspiration.
      </p>
    </div>
  );
};

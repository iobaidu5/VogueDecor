'use client';

import Link from 'next/link';
import { useTranslation } from "next-i18next";

const ContactHeader = () => {
  const { t, ready } = useTranslation('common');
  return (
    <div className="mb-6 flex flex-col gap-3">
      <div className="flex w-full items-center space-x-2 text-[12px] mt-8 md:mt-20">
        <Link href="/" className="text-gray-500 hover:underline">
          {t("home")}
        </Link>
        <span className="text-gray-500 hover:underline"> / </span>
        <span className="capitalize text-gray-500">{t("contact_us_breadcrumb")}</span>
      </div>

      <h2 className="text-[28px] font-medium lg:text-[53px] mt-4 lg:mt-0">{t("contact_us_heading")}</h2>

      <div className="flex mt-0 lg:mt-0 flex-col gap-2 text-[14px] font-medium xl:text-[16px]">
        <p>{t("have_question")}</p>

        <div className="w-full">
          <p className="block sm:inline">{t("help_text_part1")}</p>
          <p className="block sm:inline">{t("help_text_part2")}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;
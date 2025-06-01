import Image from "next/image";
import overlayImage from "media/png/overlayImage.png";
import upgradeImage from "media/png/upgradeImage.png";
import logobtn from "media/svg/logobtn.svg";
import '../../../lib/i18nClient'
import { useTranslation } from 'react-i18next';
import Link from "next/link";

const Upgrade = () => {
  const { t, ready } = useTranslation('common');
  return (
    <div className="relative w-full h-[30vh] sm:h-[50vh] md:h-[30vh] lg:h-[30vh] bg-[#013540]">
      {/* Optional: overlay image */}
      {/* <Image src={overlayImage} alt="overlay" className="absolute inset-0 object-cover w-full h-full opacity-10" /> */}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-40">
          <div className="flex flex-col md:flex-row items-center justify-between w-full space-y-6 md:space-y-0">
            {/* Left Side - Text */}
            <div className="text-white text-center md:text-left">
              <h1 className="mb-2 font-medium font-poppins text-[28px] sm:text-[32px] md:text-[38px] lg:text-[42px] text-[#05E5C8]">
                {t('upgradeWithEase')}
              </h1>
              <p className="text-[16px] sm:text-[17px] md:text-[18px] font-poppins tracking-wide">
                Redefine your space hassle free with
                {t('redefineSpace')}
              </p>
            </div>

            {/* Right Side - Button Group */}
            <div className="flex items-center">
              <button className="flex items-center justify-center rounded-l-lg bg-white px-3 py-2 sm:py-2">
                <Image src={logobtn} alt="logo" className="w-[90px] md:w-auto" />
              </button>
              <Link href="/voguedecor-calculator" className="rounded-r-lg bg-[#05E5C8] h-[57px] flex align-center items-center px-4 sm:px-5 md:px-6 text-black font-medium">
                {t('applyNow')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;

import overlayImage from 'media/png/overlayImage.png';
import upgradeImage from 'media/png/upgradeImage.png';
import logobtn from 'media/svg/logobtn.svg';
import Image from 'next/image';

const Upgrade = () => {
  return (
    <div className="relative h-[30vh] w-full bg-[#013540]">
      <div className="absolute inset-0 flex flex-col justify-center">
        <div className="container mx-auto px-40 md:px-40">
          <div className="flex flex-col md:flex-row items-center justify-between w-full">
            {/* Left Side - Text */}
            <div className="text-white text-center md:text-left mb-6 md:mb-0">
              <h1 className="mb-2 font-medium font-poppins xs:text-[24px] md:text-[42px] text-[#05E5C8]">
                Upgrade with Ease
              </h1>
              <p className="xs:text-[16px] md:text-[18px] font-poppins ml-1 tracking-wide">
                Redefine your space hassle free with
              </p>
            </div>

            {/* Right Side - Button Group */}
            <div className="flex items-center">
              <button className="flex items-center justify-center rounded-l-lg bg-white xs:p-1 md:p-2">
                <Image src={logobtn} alt="logo" className="xs:w-[90px] md:w-auto" />
              </button>
              <button className="rounded-r-lg bg-[#05E5C8] h-[59px] py-1 xs:px-4 md:px-6 text-black font-medium">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;

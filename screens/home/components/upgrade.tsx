import overlayImage from 'media/png/overlayImage.png';
import upgradeImage from 'media/png/upgradeImage.png';
import logobtn from 'media/svg/logobtn.svg';
import Image from 'next/image';
const Upgrade = () => {
  return (
    <div className="relative h-[60vh] w-full">
      {/* Background Image */}
      <Image src={upgradeImage} alt="Upgrade Banner" className="h-full w-full object-cover" />

      <Image
        src={overlayImage}
        alt="Overlay"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
        priority
      />

      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-center">
        <h1 className="xs:text-[30px] mb-4 font-medium text-white md:text-[50px]">
          Upgrade with Ease
        </h1>
        <p className="xs:text-[15px] mb-6 text-white md:text-[20px]">
          Redefine your space hassle free with
        </p>
        <div className="relative flex w-full items-center justify-center">
          <div className="flex">
            <button className="flex items-center justify-center rounded-l-lg bg-white p-2">
              <Image src={logobtn} alt="logo" />
            </button>
            <button className="rounded-r-lg bg-[#05E5C8] px-6 py-2">Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;

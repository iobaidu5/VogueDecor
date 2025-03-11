const Explore = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 xs:px-4 md:flex-row md:px-[40px] md:py-[122px] lg:px-[70px] xl:px-[100px]">
      {/* Left Section - Title */}
      <div className="w-full text-center md:w-2/6 md:text-left">
        <p className="text-[28px] font-semibold leading-tight sm:text-[40px] md:text-[50px] lg:text-[86px]">
          Explore
        </p>
        <p className="mt-2 text-[14px] text-[#878787] sm:text-[16px]">Elevate your space with us</p>
      </div>

      {/* Right Section - Description */}
      <p className="mt-6 w-full text-center text-[16px] leading-relaxed sm:text-[18px] md:mt-0 md:w-4/6 md:text-left md:text-[24px] lg:text-[32px]">
        With commitment to quality craftsmanship, <br className="hidden md:block" /> timeless
        design, and sustainable materials, <br className="hidden md:block" /> we create pieces that
        transform.
      </p>
    </div>
  );
};

export default Explore;

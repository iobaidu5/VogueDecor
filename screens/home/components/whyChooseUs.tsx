import DeliveryIcon from 'media/svg/deliveryIcon.svg';
import { default as ServiceIcon } from 'media/svg/serviceIcon.svg';
import SupportIcon from 'media/svg/supportIcon.svg';
import likeIcon from 'media/svg/like.svg';
import Image from 'next/image';

const WhyChooseUs = () => {
  return (
    <div className="pt-12">
      <div className="flex flex-col items-center justify-center pt-10">
        <p className="text-[14px] text-[#878787]">Elevate your space with us</p>
        <p className="font-medium xs:text-[25px] md:text-[40px]">Why Choose Us</p>
        <div className="h-[2px] w-[130px] bg-[#878787]" />
      </div>
      <ChooseUsSection />
    </div>
  );
};

export default WhyChooseUs;

const data = [
  {
    icon: ServiceIcon,
    firstText: 'Commercial Grade',
    secondText: 'Material',
    desc: 'Our furniture is built with quality materials  designed to last.'
  },
  {
    icon: SupportIcon,
    firstText: 'Free',
    secondText: 'Shipping',
    desc: 'Free shipping to Canada for all orders over $1999.'
  },
  {
    icon: likeIcon,
    firstText: 'Buy From',
    secondText: 'Manufacturer',
    desc: 'Shop directly from the manufacturer for  best price and quality.'
  },
  {
    icon: DeliveryIcon,
    firstText: 'Satisfaction',
    secondText: 'Guaranteed',
    desc: "Our clients' satisfaction is always our priority."
  }
];

const ChooseUsSection = () => {
  return (
    <div className="grid gap-2 pt-[104px] xs:grid-cols-1 md:grid-cols-4">
      {data?.map((item: any) => (
        <div className="col-span-1 flex flex-col items-center" key={item?.firstText}>
          {item?.secondText === 'Manufacturer' ? (
            <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#D9D9D94F]">
              <Image src={item.icon} alt={item.firstText} />
            </div>
          ) : (
            <Image src={item.icon} alt={item.firstText} />
          )}
          <p className="pt-2 font-medium xs:text-[18px] sm:text-[22px] lg:text-[29px]">
            {item?.firstText}
          </p>
          <p className="font-medium xs:text-[18px] sm:text-[22px] lg:text-[29px]">
            {item?.secondText}
          </p>
          <p className="py-2 text-center font-normal leading-[1.5] text-[#878787] xs:text-[13px] lg:text-[16px]">
            {item.desc
              .split(' ')
              .slice(0, Math.ceil(item.desc.split(' ').length / 2))
              .join(' ')}
            <br />
            {item.desc
              .split(' ')
              .slice(Math.ceil(item.desc.split(' ').length / 2))
              .join(' ')}
          </p>
        </div>
      ))}
    </div>
  );
};

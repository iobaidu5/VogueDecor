import DeliveryIcon from 'media/svg/deliveryIcon.svg';
import { default as ServiceIcon } from 'media/svg/serviceIcon.svg';
import SupportIcon from 'media/svg/supportIcon.svg';
import likeIcon from 'media/svg/like.svg';
import Image from 'next/image';
import '../../../lib/i18nClient'
import { useTranslation } from 'react-i18next';

const WhyChooseUs = () => {
  const { t, ready } = useTranslation('common');
  return (
    <div className="py-16 pb-8">
      <div className="flex flex-col items-center justify-center pt-10">
        <p className="text-[14px] text-[#878787]">{t('elevateSpace')}</p>
        <p className="font-medium xs:text-[25px] text-black md:text-[40px]">{t('whyChooseUs')}</p>
        {/* <div className="h-[2px] w-[130px] bg-[#878787]" /> */}
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
    desc: 'Our furniture is built with quality materials designed to last.'
  },
  {
    icon: likeIcon,
    firstText: 'Buy From',
    secondText: 'Manufacturer',
    desc: 'Shop directly from the manufacturer for  best price and quality.'
  },
  {
    icon: SupportIcon,
    firstText: 'Free',
    secondText: 'Shipping',
    desc: 'Free shipping to Canada for all orders over $2999.'
  },
  {
    icon: DeliveryIcon,
    firstText: 'Satisfaction',
    secondText: 'Guaranteed',
    desc: "Our clients' satisfaction is always our priority."
  }
];

const ChooseUsSection = () => {
  const { t, ready } = useTranslation('common');
  return (
    <div className="grid gap-2 pt-[40px] grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden">
      {data?.map((item: any) => (
        <div className="flex flex-col items-center mt-4" key={item?.firstText}>
          {item?.secondText === 'Manufacturer' ? (
            <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#D9D9D94F]">
              <Image src={item.icon} alt={item.firstText} />
            </div>
          ) : (
            <Image src={item.icon} alt={item.firstText} />
          )}
          <p className="pt-2 font-medium text-black xs:text-[16px] sm:text-[22px] lg:text-[24px]">
            {t(`choose.${item?.firstText}`)}
          </p>
          <p className="font-medium text-black xs:text-[16px] sm:text-[22px] lg:text-[24px]">
            {t(`choose.${item?.secondText}`)}
          </p>
          <p className="mt-2 sm:text-base text-[12px] lg:text-[16px] text-[#878787] leading-[1.6] break-words text-center">

            {t(`choose.${item.desc}`)
              ?.split(' ')
              ?.slice(0, Math.ceil(t(`choose.${item.desc}`).split(' ').length / 2))
              ?.join(' ')}
            <br />
            {t(`choose.${item.desc}`)
              ?.split(' ')
              ?.slice(Math.ceil(item.desc.split(' ').length / 2))
              ?.join(' ')}



          </p>
        </div>
      ))}
    </div>
  );
};


import redirectArrow from 'media/svg/redirectionArrow.svg';
import Image from 'next/image';

const ForwardLink = ({ text, primary = true }) => {
  return (
    <div className="flex items-center space-x-2">
      <p className="text-[18px] underline" style={{ color: primary ? '#000000' : '#5F5F5F' }}>
        {text}
      </p>
      <Image src={redirectArrow} alt="arrow" />
    </div>
  );
};

export default ForwardLink;

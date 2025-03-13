import frame1 from 'media/png/frame1.png';
import frame2 from 'media/png/frame2.png';
import frame3 from 'media/png/frame3.png';
import frame4 from 'media/png/frame4.png';
import Image from 'next/image';

const frames: any = [
  {
    image: frame1,
    alt: 'fram1'
  },
  {
    image: frame2,
    alt: 'fram2'
  },
  {
    image: frame3,
    alt: 'fram3'
  },
  {
    image: frame4,
    alt: 'fram4'
  }
];

const Community = () => {
  return (
    <div className="xs:px-[50px] xs:pb-[50px] md:pb-[100px] lg:px-[70px]">
      <p className="font-medium xs:text-[22px] md:text-[40px]">
        Join the Vogue <br /> Community
      </p>
      <p className="text-[#878787] xs:text-[15px] md:text-[18px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque <br /> tortor
        vitae leo faucibus, non fermentum nulla facilisis. Lorem ipsum dolor sit ame.
      </p>
      <div className="mt-8 grid items-center justify-between gap-3 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {frames?.map((frame: any) => (
          <div
            className="col-span-1 flex w-full items-center justify-center overflow-hidden bg-gray-200 xs:h-60 md:h-96"
            key={frame.alt}
          >
            <Image className="h-full w-full object-cover" src={frame.image} alt={frame.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;

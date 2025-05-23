import ForwardLink from 'components/forwardlink/forwardLink';
import mainImage from 'media/png/mainImage.png';
import hero from 'media/png/hero.png';
import mainText from 'media/png/mainText.png';
import Image from 'next/image';
import BestSeller from './components/bestSeller';
import Community from './components/community';
import DiscoverMore from './components/Discover';
import Upgrade from './components/upgrade';
import WhyChooseUs from './components/whyChooseUs';
import { ProductProvider } from 'components/product/product-context';
import CartModal from 'components/cart/modal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HomeCategories from './components/homeCategories';
import HomeBanners from './components/HomeBanners';

export default function MainPage() {
  return (
    <>
      <div className="relative w-full min-w-full xs:h-[50vh] md:h-screen">
        {' '}
        <div className="relative h-full w-full">
          <div className="relative h-full w-full">
            <Image
              src={hero}
              alt="Background Image"
              layout="fill"
              objectFit="cover"
              className="h-full w-full"
              priority
            />
          </div>

          {/* Centered Text */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <Image src={mainText} alt="Main Text" />
          </div>

          {/* Bottom Links */}
          <div className="absolute bottom-[10%] left-[10%] hidden -translate-x-1/2 transform md:block">
            <ForwardLink text="Explore" primary={true} />
          </div>

          <div className="absolute bottom-[10%] right-[3%] hidden -translate-x-1/2 transform md:block">
            <ForwardLink text="Check Out The New Collection" primary={true} />
          </div>
        </div>
      </div>
      <main className="w-full px-[15px] md:px-[100px] md:pt-4">
        {/* <div>
          <DiscoverMore />
        </div> */}

        <div>
          <BestSeller />
        </div>

        <div>
          <HomeBanners />
        </div>

        <div>
          <HomeCategories />
        </div>


        <div>
          <WhyChooseUs />
        </div>
      </main>
      <div className="pb-12 xs:pt-[30px] lg:pt-[30px]">
        <Upgrade />
      </div>

      <div>
        <Community />
      </div>

      <div className="flex justify-end md:w-1/3">
        <CartModal />
      </div>
    </>
  );
}

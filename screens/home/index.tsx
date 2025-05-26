import ForwardLink from 'components/forwardlink/forwardLink';
import mainImage from 'media/png/mainImage.png';
import hero from 'media/png/main-banner.png';
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
import Link from 'next/link';

export default function MainPage() {
  return (
    <>
<div className="w-full overflow-x-hidden">
  <section className="relative w-full h-screen overflow-hidden">
    {/* Background Image */}
    <Image
      src={hero}
      alt="Hero Background"
      fill
      className="object-contain"
      priority
    />

    {/* Centered Button */}
    <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2">
      <Link
        href="/"
        className="bg-black text-white px-6 py-3 text-lg rounded hover:bg-gray-900 transition duration-300"
      >
        Shop Outdoor
      </Link>
    </div>
  </section>
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

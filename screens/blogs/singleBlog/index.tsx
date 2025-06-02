import Image from 'next/image';

interface Article {
  id: number;
  title: string;
  description: string;
  desktopImage: {
    src: string;
    alt: string;
  };
  mobileImage: {
    src: string;
    alt: string;
  };
}

type ArticleType = {
  data: Article;
};

export default function SingleBlog({ data }: ArticleType) {
  return (
    <div className="mx-auto max-w-full px-4 py-[100px] md:max-w-4xl xl:py-[120px]">
      {/* Centered Layout */}
      <div className="space-y-8 text-center">
        {/* Title */}
        <h1 className="text-[18px] font-medium tracking-wide text-gray-900 md:text-[24px]">
          {data.title}
        </h1>

        {/* Main Image */}
        <div className="flex w-full justify-center">
          <div className="relative flex-1">
            {/* Desktop Image */}
            <Image
              src={data.desktopImage.src || '/placeholder.svg'}
              alt={data.desktopImage.alt}
              width={764}
              height={553}
              className="hidden h-auto w-full md:block"
              priority
            />
            {/* Mobile Image */}
            <Image
              src={data.mobileImage.src || '/placeholder.svg'}
              alt={data.mobileImage.alt}
              width={396}
              height={295}
              className="h-auto w-full flex-1 md:hidden"
              priority
            />
          </div>
        </div>

        {/* Description */}
        <div className="mx-auto max-w-2xl">
          <p className="mb-8 text-[11px] leading-relaxed text-gray-700">{data.description}</p>
        </div>

        {/* Feature Sections */}
        <div className="mx-auto max-w-3xl space-y-6 text-left">
          <div className="space-y-2">
            <h3 className="text-[11px] text-gray-900">
              <span className="font-bold text-gray-600">Comfort:</span> Ergonomically designed with
              premium cushioning and lumbar support, our dining chairs provide exceptional comfort
              for extended seating during family meals and gatherings.
            </h3>
          </div>

          <div className="space-y-2">
            <h3 className="text-[11px] text-gray-900">
              <span className="font-bold text-gray-600">Style:</span> Crafted with sleek lines and
              contemporary materials, these chairs seamlessly blend modern aesthetics with timeless
              elegance to complement any dining space.
            </h3>
          </div>

          <div className="space-y-2">
            <h3 className="text-[11px] text-gray-900">
              <span className="font-bold text-gray-600">Durability:</span> Built with high-quality
              hardwood frames and premium upholstery materials, our chairs are designed to withstand
              daily use while maintaining their beauty for years to come.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
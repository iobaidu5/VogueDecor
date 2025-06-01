'use client';
import React, { useState } from 'react';
// @ import dependencies
import { HeartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
// @ import components
import Accordion from 'components/accordian';
// @ import media
import Back from 'media/png/back.png';
import Chair from 'media/png/chair.png';
import Left from 'media/png/left.png';
import Right from 'media/png/right.png';
import SilverChef from 'media/png/silverChef.png';
import Link from 'next/link';

const ProductPages: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<any>(Chair);

  return (
    <div className="mx-auto flex max-w-7xl flex-col py-[120px] md:flex-row">
      <div className="flex-1">
        <div className="max-h-[565px] min-h-[565px] max-w-[565px] border border-[#E4E4E7]">
          <Image src={selectedImage} alt="Leonardo Chair" className="w-full rounded-md" />
        </div>
        <div className="mt-4 flex space-x-2">
          {[Left, Right, Back].map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={`Thumbnail ${idx}`}
              className="h-16 w-16 cursor-pointer rounded-md border border-[#E4E4E7]"
              onClick={() => {
                setSelectedImage(img);
              }}
            />
          ))}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="mt-6 flex-1 md:ml-10 md:mt-0">
        <label className="flex h-[30px] w-[70px] items-center justify-center rounded-full bg-[#F0ECEB] text-[12px] text-[#6D6D6D]">
          Chairs
        </label>
        <h1 className="tex-[#000000] mt-2 text-[36px] font-medium">LEONARDO – Chair</h1>
        <div className="mt-2 flex items-center space-x-4">
          <p className="text-[20px] font-normal text-[#8F8F8F] line-through">$169.99</p>
          <p className="text-[25px] font-medium text-[#D9222A]">$149.99</p>
        </div>
        <p className="mt-4 text-gray-700">Colour</p>
        <div className="mt-2 flex items-center space-x-3">
          <span className="h-6 w-6 cursor-pointer rounded-full border border-white bg-[#000000]"></span>
          <span className="h-6 w-6 cursor-pointer rounded-full border-2 border-[#D9D9D9] bg-[#7E3A3A]"></span>
        </div>

        <div className="mt-6 flex items-center space-x-4">
          <div className="flex items-center rounded-md bg-black px-2 py-1 text-white">
            <button
              onClick={() => setQuantity((q) => (q > 1 ? q - 1 : q))}
              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-800"
            >
              -
            </button>
            <span className="w-10 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-800"
            >
              +
            </button>
          </div>
          <button className="flex-1 rounded-md bg-black py-2 text-white hover:bg-gray-800">
            ADD TO CART
          </button>
          <button className="flex h-11 w-12 items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300">
            <HeartIcon className="h-5 w-5 text-gray-600 hover:text-black" />
          </button>
        </div>

        {/* Description, Details, and Availability */}
        <div className="mt-6 space-y-2">
          <div className="border-y">
            <Accordion
              title="DESCRIPTION"
              content="  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
          </div>
          <div className="border-b">
            <Accordion
              title="DETAILS"
              content="  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
          </div>
          <div className="border-b">
            <Accordion
              title="AVAILABILITY"
              content="  Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
          </div>
        </div>

        {/* Monthly Payment Option */}
        <div className="mt-6 flex items-center gap-12">
          <p>
            <Link href="/" className="text-[#7DA6DD] underline">
              Pay Monthly With
            </Link>
          </p>
          <Image src={SilverChef} alt="SilverChef" />
        </div>
      </div>
    </div>
  );
};

export default ProductPages;

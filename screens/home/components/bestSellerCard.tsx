// import chairImage from 'media/png/chair.png';
// import heartIcon from 'media/svg/heart.svg';
// import Image from 'next/image';
// import Link from 'next/link';

// type Option = {
//   id: string;
//   name: string;
//   values: string[];
// };

// type Price = {
//   amount: string;
//   currencyCode: string;
// };

// type PriceRange = {
//   maxVariantPrice: Price;
//   minVariantPrice: Price;
// };

// type ImageType = {
//   url: string;
//   altText: string | null;
//   width: number;
//   height: number;
// };

// type Variant = {
//   id: string;
//   title: string;
//   availableForSale: boolean;
//   selectedOptions: { name: string; value: string }[];
//   price: Price;
// };

// type Product = {
//   id: string;
//   handle: string;
//   availableForSale: boolean;
//   title: string;
//   description: string;
//   descriptionHtml: string;
//   options: Option[];
//   priceRange: PriceRange;
//   featuredImage: ImageType;
//   seo: { description: string | null; title: string | null };
//   tags: string[];
//   updatedAt: string;
//   images: ImageType[];
//   variants: Variant[];
// };

// type SellerCardProps = {
//   data: Product[];
// };

// const SellerCard: React.FC<SellerCardProps> = ({ data }) => {
//   return (
//     <div className="grid grid-cols-1 gap-6 pt-[40px] sm:grid-cols-2 lg:grid-cols-4">
//       {data?.map((item) => (
//         <Link
//           href={`product-detail/${item.id}`}
//           key={item.id}
//           className="relative flex flex-col bg-white"
//         >
//           {/* Add to Cart Button */}
//           <button className="absolute right-14 top-3 z-50 h-8 w-28 rounded-full border border-black text-[12px] hover:bg-black hover:text-white">
//             Add to Cart
//           </button>
//           {/* Favorite Icon */}
//           <Image
//             src="/media/svg/heart.svg"
//             alt="heartIcon"
//             width={20}
//             height={20}
//             className="absolute right-5 top-4"
//           />
//           {/* Image Section */}
//           <div className="flex h-[500px] items-center justify-center bg-[#F5F5F5]">
//             <Image
//               src={item.featuredImage?.url || chairImage}
//               alt={item.featuredImage?.altText || item.title}
//               width={380}
//               height={500}
//               className="h-full w-full object-contain"
//             />
//           </div>

//           {/* Title Section */}
//           <div className="flex flex-col justify-center space-y-1 bg-white px-4 py-3">
//             <p className="text-[15px] font-medium">{item.title}</p>
//             <p className="text-[15px] font-medium text-[#878787]">
//               {item.priceRange.minVariantPrice.amount} {item.priceRange.minVariantPrice.currencyCode}
//             </p>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default SellerCard;

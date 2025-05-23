'use client';

import Image from 'next/image';
import heart from 'media/svg/heart.svg';
import heartFilled from 'media/svg/heart-fill-red.svg';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

type AddToWishlistProps = {
  productId: string;
  isWishlisted?: boolean;
};

const AddToWishlist: React.FC<AddToWishlistProps> = ({ productId, isWishlisted = false }) => {
  const [wishlisted, setWishlisted] = useState(isWishlisted);
  const router = useRouter();

  useEffect(() => {
    setWishlisted(isWishlisted);
  }, [isWishlisted]);

  const handleAddToWishlist = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Please log in to add items to your wishlist.');
      return;
    }

    try {
      await axios.post(
        '/api/wishlist/add',
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Added to wishlist!');
      setWishlisted(true);
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <Image
      src={wishlisted ? heartFilled : heart}
      alt="heartIcon"
      width={20}
      height={20}
      className="absolute right-10 top-4 z-50 cursor-pointer transition"
      onClick={handleAddToWishlist}
    />
  );
};

export default AddToWishlist;

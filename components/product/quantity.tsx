'use client';
import { useState } from 'react';

const Quantity = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="flex w-[120px] items-center justify-center border border-gray-300">
      <button
        className="flex h-10 w-10 items-center justify-center text-xl text-gray-500"
        onClick={() => {
          if (quantity > 1) {
            setQuantity((prev) => prev - 1);
          }
        }}
      >
        -
      </button>
      <span className="w-10 text-center text-2xl text-gray-500">{quantity}</span>
      <button
        className="flex h-10 w-10 items-center justify-center text-xl text-gray-500"
        onClick={() => setQuantity((prev) => prev + 1)}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;

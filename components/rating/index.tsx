import React from 'react';

interface RatingProps {
  ratings: number[];
}

const Rating: React.FC<RatingProps> = ({ ratings }) => {
  return (
    <ul className="space-y-1">
      {ratings.map((count, index) => (
        <li key={index} className="flex items-center justify-between text-gray-700">
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`${i < 5 - index ? 'text-yellow-400' : 'text-gray-300'} text-[20px]`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-[14px] font-normal text-[#3D3D3D]">{count}</span>
        </li>
      ))}
    </ul>
  );
};

export default Rating;

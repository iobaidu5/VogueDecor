import React from 'react';

interface ColorProps {
  colors: string[];
}

const Color: React.FC<ColorProps> = ({ colors }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {colors?.map((color) => (
        <button
          key={color}
          className={`h-6 w-6 rounded-full border ${color == '#FFFFFF' ? 'border-[#CECECE]' : 'border-white'}`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default Color;

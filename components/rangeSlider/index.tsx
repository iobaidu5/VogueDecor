import React, { useState } from 'react';
// @ import dependencies
import { Range } from 'react-range';

const RangeSlider: React.FC = () => {
  const [values, setValues] = useState<number[]>([200, 2000]);
  const min = 0;
  const max = 3000;

  return (
    <div className="mx-auto w-full max-w-md">
      <Range
        step={10}
        min={min}
        max={max}
        values={values}
        onChange={(newValues: number[]) => setValues(newValues)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="h-[3.5px] rounded-full !bg-[#CACACA]"
            style={{
              ...props.style,
              background: `linear-gradient(to right, #CACACA ${((values[0] - min) / (max - min)) * 100}%, #D9222A ${
                ((values[0] - min) / (max - min)) * 100
              }%, #D9222A ${((values[1] - min) / (max - min)) * 100}%, #CACACA ${
                ((values[1] - min) / (max - min)) * 100
              }%)`
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, isDragged, key }: { props: any; isDragged: any; key: any }) => (
          <div
            key={key}
            {...props}
            className={`h-5 w-5 rounded-full bg-[#D06A6A] shadow-md ${
              isDragged ? 'ring-2 ring-red-700' : ''
            }`}
          />
        )}
      />
      <div className="mt-4">
        <p className="text-[13px] font-normal text-[#939393]">
          Range: ${values[0].toFixed(2)} – ${values[1].toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default RangeSlider;

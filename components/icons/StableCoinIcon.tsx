import React from 'react';

interface StableCoinIconProps {
  className?: string;
}

const StableCoinIcon: React.FC<StableCoinIconProps> = ({ className = "w-8 h-8" }) => {
  return (
    <div className={`${className} bg-yellow-500 rounded-full flex items-center justify-center border-2 border-yellow-400`}>
      <span className="text-black font-bold text-sm">⚛</span>
    </div>
  );
};

export default StableCoinIcon;

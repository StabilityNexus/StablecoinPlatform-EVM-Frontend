import React from 'react';

interface ErcIconProps {
  className?: string;
}

const ErcIcon: React.FC<ErcIconProps> = ({ className = "w-8 h-8" }) => {
  return (
    <div className={`${className} bg-gray-600 rounded-full flex items-center justify-center border-2 border-gray-400`}>
      <span className="text-white font-bold text-sm">Σ</span>
    </div>
  );
};

export default ErcIcon;

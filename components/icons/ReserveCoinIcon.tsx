import React from 'react';

interface ReserveCoinIconProps {
  className?: string;
}

const ReserveCoinIcon: React.FC<ReserveCoinIconProps> = ({ className = "w-8 h-8" }) => {
  return (
    <div className={`${className} bg-red-500 rounded-full flex items-center justify-center border-2 border-red-400`}>
      <span className="text-white font-bold text-sm">⚛</span>
    </div>
  );
};

export default ReserveCoinIcon;

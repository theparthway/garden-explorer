// src/components/Box.tsx
import React from 'react';

interface BoxProps {
    header: string;
    total: string;
    change: number;
}

const Box: React.FC<BoxProps> = ({ header, total, change }) => {
  return (
    <div className="p-6 rounded-lg border border-gray-200 bg-gray-50 text-gray-800">
      <div className="mb-2 text-lg font-medium">{header}</div>
      <div className="text-4xl font-bold mb-4">{total}</div>
      <div className="text-sm">
        24h change {' '}
        <span className={change >= 0 ? 'text-green-500' : 'text-red-500'}>
          {change >= 0 ? '+' : '-'}{Math.abs(change).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default Box;

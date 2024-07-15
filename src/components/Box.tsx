import { FC } from 'react';

interface BoxProps {
    header: string;
    total: string;
    change: number;
}

const Box: FC<BoxProps> = ({ header, total, change }) => {
  return (
    <div className="px-2 py-4 w-56 rounded-2xl border-2 border-border">
      <div className="mb-2 text-xs font-medium">{header}</div>
      <div className="text-2xl font-bold mb-4">{total}</div>
      <div className="text-xs">
        24h {' '}
        <span className={`${change >= 0 ? 'text-green-500' : 'text-red-500'} font-bold`}>
          {change >= 0 ? '+' : '-'}{Math.abs(change).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default Box;

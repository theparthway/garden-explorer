// src/components/Table.tsx
import React from 'react';
import { Transaction } from '../types';
import BTCAsset from '../assets/icons/BTCAsset.svg';
import WBTCAsset from '../assets/icons/WBTCAsset.svg';
import arbitrumChain from '../assets/icons/arbitrumChain.svg';

interface TableProps {
  data: Transaction[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const assetIcons: { [key: string]: string } = {
    BTC: BTCAsset,
    WBTC: WBTCAsset,
  };

  const chainIcons: { [key: string]: string } = {
    arbitrum: arbitrumChain,
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg">
        <thead className="">
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold">
              Created at
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold">
              ID
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold">
              From address
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold">
              Sent amount
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold">
              Received amount
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 border-b border-gray-200">{transaction.createdAt}</td>
              <td className="px-6 py-4 border-b border-gray-200">{transaction.id}</td>
              <td className="px-6 py-4 border-b border-gray-200">{transaction.fromAddress}</td>
              <td className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  {transaction.sentAmount}
                  {transaction.sentAsset && <img src={assetIcons[transaction.sentAsset]} alt={transaction.sentAsset} className="h-5 w-5" />}
                  {transaction.sentChain && <img src={chainIcons[transaction.sentChain]} alt={transaction.sentChain} className="h-5 w-5" />}
                </div>
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  {transaction.receivedAmount}
                  {transaction.receivedAsset && <img src={assetIcons[transaction.receivedAsset]} alt={transaction.receivedAsset} className="h-5 w-5" />}
                  {transaction.receivedChain && <img src={chainIcons[transaction.receivedChain]} alt={transaction.receivedChain} className="h-5 w-5" />}
                </div>
              </td>
              <td className={`px-6 py-4 border-b border-gray-200 ${transaction.status === 'Complete' ? 'text-green-500' : 'text-red-500'}`}>{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

// src/components/Table.tsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useOrderbookStore } from '../store/useOrderbookStore';
import { Transaction } from '../types';

import complete from '../assets/complete.svg';
import progress from '../assets/progress.svg';

const Table: React.FC = () => {
  const { orders, fetchOrders } = useOrderbookStore();

  const getIcons = (asset: string) => {
    if (asset.startsWith('ethereum_arbitrum')) {
      return { assetIcon: ETHAsset, chainIcon: arbitrumChain };
    } else if (asset.startsWith('ethereum')) {
      return { assetIcon: ETHAsset, chainIcon: '' };
    } else if (asset.startsWith('bitcoin')) {
      return { assetIcon: BTCAsset, chainIcon: '' };
    }
    return { assetIcon: '', chainIcon: '' };
  };

  const shorthand: { [key: string]: string } = {
    "ethereum_sepolia:0x130Ff59B75a415d0bcCc2e996acAf27ce70fD5eF": "ETH Sepolia",
    "ethereum_arbitrum:0x203DAC25763aE783Ad532A035FfF33d8df9437eE": "ETH Arbitrum",
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="overflow-x-auto my-8 border-2 border-border rounded-lg">
      <div className='flex justify-between p-4'>
        <h1>Transaction Data</h1>
        <div className='flex gap-2'>
          <a className='bg-light-gray py-2 px-4 rounded-full' href="">Bitcoin</a>
          <a className='bg-light-gray py-2 px-4 rounded-full' href="">EVM</a>
          <a className='bg-light-gray py-2 px-4 rounded-full' href="">Solana</a>
        </div>
      </div>
      <table className="min-w-full bg-white rounded-lg">
        <thead className="">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold">
              Created at
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold">
              From address
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold">
              Sent amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold">
              Received amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((transaction: Transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 border-b border-gray-200">{transaction.createdAt}</td>
              <td className="px-6 py-4 border-b border-gray-200">
                <Link to={`/transaction/${transaction.id}`}>{transaction.id}</Link>
              </td>
              <td className="px-6 py-4 border-b border-gray-200">{transaction.depositAddress}</td>
              <td className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  {transaction.sentAmount}
                  {getIcons(transaction.sentAsset).assetIcon ? (
                    <img src={getIcons(transaction.sentAsset).assetIcon} alt={transaction.sentAsset} className="h-5 w-5" />
                  ) : (
                    shorthand[transaction.sentAsset] ?? transaction.sentAsset
                  )}
                  {getIcons(transaction.sentAsset).chainIcon && (
                    <img src={getIcons(transaction.sentAsset).chainIcon} alt={transaction.sentAsset} className="h-5 w-5" />
                  )}
                </div>
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  {transaction.receivedAmount}
                  {getIcons(transaction.receivedAsset).assetIcon ? (
                    <img src={getIcons(transaction.receivedAsset).assetIcon} alt={transaction.receivedAsset} className="h-5 w-5" />
                  ) : (
                    shorthand[transaction.receivedAsset] ?? console.log(transaction.receivedAsset)
                  )}
                  {getIcons(transaction.receivedAsset).chainIcon && (
                    <img src={getIcons(transaction.receivedAsset).chainIcon} alt={transaction.receivedAsset} className="h-5 w-5" />
                  )}
                </div>
              </td>
              <td className={`px-6 py-4 border-b border-gray-200`}>
                <div className={`flex justify-evenly rounded-full py-2 text-center ${transaction.status === 'Complete' ? 'bg-complete' : 'bg-progress'}`}>
                  {transaction.status}
                  <img src={`${transaction.status === 'Complete' ? complete : progress}`} alt='completed icon' />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

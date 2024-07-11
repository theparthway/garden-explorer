// src/components/Table.tsx
import React, { useState, useEffect } from 'react';
import { Transaction } from '../types';
import BTCAsset from '../assets/icons/BTCAsset.svg';
import WBTCAsset from '../assets/icons/WBTCAsset.svg';
import ETHAsset from '../assets/icons/ETHAsset.svg';
import arbitrumChain from '../assets/icons/arbitrumChain.svg';
import complete from '../assets/complete.svg';
import progress from '../assets/progress.svg';

interface TableProps {
  // Optional: Define props if needed
}

const Table: React.FC<TableProps> = () => {
  const [data, setData] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://api.garden.finance/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const orders = await response.json();
      const formattedData: Transaction[] = orders.map((order: any) => ({
        createdAt: new Date(order.CreatedAt).toLocaleString(),
        id: order.ID.toString(),
        fromAddress: order.maker.substring(0, 4) + "..." + order.maker.substring(38, 43),
        sentAmount: parseFloat(order.price),
        sentAsset: order.orderPair.substring(0, order.orderPair.indexOf('-')), // Replace with actual asset logic if available in API
        receivedAmount: 0, // Replace with actual received amount logic
        receivedAsset: order.orderPair.substring(order.orderPair.indexOf('-') + 1, order.orderPair.length), // Replace with actual received asset logic
        status: order.status === 3 ? 'Complete' : 'Progress', // Replace with actual status logic
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
          {data.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 border-b border-gray-200">{transaction.createdAt}</td>
              <td className="px-6 py-4 border-b border-gray-200">{transaction.id}</td>
              <td className="px-6 py-4 border-b border-gray-200">{transaction.fromAddress}</td>
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
              <td className={`px-6 py-4 border-b border-gray-200 `}>
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

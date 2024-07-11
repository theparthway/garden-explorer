import React from 'react';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';
import Info from '../components/Info';
import { Transaction } from '../types';

const sampleData: Transaction[] = [
  {
    createdAt: '2024-07-10 10:00:00',
    id: '123456',
    fromAddress: '0x1234...abcd',
    sentAmount: 100,
    sentAsset: 'WBTC',
    sentChain: 'arbitrum',
    receivedAmount: 95,
    receivedAsset: 'BTC',
    receivedChain: 'arbitrum',
    status: 'Complete',
  },
  {
    createdAt: '2024-07-11 11:00:00',
    id: '789012',
    fromAddress: '0x5678...efgh',
    sentAmount: 200,
    sentAsset: 'BTC',
    sentChain: '',
    receivedAmount: 190,
    receivedAsset: 'BTC',
    receivedChain: '',
    status: 'In Progress',
  },
  // Add more sample data as needed
];

const Overview: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  }

  return (
    <div className="py-4 px-36 shadow rounded-lg">
      <SearchBar onSearch={handleSearch} />
      <Info />
      <Table data={sampleData} />
    </div>
  );
};

export default Overview;

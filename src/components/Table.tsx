// src/components/Table.tsx
import React, { useEffect } from 'react';
import { useOrderbookStore } from '../store/useOrderbookStore';
import { Transaction } from '../types';
import Row from './Row';

const Table: React.FC = () => {
  const { orders, fetchOrders } = useOrderbookStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="overflow-x-auto my-8 border-2 border-border rounded-lg">
      <div className="flex justify-between p-4">
        <h1>Transaction Data</h1>
        <div className="flex gap-2">
          <a className="bg-light-gray py-2 px-4 rounded-full" href="">
            Bitcoin
          </a>
          <a className="bg-light-gray py-2 px-4 rounded-full" href="">
            EVM
          </a>
          <a className="bg-light-gray py-2 px-4 rounded-full" href="">
            Solana
          </a>
        </div>
      </div>
      <table className="min-w-full bg-white rounded-lg">
        <thead className="px-12">
          <tr>
            <th className="px-2 py-3 text-left text-xs font-semibold">Created at</th>
            <th className="px-2 py-3 text-left text-xs font-semibold">ID</th>
            <th className="px-2 py-3 text-left text-xs font-semibold">From address</th>
            <th className="px-2 py-3 text-left text-xs font-semibold">Sent amount</th>
            <th className="px-2 py-3 text-left text-xs font-semibold">Received amount</th>
            <th className="px-2 py-3 text-left text-xs font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((transaction: Transaction) => (
            <Row key={transaction.ID} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

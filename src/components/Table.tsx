import { FC, useEffect, useState } from 'react';
import { useOrderbookStore } from '../store/useOrderbookStore';
import { Transaction } from '../types';
import Row from './Row';

const Table: FC = () => {
  const { orders, fetchOrders } = useOrderbookStore();
  const [page, setPage] = useState(1);
  const [perPage] = useState(20); // You can make this a state as well if you want to change perPage dynamically

  useEffect(() => {
    fetchOrders(page, perPage);
  }, [page, perPage, fetchOrders]);

  const handleNextPage = () => setPage(page + 1);
  const handlePrevPage = () => setPage(page - 1);

  return (
    <div className="overflow-x-auto mb-8 px-6 border-2 border-border rounded-2xl">
      <div className="flex justify-between p-4">
        <h1 className="text-xs font-medium">Transaction Data</h1>
        <div className="flex gap-2">
          <a className="bg-light-gray py-1 px-2 font-medium rounded-full" href="">
            Bitcoin
          </a>
          <a className="bg-light-gray py-1 px-2 font-medium rounded-full" href="">
            EVM
          </a>
          <a className="bg-light-gray py-1 px-2 font-medium rounded-full" href="">
            Solana
          </a>
        </div>
      </div>
      <table className="min-w-full bg-white rounded-lg">
        <thead className="px-12">
          <tr>
            <th className="px-2 py-3 text-left text-xs font-medium">Created at</th>
            <th className="px-2 py-3 text-left text-xs font-medium">ID</th>
            <th className="px-2 py-3 text-left text-xs font-medium">From address</th>
            <th className="px-2 py-3 text-left text-xs font-medium">Sent amount</th>
            <th className="px-2 py-3 text-left text-xs font-medium">Received amount</th>
            <th className="px-2 py-3 text-left text-xs font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((transaction: Transaction) => (
            <Row key={transaction.ID} transaction={transaction} />
          ))}
        </tbody>
      </table>
      <div className="flex gap-4 justify-center items-center my-4">
        <button onClick={handlePrevPage} disabled={page === 1} className="bg-light-gray py-2 px-4 rounded-full">
          {`<`}
        </button>
        <span>Page {page} of ...</span>
        <button onClick={handleNextPage} className="bg-light-gray py-2 px-4 rounded-full">
          {`>`}
        </button>
      </div>
    </div>
  );
};

export default Table;

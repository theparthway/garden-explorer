import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOrderbookStore } from '../store/useOrderbookStore';
import { Transaction } from '../types';

import complete from '../assets/complete.svg';
import progress from '../assets/progress.svg';

const TransactionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const fetchOrder = useOrderbookStore((state) => state.fetchOrder);
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    const loadTransaction = async () => {
      const order = await fetchOrder(id!);
      setTransaction(order);
    };

    loadTransaction();
  }, [id, fetchOrder]);

  if (!transaction) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-2xl font-semibold mb-4">Transaction Details</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-semibold">ID:</td>
              <td className="border px-4 py-2">{transaction.ID}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Status:</td>
              <td className="border px-4 py-2">
                <div className={`flex items-center justify-center rounded-full py-2 px-4 ${transaction.status === 'Complete' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {transaction.status}
                  <img src={`${transaction.status === 'Complete' ? complete : progress}`} alt='status icon' className="ml-2 h-5 w-5" />
                </div>
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Transferred:</td>
              <td className="border px-4 py-2">{transaction.initiatorAtomicSwap.amount} {transaction.initiatorAtomicSwap.chain} - {transaction.followerAtomicSwap.amount} {transaction.followerAtomicSwap.chain}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Created At:</td>
              <td className="border px-4 py-2">{transaction.CreatedAt}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Receive Address:</td>
              <td className="border px-4 py-2">{transaction.taker}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Refund Address:</td>
              <td className="border px-4 py-2">{transaction.userBtcWalletAddress}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Deposit Address:</td>
              <td className="border px-4 py-2">{transaction.initiatorAtomicSwap.initiatorAddress}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionDetails;

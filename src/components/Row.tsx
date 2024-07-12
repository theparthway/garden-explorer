// src/components/Row.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Transaction } from '../types';
import { getTrimmedAddress, getStatus } from '../utils/utils';

import complete from '../assets/complete.svg';
import progress from '../assets/progress.svg';

interface RowProps {
  transaction: Transaction;
}

const getAmount = (swap: { amount: number }) => {
  if (swap && swap.amount.toString().length < 10) return swap.amount;
  return "";
}

const Row: React.FC<RowProps> = ({ transaction }) => {
  const id = transaction.ID;
  const fromAddress = getTrimmedAddress(transaction.maker);
  const sentAmount = getAmount(transaction.initiatorAtomicSwap);
  const sentChain = transaction.initiatorAtomicSwap.chain;
  const receivedAmount = getAmount(transaction.followerAtomicSwap);
  const receivedChain = transaction.followerAtomicSwap.chain;
  const status = getStatus(Number(transaction.status));

  return (
    <tr key={transaction.ID}>
      <td className="p-2 border-b border-gray-200">{transaction.CreatedAt}</td>
      <td className="p-2 border-b border-gray-200">
        <Link to={`/tx/${id}`}>{id}</Link>
      </td>
      <td className="p-2 border-b border-gray-200">{fromAddress}</td>
      <td className="p-2 border-b border-gray-200">{sentAmount} {sentChain}</td>
      <td className="p-2 border-b border-gray-200">{receivedAmount} {receivedChain}</td>
      <td className={`p-2 border-b border-gray-200`}>
        <div
          className={`flex justify-evenly rounded-full py-2 text-center ${
            status === 'Settled' ? 'bg-complete' : 'bg-progress'
          }`}
        >
          {status}
          <img src={`${status === 'Settled' ? complete : progress}`} alt="settled icon" />
        </div>
      </td>
    </tr>
  );
};

export default Row;

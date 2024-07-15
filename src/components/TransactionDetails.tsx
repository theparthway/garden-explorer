import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOrderbookStore } from '../store/useOrderbookStore';
import { Transaction } from '../types';
// import { formatDistanceToNow } from 'date-fns';
import { getStatus } from '../utils/utils';

import complete from '../assets/complete.svg';
import progress from '../assets/progress.svg';

// const getAmount = (swap: { amount: number }) => {
//   if (swap && swap.amount.toString().length < 10) return swap.amount;
//   return "";
// }

const TransactionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const fetchOrder = useOrderbookStore((state) => state.fetchOrder);
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  // if (transaction) {
  //   const fromAddress = getTrimmedAddress(transaction?.maker);
  //   const sentAsset = transaction.initiatorAtomicSwap.asset;
  //   const sentAssetShorthand = getAssetShorthand(sentAsset);
  //   const sentChain = transaction.initiatorAtomicSwap.chain;
  //   const receivedAsset = transaction.followerAtomicSwap.asset;
  //   const receivedAssetShorthand = getAssetShorthand(receivedAsset);
  //   const receivedChain = transaction.followerAtomicSwap.chain;
  //   const status = getStatus(Number(transaction.status));
  //   const exponent = getAmountMultiplierExponent(sentAsset, sentChain);
  //   const sentAmount = (Number(getAmount(transaction.initiatorAtomicSwap)) * (10 ** exponent)).toFixed(6);
  //   const receivedAmount = (Number(getAmount(transaction.followerAtomicSwap)) * (10 ** exponent)).toFixed(6);
  //   const createdAt = formatDistanceToNow(new Date(transaction.CreatedAt), { addSuffix: true });
  // }

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
    <div className="flex justify-center mt-28">
      <div className="px-36 w-full">
        <h1 className="text-2xl font-semibold mb-4">Transaction Details</h1>
        <table className="min-w-full text-right bg-white border border-border">
          <tbody>
            <tr>
              <td className="text-left px-4 py-2 font-semibold">ID:</td>
              <td className="px-4 py-2">
                <div className='flex justify-end gap-4'>
                  {transaction.ID}
                  <div
                    className={`flex justify-evenly rounded-full py-2 text-center ${
                      transaction.status === 'Settled' ? 'bg-complete' : 'bg-progress'
                    }`}
                  >
                    {getStatus(Number(status))}
                    <img src={`${transaction.status === 'Settled' ? complete : progress}`} alt="settled icon" />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="text-left px-4 py-2 font-semibold">Transferred:</td>
              <td className="px-4 py-2">{transaction.initiatorAtomicSwap.amount} {transaction.initiatorAtomicSwap.chain} - {transaction.followerAtomicSwap.amount} {transaction.followerAtomicSwap.chain}</td>
            </tr>
            <tr>
              <td className="text-left px-4 py-2 font-semibold">Created At:</td>
              <td className="px-4 py-2">{transaction.CreatedAt}</td>
            </tr>
            <tr>
              <td className="text-left px-4 py-2 font-semibold">Receive Address:</td>
              <td className="px-4 py-2">{transaction.taker}</td>
            </tr>
            <tr>
              <td className="text-left px-4 py-2 font-semibold">Refund Address:</td>
              <td className="px-4 py-2">{transaction.userBtcWalletAddress}</td>
            </tr>
            <tr>
              <td className="text-left px-4 py-2 font-semibold">Deposit Address:</td>
              <td className="px-4 py-2">{transaction.initiatorAtomicSwap.initiatorAddress}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionDetails;

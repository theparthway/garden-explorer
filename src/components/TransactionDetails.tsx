import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useOrderbookStore } from '../store/useOrderbookStore';
import { Transaction } from '../types';
import { 
  getStatus, 
  getAmountMultiplierExponent, 
  getAssetShorthand,
  getChainIcon,
  getAssetIcon,
  getValidAmount,
} from '../utils/utils';

import complete from '../assets/complete.svg';
import progress from '../assets/progress.svg';

import rightArrow from '../assets/icons/rightArrow.svg';
import leftArrow from '../assets/icons/leftArrow.svg';
import CopyButton from './CopyButton';

interface TransactionDetailsProps {}

const TransactionDetails: FC<TransactionDetailsProps> = () => {
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

  const sentAsset = transaction.initiatorAtomicSwap.asset;
  const sentAssetShorthand = getAssetShorthand(sentAsset);
  const sentChain = transaction.initiatorAtomicSwap.chain;
  const receivedAsset = transaction.followerAtomicSwap.asset;
  const receivedAssetShorthand = getAssetShorthand(receivedAsset);
  const receivedChain = transaction.followerAtomicSwap.chain;
  const receiveAddress = (receivedAssetShorthand === "BTC") ? transaction.userBtcWalletAddress : transaction.taker;
  const refundAddress = (sentAssetShorthand === "BTC") ? transaction.userBtcWalletAddress : transaction.maker;
  const depositAddress = "";
  const status = getStatus(Number(transaction.status));
  const exponent = getAmountMultiplierExponent(sentAsset, sentChain);
  const sentAmount = (Number(getValidAmount(transaction.initiatorAtomicSwap)) * (10 ** exponent)).toFixed(6);
  const receivedAmount = (Number(getValidAmount(transaction.followerAtomicSwap)) * (10 ** exponent)).toFixed(6);
  const fee = Number(Number(sentAmount) - Number(receivedAmount)).toFixed(6);
  const createdAt = format(new Date(transaction.CreatedAt), 'yyyy-MM-dd HH:mm');

  return (
    <div className="flex justify-center mt-20">
      <div className="px-36 w-full">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold mb-4">Transaction Details</h1>
          <a href="/"><img src={leftArrow} alt='left arrow' /></a>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="min-w-full text-right">
            <tbody>
              <tr>
                <td className="text-left px-4 py-2 font-medium">Order ID & Status:</td>
                <td className="px-4 py-2">
                  <div className='flex justify-end items-center gap-4'>
                    {id}
                    <div
                      className={`flex gap-2 rounded-full p-2 text-center ${
                        status === 'Settled' ? 'bg-complete' : 'bg-progress'
                      }`}
                    >
                    {status}
                    <img src={`${status === 'Settled' ? complete : progress}`} alt="settled icon" />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="text-left px-4 py-2 font-medium">Transferred:</td>
              <td className="flex justify-end gap-4 px-4 py-2">
                <div className='flex items-center gap-2'>
                  {sentAmount} 
                  <img src={getAssetIcon(sentAssetShorthand)} alt={sentAssetShorthand} /> 
                  {getChainIcon(sentChain) !== "" && <img src={getChainIcon(sentChain)} alt={sentChain} />}
                </div>
                <img src={rightArrow} alt="right arrow" />
                <div className='flex items-center gap-2'>
                  {receivedAmount} 
                  <img src={getAssetIcon(receivedAssetShorthand)} alt={receivedAssetShorthand} />
                  {getChainIcon(receivedChain) !== "" && <img src={getChainIcon(receivedChain)} alt={receivedChain} />}
                </div>
              </td>
            </tr>
            <tr>
              <td className="text-left px-4 py-2 font-medium">Fees spent:</td>
              <td className="px-4 py-2">{fee}</td>
            </tr>
            <tr>
              <td className="text-left px-4 py-2 font-medium">Created At:</td>
              <td className="px-4 py-2">{createdAt}</td>
            </tr>
            <tr>
              <td className="text-left px-4 py-2 font-medium">Receive Address:</td>
              <td className="px-4 py-2">
                {receiveAddress}
                <CopyButton textToCopy={receiveAddress} />
              </td>
            </tr>
            <tr>
              <td className="text-left px-4 py-2 font-medium">Refund Address:</td>
              <td className="px-4 py-2">
                {refundAddress}
                <CopyButton textToCopy={refundAddress} />
              </td>
            </tr>
            <tr>
              <td className="text-left px-4 py-2 font-medium">Deposit Address:</td>
              <td className="px-4 py-2">
                {depositAddress}
                {/* <CopyButton textToCopy={depositAddress} /> */}
              </td>
            </tr>
            <tr>
              <td className="text-left px-4 py-2 font-medium">Deposit TX 1:</td>
              <td className="px-4 py-2">{}</td>
            </tr>
            {status === "Settled" && <tr>
              <td className="text-left px-4 py-2 font-medium">Deposit TX 2:</td>
              <td className="px-4 py-2">{}</td>
            </tr>}
            <tr>
              <td className="text-left px-4 py-2 font-medium">Counterparty Deposit TX:</td>
              <td className="px-4 py-2">{}</td>
            </tr>
            <tr>
              <td className="text-left px-4 py-2 font-medium">Claim TX:</td>
              <td className="px-4 py-2">{}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
};

export default TransactionDetails;

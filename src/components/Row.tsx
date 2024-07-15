import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Transaction } from '../types';
import { getTrimmedAddress, getStatus, getAmountMultiplierExponent, getAssetShorthand } from '../utils/utils';

import complete from '../assets/complete.svg';
import progress from '../assets/progress.svg';

import BTCIcon from '../assets/icons/BTCAsset.svg';
import WBTCIcon from '../assets/icons/WBTCAsset.svg';
import arbitrumIcon from '../assets/icons/arbitrumChain.svg';
import evmIcon from '../assets/icons/EVMChain.svg';

interface RowProps {
  transaction: Transaction;
}

const getAmount = (swap: { amount: number }) => {
  if (swap && swap.amount.toString().length < 10) return swap.amount;
  return "";
}

const getAssetIcon = (asset: string) => {
  if (asset === "BTC") return BTCIcon;
  else if (asset === "WBTC") return WBTCIcon;
  else return "";
}

const getChainIcon = (chain: string) => {
  if (chain === "bitcoin") return "";
  else if (chain === "ethereum_arbitrum") return arbitrumIcon;
  else if (chain === "ethereum_sepolia" || chain === "ethereum") return evmIcon;
  else return "";
}

const Row: React.FC<RowProps> = ({ transaction }) => {
  const id = transaction.ID;
  const fromAddress = getTrimmedAddress(transaction.maker);
  const sentAsset = transaction.initiatorAtomicSwap.asset;
  const sentAssetShorthand = getAssetShorthand(sentAsset);
  const sentChain = transaction.initiatorAtomicSwap.chain;
  const receivedAsset = transaction.followerAtomicSwap.asset;
  const receivedAssetShorthand = getAssetShorthand(receivedAsset);
  const receivedChain = transaction.followerAtomicSwap.chain;
  const status = getStatus(Number(transaction.status));
  const exponent = getAmountMultiplierExponent(sentAsset, sentChain);
  const sentAmount = (Number(getAmount(transaction.initiatorAtomicSwap)) * (10 ** exponent)).toFixed(6);
  const receivedAmount = (Number(getAmount(transaction.followerAtomicSwap)) * (10 ** exponent)).toFixed(6);
  const createdAt = formatDistanceToNow(new Date(transaction.CreatedAt), { addSuffix: true });

  return (
    <tr key={transaction.ID}>
        
        <td className="p-2 border-b border-gray-200">{createdAt}</td>
        <td className="p-2 border-b border-gray-200"><Link to={`/tx/${id}`}>{id}</Link></td>
        <td className="p-2 border-b border-gray-200">{fromAddress}</td>
        <td className="p-2 border-b border-gray-200">
          <div className='flex items-center gap-2'>
            {sentAmount} 
            <img src={getAssetIcon(sentAssetShorthand)} alt={sentAssetShorthand} /> 
            {getChainIcon(sentChain) !== "" && <img src={getChainIcon(sentChain)} alt={sentChain} />}
          </div>
        </td>
        <td className="p-2 border-b border-gray-200">
          <div className='flex items-center gap-2'>
            {receivedAmount} 
            <img src={getAssetIcon(receivedAssetShorthand)} alt={receivedAssetShorthand} />
            {getChainIcon(receivedChain) !== "" && <img src={getChainIcon(receivedChain)} alt={receivedChain} />}
          </div>
        </td>
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

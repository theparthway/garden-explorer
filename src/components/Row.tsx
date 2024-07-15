import { FC } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Transaction } from '../types';
import { 
	getTrimmedAddress, 
	getStatus, 
	getAmountMultiplierExponent, 
	getAssetShorthand, 
	getChainIcon, 
	getAssetIcon, 
	getValidAmount 
} from '../utils/utils';

import complete from '../assets/complete.svg';
import progress from '../assets/progress.svg';

interface RowProps {
  transaction: Transaction;
}

const Row: FC<RowProps> = ({ transaction }) => {
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
  const sentAmount = (Number(getValidAmount(transaction.initiatorAtomicSwap)) * (10 ** exponent)).toFixed(6);
  const receivedAmount = (Number(getValidAmount(transaction.followerAtomicSwap)) * (10 ** exponent)).toFixed(6);
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
            className={`flex justify-center gap-4 rounded-full py-2 text-center ${
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

import { FC, useState } from 'react';
import copyIcon from '../assets/icons/copy.svg';
import tickmarkIcon from '../assets/icons/tickmark.svg';

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: FC<CopyButtonProps> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="px-2 py-2 text-white rounded-md"
    >
      <img src={copied ? tickmarkIcon : copyIcon} alt='copy' />
    </button>
  );
};

export default CopyButton;

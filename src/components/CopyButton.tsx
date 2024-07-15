import React, { useState } from 'react';
import copyIcon from '../assets/icons/copy.svg';
import tickmarkIcon from '../assets/icons/tickmark.svg';

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none"
    >
      <img src={copied ? copyIcon : tickmarkIcon} alt='copy' />
    </button>
  );
};

export default CopyButton;

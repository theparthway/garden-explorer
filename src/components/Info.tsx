import React from 'react';
import Box from './Box';

const Info: React.FC = () => {
  return (
    <div className="flex justify-evenly p-4 shadow rounded-lg">
      <Box header='Total Volume' total='$667,055,243.87' change={2016305.74} />
      <Box header='Total Transactions' total='55,243' change={305} />
      <Box header='SEED price' total='$0.1592' change={-0.0021} />
      <Box header='SEED staked' total='49.21%' change={0.21} />
    </div>
  );
};

export default Info;

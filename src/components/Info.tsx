import { FC, useEffect, useState } from 'react';
import Box from './Box';
import { getTotalVolume, getTotalStaked, getDailyVolume } from '../utils/utils';
import { CIRCULATING_SEED_SUPPLY } from '../constants/global';

const Info: FC = () => {
  const [totalVolume, setTotalVolume] = useState<number>(0);
  const [totalStaked, setTotalStaked] = useState<number>(0);
  const [dailyVolume, setDailyVolume] = useState<number>(0);
  const percentageSeedLocked = Math.min(
    (+totalStaked * 100) / CIRCULATING_SEED_SUPPLY,
    100
  );

  useEffect(() => {
    const fetchVolume = async () => {
      const volume = await getTotalVolume();
      setTotalVolume(volume);
    };

    const fetchTotalStaked = async () => {
      const staked = await getTotalStaked();
      setTotalStaked(staked);
    }

    const fetchDailyVolume = async () => {
      const dailyVol = await getDailyVolume();
      
    }

    fetchVolume();
    fetchTotalStaked();
  }, []);

  return (
    <div className="flex justify-between py-8">
      <Box header="Total Volume" total={`$${totalVolume?.toLocaleString()}`} change={2016305.74} />
      <Box header="Total Transactions" total="55,243" change={305} />
      <Box header="SEED price" total="$0.04467" change={-0.0021} />
      <Box header="SEED staked" total={`${percentageSeedLocked?.toLocaleString()}%`} change={0.21} />
    </div>
  );
};

export default Info;

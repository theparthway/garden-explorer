import BTCIcon from '../assets/icons/BTCAsset.svg';
import WBTCIcon from '../assets/icons/WBTCAsset.svg';
import arbitrumIcon from '../assets/icons/arbitrumChain.svg';
import evmIcon from '../assets/icons/EVMChain.svg';
import { SEED_DECIMALS, SupportedChains } from '../constants/global';
import axios from 'axios';
import BigNumber from 'bignumber.js';
import { Transaction } from '../types';

export const getTrimmedAddress = (address: string) => 
    `${address.slice(0,6)}...${address.slice(-4)}`;

export const getStatus = (status: number) => {
    switch (status) {
        case 1:
            return "Created";
        case 2:
            return "Matched";
        case 3:
            return "Settled";
        case 4:
            return "Order SoftFailed";
        case 5:
            return "Order HardFailed";
        case 6:
            return "Order Cancelled";
        default:
            return "";
    }
}

export const getAmountMultiplierExponent = (asset: string, chain: string) => {
    if (asset === "0x203DAC25763aE783Ad532A035FfF33d8df9437eE" && chain === "ethereum_arbitrum") {
        return -8;
    } else if (asset === "0x130Ff59B75a415d0bcCc2e996acAf27ce70fD5eF" && chain === "ethereum_sepolia") {
        return -8;
    } else if (asset === "0xA5E38d098b54C00F10e32E51647086232a9A0afD" && chain === "ethereum") {
        return -8;
    } else if (asset === "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" && chain === "ethereum_localnet") {
        return -8;
    } else if (asset === "primary" && chain === "bitcoin_testnet") {
        return -8;
    } else if (asset === "primary" && chain === "bitcoin") {
        return -8;
    }
    else return 1;
}

export const getAssetShorthand = (asset: string) => {
    if (asset === "0x203DAC25763aE783Ad532A035FfF33d8df9437eE" || asset === "0x130Ff59B75a415d0bcCc2e996acAf27ce70fD5eF" || asset === "0xA5E38d098b54C00F10e32E51647086232a9A0afD" || asset === "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512")
        return "WBTC";
    else return "BTC";
}

export const getAssetIcon = (asset: string) => {
    if (asset === "BTC") return BTCIcon;
    else if (asset === "WBTC") return WBTCIcon;
    else return "";
  }
  
export const getChainIcon = (chain: string) => {
    if (chain === "bitcoin") return "";
    else if (chain === "ethereum_arbitrum") return arbitrumIcon;
    else if (chain === "ethereum_sepolia" || chain === "ethereum" || chain === "ethereum_localnet") return evmIcon;
    else return "";
}

export const getValidAmount = (swap: { amount: number }) => {
    if (swap && swap.amount.toString().length < 10) return swap.amount;
    return "";
}

export const getTotalVolume = async (): Promise<number> => {
    const chains = [
      SupportedChains.bitcoin,
      SupportedChains.ethereum,
      SupportedChains.ethereum_arbitrum,
    ];
    const responses = await Promise.all(
      chains.map((chain) =>
        axios
          .get(`${import.meta.env.VITE_PUBLIC_REFERRAL_API}/volume?chain=${chain}`)
          .then((response) => ({
            success: true,
            volume: response.data.data.volume,
          }))
          .catch(() => ({ success: false, volume: 0 }))
      )
    );
    const successfulResponses = responses
      .filter((response) => response.success)
      .map((response) => response.volume);
    return Math.floor(successfulResponses.reduce((acc, curr) => acc + curr, 0));
};

export const getDailyVolume = (transactions: Transaction[]) => {
    // Get current date in UTC
    const currentDate = new Date();
    const currentYear = currentDate.getUTCFullYear();
    const currentMonth = currentDate.getUTCMonth(); // Months are zero-based
    const currentDay = currentDate.getUTCDate();
  
    // Set start time to 00:00:00 UTC
    const startTime = new Date(
      Date.UTC(currentYear, currentMonth, currentDay, 0, 0, 0, 0)
    );
  
    // Set end time to 23:59:59.999 UTC
    const endTime = new Date(
      Date.UTC(currentYear, currentMonth, currentDay, 23, 59, 59, 999)
    );
  
    // Filter transactions for today
    const transactionsToday = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.CreatedAt);
      return (
        transactionDate >= startTime &&
        transactionDate <= endTime &&
        [0, 1, 2, 3].includes(transaction.status)
      );
    });
    if (transactionsToday.length > 0) {
      const todayVolume = transactionsToday.reduce(
        (acc, curr) => acc + Number(curr.initiatorAtomicSwap.amount),
        0
      );
  
      return todayVolume / 10 ** 8;
    }
    return 0;
  };

export const formatUnits = (value: string, units: number, toFixed?: number) => {
    if (toFixed) {
      return new BigNumber(value).dividedBy(10 ** units).toFixed(toFixed);
    }
    return new BigNumber(value).dividedBy(10 ** units).toString();
};

export const getTotalStaked = async (): Promise<number> => {
    const responses = await axios.get<{ data: { totalStaked: string, ast: string } }>(
        `${import.meta.env.VITE_PUBLIC_STAKING_URL}/stakingStats`
    )
    return Number(formatUnits(responses.data.data.totalStaked, SEED_DECIMALS));
}
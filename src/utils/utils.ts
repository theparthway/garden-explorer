import BTCIcon from '../assets/icons/BTCAsset.svg';
import WBTCIcon from '../assets/icons/WBTCAsset.svg';
import arbitrumIcon from '../assets/icons/arbitrumChain.svg';
import evmIcon from '../assets/icons/EVMChain.svg';

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
    } else if (asset === "primary" && chain === "bitcoin_testnet") {
        return -8;
    } else if (asset === "primary" && chain === "bitcoin") {
        return -8;
    }
    else return 1;
}

export const getAssetShorthand = (asset: string) => {
    if (asset === "0x203DAC25763aE783Ad532A035FfF33d8df9437eE" || asset === "0x130Ff59B75a415d0bcCc2e996acAf27ce70fD5eF" || asset === "0xA5E38d098b54C00F10e32E51647086232a9A0afD")
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
    else if (chain === "ethereum_sepolia" || chain === "ethereum") return evmIcon;
    else return "";
}

export const getValidAmount = (swap: { amount: number }) => {
    if (swap && swap.amount.toString().length < 10) return swap.amount;
    return "";
}
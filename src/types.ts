// src/types.ts
export interface Transaction {
    CreatedAt: string;
    ID: string;
    maker: string;
    taker: string;
    userBtcWalletAddress: string;
    initiatorAtomicSwap: {
      initiatorAddress: string;
      amount: number;
      chain: string;
      asset: string;
    };
    followerAtomicSwap: {
      redeemerAddress: string;
      amount: number;
      chain: string;
      asset: string;
    }
    status: string;
  }
  
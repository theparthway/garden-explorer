// src/types.ts
export interface Transaction {
    createdAt: string;
    id: string;
    fromAddress: string;
    sentAmount: number;
    sentAsset: string;
    sentChain: string;
    receivedAmount: number;
    receivedAsset: string;
    receivedChain: string;
    status: string;
  }
  
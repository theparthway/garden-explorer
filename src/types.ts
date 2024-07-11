// src/types.ts
export interface Transaction {
    createdAt: string;
    id: string;
    fromAddress: string;
    sentAmount: number;
    sentAsset: string;
    receivedAmount: number;
    receivedAsset: string;
    status: string;
  }
  
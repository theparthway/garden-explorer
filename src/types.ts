// src/types.ts
export interface Transaction {
    createdAt: string;
    id: string;
    depositAddress: string;
    receiveAddress: string;
    refundAddress: string;
    sentAmount: number;
    sentAsset: string;
    receivedAmount: number;
    receivedAsset: string;
    status: string;
  }
  
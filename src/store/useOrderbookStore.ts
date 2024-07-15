import { create } from 'zustand';
import { OrderbookProvider } from '../utils/orderbookProvider';
import { Transaction } from '../types';

interface OrderbookState {
  orders: Transaction[];
  fetchOrders: () => Promise<void>;
  fetchOrder: (id: string) => Promise<Transaction | null>;
}

const orderbookProvider = new OrderbookProvider(import.meta.env.VITE_API_BASE_URL);

export const useOrderbookStore = create<OrderbookState>((set) => ({
  orders: [],
  fetchOrders: async () => {
    const orders = await orderbookProvider.getOrders();
    set({ orders });
  },
  fetchOrder: async (id: string) => {
    const order = await orderbookProvider.getOrder(id);
    return order;
  }
}));

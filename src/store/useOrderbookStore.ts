import { create } from 'zustand';
import { OrderbookProvider } from '../utils/orderbookProvider';
import { Transaction } from '../types';

interface OrderbookState {
  orders: Transaction[];
  fetchOrders: (page?: number, perPage?: number) => Promise<void>;
  fetchOrder: (id: string) => Promise<Transaction | null>;
}

const orderbookProvider = new OrderbookProvider(import.meta.env.VITE_API_BASE_URL);

export const useOrderbookStore = create<OrderbookState>((set) => ({
  orders: [],
  fetchOrders: async (page = 1, perPage = 20) => {
    const orders = await orderbookProvider.getOrders(page, perPage);
    set({ orders });
  },
  fetchOrder: async (id: string) => {
    const order = await orderbookProvider.getOrder(id);
    return order;
  }
}));

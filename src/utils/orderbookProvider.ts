export class OrderbookProvider {
    private baseUrl: string;
  
    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }
  
    async getOrders() {
      try {
        const response = await fetch(`${this.baseUrl}/orders?verbose=true`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
      }
    }
  
    async getOrder(id: string) {
      try {
        const response = await fetch(`${this.baseUrl}/orders/${id}?verbose=true`);
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }
        return await response.json();
      } catch (error) {
        console.error(`Error fetching order with ID ${id}:`, error);
        return null;
      }
    }
  }
  
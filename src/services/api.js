// ─── API Service ───────────────────────────────
// Placeholder for future API integration.
// All API calls will be centralized here.

const API_BASE_URL = '/api'

export const api = {
  // Customer
  getMenu: async () => {},
  placeOrder: async () => {},
  getOrders: async () => {},
  submitReview: async () => {},
  getProfile: async () => {},

  // Chef
  getOrderQueue: async () => {},
  updateOrderStatus: async () => {},
  getInventory: async () => {},
  logWastage: async () => {},
  getSchedule: async () => {},

  // Owner
  getSales: async () => {},
  getRevenue: async () => {},
  getProfitLoss: async () => {},
  getEmployees: async () => {},
  getAnalytics: async () => {},
}

export default api

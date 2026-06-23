import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag } from 'lucide-react'
import OrderCard from '../../components/customer/OrderCard'

const MOCK_ORDERS = [
  {
    id: 'ORD-7392',
    date: '2026-06-23T19:10:00Z',
    status: 'Preparing', 
    total: 210,
    items: [
      { name: 'Masala Dosa', quantity: 2 },
      { name: 'Filter Coffee', quantity: 1 }
    ],
    restaurant: 'Tiffins Yash - Kukatpally'
  },
  {
    id: 'ORD-7390',
    date: '2026-06-21T09:15:00Z',
    status: 'Delivered',
    total: 150,
    items: [
      { name: 'Idli Sambar', quantity: 3 }
    ],
    restaurant: 'Tiffins Yash - Kukatpally'
  },
  {
    id: 'ORD-7201',
    date: '2026-06-18T19:45:00Z',
    status: 'Delivered',
    total: 350,
    items: [
      { name: 'Chicken Biryani', quantity: 1 },
      { name: 'Paneer Butter Masala', quantity: 1 }
    ],
    restaurant: 'Tiffins Yash - Kukatpally'
  },
  {
    id: 'ORD-7105',
    date: '2026-06-15T08:30:00Z',
    status: 'Cancelled',
    total: 120,
    items: [
      { name: 'Veg Thali', quantity: 1 }
    ],
    restaurant: 'Tiffins Yash - Kukatpally'
  }
]

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredOrders = MOCK_ORDERS.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    
    if (activeTab === 'All') return matchesSearch
    if (activeTab === 'Active') return matchesSearch && ['Preparing', 'On the way'].includes(order.status)
    if (activeTab === 'Past') return matchesSearch && ['Delivered', 'Cancelled'].includes(order.status)
    return matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-poppins text-dark">Order History</h1>
          <p className="text-sm text-muted mt-1">Track your recent orders and reorder your favorites.</p>
        </div>
      </motion.div>

      {/* Controls: Tabs & Search */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-card p-2 rounded-2xl border border-border shadow-sm"
      >
        {/* Tabs */}
        <div className="flex w-full lg:w-auto bg-gray-50/50 p-1 rounded-xl">
          {['All', 'Active', 'Past'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 lg:px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-white text-primary shadow-sm ring-1 ring-border' 
                  : 'text-muted hover:text-dark hover:bg-white/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-96 flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-muted" />
          <input 
            type="text" 
            placeholder="Search by order ID or item name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-border bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </motion.div>

      {/* Orders Grid */}
      {filteredOrders.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredOrders.map((order, idx) => (
              <OrderCard key={order.id} order={order} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 bg-card rounded-2xl border border-border border-dashed"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <ShoppingBag className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-dark">No orders found</h3>
          <p className="text-sm text-muted mt-1 text-center max-w-sm">
            We couldn't find any orders matching your criteria. Try adjusting your filters.
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default OrderHistory

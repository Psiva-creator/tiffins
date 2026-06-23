import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Package,
  AlertTriangle,
  Search,
  Filter,
  Plus,
  Minus,
  CheckCircle,
  Truck,
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
  ArrowUpRight
} from 'lucide-react'
import InventoryCard from '../../components/owner/InventoryCard'

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  // Mock initial inventory items list in React state to make adjustments interactive
  const [items, setItems] = useState([
    // Dairy
    { id: 1, name: 'Milk', category: 'Dairy', stock: 8, unit: 'Liters', minStock: 15, lastRestocked: 'Yesterday', price: 60 },
    { id: 2, name: 'Paneer (Cottage Cheese)', category: 'Dairy', stock: 3, unit: 'Kgs', minStock: 10, lastRestocked: '2 days ago', price: 320 },
    { id: 3, name: 'Butter', category: 'Dairy', stock: 12, unit: 'Kgs', minStock: 8, lastRestocked: 'Yesterday', price: 420 },
    { id: 4, name: 'Curd (Yoghurt)', category: 'Dairy', stock: 20, unit: 'Liters', minStock: 15, lastRestocked: 'Today', price: 50 },

    // Vegetables
    { id: 5, name: 'Tomatoes', category: 'Vegetables', stock: 6, unit: 'Kgs', minStock: 12, lastRestocked: 'Today', price: 40 },
    { id: 6, name: 'Onions', category: 'Vegetables', stock: 45, unit: 'Kgs', minStock: 25, lastRestocked: '3 days ago', price: 30 },
    { id: 7, name: 'Potatoes', category: 'Vegetables', stock: 38, unit: 'Kgs', minStock: 20, lastRestocked: '4 days ago', price: 25 },
    { id: 8, name: 'Green Chillies', category: 'Vegetables', stock: 4, unit: 'Kgs', minStock: 5, lastRestocked: 'Yesterday', price: 80 },

    // Groceries
    { id: 9, name: 'Sona Masuri Rice', category: 'Groceries', stock: 150, unit: 'Kgs', minStock: 100, lastRestocked: '5 days ago', price: 55 },
    { id: 10, name: 'Urad Dal (Black Gram)', category: 'Groceries', stock: 40, unit: 'Kgs', minStock: 30, lastRestocked: '5 days ago', price: 120 },
    { id: 11, name: 'Refined Sunflower Oil', category: 'Groceries', stock: 15, unit: 'Liters', minStock: 20, lastRestocked: '6 days ago', price: 140 },

    // Beverages & Miscellaneous
    { id: 12, name: 'Filter Coffee Powder', category: 'Beverages', stock: 14, unit: 'Kgs', minStock: 10, lastRestocked: '2 days ago', price: 450 },
    { id: 13, name: 'Tea Leaves (Assam CTC)', category: 'Beverages', stock: 8, unit: 'Kgs', minStock: 5, lastRestocked: '3 days ago', price: 350 },
    { id: 14, name: 'Sugar', category: 'Groceries', stock: 45, unit: 'Kgs', minStock: 30, lastRestocked: '4 days ago', price: 42 }
  ])

  // Restock handler: Increments item stock to optimal level
  const handleRestock = (itemName) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.name === itemName) {
          const optimalLevel = item.minStock * 2.5
          return {
            ...item,
            stock: Math.round(optimalLevel),
            lastRestocked: 'Just Now'
          }
        }
        return item
      })
    )
    alert(`Triggered restocking request for ${itemName}. Stock level refilled to optimal safety levels.`)
  }

  // Quick manually increment/decrement quantity in table/controls
  const adjustStock = (id, amount) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newStock = Math.max(0, item.stock + amount)
          return { ...item, stock: newStock }
        }
        return item
      })
    )
  }

  // Filter computations
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory
    return matchesSearch && matchesCategory
  })

  // Summary Metrics
  const totalValue = items.reduce((sum, item) => sum + (item.stock * item.price), 0)
  const lowStockCount = items.filter(item => item.stock <= item.minStock).length
  const outOfStockCount = items.filter(item => item.stock === 0).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-poppins)] text-dark mb-1">
            Store Inventory
          </h1>
          <p className="text-[#888] text-xs md:text-sm font-medium">Sri Sai Darshini — Real-time raw ingredients tracking and alerts</p>
        </div>

        <button
          onClick={() => alert('Sending bulk order requisition request to vendors...')}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-[#B71C1C] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:shadow-lg hover:shadow-primary/10 transition-all self-start sm:self-center cursor-pointer"
        >
          <Truck className="w-4 h-4 text-white" />
          <span>Requisition Order</span>
        </button>
      </motion.div>

      {/* Inventory Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-semibold">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl border border-[#F5F5F5] p-5 hover:shadow-md transition-shadow relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <p className="text-xs text-muted uppercase tracking-wider">Total Value of Stock</p>
          <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-dark mt-1">₹{totalValue.toLocaleString()}</p>
          <span className="text-[10px] text-green font-bold bg-[rgba(198,40,40,0.06)] px-2 py-0.5 rounded-full mt-2.5 inline-block">
            Estimated asset valuation
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="bg-white rounded-2xl border border-[#F5F5F5] p-5 hover:shadow-md transition-shadow"
        >
          <p className="text-xs text-muted uppercase tracking-wider">Total Stock Items</p>
          <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-dark mt-1">{items.length} items</p>
          <span className="text-[10px] text-muted bg-[#F5F5F5] border border-[#E0E0E0] px-2 py-0.5 rounded-full mt-2.5 inline-block">
            Across 4 departments
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.16 }}
          className="bg-white rounded-2xl border border-[#F5F5F5] p-5 hover:shadow-md transition-shadow"
        >
          <p className="text-xs text-muted uppercase tracking-wider">Low Stock Alerts</p>
          <p className={`text-2xl font-bold font-[family-name:var(--font-poppins)] mt-1 ${lowStockCount > 0 ? 'text-[#D97706]' : 'text-green'}`}>
            {lowStockCount} Alerts
          </p>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-2.5 inline-block ${
            lowStockCount > 0 ? 'bg-[#FEF3C7] text-[#D97706]' : 'bg-[rgba(198,40,40,0.06)] text-green'
          }`}>
            {lowStockCount > 0 ? 'Needs replenishment' : 'All optimal'}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.24 }}
          className="bg-white rounded-2xl border border-[#F5F5F5] p-5 hover:shadow-md transition-shadow"
        >
          <p className="text-xs text-muted uppercase tracking-wider">Out of Stock</p>
          <p className={`text-2xl font-bold font-[family-name:var(--font-poppins)] mt-1 ${outOfStockCount > 0 ? 'text-primary animate-pulse' : 'text-dark'}`}>
            {outOfStockCount} Items
          </p>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-2.5 inline-block ${
            outOfStockCount > 0 ? 'bg-[rgba(198,40,40,0.08)] text-primary border border-[#C62828]/20' : 'bg-[rgba(198,40,40,0.06)] text-green'
          }`}>
            {outOfStockCount > 0 ? 'Urgent attention' : 'No shortages'}
          </span>
        </motion.div>

      </div>

      {/* Interactive Stock List Ledger */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white border border-[#F5F5F5] rounded-2xl p-5 md:p-6 shadow-sm"
      >
        {/* Table header toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-bold font-[family-name:var(--font-poppins)] text-base text-dark flex items-center gap-2">
              <Package className="w-5 h-5 text-[#C62828]" />
              Inventory Stock Ledger
            </h3>
            <p className="text-xs text-muted font-medium mt-0.5">Click Restock or toggle quantities manually</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative w-full xs:w-56">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
              <input
                type="text"
                placeholder="Search raw items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#F5F5F5] bg-background rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-semibold"
              />
            </div>

            {/* Category selection */}
            <div className="flex bg-[#F5F5F5] border border-[#E0E0E0] p-1 rounded-xl items-center flex-wrap">
              {['All', 'Dairy', 'Vegetables', 'Groceries', 'Beverages'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-muted hover:text-dark'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Inventory Cards Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 mb-8">
          {filteredItems.map((item, idx) => (
            <InventoryCard
              key={item.id}
              name={item.name}
              category={item.category}
              stock={item.stock}
              unit={item.unit}
              minStock={item.minStock}
              lastRestocked={item.lastRestocked}
              onRestock={handleRestock}
              index={idx}
            />
          ))}
          {filteredItems.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted font-medium text-xs">
              No matching inventory items found.
            </div>
          )}
        </div>

        {/* Detailed manual quantities table */}
        <div className="border-t border-[#F5F5F5]/60 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <h4 className="font-bold text-xs text-dark uppercase tracking-wider">Quick Audit Table</h4>
            <div className="flex items-center gap-1 text-[10px] font-bold text-green bg-[rgba(198,40,40,0.06)] px-2 py-0.5 rounded-full border border-[#C62828]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Use +/- buttons to test real-time warning indicators above!</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#F5F5F5]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F5F5F5] border-b border-[#F5F5F5]/80 text-[11px] font-bold text-muted uppercase tracking-wider">
                  <th className="p-4">Item Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4 text-center">Safety Level</th>
                  <th className="p-4 text-center">In-Stock Qty</th>
                  <th className="p-4 text-center">Adjust Stock</th>
                  <th className="p-4 text-right">Value (INR)</th>
                  <th className="p-4 text-center">Vendor Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F5F5] text-xs font-semibold text-[#1A1A1A]">
                {filteredItems.map((item) => {
                  const isLow = item.stock <= item.minStock
                  return (
                    <tr key={item.id} className="hover:bg-[#F5F5F5]/40 transition-colors">
                      <td className="p-4 font-bold text-[#1A1A1A]">{item.name}</td>
                      <td className="p-4 text-[#888]">{item.category}</td>
                      <td className="p-4 text-center font-mono font-medium">{item.minStock} {item.unit}</td>
                      <td className="p-4 text-center font-mono">
                        <span className={`px-2.5 py-1 rounded-lg ${
                          item.stock === 0 ? 'bg-[rgba(198,40,40,0.08)] text-primary border border-[#C62828]/20' :
                          isLow ? 'bg-[#FEF3C7] text-[#D97706] border border-[#F59E0B]/20' :
                          'bg-[rgba(198,40,40,0.06)] text-green border border-[#C62828]/20'
                        }`}>
                          {item.stock} {item.unit}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => adjustStock(item.id, -1)}
                            className="p-1 bg-[#F5F5F5] border border-[#E0E0E0] hover:border-primary/30 rounded-lg hover:text-primary transition-colors cursor-pointer"
                            title="Subtract 1 unit"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => adjustStock(item.id, 1)}
                            className="p-1 bg-[#F5F5F5] border border-[#E0E0E0] hover:border-[#C62828]/30 rounded-lg hover:text-green transition-colors cursor-pointer"
                            title="Add 1 unit"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-right font-mono font-bold">₹{(item.stock * item.price).toLocaleString()}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleRestock(item.name)}
                          className="text-[10px] font-bold text-primary bg-[rgba(198,40,40,0.08)] hover:bg-[rgba(198,40,40,0.08)]/80 border border-[#C62828]/10 px-2.5 py-1 rounded-xl transition-all cursor-pointer"
                        >
                          Auto Restock
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

      </motion.div>
    </div>
  )
}

export default Inventory

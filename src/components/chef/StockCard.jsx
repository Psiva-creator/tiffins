import { motion } from 'framer-motion'
import { Package } from 'lucide-react'

const StockCard = ({ index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-card rounded-2xl border border-border p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-green/10 flex items-center justify-center">
          <Package className="w-5 h-5 text-green" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-dark">Item Name</h4>
          <p className="text-xs text-muted">Category</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted">Quantity</p>
          <p className="text-sm font-bold text-dark">-- units</p>
        </div>
        <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-green/10 text-green">In Stock</span>
      </div>
    </motion.div>
  )
}

export default StockCard

import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'

const FoodCard = ({ index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="h-40 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
        <span className="text-sm text-muted">Food Image</span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold font-[family-name:var(--font-poppins)] text-dark text-sm">Dish Name</h3>
        <p className="text-xs text-muted mt-1">Category</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-primary font-bold">₹ --</span>
          <button className="p-2 rounded-xl bg-primary/10 hover:bg-primary hover:text-white text-primary transition-colors">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default FoodCard

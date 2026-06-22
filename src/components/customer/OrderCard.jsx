import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

const OrderCard = ({ index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-card rounded-2xl border border-border p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-accent/20 text-dark">Order #---</span>
        <div className="flex items-center gap-1 text-xs text-muted">
          <Clock className="w-3 h-3" />
          <span>--:--</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-3/4 bg-border rounded" />
        <div className="h-3 w-1/2 bg-border rounded" />
      </div>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <span className="text-sm font-semibold text-dark">₹ --</span>
        <span className="text-xs px-2.5 py-1 rounded-lg bg-green/10 text-green font-medium">Status</span>
      </div>
    </motion.div>
  )
}

export default OrderCard

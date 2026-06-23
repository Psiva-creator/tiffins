import { motion } from 'framer-motion'
import { Trash2, AlertTriangle } from 'lucide-react'

const WastageCard = ({ index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-card rounded-2xl border border-border p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Trash2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-dark">Item Name</h4>
          <p className="text-xs text-muted">-- / -- / ----</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted">Wasted</p>
          <p className="text-sm font-bold text-primary">-- kg</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-accent">
          <AlertTriangle className="w-3 h-3" />
          <span>Reason</span>
        </div>
      </div>
    </motion.div>
  )
}

export default WastageCard

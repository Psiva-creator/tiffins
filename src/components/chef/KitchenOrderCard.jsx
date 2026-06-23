import { motion } from 'framer-motion'
import { Clock, UtensilsCrossed } from 'lucide-react'

const KitchenOrderCard = ({ index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-card rounded-2xl border border-border p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-primary/10 text-primary">Order #---</span>
        <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-accent/20 text-dark">Pending</span>
      </div>
      <div className="space-y-2 mb-3">
        {[1, 2].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <UtensilsCrossed className="w-3 h-3 text-muted" />
            <div className="h-3 flex-1 bg-border rounded" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-1 text-xs text-muted">
          <Clock className="w-3 h-3" />
          <span>--:-- ago</span>
        </div>
        <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-green/10 text-green hover:bg-green hover:text-white transition-colors">
          Start
        </button>
      </div>
    </motion.div>
  )
}

export default KitchenOrderCard

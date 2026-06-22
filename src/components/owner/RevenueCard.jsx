import { motion } from 'framer-motion'
import { DollarSign } from 'lucide-react'

const RevenueCard = ({ index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-card rounded-2xl border border-border p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-green/10 flex items-center justify-center">
          <DollarSign className="w-5 h-5 text-green" />
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-lg bg-green/10 text-green">+--% ↑</span>
      </div>
      <p className="text-xs text-muted">Revenue</p>
      <p className="text-xl font-bold font-[family-name:var(--font-poppins)] text-dark mt-1">₹ --,---</p>
      <div className="mt-3 h-2 bg-border rounded-full overflow-hidden">
        <div className="h-full w-3/4 bg-green rounded-full" />
      </div>
    </motion.div>
  )
}

export default RevenueCard

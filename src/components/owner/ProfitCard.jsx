import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

const ProfitCard = ({ index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-card rounded-2xl border border-border p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-accent" />
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-lg bg-accent/20 text-dark">Net Profit</span>
      </div>
      <p className="text-xs text-muted">This Month</p>
      <p className="text-xl font-bold font-[family-name:var(--font-poppins)] text-dark mt-1">₹ --,---</p>
      <div className="flex items-center gap-1 mt-2 text-xs text-green">
        <TrendingUp className="w-3 h-3" />
        <span>+--% from last month</span>
      </div>
    </motion.div>
  )
}

export default ProfitCard

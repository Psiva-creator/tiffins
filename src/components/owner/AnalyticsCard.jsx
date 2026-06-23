import { motion } from 'framer-motion'
import { BarChart3 } from 'lucide-react'

const AnalyticsCard = ({ title = 'Analytics', index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-card rounded-2xl border border-border p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold font-[family-name:var(--font-poppins)] text-dark">{title}</h4>
        <BarChart3 className="w-4 h-4 text-muted" />
      </div>
      <div className="h-32 rounded-xl bg-background border border-border/50 flex items-center justify-center">
        <span className="text-xs text-muted">Chart Placeholder</span>
      </div>
    </motion.div>
  )
}

export default AnalyticsCard

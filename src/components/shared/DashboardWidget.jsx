import { motion } from 'framer-motion'

const DashboardWidget = ({ title, icon: Icon, index = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        )}
        <div>
          <h3 className="font-semibold font-[family-name:var(--font-poppins)] text-dark text-sm">
            {title}
          </h3>
          <p className="text-xs text-muted mt-1">Placeholder</p>
        </div>
      </div>
      <div className="mt-4 h-16 rounded-xl bg-background border border-border/50 flex items-center justify-center">
        <span className="text-xs text-muted">Widget Content</span>
      </div>
    </motion.div>
  )
}

export default DashboardWidget

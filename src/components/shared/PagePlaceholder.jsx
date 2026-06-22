import { motion } from 'framer-motion'
import { Construction } from 'lucide-react'

const PagePlaceholder = ({ title, subtitle, icon: Icon = Construction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-6"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
      >
        <Icon className="w-10 h-10 text-primary" />
      </motion.div>

      <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-dark mb-3 text-center">
        {title}
      </h1>

      {subtitle && (
        <p className="text-muted text-lg text-center max-w-md">
          {subtitle}
        </p>
      )}

      <div className="mt-8 flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 text-accent-700">
        <Construction className="w-4 h-4 text-accent" />
        <span className="text-sm font-medium text-dark/60">Placeholder — Coming Soon</span>
      </div>
    </motion.div>
  )
}

export default PagePlaceholder

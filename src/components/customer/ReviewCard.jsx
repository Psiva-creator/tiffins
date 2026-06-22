import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const ReviewCard = ({ index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-card rounded-2xl border border-border p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-accent fill-accent/30" />
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-border rounded" />
        <div className="h-3 w-2/3 bg-border rounded" />
      </div>
      <p className="text-xs text-muted mt-3">-- / -- / ----</p>
    </motion.div>
  )
}

export default ReviewCard

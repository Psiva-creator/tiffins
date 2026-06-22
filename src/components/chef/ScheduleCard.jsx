import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'

const ScheduleCard = ({ index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-card rounded-2xl border border-border p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-dark">Shift Name</h4>
          <p className="text-xs text-muted">Day</p>
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs text-muted">
        <Clock className="w-3 h-3" />
        <span>--:-- AM — --:-- PM</span>
      </div>
    </motion.div>
  )
}

export default ScheduleCard

import { motion } from 'framer-motion'
import { User, Mail, Phone } from 'lucide-react'

const EmployeeCard = ({ index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-card rounded-2xl border border-border p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-dark">Employee Name</h4>
          <p className="text-xs text-muted">Role</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted">
          <Mail className="w-3 h-3" />
          <span>---@---.com</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted">
          <Phone className="w-3 h-3" />
          <span>+91 ----- -----</span>
        </div>
      </div>
    </motion.div>
  )
}

export default EmployeeCard

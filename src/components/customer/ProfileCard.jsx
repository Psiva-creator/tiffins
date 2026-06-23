import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin } from 'lucide-react'

const ProfileCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-2xl border border-border p-6 max-w-md mx-auto"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <User className="w-10 h-10 text-primary" />
        </div>
        <h3 className="font-semibold font-[family-name:var(--font-poppins)] text-dark">Customer Name</h3>
        <p className="text-xs text-muted mt-1">Member since ----</p>
      </div>
      <div className="mt-6 space-y-3">
        {[
          { icon: Mail, label: 'Email', value: '---@---.com' },
          { icon: Phone, label: 'Phone', value: '+91 ----- -----' },
          { icon: MapPin, label: 'Address', value: '---' },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-background">
            <Icon className="w-4 h-4 text-muted shrink-0" />
            <div>
              <p className="text-xs text-muted">{label}</p>
              <p className="text-sm text-dark">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default ProfileCard

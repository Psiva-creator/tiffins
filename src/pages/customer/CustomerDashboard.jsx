import DashboardWidget from '../../components/shared/DashboardWidget'
import { BookOpen, ShoppingCart, MapPin, Star, User } from 'lucide-react'
import { motion } from 'framer-motion'

const widgets = [
  { title: 'Browse Menu', icon: BookOpen },
  { title: 'Place Order', icon: ShoppingCart },
  { title: 'Track Order', icon: MapPin },
  { title: 'Review Food', icon: Star },
  { title: 'Profile', icon: User },
]

const CustomerDashboard = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-poppins)] text-dark mb-1">
          Welcome Back!
        </h1>
        <p className="text-muted text-sm mb-8">Your customer dashboard at Sri Sai Darshini</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {widgets.map((widget, i) => (
          <DashboardWidget key={widget.title} title={widget.title} icon={widget.icon} index={i} />
        ))}
      </div>
    </div>
  )
}

export default CustomerDashboard

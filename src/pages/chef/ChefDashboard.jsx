import DashboardWidget from '../../components/shared/DashboardWidget'
import { Clock, Flame, CheckCircle, Package, Trash2, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

const widgets = [
  { title: 'Pending Orders', icon: Clock },
  { title: 'Preparing Orders', icon: Flame },
  { title: 'Ready Orders', icon: CheckCircle },
  { title: 'Inventory Status', icon: Package },
  { title: 'Food Wastage', icon: Trash2 },
  { title: "Today's Schedule", icon: Calendar },
]

const ChefDashboard = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-poppins)] text-dark mb-1">
          Kitchen Dashboard
        </h1>
        <p className="text-muted text-sm mb-8">Manage orders, inventory and kitchen operations</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {widgets.map((widget, i) => (
          <DashboardWidget key={widget.title} title={widget.title} icon={widget.icon} index={i} />
        ))}
      </div>
    </div>
  )
}

export default ChefDashboard

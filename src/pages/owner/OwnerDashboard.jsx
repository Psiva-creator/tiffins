import DashboardWidget from '../../components/shared/DashboardWidget'
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Flame,
  Users,
  Star,
} from 'lucide-react'
import { motion } from 'framer-motion'

const widgets = [
  { title: "Today's Sales", icon: TrendingUp },
  { title: 'Monthly Revenue', icon: DollarSign },
  { title: 'Profit', icon: BarChart3 },
  { title: 'Orders Completed', icon: CheckCircle },
  { title: 'Low Stock Alerts', icon: AlertTriangle },
  { title: 'Top Selling Items', icon: Flame },
  { title: 'Employee Summary', icon: Users },
  { title: 'Customer Ratings', icon: Star },
]

const OwnerDashboard = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-poppins)] text-dark mb-1">
          Business Overview
        </h1>
        <p className="text-muted text-sm mb-8">Sri Sai Darshini — Owner Dashboard</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {widgets.map((widget, i) => (
          <DashboardWidget key={widget.title} title={widget.title} icon={widget.icon} index={i} />
        ))}
      </div>
    </div>
  )
}

export default OwnerDashboard

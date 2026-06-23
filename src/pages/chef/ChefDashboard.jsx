import { motion } from 'framer-motion'
import { Clock, Flame, CheckCircle, Package, Calendar, TrendingUp } from 'lucide-react'
import { useOrder } from '../../hooks/useOrder'
import { useNavigate } from 'react-router-dom'

const ChefDashboard = () => {
  const { orders, revenueStats } = useOrder()
  const navigate = useNavigate()

  const pending = orders.filter(o => o.status === 'pending')
  const preparing = orders.filter(o => o.status === 'preparing')
  const ready = orders.filter(o => o.status === 'ready')
  const todayDelivered = orders.filter(o => o.status === 'delivered' && o.createdAt?.slice(0, 10) === new Date().toISOString().slice(0, 10))

  const widgets = [
    { title: 'Pending Orders', icon: Clock, value: pending.length, color: 'bg-amber-100 text-amber-600', sub: 'Waiting to start', path: '/chef/orders' },
    { title: 'Preparing', icon: Flame, value: preparing.length, color: 'bg-blue-100 text-blue-600', sub: 'Currently cooking', path: '/chef/orders' },
    { title: 'Ready', icon: CheckCircle, value: ready.length, color: 'bg-green/10 text-green', sub: 'Ready for pickup', path: '/chef/orders' },
    { title: 'Delivered Today', icon: TrendingUp, value: todayDelivered.length, color: 'bg-purple-100 text-purple-600', sub: `₹${revenueStats.todayRevenue} earned` },
    { title: 'Inventory', icon: Package, value: '—', color: 'bg-primary/10 text-primary', sub: 'Check stock levels', path: '/chef/inventory' },
    { title: 'Schedule', icon: Calendar, value: '—', color: 'bg-accent/20 text-accent', sub: 'View shifts', path: '/chef/schedule' },
  ]

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-poppins)] text-dark mb-1">Kitchen Dashboard</h1>
        <p className="text-muted text-sm mb-8">Manage orders, inventory and kitchen operations</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {widgets.map((w, i) => (
          <motion.div
            key={w.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            onClick={() => w.path && navigate(w.path)}
            className={`bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 ${w.path ? 'cursor-pointer' : ''}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${w.color}`}>
                <w.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold font-[family-name:var(--font-poppins)] text-dark text-sm">{w.title}</h3>
                <p className="text-xs text-muted mt-0.5">{w.sub}</p>
              </div>
            </div>
            <div className="mt-4 h-12 rounded-xl bg-background border border-border/50 flex items-center justify-center">
              <span className="text-2xl font-bold text-dark">{w.value}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {pending.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-dark">Latest Pending</h2>
            <button onClick={() => navigate('/chef/orders')} className="text-xs font-semibold text-primary hover:underline">View All →</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pending.slice(0, 3).map((order, i) => (
              <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 + i * 0.08 }} className="bg-card rounded-2xl border border-amber-200 p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-primary/10 text-primary">{order.id}</span>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-amber-100 text-amber-700">Pending</span>
                </div>
                <div className="space-y-1 mb-3">
                  {order.items.slice(0, 3).map(it => (
                    <p key={it.id} className="text-xs text-dark flex items-center gap-1.5"><span>{it.emoji}</span> {it.name} ×{it.qty}</p>
                  ))}
                  {order.items.length > 3 && <p className="text-xs text-muted">+{order.items.length - 3} more</p>}
                </div>
                <div className="flex justify-between pt-2 border-t border-border/50 text-xs">
                  <span className="text-muted flex items-center gap-1"><Clock className="w-3 h-3" />New</span>
                  <span className="font-bold text-dark">₹{order.total}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ChefDashboard

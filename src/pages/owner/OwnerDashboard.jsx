import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, BarChart3, CheckCircle, Clock, Flame, IndianRupee, ShoppingBag } from 'lucide-react'
import { useOrder } from '../../hooks/useOrder'
import { useNavigate } from 'react-router-dom'

const OwnerDashboard = () => {
  const { orders, revenueStats } = useOrder()
  const navigate = useNavigate()

  const allDelivered = orders.filter(o => o.status === 'delivered')

  const statCards = [
    { title: "Today's Revenue", value: `₹${revenueStats.todayRevenue.toLocaleString()}`, icon: IndianRupee, color: 'bg-green/10 text-green', sub: `${revenueStats.todayOrders} orders today` },
    { title: 'Total Revenue', value: `₹${revenueStats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-primary/10 text-primary', sub: `${revenueStats.totalOrders} orders total` },
    { title: 'Avg Order Value', value: `₹${revenueStats.avgOrderValue}`, icon: BarChart3, color: 'bg-accent/20 text-accent', sub: 'Per order average' },
    { title: 'Orders Completed', value: `${revenueStats.totalOrders}`, icon: CheckCircle, color: 'bg-blue-100 text-blue-600', sub: `${revenueStats.todayOrders} today` },
    { title: 'Pending Orders', value: `${revenueStats.pendingCount}`, icon: Clock, color: 'bg-amber-100 text-amber-600', sub: `${revenueStats.preparingCount} preparing` },
    { title: 'Ready Orders', value: `${revenueStats.readyCount}`, icon: Flame, color: 'bg-purple-100 text-purple-600', sub: 'Awaiting delivery' },
  ]

  const dailyData = []
  for (let d = 6; d >= 0; d--) {
    const date = new Date(Date.now() - d * 86400000)
    const key = date.toISOString().slice(0, 10)
    const dayLabel = date.toLocaleDateString('en', { weekday: 'short' })
    const dayRev = allDelivered.filter(o => o.createdAt?.slice(0, 10) === key).reduce((s, o) => s + o.total, 0)
    dailyData.push({ label: dayLabel, value: dayRev, key })
  }
  const maxDayRev = Math.max(...dailyData.map(d => d.value), 1)

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-poppins)] text-dark mb-1">Business Overview</h1>
        <p className="text-muted text-sm mb-8">Sri Sai Darshini — Owner Dashboard</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-8">
        {statCards.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.07 }} className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className="text-xs text-muted">{s.sub}</span>
            </div>
            <p className="text-xs text-muted">{s.title}</p>
            <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-dark mt-1">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="bg-card rounded-2xl border border-border p-5">
          <h3 className="text-sm font-bold font-[family-name:var(--font-poppins)] text-dark mb-4">Weekly Revenue</h3>
          <div className="flex items-end gap-2 h-40">
            {dailyData.map((d, i) => (
              <div key={d.key} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-muted font-medium">{d.value > 0 ? `₹${d.value}` : ''}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max((d.value / maxDayRev) * 100, 4)}%` }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                  className={`w-full rounded-t-lg ${d.value > 0 ? 'bg-gradient-to-t from-primary to-primary/60' : 'bg-border/50'}`}
                />
                <span className="text-[10px] text-muted">{d.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-card rounded-2xl border border-border p-5">
          <h3 className="text-sm font-bold font-[family-name:var(--font-poppins)] text-dark mb-4">Top Selling Items</h3>
          {revenueStats.topItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40">
              <ShoppingBag className="w-8 h-8 text-muted/30 mb-2" />
              <p className="text-xs text-muted">No sales data yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {revenueStats.topItems.map((item, i) => {
                const maxCount = revenueStats.topItems[0]?.count || 1
                return (
                  <div key={item.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-dark font-medium">{i + 1}. {item.name}</span>
                      <span className="text-xs font-bold text-primary">{item.count} sold</span>
                    </div>
                    <div className="h-2 bg-border/50 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(item.count / maxCount) * 100}%` }} transition={{ delay: 0.6 + i * 0.05 }} className="h-full rounded-full bg-gradient-to-r from-green to-green/60" />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </motion.div>
      </div>

      {orders.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-6 bg-card rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-bold text-dark">Recent Orders</h3>
            <button onClick={() => navigate('/owner/sales')} className="text-xs text-primary font-semibold hover:underline">View All →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-background">
                <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted">Order</th>
                <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted">Items</th>
                <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted">Amount</th>
                <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted">Status</th>
              </tr></thead>
              <tbody>
                {orders.slice(0, 5).map(o => (
                  <tr key={o.id} className="border-b border-border/50 hover:bg-background/50">
                    <td className="px-5 py-3 font-bold text-primary text-xs">{o.id}</td>
                    <td className="px-5 py-3 text-dark text-xs">{o.items.map(i => i.name).join(', ').slice(0, 40)}</td>
                    <td className="px-5 py-3 font-bold text-dark">₹{o.total}</td>
                    <td className="px-5 py-3"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${o.status === 'delivered' ? 'bg-green/10 text-green' : o.status === 'pending' ? 'bg-amber-100 text-amber-700' : o.status === 'preparing' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default OwnerDashboard

import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, IndianRupee, PieChart } from 'lucide-react'
import { useOrder } from '../../hooks/useOrder'

const Revenue = () => {
  const { orders, revenueStats } = useOrder()
  const delivered = orders.filter(o => o.status === 'delivered')

  const catRevenue = {}
  delivered.forEach(o => {
    o.items.forEach(item => {
      const cat = item.category || 'Other'
      catRevenue[cat] = (catRevenue[cat] || 0) + item.price * item.qty
    })
  })
  const catEntries = Object.entries(catRevenue).sort(([, a], [, b]) => b - a)
  const maxCat = catEntries[0]?.[1] || 1

  const dailyData = []
  for (let d = 6; d >= 0; d--) {
    const date = new Date(Date.now() - d * 86400000)
    const key = date.toISOString().slice(0, 10)
    const rev = delivered.filter(o => o.createdAt?.slice(0, 10) === key).reduce((s, o) => s + o.total, 0)
    dailyData.push({ label: date.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' }), value: rev })
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-poppins)] text-dark mb-1">Revenue</h1>
        <p className="text-muted text-sm mb-6">Monitor revenue streams and financial performance</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Total Revenue', value: `₹${revenueStats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green/10 text-green' },
          { label: "Today's Revenue", value: `₹${revenueStats.todayRevenue.toLocaleString()}`, icon: IndianRupee, color: 'bg-primary/10 text-primary' },
          { label: 'Total Orders', value: revenueStats.totalOrders, icon: TrendingUp, color: 'bg-blue-100 text-blue-600' },
          { label: 'Avg Order', value: `₹${revenueStats.avgOrderValue}`, icon: PieChart, color: 'bg-accent/20 text-accent' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="bg-card rounded-xl border border-border p-4">
            <div className={`w-8 h-8 rounded-lg ${s.color} flex items-center justify-center mb-2`}><s.icon className="w-4 h-4" /></div>
            <p className="text-xs text-muted">{s.label}</p>
            <p className="text-xl font-bold text-dark mt-0.5">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card rounded-2xl border border-border p-5">
          <h3 className="text-sm font-bold text-dark mb-4">Daily Revenue (Last 7 Days)</h3>
          <div className="space-y-3">
            {dailyData.map((d, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-muted w-28 shrink-0">{d.label}</span>
                <div className="flex-1 h-5 bg-border/30 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${d.value > 0 ? Math.max((d.value / (Math.max(...dailyData.map(x => x.value)) || 1)) * 100, 5) : 0}%` }} transition={{ delay: 0.4 + i * 0.05 }} className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60" />
                </div>
                <span className="text-xs font-bold text-dark w-16 text-right">₹{d.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-card rounded-2xl border border-border p-5">
          <h3 className="text-sm font-bold text-dark mb-4">Revenue by Category</h3>
          {catEntries.length === 0 ? (
            <div className="flex items-center justify-center h-40"><p className="text-xs text-muted">No revenue data yet</p></div>
          ) : (
            <div className="space-y-4">
              {catEntries.map(([cat, rev], i) => (
                <div key={cat}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-dark font-medium">{cat}</span>
                    <span className="text-xs font-bold text-green">₹{rev.toLocaleString()}</span>
                  </div>
                  <div className="h-2.5 bg-border/30 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(rev / maxCat) * 100}%` }} transition={{ delay: 0.4 + i * 0.06 }} className="h-full rounded-full bg-gradient-to-r from-green to-green/50" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Revenue

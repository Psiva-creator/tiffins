import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Filter, IndianRupee } from 'lucide-react'
import { useOrder } from '../../hooks/useOrder'

const statusColors = {
  delivered: 'bg-green/10 text-green',
  pending: 'bg-amber-100 text-amber-700',
  preparing: 'bg-blue-100 text-blue-700',
  ready: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
}

const Sales = () => {
  const { orders } = useOrder()
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = statusFilter === 'all' ? orders : orders.filter(o => o.status === statusFilter)
  const totalSales = filtered.reduce((s, o) => s + o.total, 0)
  const deliveredSales = filtered.filter(o => o.status === 'delivered').reduce((s, o) => s + o.total, 0)

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-poppins)] text-dark mb-1">Sales</h1>
        <p className="text-muted text-sm mb-6">Track all orders and sales performance</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Orders', value: filtered.length },
          { label: 'Delivered', value: filtered.filter(o => o.status === 'delivered').length },
          { label: 'Revenue', value: `₹${deliveredSales.toLocaleString()}` },
          { label: 'Pipeline', value: `₹${(totalSales - deliveredSales).toLocaleString()}` },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="bg-card rounded-xl border border-border p-4">
            <p className="text-xs text-muted mb-1">{s.label}</p>
            <p className="text-xl font-bold text-dark">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-muted" />
        {['all', 'pending', 'preparing', 'ready', 'delivered'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${statusFilter === s ? 'bg-primary text-white' : 'bg-card border border-border text-muted hover:bg-primary/5'}`}>
            {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-16">
          <TrendingUp className="w-12 h-12 text-muted/30 mb-3" />
          <p className="text-muted text-sm">No orders found</p>
        </motion.div>
      ) : (
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-background border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted">Order ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted">Items</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted">Date</th>
              </tr></thead>
              <tbody>
                {filtered.map(o => (
                  <tr key={o.id} className="border-b border-border/50 hover:bg-background/50">
                    <td className="px-4 py-3 font-bold text-primary text-xs">{o.id}</td>
                    <td className="px-4 py-3 text-dark text-xs max-w-[200px] truncate">{o.items.map(i => `${i.name}×${i.qty}`).join(', ')}</td>
                    <td className="px-4 py-3 font-bold text-dark flex items-center"><IndianRupee className="w-3 h-3" />{o.total}</td>
                    <td className="px-4 py-3"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${statusColors[o.status] || ''}`}>{o.status}</span></td>
                    <td className="px-4 py-3 text-xs text-muted">{new Date(o.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sales

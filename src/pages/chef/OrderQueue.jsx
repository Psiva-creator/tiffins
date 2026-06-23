import { motion } from 'framer-motion'
import { Clock, Flame, CheckCircle, ChefHat, Truck } from 'lucide-react'
import { useOrder } from '../../hooks/useOrder'

const statusCols = [
  { key: 'pending', label: 'Pending', icon: Clock, color: 'amber', next: 'preparing', action: 'Start Preparing', actionIcon: Flame },
  { key: 'preparing', label: 'Preparing', icon: Flame, color: 'blue', next: 'ready', action: 'Mark Ready', actionIcon: CheckCircle },
  { key: 'ready', label: 'Ready', icon: CheckCircle, color: 'green', next: 'delivered', action: 'Mark Delivered', actionIcon: Truck },
]

const colorMap = {
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700', dot: 'bg-amber-400', btn: 'bg-amber-500 hover:bg-amber-600', headerBg: 'bg-amber-100', headerText: 'text-amber-700' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700', dot: 'bg-blue-400', btn: 'bg-blue-500 hover:bg-blue-600', headerBg: 'bg-blue-100', headerText: 'text-blue-700' },
  green: { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-700', dot: 'bg-green-500', btn: 'bg-green-600 hover:bg-green-700', headerBg: 'bg-green-100', headerText: 'text-green-700' },
}

const timeAgo = (iso) => {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  return `${Math.floor(mins / 60)}h ago`
}

const OrderQueue = () => {
  const { orders, updateOrderStatus } = useOrder()

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-poppins)] text-dark">Order Queue</h1>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-primary/10">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span></span>
            <span className="text-[10px] font-bold text-primary">LIVE</span>
          </div>
        </div>
        <p className="text-muted text-sm mb-6">Manage incoming orders in real-time</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {statusCols.map((col, ci) => {
          const c = colorMap[col.color]
          const colOrders = orders.filter(o => o.status === col.key).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

          return (
            <motion.div key={col.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ci * 0.1 }} className={`rounded-2xl ${c.bg} border ${c.border} overflow-hidden`}>
              <div className={`px-4 py-3 ${c.headerBg} flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <col.icon className={`w-4 h-4 ${c.headerText}`} />
                  <span className={`text-sm font-bold ${c.headerText}`}>{col.label}</span>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${c.badge}`}>{colOrders.length}</span>
              </div>

              <div className="p-3 space-y-3 min-h-[200px] max-h-[65vh] overflow-y-auto">
                {colOrders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <ChefHat className="w-8 h-8 text-gray-300 mb-2" />
                    <p className="text-xs text-gray-400">No {col.label.toLowerCase()} orders</p>
                  </div>
                ) : (
                  colOrders.map((order, oi) => (
                    <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: oi * 0.05 }} className="bg-white rounded-xl border border-border/50 p-3.5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-primary/10 text-primary">{order.id}</span>
                        <span className="text-[10px] text-muted flex items-center gap-1"><Clock className="w-3 h-3" />{timeAgo(order.createdAt)}</span>
                      </div>

                      <div className="space-y-1.5 mb-3">
                        {order.items.map(it => (
                          <div key={it.id} className="flex items-center gap-2 text-xs">
                            <span>{it.emoji}</span>
                            <span className="text-dark flex-1">{it.name}</span>
                            <span className="text-muted font-medium">×{it.qty}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2.5 border-t border-border/50">
                        <span className="text-sm font-bold text-dark">₹{order.total}</span>
                        <motion.button
                          whileTap={{ scale: 0.93 }}
                          onClick={() => updateOrderStatus(order.id, col.next)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-semibold ${c.btn} transition-colors shadow-sm`}
                        >
                          <col.actionIcon className="w-3.5 h-3.5" />
                          {col.action}
                        </motion.button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {orders.filter(o => o.status === 'delivered').length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 p-4 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-green" />
              <span className="text-sm font-bold text-dark">Delivered Today</span>
            </div>
            <span className="text-sm font-bold text-green">{orders.filter(o => o.status === 'delivered' && o.createdAt?.slice(0, 10) === new Date().toISOString().slice(0, 10)).length} orders</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default OrderQueue

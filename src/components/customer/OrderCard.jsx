import { motion } from 'framer-motion'
import { Clock, MapPin, ChevronRight, CheckCircle2, RotateCcw, XCircle, Utensils } from 'lucide-react'

const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered':
      return { bg: 'bg-green-100', text: 'text-green-700', icon: <CheckCircle2 className="w-3.5 h-3.5" /> }
    case 'Preparing':
    case 'On the way':
      return { bg: 'bg-amber-100', text: 'text-amber-700', icon: <Utensils className="w-3.5 h-3.5" /> }
    case 'Cancelled':
      return { bg: 'bg-red-100', text: 'text-red-700', icon: <XCircle className="w-3.5 h-3.5" /> }
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-700', icon: <Clock className="w-3.5 h-3.5" /> }
  }
}

const OrderCard = ({ order, index = 0 }) => {
  if (!order) return null

  const statusStyles = getStatusColor(order.status)
  
  // Format Date
  const dateObj = new Date(order.date)
  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(dateObj)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-card rounded-2xl border border-border p-5 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-sm font-bold font-poppins text-dark">{order.id}</span>
            <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${statusStyles.bg} ${statusStyles.text}`}>
              {statusStyles.icon}
              {order.status}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <Clock className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-primary font-poppins">₹{order.total}</span>
        </div>
      </div>

      {/* Items Summary */}
      <div className="flex-1 bg-gray-50/50 rounded-xl p-3 mb-4 border border-border/50">
        <ul className="space-y-2">
          {order.items?.slice(0, 2).map((item, i) => (
            <li key={i} className="flex justify-between text-sm">
              <span className="text-dark font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                {item.name}
              </span>
              <span className="text-muted text-xs font-semibold px-2 py-0.5 bg-white rounded-md shadow-sm border border-border/50">x{item.quantity}</span>
            </li>
          ))}
          {order.items?.length > 2 && (
            <li className="text-xs text-primary font-semibold pt-1">
              + {order.items.length - 2} more item{order.items.length - 2 > 1 ? 's' : ''}
            </li>
          )}
        </ul>
      </div>

      {/* Footer / Actions */}
      <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted max-w-[50%]">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{order.restaurant}</span>
        </div>
        
        <div className="flex gap-2">
          {order.status === 'Delivered' || order.status === 'Cancelled' ? (
            <button className="flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl text-sm font-semibold transition-colors">
              <RotateCcw className="w-4 h-4" />
              Reorder
            </button>
          ) : (
            <button className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all">
              Track Order
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default OrderCard

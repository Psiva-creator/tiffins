import { useState, useEffect } from 'react'
import CustomerDashboardWidget from '../../components/customer/CustomerDashboardWidget'
import { BookOpen, ShoppingCart, ClipboardList, Star, ChevronRight, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useOrder } from '../../hooks/useOrder'

const widgets = [
  { 
    title: 'Browse Menu', 
    description: 'Explore our delicious South Indian delicacies',
    path: '/customer/menu', 
    icon: BookOpen,
    color: 'from-orange-400 to-red-500',
    lightColor: 'bg-orange-50 text-orange-600',
    stats: '45+ Items'
  },
  { 
    title: 'Place Order', 
    description: 'Customize and place a new order quickly',
    path: '/customer/order', 
    icon: ShoppingCart,
    color: 'from-primary to-rose-600',
    lightColor: 'bg-rose-50 text-rose-600',
    stats: 'Fast Delivery'
  },
  { 
    title: 'My Orders', 
    description: 'Track ongoing orders and view history',
    path: '/customer/orders', 
    icon: ClipboardList,
    color: 'from-blue-500 to-indigo-600',
    lightColor: 'bg-blue-50 text-blue-600',
    stats: '1 Active'
  },
  { 
    title: 'Reviews', 
    description: 'Rate your recent dining experiences',
    path: '/customer/reviews', 
    icon: Star,
    color: 'from-emerald-400 to-teal-500',
    lightColor: 'bg-emerald-50 text-emerald-600',
    stats: '4.8 Avg'
  },
]

const CustomerDashboard = () => {
  const { cartCount, orders } = useOrder()
  const [greeting, setGreeting] = useState('Welcome Back')
  
  const activeOrders = orders.filter(o => !['delivered', 'cancelled'].includes(o.status))
  const latestActiveOrder = activeOrders[0]

  // Update dynamic stats in widgets
  const dynamicWidgets = widgets.map(w => {
    if (w.title === 'My Orders') return { ...w, stats: `${activeOrders.length} Active` }
    if (w.title === 'Place Order') return { ...w, stats: cartCount > 0 ? `${cartCount} in Cart` : 'Fast Delivery' }
    return w
  })

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 18) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')
  }, [])

  return (
    <div className="space-y-8 pb-10">
      {/* Hero Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-dark text-white p-8 md:p-10 shadow-2xl"
      >
        {/* Abstract Background Shapes */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold mb-4">
            <Clock className="w-3.5 h-3.5 text-accent" />
            <span className="text-white/90">Customer Panel</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] mb-3">
            {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">Guest!</span>
          </h1>
          <p className="text-white/70 max-w-lg text-sm md:text-base leading-relaxed">
            What are you craving today? Explore our authentic South Indian menu and get it delivered hot to your doorstep.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/customer/order" className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-lg shadow-primary/30 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2">
              Order Now <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="/customer/orders" className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-xl font-bold border border-white/10 transition-all hover:-translate-y-1 active:scale-95">
              Track Order
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions Grid */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-dark font-[family-name:var(--font-poppins)]">Quick Actions</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {dynamicWidgets.map((widget, i) => (
            <CustomerDashboardWidget 
              key={widget.title} 
              widget={widget} 
              index={i} 
            />
          ))}
        </div>
      </div>
      
      {/* Recent Activity Mini-Section */}
      {latestActiveOrder && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card rounded-3xl border border-border p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100">
              <ClipboardList className="w-8 h-8 text-amber-500" />
            </div>
            <div>
              <h3 className="font-bold text-dark text-lg font-[family-name:var(--font-poppins)]">Ongoing Order</h3>
              <p className="text-sm text-muted mt-1">Order #{latestActiveOrder.id} is currently <span className="font-semibold text-amber-600 capitalize">{latestActiveOrder.status}</span></p>
            </div>
          </div>
          <Link to="/customer/orders" className="w-full md:w-auto px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-dark font-semibold rounded-xl transition-colors text-center text-sm">
            View Details
          </Link>
        </motion.div>
      )}
    </div>
  )
}

export default CustomerDashboard

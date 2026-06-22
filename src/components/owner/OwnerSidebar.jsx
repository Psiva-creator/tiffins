import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  BarChart3,
  Package,
  Users,
  PieChart,
  Crown,
  X,
  Menu,
} from 'lucide-react'

const links = [
  { name: 'Dashboard', path: '/owner', icon: LayoutDashboard },
  { name: 'Sales', path: '/owner/sales', icon: TrendingUp },
  { name: 'Revenue', path: '/owner/revenue', icon: DollarSign },
  { name: 'Profit & Loss', path: '/owner/profit-loss', icon: BarChart3 },
  { name: 'Inventory', path: '/owner/inventory', icon: Package },
  { name: 'Employees', path: '/owner/employees', icon: Users },
  { name: 'Analytics', path: '/owner/analytics', icon: PieChart },
]

const OwnerSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Crown className="w-4 h-4 text-dark" />
          </div>
          <div>
            <p className="text-sm font-bold text-white font-[family-name:var(--font-poppins)]">Sri Sai Darshini</p>
            <p className="text-[10px] text-gray-400">Owner Panel</p>
          </div>
        </div>
        <button onClick={() => setMobileOpen(false)} className="md:hidden text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/owner'}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-accent text-dark shadow-lg shadow-accent/25'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <link.icon className="w-4 h-4 shrink-0" />
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/10">
        <p className="text-[10px] text-gray-500">v1.0.0 — Skeleton</p>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-sidebar text-white shadow-lg"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-sidebar fixed inset-y-0 left-0 flex-col z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-64 bg-sidebar flex flex-col z-50 md:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default OwnerSidebar

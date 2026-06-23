import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  CreditCard,
  Search,
  Filter,
  ArrowDownToLine,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Smartphone
} from 'lucide-react'
import RevenueCard from '../../components/owner/RevenueCard'

const Sales = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('All') // 'All', 'Dine-In', 'Takeaway', 'Delivery'
  const [hoveredPoint, setHoveredPoint] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Hourly Sales Trend for the day
  const hourlySales = [
    { time: '08:00 AM', sales: 4500, orders: 25 },
    { time: '10:00 AM', sales: 8200, orders: 40 },
    { time: '12:00 PM', sales: 3400, orders: 18 },
    { time: '02:00 PM', sales: 12400, orders: 55 },
    { time: '04:00 PM', sales: 2200, orders: 12 },
    { time: '06:00 PM', sales: 4800, orders: 28 },
    { time: '08:00 PM', sales: 15300, orders: 62 },
    { time: '10:00 PM', sales: 7200, orders: 34 }
  ]

  // Mock Sales Transactions List
  const transactions = [
    { id: 'SSD-9021', time: '09:42 PM', items: 'Masala Dosa x2, Filter Coffee x2', amount: 220, type: 'Dine-In', payment: 'UPI (GPay)', status: 'Completed' },
    { id: 'SSD-9020', time: '09:30 PM', items: 'Idli Vada Combo x1, Rava Kesari x1', amount: 140, type: 'Takeaway', payment: 'Cash', status: 'Completed' },
    { id: 'SSD-9019', time: '09:15 PM', items: 'Onion Uttapam x2, Sweet Lassi x2', amount: 320, type: 'Delivery', payment: 'Online Aggregator', status: 'Completed' },
    { id: 'SSD-9018', time: '08:50 PM', items: 'Paneer Butter Masala x1, Tandoori Roti x4', amount: 280, type: 'Dine-In', payment: 'Credit Card', status: 'Completed' },
    { id: 'SSD-9017', time: '08:42 PM', items: 'Veg Biryani x2, Raita x2, Coke x2', amount: 410, type: 'Delivery', payment: 'UPI (PhonePe)', status: 'Completed' },
    { id: 'SSD-9016', time: '08:20 PM', items: 'Filter Coffee x4, Mysore Bajji x2', amount: 190, type: 'Dine-In', payment: 'Cash', status: 'Completed' },
    { id: 'SSD-9015', time: '07:45 PM', items: 'Masala Dosa x3, Podi Idli x1', amount: 330, type: 'Takeaway', payment: 'UPI (Paytm)', status: 'Completed' },
    { id: 'SSD-9014', time: '07:10 PM', items: 'Mini Tiffin Combo x2, Filter Coffee x2', amount: 260, type: 'Dine-In', payment: 'UPI (GPay)', status: 'Completed' },
    { id: 'SSD-9013', time: '04:30 PM', items: 'Samosa x4, Hot Chai x4', amount: 120, type: 'Dine-In', payment: 'Cash', status: 'Completed' },
    { id: 'SSD-9012', time: '02:15 PM', items: 'South Indian Meals x3, Butter Milk x3', amount: 450, type: 'Dine-In', payment: 'Credit Card', status: 'Completed' }
  ]

  // Filter Transactions
  const filteredTx = transactions.filter((tx) => {
    const matchesSearch = tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tx.items.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tx.payment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'All' || tx.type === filterType
    return matchesSearch && matchesType
  })

  // Pagination setup
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredTx.length / itemsPerPage)
  const currentTx = filteredTx.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const hourlyMax = Math.max(...hourlySales.map(d => d.sales))
  const hourlyMin = Math.min(...hourlySales.map(d => d.sales)) * 0.9
  const chartW = 600
  const chartH = 200

  return (
    <div className="space-y-8">
      {/* Header section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-poppins)] text-dark mb-1">
            Sales Ledger
          </h1>
          <p className="text-muted text-xs md:text-sm font-medium">Sri Sai Darshini — Real-time billing and sales streams</p>
        </div>

        <button
          onClick={() => alert('Downloading sales ledger as PDF...')}
          className="flex items-center justify-center gap-2 bg-dark text-white hover:bg-sidebar-hover text-xs font-bold px-4 py-2.5 rounded-xl border border-white/10 hover:shadow-lg transition-all self-start sm:self-center cursor-pointer"
        >
          <ArrowDownToLine className="w-4 h-4 text-accent" />
          <span>Export Ledger</span>
        </button>
      </motion.div>

      {/* Sales Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <RevenueCard
          title="Daily Sales Today"
          value="₹42,850"
          change="+12% ↑"
          isPositive={true}
          trendData={[28000, 31000, 35000, 32000, 38000, 42850]}
          timeframe="vs. yesterday"
          index={0}
        />
        <RevenueCard
          title="Weekly Sales Trend"
          value="₹2,95,000"
          change="+6.4% ↑"
          isPositive={true}
          trendData={[260000, 275000, 280000, 295000]}
          timeframe="vs. last week"
          index={1}
        />
        <RevenueCard
          title="Monthly Sales (Est.)"
          value="₹12,45,200"
          change="+8.5% ↑"
          isPositive={true}
          trendData={[1050000, 1120000, 1080000, 1180000, 1245200]}
          timeframe="vs. last month"
          index={2}
        />
        {/* AOV Metric Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 3 * 0.08 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-card rounded-2xl border border-border p-5 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-light to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <ShoppingBag className="w-5 h-5 text-dark" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/20 text-dark border border-accent/10">
              Order Value
            </span>
          </div>
          <p className="text-xs font-medium text-muted uppercase tracking-wider">Average Order Value (AOV)</p>
          <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-dark mt-1 tracking-tight">
            ₹233.00
          </p>
          <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-green">
            <span>+3.5% from morning slot</span>
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
        </motion.div>
      </div>

      {/* Hourly Sales SVG Chart */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="bg-card border border-border rounded-2xl p-5 md:p-6 shadow-sm flex flex-col justify-between"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold font-[family-name:var(--font-poppins)] text-base text-dark flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Hourly Sales Distribution
            </h3>
            <p className="text-xs text-muted font-medium mt-0.5">Real-time daily spikes mapping</p>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-green bg-green-light px-2.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Peak slots: Lunch (02 PM) & Dinner (08 PM)</span>
          </div>
        </div>

        {/* SVG Area line chart */}
        <div className="relative w-full h-[220px]">
          <svg className="w-full h-full" viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="none">
            <defs>
              <linearGradient id="hourlyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D94841" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#D94841" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid horizontal lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
              <line
                key={i}
                x1="45"
                y1={20 + ratio * 140}
                x2={chartW - 20}
                y2={20 + ratio * 140}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}

            {/* Line Path */}
            {(() => {
              const gap = (chartW - 65) / (hourlySales.length - 1)
              const points = hourlySales.map((d, i) => {
                const x = 50 + i * gap
                const y = 160 - ((d.sales - hourlyMin) / (hourlyMax - hourlyMin)) * 120
                return `${x},${y}`
              }).join(' ')

              const pathData = `M 50,160 L ${points} L ${50 + (hourlySales.length - 1) * gap},160 Z`
              const lineData = `M ${points}`

              return (
                <>
                  <path d={pathData} fill="url(#hourlyGrad)" />
                  <path d={lineData} fill="none" stroke="#D94841" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Draw points */}
                  {hourlySales.map((d, i) => {
                    const x = 50 + i * gap
                    const y = 160 - ((d.sales - hourlyMin) / (hourlyMax - hourlyMin)) * 120
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r={hoveredPoint === i ? 6 : 4}
                        fill={hoveredPoint === i ? '#F4D03F' : '#D94841'}
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="cursor-pointer transition-all duration-200"
                        onMouseEnter={() => setHoveredPoint(i)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                    )
                  })}
                </>
              )
            })()}

            {/* Labels */}
            {hourlySales.map((d, i) => {
              const gap = (chartW - 65) / (hourlySales.length - 1)
              const x = 50 + i * gap
              return (
                <text
                  key={i}
                  x={x}
                  y="180"
                  textAnchor="middle"
                  className="text-[10px] fill-muted font-bold"
                >
                  {d.time.split(' ')[0]}
                </text>
              )
            })}

            {/* Y axis labels */}
            <text x="5" y="25" className="text-[9px] fill-muted font-mono font-bold">₹{(hourlyMax/1000).toFixed(1)}k</text>
            <text x="5" y="90" className="text-[9px] fill-muted font-mono font-bold">₹{(hourlyMax/2000).toFixed(1)}k</text>
            <text x="5" y="160" className="text-[9px] fill-muted font-mono font-bold">₹0</text>
          </svg>

          {/* Tooltip */}
          {hoveredPoint !== null && (
            <div className="absolute bg-dark text-white text-[11px] rounded-xl p-2.5 shadow-xl border border-white/10 z-10 pointer-events-none transition-all"
                 style={{
                   left: `${50 + hoveredPoint * ((chartW - 65) / (hourlySales.length - 1)) - 30}px`,
                   top: `${160 - ((hourlySales[hoveredPoint].sales - hourlyMin) / (hourlyMax - hourlyMin)) * 120 - 45}px`
                 }}>
              <p className="font-bold">{hourlySales[hoveredPoint].time}</p>
              <p className="text-accent font-mono font-bold">Sales: ₹{hourlySales[hoveredPoint].sales.toLocaleString()}</p>
              <p className="text-gray-300 font-mono">Orders: {hourlySales[hoveredPoint].orders}</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Transaction Ledger Table section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-card border border-border rounded-2xl p-5 md:p-6 shadow-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h3 className="font-bold font-[family-name:var(--font-poppins)] text-base text-dark">
            Transaction History
          </h3>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative w-full xs:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search Order ID, items, mode..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-10 pr-4 py-2 border border-border bg-background rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-semibold"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex bg-background border border-border p-1 rounded-xl items-center">
              {['All', 'Dine-In', 'Takeaway', 'Delivery'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setFilterType(type)
                    setCurrentPage(1)
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 ${
                    filterType === type
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-muted hover:text-dark'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-section-alt border-b border-border/80 text-[11px] font-bold text-muted uppercase tracking-wider">
                <th className="p-4">Order ID</th>
                <th className="p-4">Time</th>
                <th className="p-4">Items Ordered</th>
                <th className="p-4">Billing Type</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4 text-right">Bill Amount</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-xs font-semibold text-dark">
              {currentTx.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-6 text-center text-muted">
                    No matching transactions found.
                  </td>
                </tr>
              ) : (
                currentTx.map((tx) => (
                  <tr key={tx.id} className="hover:bg-background/40 transition-colors">
                    <td className="p-4 text-primary font-mono font-bold">{tx.id}</td>
                    <td className="p-4 text-muted font-medium font-mono">{tx.time}</td>
                    <td className="p-4 max-w-[200px] truncate" title={tx.items}>{tx.items}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                        tx.type === 'Dine-In' ? 'bg-green-light text-green border border-green/20' :
                        tx.type === 'Takeaway' ? 'bg-accent-light text-dark border border-accent/20' :
                        'bg-primary-light text-primary border border-primary/20'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 font-medium">
                        {tx.payment.includes('UPI') ? <Smartphone className="w-3.5 h-3.5 text-green" /> : <CreditCard className="w-3.5 h-3.5 text-muted" />}
                        <span>{tx.payment}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right font-mono font-bold">₹{tx.amount.toLocaleString()}</td>
                    <td className="p-4 text-center">
                      <span className="bg-green-light text-green border border-green/10 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
            <span className="text-xs text-muted font-semibold">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredTx.length)} of {filteredTx.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 bg-background border border-border rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-section-alt transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold px-3">{currentPage} / {totalPages}</span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 bg-background border border-border rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-section-alt transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Sales

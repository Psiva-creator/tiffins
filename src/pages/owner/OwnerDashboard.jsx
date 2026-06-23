import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Flame,
  Users,
  Star,
  ChevronRight,
  TrendingDown,
  ArrowUpRight,
  Utensils
} from 'lucide-react'

// Cards imports
import RevenueCard from '../../components/owner/RevenueCard'
import ProfitCard from '../../components/owner/ProfitCard'
import InventoryCard from '../../components/owner/InventoryCard'
import EmployeeCard from '../../components/owner/EmployeeCard'
import AnalyticsCard from '../../components/owner/AnalyticsCard'

const OwnerDashboard = () => {
  // Local state for interactive chart hovers
  const [hoveredBar, setHoveredBar] = useState(null)
  const [hoveredPoint, setHoveredPoint] = useState(null)

  // Mock data for weekly sales overview (Mon - Sun)
  const weeklySales = [
    { day: 'Mon', sales: 32000 },
    { day: 'Tue', sales: 38000 },
    { day: 'Wed', sales: 35000 },
    { day: 'Thu', sales: 42000 },
    { day: 'Fri', sales: 48000 },
    { day: 'Sat', sales: 58000 },
    { day: 'Sun', sales: 62000 }
  ]

  // Mock data for revenue trends (Last 6 months)
  const revenueTrend = [
    { month: 'Jan', revenue: 980000, profit: 284000 },
    { month: 'Feb', revenue: 1050000, profit: 310000 },
    { month: 'Mar', revenue: 1120000, profit: 325000 },
    { month: 'Apr', revenue: 1080000, profit: 318000 },
    { month: 'May', revenue: 1180000, profit: 354000 },
    { month: 'Jun', revenue: 1245200, profit: 373500 }
  ]

  // Mock stock alerts
  const lowStockItems = [
    { name: 'Milk', stock: 8, unit: 'Liters', min: 15 },
    { name: 'Paneer', stock: 3, unit: 'Kgs', min: 10 },
    { name: 'Tomatoes', stock: 6, unit: 'Kgs', min: 12 }
  ]

  // Mock top items
  const topItems = [
    { name: 'Masala Dosa', count: 142, revenue: 11360, pct: 85 },
    { name: 'Filter Coffee', count: 185, revenue: 5550, pct: 75 },
    { name: 'Idli Vada Combo', count: 96, revenue: 7680, pct: 60 },
    { name: 'Rava Kesari', count: 54, revenue: 3240, pct: 45 }
  ]

  // SVG dimensions for Weekly Sales Bar Chart
  const barChartW = 500
  const barChartH = 200
  const barMax = Math.max(...weeklySales.map(d => d.sales))

  // SVG dimensions for Revenue Trend Area Chart
  const areaChartW = 500
  const areaChartH = 200
  const trendMax = Math.max(...revenueTrend.map(d => d.revenue))
  const trendMin = Math.min(...revenueTrend.map(d => d.revenue)) * 0.9

  return (
    <div className="space-y-8">
      {/* Welcome Header Hero */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-dark to-sidebar text-white rounded-3xl p-6 md:p-8 shadow-xl border border-white/5 relative overflow-hidden"
      >
        {/* Decorative backdrop shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-2 text-accent font-semibold text-xs tracking-wider uppercase">
            <Utensils className="w-4 h-4" />
            <span>Sri Sai Darshini</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold font-[family-name:var(--font-poppins)] tracking-tight">
            Namaskaram, Owner!
          </h1>
          <p className="text-gray-400 text-xs md:text-sm font-medium">
            Here is the real-time operational pulse and sales metrics for your outlet today.
          </p>
        </div>

        <div className="relative z-10 flex gap-3 shrink-0 self-start md:self-center">
          <Link
            to="/owner/analytics"
            className="flex items-center gap-2 bg-accent text-dark text-xs font-bold px-4 py-2.5 rounded-xl hover:shadow-lg hover:shadow-accent/15 transition-all"
          >
            <span>View Full Analytics</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      {/* Primary KPI Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <RevenueCard
          title="Today's Sales"
          value="₹42,850"
          change="+12% ↑"
          isPositive={true}
          trendData={[28000, 31000, 35000, 32000, 38000, 42850]}
          timeframe="vs. yesterday"
          index={0}
        />
        <RevenueCard
          title="Monthly Revenue"
          value="₹12,45,200"
          change="+8.5% ↑"
          isPositive={true}
          trendData={[980000, 1050000, 1120000, 1080000, 1180000, 1245200]}
          timeframe="vs. last month"
          index={1}
        />
        <ProfitCard
          title="Net Profit (Monthly)"
          value="₹3,73,560"
          margin="30%"
          change="+9.2%"
          isPositive={true}
          index={2}
        />
        {/* Total Orders Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 3 * 0.08 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-card rounded-2xl border border-border p-5 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-light/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-light text-primary border border-primary/10">
              Active Delivery
            </span>
          </div>
          <p className="text-xs font-medium text-muted uppercase tracking-wider">Total Orders Today</p>
          <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-dark mt-1 tracking-tight">
            184 Orders
          </p>
          <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-muted">
            <span>Dine-In: 110 | Takeaway: 74</span>
            <span className="text-green">98% success</span>
          </div>
        </motion.div>
      </div>

      {/* Graphical Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Weekly Sales SVG Chart */}
        <AnalyticsCard
          title="Weekly Sales Overview"
          subtitle="Mon - Sun transaction records"
          icon={TrendingUp}
          index={4}
        >
          <div className="relative w-full h-[200px] mt-4">
            <svg className="w-full h-full" viewBox={`0 0 ${barChartW} ${barChartH}`} preserveAspectRatio="none">
              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
                <line
                  key={i}
                  x1="40"
                  y1={20 + ratio * 140}
                  x2={barChartW - 20}
                  y2={20 + ratio * 140}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Bars */}
              {weeklySales.map((data, idx) => {
                const barWidth = 32
                const gap = (barChartW - 60) / weeklySales.length
                const x = 50 + idx * gap
                const barHeight = (data.sales / barMax) * 130
                const y = 160 - barHeight

                return (
                  <g key={idx}>
                    <rect
                      x={x - barWidth / 2}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      rx="6"
                      fill={hoveredBar === idx ? '#D94841' : '#F4D03F'}
                      className="cursor-pointer transition-all duration-300 hover:opacity-90"
                      onMouseEnter={() => setHoveredBar(idx)}
                      onMouseLeave={() => setHoveredBar(null)}
                    />
                    {/* X Axis labels */}
                    <text
                      x={x}
                      y="180"
                      textAnchor="middle"
                      className="text-[11px] fill-muted font-bold"
                    >
                      {data.day}
                    </text>
                  </g>
                )
              })}

              {/* Y Axis Labels */}
              <text x="5" y="25" className="text-[10px] fill-muted font-mono font-bold">₹{(barMax/1000).toFixed(0)}k</text>
              <text x="5" y="90" className="text-[10px] fill-muted font-mono font-bold">₹{(barMax/2000).toFixed(0)}k</text>
              <text x="5" y="160" className="text-[10px] fill-muted font-mono font-bold">₹0</text>
            </svg>

            {/* Hover Tooltip */}
            {hoveredBar !== null && (
              <div className="absolute bg-dark text-white text-xs rounded-xl p-2.5 shadow-xl border border-white/10 z-10 transition-all pointer-events-none"
                   style={{
                     left: `${50 + hoveredBar * ((barChartW - 60) / weeklySales.length) - 15}px`,
                     top: `${160 - (weeklySales[hoveredBar].sales / barMax) * 130 - 35}px`
                   }}>
                <p className="font-bold">{weeklySales[hoveredBar].day} Sales</p>
                <p className="text-accent font-mono font-bold mt-0.5">₹{weeklySales[hoveredBar].sales.toLocaleString()}</p>
              </div>
            )}
          </div>
        </AnalyticsCard>

        {/* Revenue Trend SVG Area Chart */}
        <AnalyticsCard
          title="Revenue & Profit Trend"
          subtitle="Financial overview of last 6 months"
          icon={BarChart3}
          index={5}
        >
          <div className="relative w-full h-[200px] mt-4">
            <svg className="w-full h-full" viewBox={`0 0 ${areaChartW} ${areaChartH}`} preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2E7D32" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
                <line
                  key={i}
                  x1="45"
                  y1={20 + ratio * 140}
                  x2={areaChartW - 20}
                  y2={20 + ratio * 140}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Generate SVG Path Points */}
              {(() => {
                const gap = (areaChartW - 65) / (revenueTrend.length - 1)
                const points = revenueTrend.map((d, i) => {
                  const x = 50 + i * gap
                  const y = 160 - ((d.revenue - trendMin) / (trendMax - trendMin)) * 120
                  return `${x},${y}`
                }).join(' ')

                const pathData = `M 50,160 L ${points} L ${50 + (revenueTrend.length - 1) * gap},160 Z`
                const lineData = `M ${points}`

                return (
                  <>
                    {/* Fill Area */}
                    <path d={pathData} fill="url(#areaGrad)" />
                    {/* Line */}
                    <path d={lineData} fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" />

                    {/* Interactive points */}
                    {revenueTrend.map((d, i) => {
                      const x = 50 + i * gap
                      const y = 160 - ((d.revenue - trendMin) / (trendMax - trendMin)) * 120
                      return (
                        <circle
                          key={i}
                          cx={x}
                          cy={y}
                          r={hoveredPoint === i ? 6 : 4}
                          fill={hoveredPoint === i ? '#D94841' : '#2E7D32'}
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

              {/* X Axis Labels */}
              {revenueTrend.map((d, i) => {
                const gap = (areaChartW - 65) / (revenueTrend.length - 1)
                const x = 50 + i * gap
                return (
                  <text
                    key={i}
                    x={x}
                    y="180"
                    textAnchor="middle"
                    className="text-[11px] fill-muted font-bold"
                  >
                    {d.month}
                  </text>
                )
              })}

              {/* Y Axis Labels */}
              <text x="5" y="25" className="text-[10px] fill-muted font-mono font-bold">₹1.2M</text>
              <text x="5" y="90" className="text-[10px] fill-muted font-mono font-bold">₹1.1M</text>
              <text x="5" y="160" className="text-[10px] fill-muted font-mono font-bold">₹950k</text>
            </svg>

            {/* Area Tooltip */}
            {hoveredPoint !== null && (
              <div className="absolute bg-dark text-white text-xs rounded-xl p-2.5 shadow-xl border border-white/10 z-10 transition-all pointer-events-none"
                   style={{
                     left: `${50 + hoveredPoint * ((areaChartW - 65) / (revenueTrend.length - 1)) - 30}px`,
                     top: `${160 - ((revenueTrend[hoveredPoint].revenue - trendMin) / (trendMax - trendMin)) * 120 - 45}px`
                   }}>
                <p className="font-bold">{revenueTrend[hoveredPoint].month} Report</p>
                <p className="text-green-light font-mono text-[10px] mt-0.5">Rev: ₹{revenueTrend[hoveredPoint].revenue.toLocaleString()}</p>
                <p className="text-accent font-mono text-[10px]">Profit: ₹{revenueTrend[hoveredPoint].profit.toLocaleString()}</p>
              </div>
            )}
          </div>
        </AnalyticsCard>

      </div>

      {/* Operational Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Low Stock Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold font-[family-name:var(--font-poppins)] text-sm text-dark flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-primary" />
                Low Stock Alerts
              </h3>
              <span className="text-[10px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded-full">
                {lowStockItems.length} Urgent
              </span>
            </div>
            <div className="space-y-3">
              {lowStockItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between bg-background border border-border/50 rounded-xl p-3">
                  <div>
                    <p className="text-xs font-bold text-dark">{item.name}</p>
                    <p className="text-[10px] text-muted font-medium mt-0.5">Alert Level: {item.min} {item.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-primary">{item.stock} {item.unit}</p>
                    <span className="text-[9px] text-[#D97706] font-semibold">Under stock</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link
            to="/owner/inventory"
            className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover pt-4 mt-4 border-t border-border/50 transition-colors"
          >
            <span>Manage Inventory</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Top Selling Items */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold font-[family-name:var(--font-poppins)] text-sm text-dark flex items-center gap-2">
                <Flame className="w-4 h-4 text-accent" />
                Top Dishes Today
              </h3>
              <span className="text-[10px] font-bold text-green bg-green-light px-2 py-0.5 rounded-full">
                Best Sellers
              </span>
            </div>
            <div className="space-y-3.5">
              {topItems.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-dark">
                    <span>{item.name}</span>
                    <span className="font-mono text-muted">{item.count} orders (₹{item.revenue})</span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link
            to="/owner/analytics"
            className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-dark hover:text-primary pt-4 mt-4 border-t border-border/50 transition-colors"
          >
            <span>Detailed Analytics</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Employee Summary Widget */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold font-[family-name:var(--font-poppins)] text-sm text-dark flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Staff Attendance
              </h3>
              <span className="text-[10px] font-bold text-green bg-green-light px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 text-center">
              <div className="bg-background border border-border/50 rounded-xl p-3">
                <p className="text-xl font-extrabold text-green">12</p>
                <p className="text-[10px] font-bold text-muted uppercase mt-0.5">Present Today</p>
              </div>
              <div className="bg-background border border-border/50 rounded-xl p-3">
                <p className="text-xl font-extrabold text-primary">3</p>
                <p className="text-[10px] font-bold text-muted uppercase mt-0.5">Absent Today</p>
              </div>
            </div>

            <div className="space-y-2 text-xs font-semibold text-muted">
              <div className="flex justify-between items-center bg-background/50 border border-border/40 p-2.5 rounded-lg">
                <span>Ramesh Kumar (Chef)</span>
                <span className="text-green text-[10px] font-bold">Present (08:15 AM)</span>
              </div>
              <div className="flex justify-between items-center bg-background/50 border border-border/40 p-2.5 rounded-lg">
                <span>Suresh V. (Cashier)</span>
                <span className="text-green text-[10px] font-bold">Present (08:45 AM)</span>
              </div>
            </div>
          </div>
          
          <Link
            to="/owner/employees"
            className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover pt-4 mt-4 border-t border-border/50 transition-colors"
          >
            <span>Manage Employees</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

      </div>
    </div>
  )
}

export default OwnerDashboard

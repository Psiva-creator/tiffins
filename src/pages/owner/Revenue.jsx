import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign,
  TrendingUp,
  Percent,
  CreditCard,
  Smartphone,
  Layers,
  ArrowRight,
  TrendingDown,
  Sparkles,
  ArrowDownToLine,
  Utensils
} from 'lucide-react'
import RevenueCard from '../../components/owner/RevenueCard'

const Revenue = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null)

  // Mock revenue trends for the last 6 months
  const monthlyRevenue = [
    { month: 'January', revenue: 980000, growth: '+5.2%', orders: 4200 },
    { month: 'February', revenue: 1050000, growth: '+7.1%', orders: 4500 },
    { month: 'March', revenue: 1120000, growth: '+6.6%', orders: 4800 },
    { month: 'April', revenue: 1080000, growth: '-3.5%', orders: 4620 },
    { month: 'May', revenue: 1180000, growth: '+9.2%', orders: 5050 },
    { month: 'June', revenue: 1245200, growth: '+8.5%', orders: 5180 }
  ]

  // Mock payment breakdown
  const paymentBreakdown = [
    { name: 'UPI (GPay / PhonePe / Paytm)', value: '₹6,47,504', percentage: 52, color: 'bg-green' },
    { name: 'Cash', value: '₹3,11,300', percentage: 25, color: 'bg-accent' },
    { name: 'Swiggy / Zomato Integration', value: '₹1,86,780', percentage: 15, color: 'bg-primary' },
    { name: 'Credit & Debit Cards', value: '₹99,616', percentage: 8, color: 'bg-dark' }
  ]

  // Mock busy meal slot analysis
  const mealSlots = [
    { name: 'Breakfast Slot (07:30 AM - 11:30 AM)', orders: 1240, revenue: 248000, topDish: 'Idli Vada Combo', share: 20 },
    { name: 'Lunch Slot (12:30 PM - 03:30 PM)', orders: 1580, revenue: 435820, topDish: 'South Indian Meals', share: 35 },
    { name: 'Evening Tea & Snacks (04:30 PM - 06:30 PM)', orders: 920, revenue: 124520, topDish: 'Filter Coffee + Samosa', share: 10 },
    { name: 'Dinner Slot (07:30 PM - 10:30 PM)', orders: 1440, revenue: 436860, topDish: 'Masala Dosa', share: 35 }
  ]

  const revMax = Math.max(...monthlyRevenue.map(d => d.revenue))
  const revMin = Math.min(...monthlyRevenue.map(d => d.revenue)) * 0.9
  const chartW = 600
  const chartH = 220

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-poppins)] text-dark mb-1">
            Revenue Dashboard
          </h1>
          <p className="text-[#888] text-xs md:text-sm font-medium">Sri Sai Darshini — Revenue streams and cashflows analytics</p>
        </div>

        <button
          onClick={() => alert('Downloading detailed revenue statements...')}
          className="flex items-center justify-center gap-2 bg-dark text-white hover:bg-sidebar-hover text-xs font-bold px-4 py-2.5 rounded-xl border border-white/10 hover:shadow-lg transition-all self-start sm:self-center cursor-pointer"
        >
          <ArrowDownToLine className="w-4 h-4 text-[#C62828]" />
          <span>Statement Report</span>
        </button>
      </motion.div>

      {/* Revenue Performance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <RevenueCard
          title="Monthly Revenue"
          value="₹12,45,200"
          change="+8.5% ↑"
          isPositive={true}
          trendData={[980000, 1050000, 1120000, 1080000, 1180000, 1245200]}
          timeframe="vs. last month"
          index={0}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-white rounded-2xl border border-[#F5F5F5] p-5 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-[rgba(198,40,40,0.06)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Percent className="w-5 h-5 text-[#C62828]" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[rgba(198,40,40,0.06)] text-green border border-[#C62828]/10">
              Gross Share
            </span>
          </div>
          <p className="text-xs font-medium text-muted uppercase tracking-wider">Gross Profit Margin</p>
          <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-dark mt-1 tracking-tight">
            70.0%
          </p>
          <div className="mt-4 pt-3 border-t border-[#F5F5F5]/50 flex items-center justify-between text-xs font-semibold text-[#888]">
            <span>Operating Margin: 30%</span>
            <span className="text-green">+1.2% MoM</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.16 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-white rounded-2xl border border-[#F5F5F5] p-5 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-light/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-[rgba(198,40,40,0.08)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Layers className="w-5 h-5 text-[#C62828]" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[rgba(198,40,40,0.08)] text-primary border border-[#C62828]/10">
              Online/POS
            </span>
          </div>
          <p className="text-xs font-medium text-muted uppercase tracking-wider">Online Deliveries share</p>
          <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-dark mt-1 tracking-tight">
            67.0%
          </p>
          <div className="mt-4 pt-3 border-t border-[#F5F5F5]/50 flex items-center justify-between text-xs font-semibold text-[#888]">
            <span>In-store Dine: 33%</span>
            <span className="text-[#C62828]">+5% growth</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.24 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-white rounded-2xl border border-[#F5F5F5] p-5 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-light to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-[rgba(198,40,40,0.10)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <DollarSign className="w-5 h-5 text-[#1A1A1A]" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[rgba(198,40,40,0.10)] text-dark border border-accent/10">
              Daily Average
            </span>
          </div>
          <p className="text-xs font-medium text-muted uppercase tracking-wider">Avg Daily Revenue</p>
          <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-dark mt-1 tracking-tight">
            ₹41,506
          </p>
          <div className="mt-4 pt-3 border-t border-[#F5F5F5]/50 flex items-center justify-between text-xs font-semibold text-[#C62828]">
            <span>Target: ₹40,000 / day</span>
            <span>Target met</span>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Growth Trend Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white border border-[#F5F5F5] rounded-2xl p-5 md:p-6 shadow-sm lg:col-span-2 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold font-[family-name:var(--font-poppins)] text-base text-dark flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#C62828]" />
                6-Month Revenue Progress
              </h3>
              <p className="text-xs text-muted font-medium mt-0.5">Historical growth curve (January - June)</p>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-green bg-[rgba(198,40,40,0.06)] px-2.5 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Steady 8.5% monthly compound growth</span>
            </div>
          </div>

          <div className="relative w-full h-[220px]">
            <svg className="w-full h-full" viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="none">
              <defs>
                <linearGradient id="revenueGrowthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C62828" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#C62828" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
                <line
                  key={i}
                  x1="45"
                  y1={20 + ratio * 140}
                  x2={chartW - 20}
                  y2={20 + ratio * 140}
                  stroke="#F5F5F5"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Curve mapping */}
              {(() => {
                const gap = (chartW - 65) / (monthlyRevenue.length - 1)
                const points = monthlyRevenue.map((d, i) => {
                  const x = 50 + i * gap
                  const y = 160 - ((d.revenue - revMin) / (revMax - revMin)) * 120
                  return `${x},${y}`
                }).join(' ')

                const pathData = `M 50,160 L ${points} L ${50 + (monthlyRevenue.length - 1) * gap},160 Z`
                const lineData = `M ${points}`

                return (
                  <>
                    <path d={pathData} fill="url(#revenueGrowthGrad)" />
                    <path d={lineData} fill="none" stroke="#C62828" strokeWidth="2.5" strokeLinecap="round" />

                    {/* Active nodes */}
                    {monthlyRevenue.map((d, i) => {
                      const x = 50 + i * gap
                      const y = 160 - ((d.revenue - revMin) / (revMax - revMin)) * 120
                      return (
                        <circle
                          key={i}
                          cx={x}
                          cy={y}
                          r={hoveredPoint === i ? 6 : 4}
                          fill={hoveredPoint === i ? '#F4D03F' : '#2E7D32'}
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

              {/* Month Labels */}
              {monthlyRevenue.map((d, i) => {
                const gap = (chartW - 65) / (monthlyRevenue.length - 1)
                const x = 50 + i * gap
                return (
                  <text
                    key={i}
                    x={x}
                    y="180"
                    textAnchor="middle"
                    className="text-[10px] fill-[#888] font-bold"
                  >
                    {d.month.substring(0, 3)}
                  </text>
                )
              })}

              {/* Y Axis */}
              <text x="5" y="25" className="text-[9px] fill-[#888] font-mono font-bold">₹{(revMax/1000).toFixed(0)}k</text>
              <text x="5" y="90" className="text-[9px] fill-[#888] font-mono font-bold">₹{(revMax/2000 + revMin/2000).toFixed(0)}k</text>
              <text x="5" y="160" className="text-[9px] fill-[#888] font-mono font-bold">₹{(revMin/1000).toFixed(0)}k</text>
            </svg>

            {/* Hover Tooltip */}
            {hoveredPoint !== null && (
              <div className="absolute bg-dark text-white text-[11px] rounded-xl p-2.5 shadow-xl border border-white/10 z-10 transition-all pointer-events-none"
                   style={{
                     left: `${50 + hoveredPoint * ((chartW - 65) / (monthlyRevenue.length - 1)) - 30}px`,
                     top: `${160 - ((monthlyRevenue[hoveredPoint].revenue - revMin) / (revMax - revMin)) * 120 - 45}px`
                   }}>
                <p className="font-bold">{monthlyRevenue[hoveredPoint].month}</p>
                <p className="text-[#C62828] font-mono font-bold">Rev: ₹{monthlyRevenue[hoveredPoint].revenue.toLocaleString()}</p>
                <p className="text-gray-300 font-mono">Orders: {monthlyRevenue[hoveredPoint].orders}</p>
                <p className="text-[#C62828] text-[10px]">Growth: {monthlyRevenue[hoveredPoint].growth}</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Payment Gateways Channels Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-white border border-[#F5F5F5] rounded-2xl p-5 md:p-6 shadow-sm flex flex-col justify-between"
        >
          <div>
            <h3 className="font-bold font-[family-name:var(--font-poppins)] text-base text-dark flex items-center gap-2 mb-1">
              <CreditCard className="w-5 h-5 text-[#C62828]" />
              Payment Channels
            </h3>
            <p className="text-xs text-muted font-medium mb-6">Distribution share of cash inflows</p>

            <div className="space-y-4">
              {paymentBreakdown.map((mode) => (
                <div key={mode.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-[#1A1A1A]">
                    <span className="truncate max-w-[200px]" title={mode.name}>{mode.name}</span>
                    <span className="font-mono text-[#888]">{mode.percentage}% ({mode.value})</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${mode.color}`} style={{ width: `${mode.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#F5F5F5]/50 flex items-center justify-between text-[11px] font-semibold text-muted mt-6">
            <span>Digital Share: 75%</span>
            <span>Cash Share: 25%</span>
          </div>
        </motion.div>

      </div>

      {/* Meal Slots revenue analysis table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white border border-[#F5F5F5] rounded-2xl p-5 md:p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold font-[family-name:var(--font-poppins)] text-base text-[#1A1A1A]">
              Hourly slots Revenue Contribution
            </h3>
            <p className="text-xs text-muted font-medium mt-0.5">Average collection grouped by dining windows</p>
          </div>
          <Utensils className="w-5 h-5 text-[#888]" />
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#F5F5F5]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F5F5F5] border-b border-[#F5F5F5]/80 text-[11px] font-bold text-muted uppercase tracking-wider">
                <th className="p-4">Time Slot Window</th>
                <th className="p-4 text-center">Avg. Orders/Month</th>
                <th className="p-4 text-right">Avg. Collection</th>
                <th className="p-4">Best Performing Dishes</th>
                <th className="p-4 text-center">Revenue Contribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F5F5] text-xs font-semibold text-[#1A1A1A]">
              {mealSlots.map((slot) => (
                <tr key={slot.name} className="hover:bg-[#F5F5F5]/40 transition-colors">
                  <td className="p-4 font-bold text-[#1A1A1A]">{slot.name}</td>
                  <td className="p-4 text-center font-mono font-medium">{slot.orders} orders</td>
                  <td className="p-4 text-right font-mono font-bold">₹{slot.revenue.toLocaleString()}</td>
                  <td className="p-4 text-[#C62828]">{slot.topDish}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-border rounded-full overflow-hidden shrink-0">
                        <div className="h-full bg-accent rounded-full" style={{ width: `${slot.share}%` }} />
                      </div>
                      <span className="font-mono text-[10px] w-6 text-right font-bold">{slot.share}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

export default Revenue

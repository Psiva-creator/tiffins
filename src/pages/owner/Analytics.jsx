import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  PieChart,
  TrendingUp,
  Award,
  Clock,
  ThumbsUp,
  Star,
  Zap,
  Sparkles,
  AlertCircle,
  ArrowUpRight,
  ShieldCheck,
  UtensilsCrossed
} from 'lucide-react'
import AnalyticsCard from '../../components/owner/AnalyticsCard'

const Analytics = () => {
  const [customerPeriod, setCustomerPeriod] = useState('Weekly')
  const [hoveredPoint, setHoveredPoint] = useState(null)

  // Mock sales insights
  const insights = [
    {
      id: 1,
      title: 'Slot Opportunity identified',
      description: 'Filter Coffee sales spikes by 22% between 7:30 AM - 9:30 AM. Suggest pairing with Idli/Vada combo discounts.',
      type: 'opportunity',
      icon: Zap,
      color: 'text-[#D97706] bg-[#FEF3C7] border-[#F59E0B]/20'
    },
    {
      id: 2,
      title: 'Kitchen prep efficiency up',
      description: 'Average ticket preparation time dropped to 11.8 mins (down 8% from last week). Cooking speed is excellent.',
      type: 'positive',
      icon: ShieldCheck,
      color: 'text-green bg-[rgba(198,40,40,0.06)] border-[#C62828]/20'
    },
    {
      id: 3,
      title: 'Restock recommendation',
      description: 'Based on current consumption trends, Paneer and Milk stocks will be depleted prior to Friday dinner. Set reorders today.',
      type: 'warning',
      icon: AlertCircle,
      color: 'text-primary bg-[rgba(198,40,40,0.08)] border-[#C62828]/20'
    }
  ]

  // Top Selling Items detailed metrics
  const menuItemsPerformance = [
    { name: 'Masala Dosa', category: 'Tiffin', sold: 1240, revenue: 99200, margin: '68%', popularity: 98 },
    { name: 'Filter Coffee', category: 'Beverage', sold: 1850, revenue: 55500, margin: '75%', popularity: 95 },
    { name: 'Idli Vada Combo', category: 'Tiffin', sold: 980, revenue: 78400, margin: '65%', popularity: 80 },
    { name: 'Rava Kesari', category: 'Sweet', sold: 540, revenue: 32400, margin: '70%', popularity: 60 },
    { name: 'South Indian Meals', category: 'Meals', sold: 480, revenue: 57600, margin: '60%', popularity: 75 }
  ]

  // Mock Customer Growth details
  const customerGrowthData = [
    { period: 'Mon/Week 1', newCust: 120, repeatCust: 280 },
    { period: 'Tue/Week 2', newCust: 145, repeatCust: 310 },
    { period: 'Wed/Week 3', newCust: 160, repeatCust: 290 },
    { period: 'Thu/Week 4', newCust: 185, repeatCust: 340 },
    { period: 'Fri/Week 5', newCust: 210, repeatCust: 410 },
    { period: 'Sat/Week 6', newCust: 280, repeatCust: 480 },
    { period: 'Sun/Week 7', newCust: 310, repeatCust: 520 }
  ]

  // Operational KPI metrics
  const opsMetrics = [
    { name: 'Average Table Turnaround', value: '28 Mins', status: 'Optimal', change: '-4 mins vs last month', icon: Clock },
    { name: 'Kitchen Cooking Speed', value: '11.8 Mins', status: 'Excellent', change: '-1.2 mins vs last week', icon: Zap },
    { name: 'Order Accuracy Rate', value: '99.2%', status: 'Flawless', change: '+0.4% vs last week', icon: ShieldCheck },
    { name: 'Customer Satisfaction', value: '4.75 / 5', status: 'Highly Rated', change: 'Based on 450+ ratings', icon: ThumbsUp }
  ]

  const maxCust = Math.max(...customerGrowthData.map(d => d.newCust + d.repeatCust))
  const chartW = 500
  const chartH = 180

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
            Performance Analytics
          </h1>
          <p className="text-[#888] text-xs md:text-sm font-medium">Sri Sai Darshini — AI operational audits and customer retention reports</p>
        </div>
      </motion.div>

      {/* AI Business Insights Banner panel */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="bg-white border border-[#F5F5F5] rounded-2xl p-5 md:p-6 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-accent animate-spin" />
          <h3 className="font-bold font-[family-name:var(--font-poppins)] text-sm text-dark uppercase tracking-wider">
            Smart Restaurant Insights
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-semibold">
          {insights.map((ins) => (
            <div key={ins.id} className={`p-4 border rounded-xl flex items-start gap-3 transition-transform hover:scale-[1.01] ${ins.color}`}>
              <ins.icon className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#1A1A1A]">{ins.title}</h4>
                <p className="text-[11px] text-muted font-medium mt-1 leading-normal">{ins.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Customer Growth SVG Line Chart */}
        <AnalyticsCard
          title="Customer Retention & Growth"
          subtitle="New vs Repeat footfalls distribution"
          icon={TrendingUp}
          period={customerPeriod}
          onChangePeriod={setCustomerPeriod}
          index={2}
        >
          <div className="relative w-full h-[180px] mt-4">
            <svg className="w-full h-full" viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="none">
              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
                <line
                  key={i}
                  x1="45"
                  y1={15 + ratio * 120}
                  x2={chartW - 20}
                  y2={15 + ratio * 120}
                  stroke="#F5F5F5"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Draw Lines */}
              {(() => {
                const gap = (chartW - 65) / (customerGrowthData.length - 1)
                
                // Repeat Customer line points
                const repeatPoints = customerGrowthData.map((d, i) => {
                  const x = 50 + i * gap
                  const y = 140 - (d.repeatCust / maxCust) * 110
                  return `${x},${y}`
                }).join(' ')

                // New Customer line points
                const newPoints = customerGrowthData.map((d, i) => {
                  const x = 50 + i * gap
                  const y = 140 - (d.newCust / maxCust) * 110
                  return `${x},${y}`
                }).join(' ')

                return (
                  <>
                    {/* Repeat Customer Line */}
                    <path d={`M ${repeatPoints}`} fill="none" stroke="#C62828" strokeWidth="2.5" strokeLinecap="round" />
                    {/* New Customer Line */}
                    <path d={`M ${newPoints}`} fill="none" stroke="#C62828" strokeWidth="2.5" strokeLinecap="round" />

                    {/* Nodes */}
                    {customerGrowthData.map((d, i) => {
                      const x = 50 + i * gap
                      const yRepeat = 140 - (d.repeatCust / maxCust) * 110
                      return (
                        <circle
                          key={`rep-${i}`}
                          cx={x}
                          cy={yRepeat}
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

              {/* X Axis Labels */}
              {customerGrowthData.map((d, i) => {
                const gap = (chartW - 65) / (customerGrowthData.length - 1)
                const x = 50 + i * gap
                return (
                  <text
                    key={i}
                    x={x}
                    y="165"
                    textAnchor="middle"
                    className="text-[9px] fill-[#888] font-bold"
                  >
                    W{i + 1}
                  </text>
                )
              })}

              {/* Y Axis Labels */}
              <text x="5" y="20" className="text-[9px] fill-[#888] font-mono font-bold">500+</text>
              <text x="5" y="80" className="text-[9px] fill-[#888] font-mono font-bold">250</text>
              <text x="5" y="140" className="text-[9px] fill-[#888] font-mono font-bold">0</text>
            </svg>

            {/* Customer Growth Tooltip */}
            {hoveredPoint !== null && (
              <div className="absolute bg-dark text-white text-[11px] rounded-xl p-2.5 shadow-xl border border-white/10 z-10 pointer-events-none"
                   style={{
                     left: `${50 + hoveredPoint * ((chartW - 65) / (customerGrowthData.length - 1)) - 30}px`,
                     top: `${140 - (customerGrowthData[hoveredPoint].repeatCust / maxCust) * 110 - 45}px`
                   }}>
                <p className="font-bold">Week {hoveredPoint + 1} Traffic</p>
                <p className="text-[#C62828] font-mono font-bold">Repeat Cust: {customerGrowthData[hoveredPoint].repeatCust}</p>
                <p className="text-[#C62828] font-mono font-bold">New Cust: {customerGrowthData[hoveredPoint].newCust}</p>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-muted border-t border-[#F5F5F5]/40 pt-3 mt-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-green border-t-2 border-[#C62828]" />
              <span>Returning Customers (70%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-primary border-t-2 border-primary" />
              <span>First-Time Visitors (30%)</span>
            </div>
          </div>
        </AnalyticsCard>

        {/* Menu Dishes Performance List */}
        <AnalyticsCard
          title="Menu Popularity Index"
          subtitle="Top food orders volumes vs margin"
          icon={PieChart}
          index={3}
        >
          <div className="space-y-3.5 mt-2">
            {menuItemsPerformance.slice(0, 4).map((item) => (
              <div key={item.name} className="space-y-1 font-semibold">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#1A1A1A] font-bold">{item.name}</span>
                    <span className="text-[10px] text-muted bg-[#F5F5F5] border border-[#E0E0E0] px-1.5 py-0.2 rounded-md">
                      {item.category}
                    </span>
                  </div>
                  <span className="font-mono text-[#888]">{item.sold} sold | Margin: {item.margin}</span>
                </div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${item.popularity}%` }} />
                </div>
              </div>
            ))}
          </div>
        </AnalyticsCard>

      </div>

      {/* Operational KPIs grid */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="bg-white border border-[#F5F5F5] rounded-2xl p-5 md:p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold font-[family-name:var(--font-poppins)] text-base text-dark flex items-center gap-2">
              <Award className="w-5 h-5 text-[#C62828]" />
              Restaurant Operational KPIs
            </h3>
            <p className="text-xs text-muted font-medium mt-0.5">Kitchen performance logs and table turnover metrics</p>
          </div>
          <UtensilsCrossed className="w-5 h-5 text-[#888]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {opsMetrics.map((met, idx) => (
            <div key={met.name} className="bg-[#F5F5F5] border border-[#E0E0E0]/60 rounded-2xl p-4 flex gap-3.5 transition-transform hover:scale-[1.01]">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <met.icon className="w-5 h-5 text-[#C62828]" />
              </div>
              <div className="min-w-0 font-semibold text-xs text-[#1A1A1A]">
                <p className="text-[#888] text-[10px] uppercase tracking-wider">{met.name}</p>
                <p className="text-lg font-bold font-[family-name:var(--font-poppins)] text-dark mt-0.5">{met.value}</p>
                <span className="text-[9px] text-green font-bold flex items-center gap-0.5 mt-1">
                  {met.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Analytics

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Percent,
  Plus,
  X,
  PlusCircle,
  Building,
  Users,
  Wallet,
  PiggyBank,
  CheckCircle,
  ArrowDownToLine
} from 'lucide-react'
import ProfitCard from '../../components/owner/ProfitCard'

const ProfitLoss = () => {
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [hoveredBar, setHoveredBar] = useState(null)
  
  // Custom states for adding mock expense
  const [expenseTitle, setExpenseTitle] = useState('')
  const [expenseCategory, setExpenseCategory] = useState('Raw Ingredients')
  const [expenseAmount, setExpenseAmount] = useState('')

  // Mock list of expenses for the current month
  const [expensesList, setExpensesList] = useState([
    { category: 'Raw Ingredients (COGS)', amount: 435820, percentage: 50, icon: Wallet, color: 'bg-primary text-primary bg-[rgba(198,40,40,0.08)]/40' },
    { category: 'Staff Salaries', amount: 220000, percentage: 25, icon: Users, color: 'bg-green text-green bg-[rgba(198,40,40,0.06)]/40' },
    { category: 'Rent & Utilities', amount: 150000, percentage: 17, icon: Building, color: 'bg-accent text-dark bg-accent-light' },
    { category: 'Marketing & Promos', amount: 45000, percentage: 5, icon: PiggyBank, color: 'bg-dark text-white bg-dark/15' },
    { category: 'Miscellaneous', amount: 20820, percentage: 3, icon: PlusCircle, color: 'bg-muted text-muted bg-muted/20' }
  ])

  // Mock historical P&L statements
  const historicalPL = [
    { month: 'February 2026', revenue: 1050000, expenses: 740000, profit: 310000, margin: '29.5%' },
    { month: 'March 2026', revenue: 1120000, expenses: 795000, profit: 325000, margin: '29.0%' },
    { month: 'April 2026', revenue: 1080000, expenses: 762000, profit: 318000, margin: '29.4%' },
    { month: 'May 2026', revenue: 1180000, expenses: 826000, profit: 354000, margin: '30.0%' },
    { month: 'June 2026', revenue: 1245200, expenses: 871640, profit: 373560, margin: '30.0%' }
  ]

  // Add mock expense handler
  const handleAddExpense = (e) => {
    e.preventDefault()
    if (!expenseTitle || !expenseAmount) return

    const amount = parseFloat(expenseAmount)
    if (isNaN(amount) || amount <= 0) return

    // Simply add to raw ingredients/misc or matching category mock totals
    const updatedExpenses = expensesList.map(exp => {
      if (exp.category.includes(expenseCategory)) {
        return { ...exp, amount: exp.amount + amount }
      }
      return exp
    })

    // Recompute total and percentages
    const totalExp = updatedExpenses.reduce((sum, item) => sum + item.amount, 0)
    const finalExpenses = updatedExpenses.map(exp => ({
      ...exp,
      percentage: Math.round((exp.amount / totalExp) * 100)
    }))

    setExpensesList(finalExpenses)
    setExpenseTitle('')
    setExpenseAmount('')
    setShowAddExpense(false)
    alert(`Successfully added expense: ${expenseTitle} (₹${amount.toLocaleString()}) to ${expenseCategory}`)
  }

  // Compute Current totals
  const totalRevenue = 1245200
  const totalExpenses = expensesList.reduce((sum, item) => sum + item.amount, 0)
  const netProfit = totalRevenue - totalExpenses
  const profitMargin = ((netProfit / totalRevenue) * 100).toFixed(1)

  // Chart measurements
  const chartW = 550
  const chartH = 200
  const maxRevenue = Math.max(...historicalPL.map(d => d.revenue))

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
            Profit & Loss Statement
          </h1>
          <p className="text-[#888] text-xs md:text-sm font-medium">Sri Sai Darshini — Operating expenditures and net margins audit</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start sm:self-center">
          <button
            onClick={() => setShowAddExpense(true)}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-[#B71C1C] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:shadow-lg hover:shadow-primary/15 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Record Expense</span>
          </button>
          
          <button
            onClick={() => alert('Downloading P&L Balance Sheets...')}
            className="flex items-center justify-center gap-2 bg-dark text-white hover:bg-sidebar-hover text-xs font-bold px-4 py-2.5 rounded-xl border border-white/10 hover:shadow-lg transition-all cursor-pointer"
          >
            <ArrowDownToLine className="w-4 h-4 text-[#C62828]" />
            <span>Export Balance Sheet</span>
          </button>
        </div>
      </motion.div>

      {/* KPI summary grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-semibold">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl border border-[#F5F5F5] p-5 hover:shadow-lg transition-all duration-300"
        >
          <p className="text-xs text-muted uppercase tracking-wider">Gross Revenue</p>
          <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-dark mt-1">₹{totalRevenue.toLocaleString()}</p>
          <span className="text-[10px] text-green font-bold bg-[rgba(198,40,40,0.06)] px-2 py-0.5 rounded-full mt-2.5 inline-block">
            +8.5% growth vs. May
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="bg-white rounded-2xl border border-[#F5F5F5] p-5 hover:shadow-lg transition-all duration-300"
        >
          <p className="text-xs text-muted uppercase tracking-wider">Cost of Goods Sold (COGS)</p>
          <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-dark mt-1">₹{expensesList[0].amount.toLocaleString()}</p>
          <span className="text-[10px] text-muted font-semibold bg-[#F5F5F5] border border-[#E0E0E0] px-2 py-0.5 rounded-full mt-2.5 inline-block">
            35% raw inventory ratio
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.16 }}
          className="bg-white rounded-2xl border border-[#F5F5F5] p-5 hover:shadow-lg transition-all duration-300"
        >
          <p className="text-xs text-muted uppercase tracking-wider">Operating Expenses (OPEX)</p>
          <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-dark mt-1">₹{(totalExpenses - expensesList[0].amount).toLocaleString()}</p>
          <span className="text-[10px] text-muted font-semibold bg-[#F5F5F5] border border-[#E0E0E0] px-2 py-0.5 rounded-full mt-2.5 inline-block">
            Salaries, Rent, Bills, Ads
          </span>
        </motion.div>

        <ProfitCard
          title="Operating Net Profit"
          value={`₹${netProfit.toLocaleString()}`}
          margin={`${profitMargin}%`}
          change="+8.2%"
          isPositive={true}
          index={3}
        />
      </div>

      {/* Charts section: Compare Revenue vs Expenses & Expense breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SVG Revenue vs Expense double bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white border border-[#F5F5F5] rounded-2xl p-5 md:p-6 shadow-sm lg:col-span-2 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold font-[family-name:var(--font-poppins)] text-base text-dark flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#C62828]" />
                Revenue vs Expense Comparison
              </h3>
              <p className="text-xs text-muted font-medium mt-0.5">Performance tracking across last 5 billing cycles</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-accent rounded-sm" />
                <span className="text-[#1A1A1A]">Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-primary rounded-sm" />
                <span className="text-[#1A1A1A]">Expenses</span>
              </div>
            </div>
          </div>

          <div className="relative w-full h-[200px]">
            <svg className="w-full h-full" viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="none">
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

              {/* Draw double bars */}
              {historicalPL.map((data, idx) => {
                const gap = (chartW - 60) / historicalPL.length
                const xCenter = 50 + idx * gap

                const barWidth = 16
                const revHeight = (data.revenue / maxRevenue) * 130
                const expHeight = (data.expenses / maxRevenue) * 130

                const revY = 160 - revHeight
                const expY = 160 - expHeight

                return (
                  <g key={idx}>
                    {/* Revenue Bar */}
                    <rect
                      x={xCenter - barWidth - 2}
                      y={revY}
                      width={barWidth}
                      height={revHeight}
                      rx="4"
                      fill="#EF5350"
                      className="cursor-pointer transition-all duration-300 hover:opacity-90"
                      onMouseEnter={() => setHoveredBar({ idx, type: 'Revenue' })}
                      onMouseLeave={() => setHoveredBar(null)}
                    />
                    {/* Expense Bar */}
                    <rect
                      x={xCenter + 2}
                      y={expY}
                      width={barWidth}
                      height={expHeight}
                      rx="4"
                      fill="#C62828"
                      className="cursor-pointer transition-all duration-300 hover:opacity-90"
                      onMouseEnter={() => setHoveredBar({ idx, type: 'Expenses' })}
                      onMouseLeave={() => setHoveredBar(null)}
                    />
                    
                    {/* Month Label */}
                    <text
                      x={xCenter}
                      y="180"
                      textAnchor="middle"
                      className="text-[10px] fill-[#888] font-bold"
                    >
                      {data.month.split(' ')[0]}
                    </text>
                  </g>
                )
              })}

              {/* Y Axis */}
              <text x="5" y="25" className="text-[9px] fill-[#888] font-mono font-bold">₹{(maxRevenue/1000).toFixed(0)}k</text>
              <text x="5" y="90" className="text-[9px] fill-[#888] font-mono font-bold">₹{(maxRevenue/2000).toFixed(0)}k</text>
              <text x="5" y="160" className="text-[9px] fill-[#888] font-mono font-bold">₹0</text>
            </svg>

            {/* Hover Tooltip */}
            {hoveredBar !== null && (
              <div className="absolute bg-dark text-white text-[11px] rounded-xl p-2.5 shadow-xl border border-white/10 z-10 transition-all pointer-events-none"
                   style={{
                     left: `${50 + hoveredBar.idx * ((chartW - 60) / historicalPL.length) - 20}px`,
                     top: `${160 - (historicalPL[hoveredBar.idx][hoveredBar.type === 'Revenue' ? 'revenue' : 'expenses'] / maxRevenue) * 130 - 45}px`
                   }}>
                <p className="font-bold">{historicalPL[hoveredBar.idx].month}</p>
                <p className={`font-mono font-bold mt-0.5 ${hoveredBar.type === 'Revenue' ? 'text-accent' : 'text-primary'}`}>
                  {hoveredBar.type}: ₹{historicalPL[hoveredBar.idx][hoveredBar.type === 'Revenue' ? 'revenue' : 'expenses'].toLocaleString()}
                </p>
                {hoveredBar.type === 'Expenses' && (
                  <p className="text-gray-300 font-mono text-[9px]">Margin: {historicalPL[hoveredBar.idx].margin}</p>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Expense Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-white border border-[#F5F5F5] rounded-2xl p-5 md:p-6 shadow-sm flex flex-col justify-between"
        >
          <div>
            <h3 className="font-bold font-[family-name:var(--font-poppins)] text-base text-dark flex items-center gap-2 mb-1">
              <Percent className="w-5 h-5 text-[#C62828]" />
              Expense Breakdown
            </h3>
            <p className="text-xs text-muted font-medium mb-6">Itemized spending for current month</p>

            <div className="space-y-4">
              {expensesList.map((exp) => (
                <div key={exp.category} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${exp.color}`}>
                    <exp.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-xs font-bold text-dark mb-1">
                      <span className="truncate">{exp.category}</span>
                      <span className="font-mono text-[#888]">{exp.percentage}%</span>
                    </div>
                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                      {/* Using primary, green, accent dynamically */}
                      <div
                        className={`h-full rounded-full ${
                          exp.category.includes('Ingredients') ? 'bg-primary' :
                          exp.category.includes('Salaries') ? 'bg-green' :
                          exp.category.includes('Rent') ? 'bg-accent' :
                          'bg-dark'
                        }`}
                        style={{ width: `${exp.percentage}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted font-mono font-semibold mt-1 block">
                      ₹{exp.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      {/* Historical P&L Statements Table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white border border-[#F5F5F5] rounded-2xl p-5 md:p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold font-[family-name:var(--font-poppins)] text-base text-[#1A1A1A]">
              P&L Historical Balance Statement
            </h3>
            <p className="text-xs text-muted font-medium mt-0.5">Historical ledger data</p>
          </div>
          <span className="text-[11px] font-bold text-green bg-[rgba(198,40,40,0.06)] px-3 py-1 rounded-full border border-[#C62828]/20">
            Average Profit Margin: 29.5%
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#F5F5F5]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F5F5F5] border-b border-[#F5F5F5]/80 text-[11px] font-bold text-muted uppercase tracking-wider">
                <th className="p-4">Billing Month</th>
                <th className="p-4 text-right">Gross Sales (Revenue)</th>
                <th className="p-4 text-right">COGS (Raw Supplies)</th>
                <th className="p-4 text-right">Staff Wages</th>
                <th className="p-4 text-right">Rent & Bills</th>
                <th className="p-4 text-right">Marketing & Other</th>
                <th className="p-4 text-right">Net Profit</th>
                <th className="p-4 text-center">Net margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F5F5] text-xs font-semibold text-[#1A1A1A]">
              {historicalPL.map((row, idx) => {
                // Approximate itemised expense breakdown for display
                const isCurrent = idx === historicalPL.length - 1
                const details = isCurrent ? {
                  cogs: expensesList[0].amount,
                  wages: expensesList[1].amount,
                  rent: expensesList[2].amount,
                  other: expensesList[3].amount + expensesList[4].amount
                } : {
                  cogs: Math.round(row.expenses * 0.5),
                  wages: Math.round(row.expenses * 0.25),
                  rent: Math.round(row.expenses * 0.17),
                  other: Math.round(row.expenses * 0.08)
                }

                return (
                  <tr key={row.month} className="hover:bg-[#F5F5F5]/40 transition-colors">
                    <td className="p-4 font-bold text-[#1A1A1A]">{row.month}</td>
                    <td className="p-4 text-right font-mono font-bold">₹{row.revenue.toLocaleString()}</td>
                    <td className="p-4 text-right font-mono text-[#888]">₹{details.cogs.toLocaleString()}</td>
                    <td className="p-4 text-right font-mono text-[#888]">₹{details.wages.toLocaleString()}</td>
                    <td className="p-4 text-right font-mono text-[#888]">₹{details.rent.toLocaleString()}</td>
                    <td className="p-4 text-right font-mono text-[#888]">₹{details.other.toLocaleString()}</td>
                    <td className="p-4 text-right font-mono text-green font-bold">₹{(row.revenue - (details.cogs + details.wages + details.rent + details.other)).toLocaleString()}</td>
                    <td className="p-4 text-center">
                      <span className="bg-[rgba(198,40,40,0.06)] text-green border border-[#C62828]/10 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        {row.margin}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Record Expense Modal overlay */}
      <AnimatePresence>
        {showAddExpense && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddExpense(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-md border border-[#F5F5F5] rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="p-5 border-b border-[#F5F5F5] flex items-center justify-between bg-[#F5F5F5]">
                  <h4 className="font-bold text-dark font-[family-name:var(--font-poppins)] text-sm flex items-center gap-2">
                    <PlusCircle className="w-5 h-5 text-[#C62828]" />
                    Record Operational Expense
                  </h4>
                  <button
                    onClick={() => setShowAddExpense(false)}
                    className="p-1 text-muted hover:text-dark hover:bg-border rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleAddExpense} className="p-5 space-y-4 font-semibold text-xs text-[#1A1A1A]">
                  {/* Title */}
                  <div className="space-y-1.5">
                    <label className="text-[#888]">Expense Description</label>
                    <input
                      type="text"
                      placeholder="e.g. Purchased 10 Kgs Tomato"
                      value={expenseTitle}
                      onChange={(e) => setExpenseTitle(e.target.value)}
                      required
                      className="w-full p-3 border border-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-semibold"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="text-[#888]">Expense Category</label>
                    <select
                      value={expenseCategory}
                      onChange={(e) => setExpenseCategory(e.target.value)}
                      className="w-full p-3 border border-[#F5F5F5] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-semibold"
                    >
                      <option value="Raw Ingredients">Raw Ingredients (COGS)</option>
                      <option value="Staff Salaries">Staff Salaries / Wages</option>
                      <option value="Rent & Utilities">Rent, Power, Gas, Water</option>
                      <option value="Marketing & Promos">Marketing, Ads, Signboards</option>
                      <option value="Miscellaneous">Miscellaneous / Repair</option>
                    </select>
                  </div>

                  {/* Amount */}
                  <div className="space-y-1.5">
                    <label className="text-[#888]">Expense Amount (INR)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-[#888]">₹</span>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(e.target.value)}
                        required
                        min="1"
                        className="w-full pl-7 pr-4 p-3 border border-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono font-bold text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-[#B71C1C] text-white py-3 rounded-xl hover:shadow-lg hover:shadow-primary/10 transition-all font-bold cursor-pointer mt-2"
                  >
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span>Save Transaction</span>
                  </button>
                </form>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  )
}

export default ProfitLoss

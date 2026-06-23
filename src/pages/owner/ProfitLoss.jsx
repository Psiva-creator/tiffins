import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, MinusCircle, BarChart3 } from 'lucide-react'
import { useOrder } from '../../hooks/useOrder'

const ProfitLoss = () => {
  const { revenueStats, wastageLog } = useOrder()

  const totalRevenue = revenueStats.totalRevenue
  const wastageValue = wastageLog.reduce((s, w) => s + (w.qty || 0) * 50, 0)
  const cogs = Math.round(totalRevenue * 0.4)
  const operatingCost = Math.round(totalRevenue * 0.2)
  const totalExpenses = cogs + operatingCost + wastageValue
  const netProfit = totalRevenue - totalExpenses
  const profitMargin = totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0
  const isProfitable = netProfit >= 0

  const breakdownItems = [
    { label: 'Total Revenue', value: totalRevenue, icon: DollarSign, color: 'text-green', type: 'income' },
    { label: 'Cost of Goods', value: cogs, icon: MinusCircle, color: 'text-red-500', type: 'expense' },
    { label: 'Operating Costs', value: operatingCost, icon: MinusCircle, color: 'text-red-500', type: 'expense' },
    { label: 'Wastage Loss', value: wastageValue, icon: MinusCircle, color: 'text-amber-600', type: 'expense' },
  ]

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-poppins)] text-dark mb-1">Profit & Loss</h1>
        <p className="text-muted text-sm mb-6">Analyze financial performance of the restaurant</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`rounded-2xl border p-6 mb-6 ${isProfitable ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted mb-1">Net Profit</p>
            <p className={`text-3xl font-bold font-[family-name:var(--font-poppins)] ${isProfitable ? 'text-green' : 'text-red-500'}`}>
              {isProfitable ? '+' : '-'}₹{Math.abs(netProfit).toLocaleString()}
            </p>
            <div className="flex items-center gap-1 mt-2">
              {isProfitable ? <TrendingUp className="w-4 h-4 text-green" /> : <TrendingDown className="w-4 h-4 text-red-500" />}
              <span className={`text-sm font-semibold ${isProfitable ? 'text-green' : 'text-red-500'}`}>{profitMargin}% margin</span>
            </div>
          </div>
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isProfitable ? 'bg-green/10' : 'bg-red-100'}`}>
            <BarChart3 className={`w-8 h-8 ${isProfitable ? 'text-green' : 'text-red-500'}`} />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl border border-border p-5">
          <h3 className="text-sm font-bold text-dark mb-4">Breakdown</h3>
          <div className="space-y-3">
            {breakdownItems.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.06 }} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-2">
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                  <span className="text-sm text-dark">{item.label}</span>
                </div>
                <span className={`text-sm font-bold ${item.type === 'income' ? 'text-green' : 'text-red-500'}`}>
                  {item.type === 'income' ? '+' : '-'}₹{item.value.toLocaleString()}
                </span>
              </motion.div>
            ))}
            <div className="flex items-center justify-between pt-3 mt-3 border-t-2 border-border">
              <span className="font-bold text-dark">Net Profit</span>
              <span className={`text-lg font-bold ${isProfitable ? 'text-green' : 'text-red-500'}`}>
                {isProfitable ? '+' : '-'}₹{Math.abs(netProfit).toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card rounded-2xl border border-border p-5">
          <h3 className="text-sm font-bold text-dark mb-4">Revenue vs Expenses</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-xs text-muted">Revenue</span>
                <span className="text-xs font-bold text-green">₹{totalRevenue.toLocaleString()}</span>
              </div>
              <div className="h-6 bg-border/30 rounded-lg overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.4 }} className="h-full rounded-lg bg-gradient-to-r from-green to-green/60" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-xs text-muted">Expenses</span>
                <span className="text-xs font-bold text-red-500">₹{totalExpenses.toLocaleString()}</span>
              </div>
              <div className="h-6 bg-border/30 rounded-lg overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${totalRevenue > 0 ? (totalExpenses / totalRevenue) * 100 : 0}%` }} transition={{ delay: 0.45 }} className="h-full rounded-lg bg-gradient-to-r from-red-400 to-red-300" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-xs text-muted">Profit</span>
                <span className={`text-xs font-bold ${isProfitable ? 'text-green' : 'text-red-500'}`}>₹{Math.abs(netProfit).toLocaleString()}</span>
              </div>
              <div className="h-6 bg-border/30 rounded-lg overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${totalRevenue > 0 ? (Math.abs(netProfit) / totalRevenue) * 100 : 0}%` }} transition={{ delay: 0.5 }} className={`h-full rounded-lg ${isProfitable ? 'bg-gradient-to-r from-blue-500 to-blue-300' : 'bg-gradient-to-r from-amber-400 to-amber-300'}`} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProfitLoss

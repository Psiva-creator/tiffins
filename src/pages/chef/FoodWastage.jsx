import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, AlertTriangle, X } from 'lucide-react'
import { useOrder } from '../../hooks/useOrder'
import { MENU_ITEMS } from '../../data'

const reasons = ['Expired', 'Overcooked', 'Dropped', 'Spoiled', 'Customer Return', 'Other']

const FoodWastage = () => {
  const { wastageLog, addWastageEntry } = useOrder()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ item: '', qty: '', reason: reasons[0] })

  const todayLog = wastageLog.filter(w => w.date?.slice(0, 10) === new Date().toISOString().slice(0, 10))
  const weekAgo = Date.now() - 7 * 86400000
  const weekLog = wastageLog.filter(w => new Date(w.date).getTime() >= weekAgo)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.item || !form.qty) return
    addWastageEntry({ item: form.item, qty: parseFloat(form.qty), reason: form.reason })
    setForm({ item: '', qty: '', reason: reasons[0] })
    setShowForm(false)
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-poppins)] text-dark mb-1">Food Wastage</h1>
            <p className="text-muted text-sm">Log and track food wastage to minimize losses</p>
          </div>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors">
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showForm ? 'Cancel' : 'Log Wastage'}
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Today', value: `${todayLog.length} entries`, sub: `${todayLog.reduce((s, w) => s + (w.qty || 0), 0).toFixed(1)} kg` },
          { label: 'This Week', value: `${weekLog.length} entries`, sub: `${weekLog.reduce((s, w) => s + (w.qty || 0), 0).toFixed(1)} kg` },
          { label: 'All Time', value: `${wastageLog.length} entries`, sub: `${wastageLog.reduce((s, w) => s + (w.qty || 0), 0).toFixed(1)} kg` },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="bg-card rounded-xl border border-border p-4">
            <p className="text-xs text-muted mb-1">{s.label}</p>
            <p className="text-lg font-bold text-dark">{s.value}</p>
            <p className="text-xs text-primary font-medium mt-0.5">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-5 mb-6 overflow-hidden">
            <h3 className="font-bold text-sm text-dark mb-4">Log New Wastage</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select value={form.item} onChange={e => setForm(f => ({ ...f, item: e.target.value }))} className="px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" required>
                <option value="">Select item</option>
                {MENU_ITEMS.map(m => <option key={m.id} value={m.name}>{m.emoji} {m.name}</option>)}
              </select>
              <input type="number" step="0.1" placeholder="Quantity (kg)" value={form.qty} onChange={e => setForm(f => ({ ...f, qty: e.target.value }))} className="px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" required />
              <select value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))} className="px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                {reasons.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <button type="submit" className="mt-3 px-5 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors">Save Entry</button>
          </motion.form>
        )}
      </AnimatePresence>

      {wastageLog.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-16">
          <Trash2 className="w-12 h-12 text-muted/30 mb-3" />
          <p className="text-muted text-sm">No wastage logged yet</p>
        </motion.div>
      ) : (
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border bg-background">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted">Item</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted">Qty</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted">Reason</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted">Date</th>
              </tr></thead>
              <tbody>
                {wastageLog.slice(0, 20).map((w) => (
                  <tr key={w.id} className="border-b border-border/50 hover:bg-background/50">
                    <td className="px-4 py-3 text-dark font-medium">{w.item}</td>
                    <td className="px-4 py-3 text-primary font-bold">{w.qty} kg</td>
                    <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-md bg-amber-100 text-amber-700 flex items-center gap-1 w-fit"><AlertTriangle className="w-3 h-3" />{w.reason}</span></td>
                    <td className="px-4 py-3 text-muted text-xs">{new Date(w.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default FoodWastage

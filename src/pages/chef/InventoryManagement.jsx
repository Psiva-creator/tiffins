import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, AlertTriangle, CheckCircle, Edit3, X, Save } from 'lucide-react'
import { useOrder } from '../../hooks/useOrder'
import { INVENTORY_ITEMS } from '../../data'

const InventoryManagement = () => {
  const { inventory, initInventory, updateInventoryStock } = useOrder()
  const [editingId, setEditingId] = useState(null)
  const [editVal, setEditVal] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => { initInventory(INVENTORY_ITEMS) }, [initInventory])

  const items = inventory || INVENTORY_ITEMS
  const categories = ['All', ...new Set(items.map(i => i.category))]
  const filtered = filter === 'All' ? items : items.filter(i => i.category === filter)
  const lowCount = items.filter(i => i.stock <= i.minStock).length

  const handleSave = (id) => {
    const n = parseInt(editVal, 10)
    if (!isNaN(n) && n >= 0) updateInventoryStock(id, n)
    setEditingId(null)
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-poppins)] text-dark mb-1">Inventory</h1>
        <p className="text-muted text-sm mb-6">Track stock levels and manage kitchen supplies</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Items', value: items.length, color: 'bg-primary/10 text-primary', icon: Package },
          { label: 'Low Stock', value: lowCount, color: lowCount > 0 ? 'bg-red-100 text-red-600' : 'bg-green/10 text-green', icon: AlertTriangle },
          { label: 'In Stock', value: items.filter(i => i.stock > i.minStock).length, color: 'bg-green/10 text-green', icon: CheckCircle },
          { label: 'Categories', value: categories.length - 1, color: 'bg-blue-100 text-blue-600', icon: Package },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 rounded-lg ${s.color} flex items-center justify-center`}><s.icon className="w-4 h-4" /></div>
              <span className="text-xs text-muted">{s.label}</span>
            </div>
            <span className="text-xl font-bold text-dark">{s.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${filter === c ? 'bg-green text-white' : 'bg-card border border-border text-muted hover:bg-green/5'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filtered.map((item, i) => {
          const low = item.stock <= item.minStock
          const pct = Math.min((item.stock / (item.minStock * 3)) * 100, 100)
          return (
            <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className={`bg-card rounded-xl border p-4 transition-shadow hover:shadow-md ${low ? 'border-red-200' : 'border-border'}`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm font-semibold text-dark">{item.name}</h4>
                  <p className="text-[10px] text-muted">{item.category}</p>
                </div>
                {editingId === item.id ? (
                  <div className="flex gap-1">
                    <button onClick={() => handleSave(item.id)} className="p-1 rounded-md bg-green/10 text-green hover:bg-green/20"><Save className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setEditingId(null)} className="p-1 rounded-md bg-red-100 text-red-500 hover:bg-red-200"><X className="w-3.5 h-3.5" /></button>
                  </div>
                ) : (
                  <button onClick={() => { setEditingId(item.id); setEditVal(String(item.stock)) }} className="p-1.5 rounded-md hover:bg-border/50 text-muted"><Edit3 className="w-3.5 h-3.5" /></button>
                )}
              </div>
              <div className="flex items-end justify-between mb-2">
                {editingId === item.id ? (
                  <input type="number" value={editVal} onChange={e => setEditVal(e.target.value)} className="w-20 px-2 py-1 text-sm border border-green rounded-lg focus:outline-none focus:ring-1 focus:ring-green" autoFocus />
                ) : (
                  <span className={`text-lg font-bold ${low ? 'text-red-500' : 'text-dark'}`}>{item.stock} <span className="text-xs font-normal text-muted">{item.unit}</span></span>
                )}
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${low ? 'bg-red-100 text-red-600' : 'bg-green/10 text-green'}`}>{low ? 'LOW' : 'OK'}</span>
              </div>
              <div className="h-1.5 bg-border/50 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${low ? 'bg-red-400' : 'bg-green'}`} style={{ width: `${pct}%` }} />
              </div>
              <p className="text-[10px] text-muted mt-1">Min: {item.minStock} {item.unit}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default InventoryManagement
